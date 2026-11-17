/**
 * "How much work is a dog?" (M6-S04, all breeds since M6-S07, David 2026-11-16): the numbers of one breed for the
 * interactive page, derived from the breed register (src/content/registry/registry.json). Pure functions on the
 * breed's facts, so every breed the register exports gets its page without a hand-written entry.
 *
 * Rules (docs/product/THREEJS_OPPORTUNITIES.md in pet-prep, §4 and M6-S07):
 * - exercise: the `at_least` fact first (the app's game parameter, e.g. Labrador 90), then the first other
 *   min_per_day fact; the simulation uses its number, the page shows its qualifier ("more than 120 minutes");
 * - lifespan: a median first, then a span (middle), then "more than" / "less than" / "about";
 * - grooming: once a week = 1, more than once a week = 2 (a floor), every day = 7; no fact = no brushing row;
 * - costs: PDSA minimum by size (GBP, shown converted to EUR/USD: small £69 + £415, medium £83 + £531, large £116 + £560; PDSA has no giant
 *   class, so giant dogs use the large figures as a floor). Toy and small → small; small-medium and medium →
 *   medium; medium-large, large and giant → large.
 */

export type ExerciseQualifier = "at_least" | "more_than" | "up_to" | "about";
export type LifeQualifier = "median" | "span" | "more_than" | "less_than" | "about";
export type GroomKey = "once_a_week" | "more_than_once_a_week" | "every_day";
export type CostClass = "small" | "medium" | "large";

export type RealCostProfile = {
  breedId: string;
  walkMin: number;
  walkQ: ExerciseQualifier;
  /** Years used for the "whole life" totals (rounded to one decimal). */
  lifeYears: number;
  lifeQ: LifeQualifier;
  /** [low, high] for a span, else [value, value]. */
  lifeRange: [number, number];
  groom: GroomKey | null;
  size: CostClass;
  sizeIsGiant: boolean;
};

type Fact = { field: string; kind: string; unit?: string; qualifier?: string; value: unknown; ref?: string };
type BreedLike = { id: string; species: string; facets: Record<string, string>; facts: Fact[] };

export const PDSA_COSTS: Record<CostClass, { monthly: number; setup: number }> = {
  small: { monthly: 69, setup: 415 },
  medium: { monthly: 83, setup: 531 },
  large: { monthly: 116, setup: 560 },
};

export const GROOM_PER_WEEK: Record<GroomKey, number> = { once_a_week: 1, more_than_once_a_week: 2, every_day: 7 };

const SIZE_CLASS: Record<string, CostClass> = {
  toy: "small",
  small: "small",
  small_medium: "medium",
  medium: "medium",
  medium_large: "large",
  large: "large",
  giant: "large",
};

const isNum = (v: unknown): v is number => typeof v === "number" && Number.isFinite(v);
const isRange = (v: unknown): v is [number, number] => Array.isArray(v) && v.length === 2 && isNum(v[0]) && isNum(v[1]);

function exercise(facts: Fact[]): { min: number; q: ExerciseQualifier } | null {
  const ex = facts.filter((f) => f.field === "exercise" && f.kind === "quantity" && f.unit === "min_per_day" && isNum(f.value));
  const pick = ex.find((f) => f.qualifier === "at_least") ?? ex.find((f) => ["more_than", "up_to", "about"].includes(f.qualifier ?? ""));
  return pick ? { min: pick.value as number, q: pick.qualifier as ExerciseQualifier } : null;
}

function lifespan(facts: Fact[]): { years: number; q: LifeQualifier; range: [number, number] } | null {
  const ls = facts.filter((f) => f.field === "lifespan" && f.kind === "quantity" && f.unit === "years");
  const median = ls.find((f) => f.qualifier === "median" && isNum(f.value));
  if (median) { const v = median.value as number; return { years: v, q: "median", range: [v, v] }; }
  const span = ls.find((f) => f.qualifier === "span" && isRange(f.value));
  if (span) { const [a, b] = span.value as [number, number]; return { years: Math.round(((a + b) / 2) * 10) / 10, q: "span", range: [a, b] }; }
  for (const q of ["more_than", "less_than", "about"] as const) {
    const f = ls.find((x) => x.qualifier === q && isNum(x.value));
    if (f) { const v = f.value as number; return { years: v, q, range: [v, v] }; }
  }
  return null;
}

function grooming(facts: Fact[]): GroomKey | null {
  const g = facts.find((f) => f.field === "grooming_frequency" && typeof f.value === "string" && f.value in GROOM_PER_WEEK);
  return g ? (g.value as GroomKey) : null;
}

/** The breed's profile, or null when the register lacks the exercise, lifespan or size the page needs. */
export function realCostProfile(breed: BreedLike): RealCostProfile | null {
  if (breed.species !== "dog") return null;
  const ex = exercise(breed.facts);
  const life = lifespan(breed.facts);
  const sizeKey = breed.facets.size ?? (breed.facts.find((f) => f.field === "size" && typeof f.value === "string")?.value as string | undefined);
  const size = sizeKey ? SIZE_CLASS[sizeKey] : undefined;
  if (!ex || !life || !size) return null;
  return {
    breedId: breed.id,
    walkMin: ex.min,
    walkQ: ex.q,
    lifeYears: life.years,
    lifeQ: life.q,
    lifeRange: life.range,
    groom: grooming(breed.facts),
    size,
    sizeIsGiant: sizeKey === "giant",
  };
}

/** Query string for the embedded app (public/real-cost/app.html reads and validates every value). */
export function realCostQuery(p: RealCostProfile, name: string): Record<string, string> {
  return {
    breed: p.breedId,
    name,
    walk: String(p.walkMin),
    walkq: p.walkQ,
    life: String(p.lifeYears),
    lifeq: p.lifeQ,
    lifelo: String(p.lifeRange[0]),
    lifehi: String(p.lifeRange[1]),
    groom: p.groom ?? "",
    size: p.size,
  };
}
