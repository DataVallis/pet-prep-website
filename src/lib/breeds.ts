import "server-only";
import { pathForBreed, type BreedId, type Locale } from "@/i18n/config";
import { availability, breedOrder, getBreedCopy, registry } from "@/content/breeds";
import { getRegistryBreed, getSource, shortPublisher, type NumberFact, type RegistrySource, type WeightFact } from "@/content/breeds/registry";
import type { Availability, BreedCopy } from "@/content/breeds/types";

/** A cited source as shown next to a fact. */
export type SourceRef = { id: string; publisher: string };
/** One line of a fact card: the value in words + where it comes from. */
export type FactLine = { text: string; sources: SourceRef[] };
export type TagView = { tag: string; label: string; sources: SourceRef[] };

export const compareRowKeys = ["availability", "size", "weight", "exercise", "grooming", "shedding", "lifespan", "stepGoal"] as const;
export type CompareRowKey = (typeof compareRowKeys)[number];

export type BreedView = {
  id: BreedId;
  name: string;
  alsoKnownAs?: string;
  metaDescription: string;
  intro: string[];
  href: string;
  availability: { key: Availability; label: string; text: string };
  suits: TagView[];
  consider: TagView[];
  needs: Record<keyof BreedCopy["page"]["cards"], FactLine[]>;
  /** General meal guidance for dogs (same on every breed page). */
  meals: FactLine[];
  health: FactLine[];
  game: {
    rows: { stage: string; starts: string; meals: string; steps: string }[];
    stepsRule: string;
    learning: string;
    senior: string;
    basis: SourceRef[];
  };
  sources: RegistrySource[];
  compare: Record<CompareRowKey, string>;
};

const intlLocale: Record<Locale, string> = { en: "en-GB", sl: "sl-SI" };

export function formatNumber(locale: Locale, n: number, digits = 1): string {
  return new Intl.NumberFormat(intlLocale[locale], { maximumFractionDigits: digits, useGrouping: "always" }).format(n);
}

function range(locale: Locale, r: [number, number], unit = ""): string {
  const u = unit ? ` ${unit}` : "";
  return r[0] === r[1] ? `${formatNumber(locale, r[0])}${u}` : `${formatNumber(locale, r[0])}–${formatNumber(locale, r[1])}${u}`;
}

function label(map: Record<string | number, string>, key: string | number, what: string): string {
  const v = map[key];
  if (v === undefined) throw new Error(`breed register: no label for ${what} "${key}" — add it to src/content/breeds/{en,sl}.ts`);
  return v;
}

const refs = (ids: string[]): SourceRef[] => ids.map((id) => ({ id, publisher: shortPublisher(id) }));

function duration(locale: Locale, c: BreedCopy, minutes: number): string {
  return minutes % 60 === 0 ? c.values.hours(minutes / 60) : c.values.minutes(minutes);
}

function exerciseText(locale: Locale, c: BreedCopy, f: NumberFact): string {
  const d = duration(locale, c, f.value);
  return (f.kind === "at_least" ? c.values.atLeast(d) : c.values.moreThan(d)) + c.values.perDay;
}

function lifespanText(locale: Locale, c: BreedCopy, f: NumberFact): string {
  const y = c.values.years(formatNumber(locale, f.value));
  return f.kind === "median" ? c.values.median(y) : c.values.moreThanYears(y);
}

function sexText(locale: Locale, c: BreedCopy, f: { all?: [number, number]; male?: [number, number]; female?: [number, number] | null; female_note?: string }, unit: string): string {
  if (f.all) return range(locale, f.all, unit);
  const parts = [`${c.values.males} ${range(locale, f.male ?? [0, 0], unit)}`];
  if (f.female) parts.push(`${c.values.females} ${range(locale, f.female, unit)}`);
  else if (f.female_note) parts.push(label(c.values.femalesNote, f.female_note, "female note"));
  return parts.join(", ");
}

function weightText(locale: Locale, c: BreedCopy, f: WeightFact): string {
  const t = sexText(locale, c, f, "kg");
  return f.kind === "mean" ? `${c.values.mean}: ${t}` : t;
}

/** Overall min–max of a weight fact (both sexes), for the comparison table. */
function weightSpan(f: WeightFact): [number, number] {
  const rs = [f.all, f.male, f.female].filter((r): r is [number, number] => Array.isArray(r));
  return [Math.min(...rs.map((r) => r[0])), Math.max(...rs.map((r) => r[1]))];
}

export function buildBreedView(locale: Locale, id: BreedId): BreedView {
  const c = getBreedCopy(locale);
  const b = getRegistryBreed(id);
  const f = b.facts;
  const text = c.breeds[id];
  const tagLabels = registry.suitability_labels[locale].tags;
  const gg = registry.game_general;
  const fmt = (n: number, d = 1) => formatNumber(locale, n, d);

  const line = (t: string, ids: string[]): FactLine => ({ text: t, sources: refs(ids) });

  const exercise = f.exercise_minutes_per_day.map((x) => line(exerciseText(locale, c, x), x.source_ids));
  const coat = f.coat.map((x) => line(`${c.rows.coat}: ${x.value.map((v) => label(c.values.coat, v, "coat")).join(c.values.or)}`, x.source_ids));
  const grooming = [
    ...coat,
    ...f.grooming.map((x) => line(label(c.values.grooming, x.value, "grooming"), x.source_ids)),
    ...f.shedding.map((x) => line(label(c.values.shedding, x.value, "shedding"), x.source_ids)),
  ];
  const ls = registry.general.life_stages;
  const stages = [
    line(
      c.page.stagesText(range(locale, ls.puppy_until_months.value), range(locale, ls.young_adult_until_years.value), `${fmt(ls.senior_last_share_of_lifespan.value * 100, 0)} %`),
      ls.puppy_until_months.source_ids,
    ),
    line(c.page.growth(c.values.months(range(locale, f.growth_end_months.value))), f.growth_end_months.source_ids),
  ];
  const size = [
    line(label(c.values.size, f.size_class.value, "size"), f.size_class.source_ids),
    ...f.height_cm.map((x) => line(`${c.rows.height}: ${sexText(locale, c, x, "cm")}`, x.source_ids)),
    ...f.weight_kg.map((x) => line(`${c.rows.weight}: ${weightText(locale, c, x)}`, x.source_ids)),
  ];
  const training = [
    line(c.page.coren(f.coren_rank.value), f.coren_rank.source_ids),
    line(c.page.fci(f.identity.fci_number, label(c.values.fciGroup, f.identity.fci_group, "FCI group"), label(c.values.origin, f.identity.origin, "origin")), f.identity.source_ids),
  ];
  /** Breed-specific feeding notes; the general meal guidance is in `meals`. */
  const feeding: FactLine[] = f.food_motivated ? [line(c.page.foodMotivated, f.food_motivated.source_ids)] : [];

  // ── Game rules ──
  const g = b.game;
  const meal = gg.meals_per_day.value;
  const steps = (n: number) => c.values.steps(fmt(n, 0));
  const perMonth = gg.puppy_exercise_minutes_per_age_month.value * gg.steps_per_exercise_minute.value;
  const growing = g.growing_step_goal_by_age_months;
  const capMonth = growing[growing.length - 1].age_months;
  const youngFrom = gg.young_from_months.value;
  const youngStart = Math.min(youngFrom * perMonth, g.adult_step_goal);
  const years = (months: number) => c.values.years(fmt(months / 12));
  const rows = [
    {
      stage: c.page.stage.puppy,
      starts: c.page.simArrives(gg.puppy_arrival_age_months.value),
      meals: c.page.simPuppyMeals(meal[0].meals, meal[1].meals, meal[1].from_months ?? 3, meal[2].meals, meal[2].from_months ?? 6),
      steps: c.page.simGrowingSteps(steps(perMonth), steps(growing[0].steps), steps(g.adult_step_goal), capMonth),
    },
    {
      stage: c.page.stage.young,
      starts: c.page.simFromMonth(youngFrom),
      meals: String(meal[3].meals),
      steps: youngStart === g.adult_step_goal ? steps(g.adult_step_goal) : `${steps(youngStart)} → ${steps(g.adult_step_goal)}`,
    },
    {
      stage: c.page.stage.adult,
      starts: c.page.simFromMonth(gg.adult_from_months.value, years(gg.adult_from_months.value)),
      meals: String(meal[4].meals),
      steps: steps(g.adult_step_goal),
    },
    {
      stage: c.page.stage.senior,
      starts: c.page.simFromMonth(g.senior_from_months.value, years(g.senior_from_months.value)),
      meals: String(meal[5].meals),
      steps: steps(g.senior_step_goal),
    },
  ];
  const basisIds = [
    ...new Set([
      ...gg.steps_per_exercise_minute.basis_source_ids,
      ...gg.puppy_exercise_minutes_per_age_month.basis_source_ids,
      ...gg.meals_per_day.basis_source_ids,
      ...g.adult_exercise_minutes.basis_source_ids,
      ...g.senior_from_months.basis_source_ids,
      ...g.learning_multiplier.basis_source_ids,
    ]),
  ].sort((a, b2) => Number(a.slice(1)) - Number(b2.slice(1)));

  // ── Comparison row ──
  const firstMedian = f.lifespan_years.find((x) => x.kind === "median") ?? f.lifespan_years[0];
  const firstWeight = f.weight_kg[0];
  const withPub = (t: string, ids: string[]) => `${t} (${ids.map(shortPublisher).join(", ")})`;
  const avail = availability[id];

  return {
    id,
    name: text.name,
    alsoKnownAs: text.alsoKnownAs,
    metaDescription: text.metaDescription,
    intro: text.intro,
    href: pathForBreed(locale, id),
    availability: { key: avail, ...c.availability[avail] },
    suits: b.suitability.suits.map((t) => ({ tag: t.tag, label: tagLabels[t.tag], sources: refs(t.source_ids) })),
    consider: b.suitability.consider.map((t) => ({ tag: t.tag, label: tagLabels[t.tag], sources: refs(t.source_ids) })),
    needs: { exercise, grooming, feeding, lifespan: f.lifespan_years.map((x) => line(lifespanText(locale, c, x), x.source_ids)), stages, size, training },
    meals: generalMeals(locale),
    health: b.health.map((h) => line(label(c.page.health, h.key, "health item"), h.source_ids)),
    game: {
      rows,
      stepsRule: c.page.simStepsRule(duration(locale, c, g.adult_exercise_minutes.value), steps(g.adult_step_goal), gg.steps_per_exercise_minute.value),
      learning: c.page.simLearning(fmt(g.learning_multiplier.value)),
      senior: c.page.simSenior(g.senior_from_months.value, years(g.senior_from_months.value)),
      basis: refs(basisIds),
    },
    sources: b.source_ids.map(getSource),
    compare: {
      availability: c.availability[avail].label,
      size: label(c.values.size, f.size_class.value, "size"),
      weight: withPub(range(locale, weightSpan(firstWeight), "kg"), firstWeight.source_ids),
      exercise: f.exercise_minutes_per_day.map((x) => withPub(exerciseText(locale, c, x), x.source_ids)).join("; "),
      grooming: f.grooming.length ? withPub(label(c.values.grooming, f.grooming[0].value, "grooming"), f.grooming[0].source_ids) : c.page.noData,
      shedding: f.shedding.length ? withPub(label(c.values.shedding, f.shedding[0].value, "shedding"), f.shedding[0].source_ids) : c.page.noData,
      lifespan: withPub(lifespanText(locale, c, firstMedian), firstMedian.source_ids),
      stepGoal: steps(g.adult_step_goal),
    },
  };
}

/** General meal guidance (same for every dog), shown on each breed page. */
export function generalMeals(locale: Locale): FactLine[] {
  const c = getBreedCopy(locale);
  return registry.general.meals_per_day.map((m) => {
    const v =
      m.kind === "exact" ? c.values.mealsExact(m.value[0]) : m.kind === "at_least" ? c.values.mealsAtLeast(m.value[0]) : c.values.mealsSmaller(m.value[0], m.value[1]);
    return { text: `${label(c.values.mealsStage, m.stage, "meal stage")}: ${v}`, sources: refs(m.source_ids) };
  });
}

export function allBreedViews(locale: Locale): BreedView[] {
  return breedOrder().map((id) => buildBreedView(locale, id));
}

/** Mixed breed of the free plan: only its adult step goal is shown (no breed page). */
export function mixedBreedSteps(locale: Locale): string {
  const c = getBreedCopy(locale);
  return c.values.steps(formatNumber(locale, registry.mixed_breed.game.adult_step_goal, 0));
}

/** Suits tags for the overview filter, in a fixed order, with how many breeds carry each. */
export function filterTags(locale: Locale) {
  const order = ["first_time_owner", "family_pet", "children", "small_children", "active_family", "other_pets", "large_home", "apartment", "low_shedding", "often_alone", "older_owners"];
  const labels = registry.suitability_labels[locale].tags;
  const suitsTags = Object.entries(registry.suitability_vocabulary)
    .filter(([, kind]) => kind === "suits")
    .map(([tag]) => tag)
    .sort((a, b) => (order.indexOf(a) + 1 || 99) - (order.indexOf(b) + 1 || 99));
  return suitsTags.map((tag) => ({
    tag,
    label: labels[tag],
    count: registry.breeds.filter((b) => b.suitability.suits.some((t) => t.tag === tag)).length,
  }));
}

// ─── Markdown for /llms.txt and /llms-full.txt ──────────────────────────────

const mdLine = (l: FactLine) => `- ${l.text} (${l.sources.map((s) => `${s.publisher} ${s.id}`).join("; ")})`;

/** The overview as Markdown: comparison table + where the breed pages are. */
export function breedRegisterMarkdown(locale: Locale): string {
  const c = getBreedCopy(locale);
  const views = allBreedViews(locale);
  const labels = registry.suitability_labels[locale];
  const head = `| | ${views.map((v) => v.name).join(" | ")} |\n| --- | ${views.map(() => "---").join(" | ")} |`;
  const rows = compareRowKeys.map((k) => `| ${c.rows[k]} | ${views.map((v) => v.compare[k]).join(" | ")} |`).join("\n");
  const tags = views
    .map((v) => `- **${v.name}** — ${labels.suits_title} ${v.suits.map((t) => t.label).join(", ")}. ${labels.consider_title} ${v.consider.map((t) => t.label).join(", ")}.`)
    .join("\n");
  return [`### ${c.overview.compareTitle}`, `${head}\n${rows}`, c.overview.compareNote, tags, `${c.overview.mixedTitle}: ${c.overview.mixedText(mixedBreedSteps(locale))}`, c.overview.catsLine, `### ${c.overview.methodTitle}`, c.overview.method.map((m) => `- ${m}`).join("\n")].join("\n\n");
}

/** One breed page as Markdown. */
export function breedPageMarkdown(locale: Locale, id: BreedId, url: string): string {
  const c = getBreedCopy(locale);
  const v = buildBreedView(locale, id);
  const labels = registry.suitability_labels[locale];
  const needs = (Object.keys(c.page.cards) as (keyof BreedCopy["page"]["cards"])[])
    .map((k) => {
      const lines = k === "feeding" ? [...v.needs.feeding, ...v.meals] : v.needs[k];
      return `**${c.page.cards[k]}**\n${lines.length ? lines.map(mdLine).join("\n") : c.page.noData}`;
    })
    .join("\n\n");
  const game = [
    `| ${c.page.simTable.stage} | ${c.page.simTable.starts} | ${c.page.simTable.meals} | ${c.page.simTable.steps} |\n| --- | --- | --- | --- |`,
    ...v.game.rows.map((r) => `| ${r.stage} | ${r.starts} | ${r.meals} | ${r.steps} |`),
  ].join("\n");
  return [
    `# ${v.name} — ${c.page.eyebrow}`,
    `URL: ${url}`,
    `${v.availability.label}: ${v.availability.text}`,
    ...v.intro,
    `## ${c.page.suitabilityTitle}`,
    `${labels.suits_title} ${v.suits.map((t) => t.label).join(", ")}\n${labels.consider_title} ${v.consider.map((t) => t.label).join(", ")}`,
    `## ${c.page.needsTitle}`,
    needs,
    `## ${c.page.simTitle} (${c.page.simBadge})`,
    c.page.simIntro,
    game,
    [v.game.stepsRule, v.game.learning, v.game.senior].map((t) => `- ${t}`).join("\n"),
    `## ${c.page.healthTitle}`,
    `_${c.page.healthNote}_`,
    v.health.length ? v.health.map(mdLine).join("\n") : c.page.healthNone,
    `## ${c.page.sourcesTitle}`,
    v.sources.map((s) => `- ${s.id}: ${s.publisher} — ${s.title}. ${s.url}`).join("\n"),
  ].join("\n\n");
}
