import "server-only";
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { compareSlug, localeMeta, locales, pathFor, pathForBreed, pathForSpecies, type Locale } from "@/i18n/config";
import en from "@/content/registry/en";
import sl from "@/content/registry/sl";
import de from "@/content/registry/de";
import fr from "@/content/registry/fr";
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
  type ChecklistLevel,
  type Portrait,
  type PortraitColour,
  type PortraitKind,
  type FactItem,
  type Range,
  type SexValue,
  type Source,
  type Species,
} from "@/content/registry/registry";

const copies: Record<Locale, RegistryCopy> = { en, sl, de, fr };
export function getRegistryCopy(locale: Locale): RegistryCopy {
  return copies[locale];
}

export function fmt(locale: Locale): Fmt {
  return {
    num: (n, digits = 2) => new Intl.NumberFormat(localeMeta[locale].intl, { maximumFractionDigits: digits, useGrouping: "always" }).format(n),
  };
}

/** Last content update of the register (sitemap lastmod, JSON-LD dateModified, "Updated" on pages). */
export const registryUpdated = "2026-10-10";

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
/** A breed's last update: its own `updated` from the export when present, else the register date. */
export function breedUpdated(b: Breed): string {
  if (b.updated !== undefined && !ISO_DATE.test(b.updated)) throw new Error(`registry: ${b.id}.updated must be YYYY-MM-DD, got "${b.updated}"`);
  return b.updated ?? registryUpdated;
}
/** Latest update of any breed of a species (catalogue pages). */
export function speciesUpdated(sp: Species): string {
  return breedsOf(sp.id).map(breedUpdated).reduce((a, b) => (b > a ? b : a), registryUpdated);
}

/** "10 October 2026" / "10. 10. 2026". */
export function formatDay(locale: Locale, iso: string): string {
  const d = new Date(`${iso}T12:00:00Z`);
  return locale === "sl"
    ? `${d.getUTCDate()}. ${d.getUTCMonth() + 1}. ${d.getUTCFullYear()}`
    : new Intl.DateTimeFormat(localeMeta[locale].intl, { dateStyle: "long", timeZone: "UTC" }).format(d);
}

// ─── breed portrait (optional AI photo from the export) ─────────────────────

const PORTRAIT_KINDS: readonly PortraitKind[] = ["ai_photo", "ai_illustration"];

/** One coat colour of the portrait, ready for the colour selector (M5-R11-08). */
export type PortraitColourView = { key: string; label: string; src: string; alt: string };

export type PortraitView = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  /** Standard coat colours (two or more) with the default first-selected key; absent → portrait only. */
  colours?: { items: PortraitColourView[]; defaultKey: string; legend: string };
};

/**
 * Public path of a portrait file (no query) — used for the build-time existence check:
 * public/animals/<species EN slug>/<file name>. A leading "<species id>/" (the pet-prep output path of
 * colour variants, "dog/border-collie--red-white.webp") is dropped, so both spellings map to the same folder.
 */
function portraitPath(b: Breed, file: string): string {
  const name = file.startsWith(`${b.species}/`) ? file.slice(b.species.length + 1) : file;
  return `/animals/${getSpecies(b.species).slug.en}/${name}`;
}

const portraitVersions = new Map<string, string>();

/**
 * Portrait URL with a content hash (`?v=`): a regenerated image keeps its file name,
 * so without it browsers and the image optimizer keep showing the old picture
 * (David 2026-10-10: the Maine Coon photo did not change after the switch to photos).
 */
function versionedSrc(b: Breed, file: string): string {
  const path = portraitPath(b, file);
  let v = portraitVersions.get(path);
  if (v === undefined) {
    const abs = join(process.cwd(), "public", path);
    v = existsSync(abs) ? createHash("sha256").update(readFileSync(abs)).digest("hex").slice(0, 12) : "";
    portraitVersions.set(path, v);
  }
  return v ? `${path}?v=${v}` : path;
}

export function portraitSrc(b: Breed, p: Portrait): string {
  return versionedSrc(b, p.file);
}

/** The colours shown by the selector: only when the export lists two or more; the default one first-selected. */
function colourList(p: Portrait): { list: PortraitColour[]; defaultKey: string } | null {
  const list = p.colours ?? [];
  if (list.length < 2) return null;
  return { list, defaultKey: (list.find((c) => c.default) ?? list[0]).key };
}

function portraitView(locale: Locale, b: Breed): PortraitView | null {
  const p = b.portrait;
  if (!p) return null;
  const c = copies[locale];
  const name = b.name[locale];
  const view: PortraitView = { src: portraitSrc(b, p), width: p.width, height: p.height, alt: c.page.portraitAlt[p.kind](name), caption: c.page.portraitCaption[p.kind] };
  const cl = colourList(p);
  if (cl) {
    view.colours = {
      defaultKey: cl.defaultKey,
      legend: c.page.portraitColours.legend,
      items: cl.list.map((col) => ({
        key: col.key,
        label: col.label[locale],
        src: versionedSrc(b, col.file),
        alt: c.page.portraitColours.alt[p.kind](name, col.label[locale]),
      })),
    };
  }
  return view;
}

const PLAIN_IMAGE = /^[\w.-]+\.(webp|avif|png|jpe?g)$/;

/** Fails the build for a portrait that is not a labelled AI photo / illustration or whose file is missing. */
function checkPortrait(b: Breed) {
  const p = b.portrait;
  if (!p) return;
  if (!PORTRAIT_KINDS.includes(p.kind)) throw new Error(`registry: ${b.id}.portrait.kind must be one of ${PORTRAIT_KINDS.join(", ")}`);
  if (!PLAIN_IMAGE.test(p.file)) throw new Error(`registry: ${b.id}.portrait.file "${p.file}" is not a plain image file name`);
  if (!(p.width > 0 && p.height > 0)) throw new Error(`registry: ${b.id}.portrait needs width and height`);
  const file = join(process.cwd(), "public", portraitPath(b, p.file));
  if (!existsSync(file)) throw new Error(`registry: ${b.id}.portrait file is missing: public${portraitPath(b, p.file)}`);
  if (p.colours === undefined) return;
  if (!Array.isArray(p.colours)) throw new Error(`registry: ${b.id}.portrait.colours must be a list`);
  const keys = new Set<string>();
  for (const col of p.colours) {
    const at = `${b.id}.portrait.colours[${col.key}]`;
    if (!col.key || keys.has(col.key)) throw new Error(`registry: ${at} needs a unique key`);
    keys.add(col.key);
    if (!col.label?.en?.trim() || !col.label?.sl?.trim()) throw new Error(`registry: ${at} needs label.en and label.sl`);
    const name = col.file.startsWith(`${b.species}/`) ? col.file.slice(b.species.length + 1) : col.file;
    if (!PLAIN_IMAGE.test(name)) throw new Error(`registry: ${at}.file "${col.file}" is not "<file>" or "${b.species}/<file>"`);
    if (!existsSync(join(process.cwd(), "public", portraitPath(b, col.file)))) throw new Error(`registry: ${at} file is missing: public${portraitPath(b, col.file)}`);
  }
  if (p.colours.filter((col) => col.default).length > 1) throw new Error(`registry: ${b.id}.portrait.colours has more than one default`);
}

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

export type GlanceRow = { key: string; label: string; values: FactLine[] };
export type QaItem = { q: string; lead: string; items: FactLine[]; note?: string; tail?: { lead: string; items: FactLine[] } };

export type BreedView = {
  breed: Breed;
  species: Species;
  name: string;
  updated: string;
  portrait: PortraitView | null;
  glance: GlanceRow[];
  faq: QaItem[];
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
  checklist: {
    general: FactLine[];
    /** National rules for this language's country (sl → Slovenia); empty elsewhere. */
    national: FactLine[];
    groups: { level: ChecklistLevel; title: string; lines: FactLine[] }[];
    /** Shown instead of (or, never, next to) the groups when the breed has no listed tests. */
    status: string | null;
    statusSources: SourceRef[];
  };
  sources: Source[];
};

/** Label of a fact field in the "at a glance" list; statement fields use their group heading. */
function fieldLabel(locale: Locale, b: Breed, field: string): string {
  const c = copies[locale];
  const group = b.facts.find((x) => x.field === field)?.group ?? field;
  return c.fields[field] ?? need(c.groups, group, "group");
}

/**
 * "At a glance": the species' key fields (its comparison rows, chosen in the export), each with
 * every sourced value of that field — where sources differ, all are listed.
 */
function glanceRows(locale: Locale, b: Breed): GlanceRow[] {
  const sp = getSpecies(b.species);
  // A breed without a fact for a comparison field gets no row (and no label lookup — a statement
  // field's label comes from the group of the breed's own fact, e.g. the British Shorthair has no
  // "sources differ on combing" statement, M5-R10-14).
  return sp.compare_fields
    .filter((k) => k !== "game_activity")
    .map((k) => ({ k, facts: b.facts.filter((x) => x.field === k) }))
    .filter(({ facts }) => facts.length > 0)
    .map(({ k, facts }) => ({
      key: k,
      label: fieldLabel(locale, b, k),
      values: facts.map((x) => ({ text: x.kind === "statement" ? factText(locale, x) : valueText(locale, x), sources: refs(x.source_ids) })),
    }));
}

/** Topics of the generated breed Q&A and the fact fields that answer them (in this order). */
const FAQ_TOPICS: { topic: "exercise" | "lifespan" | "size" | "grooming"; fields: string[] }[] = [
  { topic: "exercise", fields: ["exercise"] },
  { topic: "lifespan", fields: ["lifespan"] },
  { topic: "size", fields: ["size", "weight"] },
  { topic: "grooming", fields: ["grooming_frequency", "grooming_sources_differ", "grooming_level", "shedding", "coat"] },
];

/**
 * 3–5 questions per breed, generated only from sourced registry facts: each answer lists every
 * source's value with its source ids; a topic without facts has no question.
 */
function breedFaq(locale: Locale, b: Breed, tagLine: (t: { tag: string; source_ids: string[] }) => FactLine): QaItem[] {
  const c = copies[locale];
  const q = c.page.qa;
  const name = b.name[locale];
  const out: QaItem[] = [];
  for (const { topic, fields } of FAQ_TOPICS) {
    const facts = fields.flatMap((f) => b.facts.filter((x) => x.field === f));
    if (!facts.length) continue;
    const labelled = fields.filter((f) => b.facts.some((x) => x.field === f)).length > 1;
    // Several fields: the label once per field ("Adult weight: …; …"), then only values.
    const seen = new Set<string>();
    const items = facts.map((x) => {
      const first = !seen.has(x.field);
      seen.add(x.field);
      return { text: x.kind === "statement" || (labelled && first) ? factText(locale, x) : valueText(locale, x), sources: refs(x.source_ids) };
    });
    const distinct = new Set(facts.filter((x) => x.field === fields[0] || !labelled).map((x) => JSON.stringify(x.value))).size;
    out.push({ q: q.questions[topic](name), lead: q.leads[topic](name), items, ...(facts.length > 1 && distinct > 1 && !labelled ? { note: q.differ } : {}) });
  }
  const { suits, consider } = b.suitability;
  if (suits.length) {
    out.push({
      q: q.questions.suits(name),
      lead: q.leads.suits(name),
      items: suits.map(tagLine),
      ...(consider.length ? { tail: { lead: q.considerLead, items: consider.map(tagLine) } } : {}),
    });
  }
  return out;
}

/** One Q&A answer as plain text with its sources (JSON-LD, llms.txt). */
export function qaText(locale: Locale, a: QaItem): string {
  const c = copies[locale];
  const cite = (l: FactLine) => `${l.text} (${l.sources.map((s) => `${s.publisher} ${s.id}`).join("; ")})`;
  let t = `${a.lead} ${a.items.map(cite).join(c.page.qa.join)}.`;
  if (a.tail) t += ` ${a.tail.lead} ${a.tail.items.map(cite).join(c.page.qa.join)}.`;
  if (a.note) t += ` ${a.note}`;
  return t;
}

const CHECKLIST_LEVELS: ChecklistLevel[] = ["minimum", "best_practice", "other_scheme"];

/** "Before you buy" (M5-R11-06): general items of the species + the parents' tests grouped by level. */
function checklistView(locale: Locale, b: Breed): BreedView["checklist"] {
  const c = copies[locale];
  const sp = getSpecies(b.species);
  const bc = b.breeder_checklist;
  if (!bc || !sp.buyer_checklist) throw new Error(`registry: ${b.id} has no breeder checklist — re-export from pet-prep main (M5-R11-06)`);
  const item = (it: { key: string; source_ids: string[] }) => ({ text: need(c.checklist.items, it.key, "checklist item"), sources: refs(it.source_ids) });
  // International site: universal items for everyone, a country's rules only on its language pages.
  const general = sp.buyer_checklist.filter((it) => !it.country).map(item);
  const national = c.page.checklistCountry.code ? sp.buyer_checklist.filter((it) => it.country === c.page.checklistCountry.code).map(item) : [];
  const groups = CHECKLIST_LEVELS.map((level) => ({
    level,
    title: c.page.checklistLevels(b.species)[level],
    lines: bc.tests.filter((t) => t.level === level).map((t) => ({ text: need(c.checklist.tests, t.key, "checklist test"), sources: refs(t.source_ids) })),
  })).filter((g) => g.lines.length > 0);
  return {
    general,
    national,
    groups,
    status: bc.status === "listed" ? null : need(c.page.checklistStatus, bc.status, "checklist status"),
    statusSources: bc.status === "listed" ? [] : refs(bc.basis_source_ids),
  };
}

/**
 * The breed's sources minus those cited only by another country's rules (an English reader does not
 * get the Slovenian regulations in the list, M5-R11-06b).
 */
function visibleSourceIds(locale: Locale, b: Breed): string[] {
  const code = copies[locale].page.checklistCountry.code;
  const items = getSpecies(b.species).buyer_checklist ?? [];
  const shown = new Set(items.filter((it) => !it.country || it.country === code).flatMap((it) => it.source_ids));
  const hiddenOnly = new Set(items.filter((it) => it.country && it.country !== code).flatMap((it) => it.source_ids).filter((id) => !shown.has(id)));
  for (const t of b.breeder_checklist?.tests ?? []) t.source_ids.forEach((id) => hiddenOnly.delete(id));
  for (const id of b.breeder_checklist?.basis_source_ids ?? []) hiddenOnly.delete(id);
  return b.source_ids.filter((id) => !hiddenOnly.has(id));
}

/** Fields for the search snippet, in this order (the first sourced value of each; statements skipped). */
const META_FIELDS = ["weight", "exercise", "lifespan"];

/** Page title with search terms; "temperament" only for breeds with a written intro. */
export function breedMetaTitle(locale: Locale, b: Breed): string {
  const c = copies[locale];
  const sp = getSpecies(b.species);
  return c.page.metaTitle(b.name[locale], sp.name[locale].one, sp.id, Boolean(c.intros[b.id]));
}

/** Unique search snippet from the breed's own sourced facts; the generic sentence when it has none. */
export function breedMetaDescription(locale: Locale, b: Breed): string {
  const c = copies[locale];
  const facts = META_FIELDS.flatMap((field) => {
    const f = b.facts.find((x) => x.field === field && x.kind !== "statement");
    if (!f) return [];
    // "life expectancy at birth …" already names itself; other values get a short label
    const label = f.qualifier?.startsWith("expectancy") ? "" : `${need(c.page.metaLabels, field, "meta label")} `;
    return [`${label}${valueText(locale, f)}`];
  });
  return facts.length ? c.page.metaFacts(b.name[locale], facts) : c.page.metaDescription(b.name[locale], getSpecies(b.species).name[locale].one);
}

/**
 * "Similar breeds" on a breed page: up to `max` other breeds of the same species, those in the app
 * first, then by similarity — the same FCI group counts 2, each shared facet (size, exercise, grooming)
 * 1 — then the registry order. Gives every breed page internal links to its neighbours (SEO, 2026-10-27),
 * not only the link back to the catalogue. Automatic for every breed, also new ones.
 */
const fciGroup = (b: Breed): number | undefined => {
  const v = b.facts.find((f) => f.field === "fci_standard")?.value as { group?: number } | undefined;
  return v?.group;
};

export function relatedBreeds(b: Breed, max = 4): Breed[] {
  const keys = Object.keys(b.facets);
  const group = fciGroup(b);
  const score = (o: Breed) =>
    keys.filter((k) => o.facets[k] === b.facets[k]).length + (group !== undefined && fciGroup(o) === group ? 2 : 0);
  return breedsOf(b.species)
    .filter((o) => o.id !== b.id)
    .map((o, i) => ({ o, i, inApp: o.availability === "in_app" ? 1 : 0, s: score(o) }))
    .sort((x, y) => y.inApp - x.inApp || y.s - x.s || x.i - y.i)
    .slice(0, max)
    .map((x) => x.o);
}

/**
 * "Common owner mistakes" (David 2026-10-31): only from facts the register already has for this breed,
 * each with its sources — exercise, coat care, weight/treats, heat, growth, health, learning. A breed
 * without a fact for a point simply has fewer points; nothing is written without a source.
 */
export type Mistake = { key: string; title: string; text: string; sources: SourceRef[] };

export function ownerMistakes(locale: Locale, b: Breed): Mistake[] {
  const c = copies[locale];
  const m = c.mistakes;
  const out: Mistake[] = [];
  const first = (group: string, field: string) => b.facts.find((x) => x.group === group && x.field === field);
  const all = (group: string, field: string) => b.facts.filter((x) => x.group === group && x.field === field);
  const ids = (items: { source_ids: string[] }[]) => refs([...new Set(items.flatMap((i) => i.source_ids))]);
  const ex = first("exercise", "exercise");
  if (ex) out.push({ key: "exercise", title: m.exercise, text: m.exerciseText(valueText(locale, ex)), sources: ids(all("exercise", "exercise")) });
  const freq = first("grooming", "grooming_frequency");
  const shed = all("grooming", "shedding");
  if (freq) out.push({ key: "coat", title: m.coat, text: m.coatText(valueText(locale, freq), shed[0] ? valueText(locale, shed[shed.length - 1]) : null), sources: ids([freq, ...shed]) });
  const weight = b.health.find((h) => h.key === "weight_gain");
  const food = first("feeding", "food_motivated");
  if (weight || food) {
    const parts = [weight ? need(c.health, "weight_gain", "health item") : null, food ? factText(locale, food) : null].filter((x): x is string => !!x);
    out.push({ key: "weight", title: m.weight, text: parts.join(" "), sources: ids([...(weight ? [weight] : []), ...(food ? [food] : [])]) });
  }
  const heat = b.health.find((h) => h.key === "heat_stroke_risk");
  if (heat) out.push({ key: "heat", title: m.heat, text: need(c.health, "heat_stroke_risk", "health item"), sources: ids([heat]) });
  const growth = first("stages", "growth_end");
  if (growth) out.push({ key: "growth", title: m.growth, text: m.growthText(valueText(locale, growth)), sources: ids([growth]) });
  const rank = first("training", "coren_rank");
  if (rank && typeof rank.value === "number" && rank.value <= 20) out.push({ key: "mind", title: m.mind, text: factText(locale, rank), sources: ids([rank]) });
  const other = b.health.filter((h) => h.key !== "weight_gain" && h.key !== "heat_stroke_risk");
  if (other.length) out.push({ key: "health", title: m.health, text: other.map((h) => need(c.health, h.key, "health item")).join(" "), sources: ids(other) });
  return out;
}

export function buildBreedView(locale: Locale, b: Breed): BreedView {
  const c = copies[locale];
  const f = fmt(locale);
  const sp = getSpecies(b.species);
  const tagLabels = registry.suitability_labels[locale].tags;
  const line = (item: FactItem): FactLine => ({ text: factText(locale, item), sources: refs(item.source_ids) });
  const intro = c.intros[b.id];
  const g = b.game;
  const stageLabels = need(c.stageLabels, sp.id, "species stage labels");
  const tagLine = (t: { tag: string; source_ids: string[] }): FactLine => ({ text: tagLabels[t.tag], sources: refs(t.source_ids) });
  return {
    breed: b,
    species: sp,
    name: b.name[locale],
    updated: breedUpdated(b),
    portrait: portraitView(locale, b),
    glance: glanceRows(locale, b),
    faq: breedFaq(locale, b, tagLine),
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
    checklist: checklistView(locale, b),
    sources: visibleSourceIds(locale, b).map(getSource),
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
  /** portrait thumbnail (optional AI photo) */
  p?: { src: string; w: number; h: number };
};

const SIZE_ORDER = ["toy", "small", "small_medium", "medium", "medium_large", "large", "giant"];
export const sizeRank = (size: string | undefined) => (size ? SIZE_ORDER.indexOf(size) : 99);

export function catalogueIndex(locale: Locale, sp: Species): IndexItem[] {
  const c = copies[locale];
  const others = locales.filter((l) => l !== locale);
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
    const shown = [...others.map((o) => b.name[o]), ...b.synonyms[locale]].filter((x) => {
      const k = normalize(x);
      if (!x || seen.has(k)) return false;
      seen.add(k);
      return true;
    });
    const searchable = [...new Set([b.name[locale], ...others.map((o) => b.name[o]), ...locales.flatMap((l) => b.synonyms[l] ?? [])].map(normalize))];
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
      ...(b.portrait ? { p: { src: portraitSrc(b, b.portrait), w: b.portrait.width, h: b.portrait.height } } : {}),
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
  for (const locale of locales) {
    const c = copies[locale];
    for (const sp of registry.species) {
      need(c.stageLabels, sp.id, "species stage labels");
      for (const k of sp.facets) need(c.facets, k, "facet");
      catalogueIndex(locale, sp);
      compareData(locale, sp);
      activityText(locale, sp.free_plan.adult_activity);
      for (const b of breedsOf(sp.id)) {
        checkPortrait(b);
        breedUpdated(b);
        const v = buildBreedView(locale, b);
        // every citation on the page must point at a listed source (visibleSourceIds may drop national ones)
        const listed = new Set(v.sources.map((s) => s.id));
        const cited = [
          ...v.glance.flatMap((r) => r.values.flatMap((l) => l.sources)),
          ...v.groups.flatMap((g) => [...g.lines, ...g.general].flatMap((l) => l.sources)),
          ...v.health.flatMap((l) => l.sources),
          ...[...v.suits, ...v.consider].flatMap((t) => t.sources),
          ...(v.game?.basis ?? []),
          ...[...v.checklist.general, ...v.checklist.national, ...v.checklist.groups.flatMap((g) => g.lines)].flatMap((l) => l.sources),
          ...v.checklist.statusSources,
        ].map((s) => s.id);
        for (const id of [...cited, ...(c.intros[b.id]?.sources ?? [])]) {
          if (!listed.has(id)) throw new Error(`registry/${locale}: ${b.id} cites ${id}, which is not in the page's source list`);
        }
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
  const out = [
    `# ${v.name} — ${v.species.name[locale].one} · ${c.page.eyebrow}`,
    `URL: ${url}`,
    `${c.page.updated}: ${v.updated}`,
    `${v.availability.label}: ${v.availability.text}`,
    ...v.intro,
  ];
  if (v.glance.length) {
    out.push(`## ${c.page.glanceTitle}`, v.glance.map((r) => `- **${r.label}:** ${r.values.map((l) => `${l.text} (${l.sources.map((s) => `${s.publisher} ${s.id}`).join("; ")})`).join("; ")}`).join("\n"));
  }
  if (v.suits.length || v.consider.length) {
    out.push(`## ${c.page.suitabilityTitle}`, `${labels.suits_title} ${v.suits.map((t) => t.label).join(", ") || "—"}\n${labels.consider_title} ${v.consider.map((t) => t.label).join(", ") || "—"}`);
  }
  out.push(`## ${c.page.needsTitle}`);
  for (const g of v.groups) out.push(`**${g.title}**\n${[...g.lines, ...g.general].map(mdLine).join("\n")}`);
  if (v.faq.length) out.push(`## ${c.page.qa.title}`, v.faq.map((a) => `**${a.q}**\n${qaText(locale, a)}`).join("\n\n"));
  out.push(`## ${c.page.simTitle} (${c.page.simBadge})`);
  if (v.game) {
    out.push(
      c.page.simIntro,
      [`| ${c.page.simTable.stage} | ${c.page.simTable.starts} | ${c.page.simTable.meals} | ${v.game.activityHeader} |`, "| --- | --- | --- | --- |", ...v.game.rows.map((r) => `| ${r.stage} | ${r.starts} | ${r.meals} | ${r.activity} |`)].join("\n"),
      v.game.rules.map((r) => `- ${r}`).join("\n"),
    );
  } else out.push(c.page.simInfoOnly);
  out.push(`## ${c.page.healthTitle}`, `_${c.page.healthNote}_`, v.health.length ? v.health.map(mdLine).join("\n") : c.page.healthNone);
  out.push(`## ${c.page.checklistTitle}`, c.page.checklistIntro(b.species));
  if (v.checklist.general.length) out.push(`**${c.page.checklistGeneralTitle}**\n${v.checklist.general.map(mdLine).join("\n")}`);
  if (v.checklist.national.length) out.push(`**${c.page.checklistCountry.title}**\n${v.checklist.national.map(mdLine).join("\n")}`);
  else if (c.page.checklistLocalNote) out.push(`_${c.page.checklistLocalNote}_`);
  out.push(`**${c.page.checklistTestsTitle}**`);
  if (v.checklist.status) out.push(v.checklist.statusSources.length ? mdLine({ text: v.checklist.status, sources: v.checklist.statusSources }) : v.checklist.status);
  for (const g of v.checklist.groups) out.push(`_${g.title}_\n${g.lines.map(mdLine).join("\n")}`);
  if (v.checklist.groups.length) out.push(`_${c.page.checklistUkNote(b.species)}_`);
  out.push(`## ${c.page.sourcesTitle}`, v.sources.map((s) => `- ${s.id}: ${s.publisher} — ${s.title}. ${s.url}`).join("\n"));
  return out.join("\n\n");
}

export const animalsPath = (locale: Locale) => pathFor(locale, "animals");
