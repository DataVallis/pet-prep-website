import "server-only";
import { compareSlug, pathFor, pathForBreed, pathForSpecies, type Locale } from "@/i18n/config";
import en from "@/content/registry/en";
import sl from "@/content/registry/sl";
import type { Fmt, RegistryCopy } from "@/content/registry/types";
import {
  breedsOf,
  getSource,
  getSpecies,
  registry,
  shortPublisher,
  type Activity,
  type Availability,
  type Breed,
  type FactItem,
  type Range,
  type SexValue,
  type Source,
  type Species,
} from "@/content/registry/registry";

const copies: Record<Locale, RegistryCopy> = { en, sl };
export function getRegistryCopy(locale: Locale): RegistryCopy {
  return copies[locale];
}

const intlLocale: Record<Locale, string> = { en: "en-GB", sl: "sl-SI" };
export function fmt(locale: Locale): Fmt {
  return {
    num: (n, digits = 2) => new Intl.NumberFormat(intlLocale[locale], { maximumFractionDigits: digits, useGrouping: "always" }).format(n),
  };
}

/** Last content update of the register (sitemap lastmod, JSON-LD dateModified). */
export const registryUpdated = "2026-10-10";

// ─── words for registry values ───────────────────────────────────────────────

function need<T>(map: Record<string, T>, key: string, what: string): T {
  const v = map[key];
  if (v === undefined) throw new Error(`register: no words for ${what} "${key}" — add them to src/content/registry/{en,sl}.ts`);
  return v;
}

export type SourceRef = { id: string; publisher: string };
export type FactLine = { text: string; sources: SourceRef[] };
const refs = (ids: string[]): SourceRef[] => ids.map((id) => ({ id, publisher: shortPublisher(id) }));

function rangeText(f: Fmt, v: number | Range): string {
  if (typeof v === "number") return f.num(v);
  return v[0] === v[1] ? f.num(v[0]) : `${f.num(v[0])}–${f.num(v[1])}`;
}
const upper = (v: number | Range) => (typeof v === "number" ? v : v[1]);

/** The value of a fact in words, without its label ("median 13.1 years", "large"). */
export function valueText(locale: Locale, item: FactItem): string {
  const c = copies[locale];
  const f = fmt(locale);
  if (item.kind === "category") {
    const words = need(c.categories, item.field, "category field");
    const list = Array.isArray(item.value) ? (item.value as string[]) : [item.value as string];
    return list.map((v) => need(words, v, `${item.field} value`)).join(c.or);
  }
  if (item.kind === "statement") return need(c.statements, item.field, "statement")(item.value, f);
  const unit = need(c.units, item.unit ?? "", "unit");
  const one = (v: number | Range) => unit(rangeText(f, v), upper(v), f);
  let text: string;
  const v = item.value as number | Range | SexValue;
  if (typeof v === "number" || Array.isArray(v)) text = one(v);
  else {
    const parts: string[] = [];
    if (v.male) parts.push(`${c.males} ${one(v.male)}`);
    if (v.female) parts.push(`${c.females} ${one(v.female)}`);
    text = parts.join(", ");
  }
  const q = item.qualifier ? need(c.qualifiers, item.qualifier, "qualifier")(text) : text;
  return item.note ? `${q} (${need(c.notes, item.note, "note")})` : q;
}

/** "Adult weight: males …"; statements stand alone. */
export function factText(locale: Locale, item: FactItem): string {
  const c = copies[locale];
  const value = valueText(locale, item);
  if (item.kind === "statement") return value;
  const label = item.context && (item.field === "meals" || item.field === "stage") ? need(c.contexts, item.context, "context") : need(c.fields, item.field, "field");
  return `${label}: ${value}`;
}

export function activityText(locale: Locale, a: Activity): string {
  const c = copies[locale].activity;
  const f = fmt(locale);
  switch (a.kind) {
    case "steps":
      return c.steps(f.num(a.value), a.value);
    case "steps_range":
      return c.steps_range(f.num(a.from), f.num(a.to));
    case "steps_growing":
      return c.steps_growing(f.num(a.per_month), f.num(a.first), f.num(a.cap), a.cap_month);
    case "play_sessions":
      return c.play_sessions(a.value);
  }
}

export const speciesName = (locale: Locale, s: Species) => s.name[locale];
export const speciesHref = (locale: Locale, s: Species) => pathForSpecies(locale, s.slug[locale]);
export const breedHref = (locale: Locale, b: Breed) => pathForBreed(locale, getSpecies(b.species).slug[locale], b.slug[locale]);
export const compareHref = (locale: Locale, s: Species) => pathForBreed(locale, s.slug[locale], compareSlug[locale]);

// ─── breed page ──────────────────────────────────────────────────────────────

export type BreedView = {
  breed: Breed;
  species: Species;
  name: string;
  aka?: string;
  intro: string[];
  href: string;
  availability: { key: Availability; label: string; text: string };
  suits: { tag: string; label: string; sources: SourceRef[] }[];
  consider: { tag: string; label: string; sources: SourceRef[] }[];
  groups: { key: string; title: string; lines: FactLine[]; general: FactLine[] }[];
  game: null | {
    activityHeader: string;
    rows: { stage: string; starts: string; meals: string; activity: string }[];
    rules: string[];
    basis: SourceRef[];
  };
  health: FactLine[];
  sources: Source[];
};

export function buildBreedView(locale: Locale, b: Breed): BreedView {
  const c = copies[locale];
  const f = fmt(locale);
  const sp = getSpecies(b.species);
  const tagLabels = registry.suitability_labels[locale].tags;
  const line = (item: FactItem): FactLine => ({ text: factText(locale, item), sources: refs(item.source_ids) });
  const intro = c.intros[b.id];
  const g = b.game;
  const stageLabels = need(c.stageLabels, sp.id, "species stage labels");
  return {
    breed: b,
    species: sp,
    name: b.name[locale],
    aka: intro?.aka ?? ([...b.synonyms[locale]].join(", ") || undefined),
    intro: intro?.text ?? [],
    href: breedHref(locale, b),
    availability: { key: b.availability, ...c.availability[b.availability] },
    suits: b.suitability.suits.map((t) => ({ tag: t.tag, label: tagLabels[t.tag], sources: refs(t.source_ids) })),
    consider: b.suitability.consider.map((t) => ({ tag: t.tag, label: tagLabels[t.tag], sources: refs(t.source_ids) })),
    groups: sp.fact_groups
      .map((key) => ({
        key,
        title: need(c.groups, key, "group"),
        lines: b.facts.filter((x) => x.group === key).map(line),
        general: sp.general_facts.filter((x) => x.group === key).map(line),
      }))
      .filter((grp) => grp.lines.length || grp.general.length),
    game: g
      ? {
          activityHeader: need(c.page.simTable.activity, g.adult_activity.kind === "play_sessions" ? "play_sessions" : "steps", "activity header"),
          rows: g.stages.map((st) => ({
            stage: stageLabels[st.stage],
            starts:
              st.starts.arrival_months !== undefined
                ? c.page.arrives(st.starts.arrival_months)
                : c.page.fromMonth(st.starts.month ?? 0, (st.starts.month ?? 0) >= 12 ? c.units.years(f.num((st.starts.month ?? 0) / 12, 1), (st.starts.month ?? 0) / 12, f) : null),
            meals: c.page.meals(st.meals.map((m) => ({ from: m.from_months, meals: m.meals }))),
            activity: activityText(locale, st.activity),
          })),
          rules: g.rules.map((r) => need(c.rules, r.key, "game rule")(r.params, f)),
          basis: refs(g.basis_source_ids),
        }
      : null,
    health: b.health.map((h) => ({ text: need(c.health, h.key, "health item"), sources: refs(h.source_ids) })),
    sources: b.source_ids.map(getSource),
  };
}

// ─── catalogue (slim index for the client) and comparison ────────────────────

/** Lower case, no diacritics: "Zlati prinašalec" → "zlati prinasalec". */
export function normalize(s: string): string {
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

export type IndexItem = {
  id: string;
  /** name in this locale */
  n: string;
  /** other names (other locale, synonyms) */
  a: string;
  /** normalized search text */
  s: string;
  /** href */
  h: string;
  /** slug in this locale (comparison URL) */
  k: string;
  av: Availability;
  o: number;
  f: Record<string, string>;
  t: string[];
  /** one-line summary */
  l: string;
};

const SIZE_ORDER = ["toy", "small", "medium", "large", "giant"];
export const sizeRank = (size: string | undefined) => (size ? SIZE_ORDER.indexOf(size) : 99);

export function catalogueIndex(locale: Locale, sp: Species): IndexItem[] {
  const c = copies[locale];
  const other: Locale = locale === "en" ? "sl" : "en";
  return breedsOf(sp.id).map((b) => {
    const facetWords = sp.facets
      .filter((k) => b.facets[k])
      .map((k) => {
        const facet = need(c.facets, k, "facet");
        const word = need(facet.values, b.facets[k], `${k} facet value`);
        return facet.line ? facet.line(word) : word;
      });
    const firstCompare = sp.compare_fields.map((k) => b.compare[k]).find((i) => i !== undefined);
    const lineParts = facetWords.length ? facetWords : firstCompare !== undefined ? [factText(locale, b.facts[firstCompare])] : [];
    const seen = new Set([normalize(b.name[locale])]);
    const shown = [b.name[other], ...b.synonyms[locale]].filter((x) => {
      const k = normalize(x);
      if (!x || seen.has(k)) return false;
      seen.add(k);
      return true;
    });
    const searchable = [...new Set([b.name[locale], b.name[other], ...b.synonyms.en, ...b.synonyms.sl].map(normalize))];
    return {
      id: b.id,
      n: b.name[locale],
      a: shown.join(", "),
      s: searchable.join(" "),
      h: breedHref(locale, b),
      k: b.slug[locale],
      av: b.availability,
      o: b.order,
      f: b.facets,
      t: b.suitability.suits.map((x) => x.tag),
      l: lineParts.join(" · "),
    };
  });
}

export type CompareData = {
  rows: { key: string; label: string }[];
  breeds: Record<string, { name: string; href: string; values: Record<string, string> }>;
};

export function compareData(locale: Locale, sp: Species): CompareData {
  const c = copies[locale];
  const groupOf = (k: string) => breedsOf(sp.id).flatMap((b) => b.facts).find((x) => x.field === k)?.group;
  const rows = [
    { key: "availability", label: c.compare.availabilityRow },
    ...sp.compare_fields.map((k) => ({
      key: k,
      // A statement field has no label of its own: use its group's heading.
      label: k === "game_activity" ? c.compare.activityRow : (c.fields[k] ?? need(c.groups, groupOf(k) ?? k, "group")),
    })),
  ];
  const breeds: CompareData["breeds"] = {};
  for (const b of breedsOf(sp.id)) {
    const values: Record<string, string> = { availability: c.availability[b.availability].label };
    for (const k of sp.compare_fields) {
      if (k === "game_activity") {
        values[k] = b.game ? activityText(locale, b.game.adult_activity) : c.availability.info_only.label;
        continue;
      }
      const i = b.compare[k];
      if (i === undefined) {
        values[k] = c.page.noData;
        continue;
      }
      const item = b.facts[i];
      values[k] = `${item.kind === "statement" ? factText(locale, item) : valueText(locale, item)} (${[...new Set(item.source_ids.map(shortPublisher))].join(", ")})`;
    }
    breeds[b.slug[locale]] = { name: b.name[locale], href: breedHref(locale, b), values };
  }
  return { rows, breeds };
}

// ─── build-time checks ───────────────────────────────────────────────────────

/** Renders every value once in both languages so missing words fail `next build`. */
function validate() {
  for (const locale of ["en", "sl"] as Locale[]) {
    const c = copies[locale];
    for (const sp of registry.species) {
      need(c.stageLabels, sp.id, "species stage labels");
      for (const k of sp.facets) need(c.facets, k, "facet");
      catalogueIndex(locale, sp);
      compareData(locale, sp);
      activityText(locale, sp.free_plan.adult_activity);
      for (const b of breedsOf(sp.id)) {
        buildBreedView(locale, b);
        const intro = c.intros[b.id];
        for (const s of intro?.sources ?? []) {
          if (!b.source_ids.includes(s)) throw new Error(`registry/${locale}.ts: ${b.id} intro cites ${s}, which is not in the breed's sources`);
        }
      }
    }
  }
}
validate();

// ─── Markdown for /llms.txt and /llms-full.txt ──────────────────────────────

const mdLine = (l: FactLine) => `- ${l.text} (${l.sources.map((s) => `${s.publisher} ${s.id}`).join("; ")})`;

export function hubMarkdown(locale: Locale, abs: (p: string) => string): string {
  const c = copies[locale];
  return registry.species
    .map((sp) => `- **${sp.name[locale].many}** (${c.speciesStatus[sp.status]}, ${c.hub.breedCount(sp.breed_count)}): ${abs(speciesHref(locale, sp))}. ${c.hub.freePlan(sp.free_plan.name[locale], activityText(locale, sp.free_plan.adult_activity))}`)
    .concat([c.hub.otherSpecies, `### ${c.hub.methodTitle}`, c.hub.method.map((m) => `- ${m}`).join("\n")])
    .join("\n");
}

export function breedMarkdown(locale: Locale, b: Breed, url: string): string {
  const c = copies[locale];
  const v = buildBreedView(locale, b);
  const labels = registry.suitability_labels[locale];
  const out = [`# ${v.name} — ${v.species.name[locale].one} · ${c.page.eyebrow}`, `URL: ${url}`, `${v.availability.label}: ${v.availability.text}`, ...v.intro];
  if (v.suits.length || v.consider.length) {
    out.push(`## ${c.page.suitabilityTitle}`, `${labels.suits_title} ${v.suits.map((t) => t.label).join(", ") || "—"}\n${labels.consider_title} ${v.consider.map((t) => t.label).join(", ") || "—"}`);
  }
  out.push(`## ${c.page.needsTitle}`);
  for (const g of v.groups) out.push(`**${g.title}**\n${[...g.lines, ...g.general].map(mdLine).join("\n")}`);
  out.push(`## ${c.page.simTitle} (${c.page.simBadge})`);
  if (v.game) {
    out.push(
      c.page.simIntro,
      [`| ${c.page.simTable.stage} | ${c.page.simTable.starts} | ${c.page.simTable.meals} | ${v.game.activityHeader} |`, "| --- | --- | --- | --- |", ...v.game.rows.map((r) => `| ${r.stage} | ${r.starts} | ${r.meals} | ${r.activity} |`)].join("\n"),
      v.game.rules.map((r) => `- ${r}`).join("\n"),
    );
  } else out.push(c.page.simInfoOnly);
  out.push(`## ${c.page.healthTitle}`, `_${c.page.healthNote}_`, v.health.length ? v.health.map(mdLine).join("\n") : c.page.healthNone);
  out.push(`## ${c.page.sourcesTitle}`, v.sources.map((s) => `- ${s.id}: ${s.publisher} — ${s.title}. ${s.url}`).join("\n"));
  return out.join("\n\n");
}

export const animalsPath = (locale: Locale) => pathFor(locale, "animals");
