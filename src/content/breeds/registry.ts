/**
 * Typed access to the breed registry exported from the PetPrep monorepo
 * (scripts/export-breed-registry.mjs → docs/research/breed-registry.json).
 * The JSON is copied here unchanged; see README.md in this folder.
 */
import raw from "./registry.json";

export type SourceId = string;

type Cited = { ref: string; source_ids: SourceId[]; confidence: string | null };
type Range = [number, number];
type SexRange = { all?: Range; male?: Range; female?: Range | null; female_note?: string };

export type HeightFact = Cited & SexRange;
export type WeightFact = Cited & SexRange & { kind: "range" | "mean" };
export type NumberFact = Cited & { kind: "median" | "more_than" | "at_least"; value: number };
export type TextFact = Cited & { value: string };
export type ListFact = Cited & { value: string[] };

export type GameValue = { value: number; ref: string; basis_source_ids: SourceId[]; decision: string | null };

export type BreedGame = {
  adult_exercise_minutes: GameValue;
  senior_exercise_minutes: GameValue;
  adult_step_goal: number;
  senior_step_goal: number;
  growing_step_goal_by_age_months: { age_months: number; steps: number }[];
  senior_from_months: GameValue;
  learning_multiplier: GameValue;
  individual_learning_variation?: GameValue;
};

export type SuitabilityTag = { tag: string; source_ids: SourceId[]; refs: string[] };

export type RegistryBreed = {
  id: string;
  species: "dog";
  facts: {
    identity: Cited & { fci_number: number; fci_group: number; fci_section: number; origin: string };
    size_class: TextFact;
    height_cm: HeightFact[];
    weight_kg: WeightFact[];
    growth_end_months: Cited & { value: Range };
    lifespan_years: NumberFact[];
    exercise_minutes_per_day: NumberFact[];
    coat: ListFact[];
    grooming: TextFact[];
    shedding: TextFact[];
    food_motivated: Cited | null;
    coren_rank: Cited & { value: number };
  };
  health: (Cited & { key: string })[];
  suitability: { suits: SuitabilityTag[]; consider: SuitabilityTag[] };
  game: BreedGame;
  source_ids: SourceId[];
};

export type RegistrySource = { id: SourceId; tier: string; publisher: string; title: string; url: string };

export type MealsFact = Cited & {
  stage: "puppy_8_12_weeks" | "puppy_3_6_months" | "puppy_6_12_months" | "adult" | "senior";
  kind: "exact" | "at_least" | "smaller_meals";
  value: Range;
};

export type Registry = {
  schema_version: 1;
  data_compiled: string;
  suitability_vocabulary: Record<string, "suits" | "consider">;
  suitability_labels: Record<"en" | "sl", { suits_title: string; consider_title: string; tags: Record<string, string> }>;
  general: {
    meals_per_day: MealsFact[];
    life_stages: {
      puppy_until_months: Cited & { value: Range };
      young_adult_until_years: Cited & { value: Range };
      senior_last_share_of_lifespan: Cited & { value: number };
    };
  };
  game_general: {
    real_weeks_per_dog_month: GameValue;
    steps_per_exercise_minute: GameValue;
    puppy_exercise_minutes_per_age_month: GameValue;
    meals_per_day: {
      value: { stage: "puppy" | "young" | "adult" | "senior"; from_months: number | null; until_months: number | null; meals: number }[];
    } & Omit<GameValue, "value">;
    puppy_arrival_age_months: GameValue;
    young_from_months: GameValue;
    adult_from_months: GameValue;
  };
  breeds: RegistryBreed[];
  mixed_breed: { id: "medium_mixed_breed"; game: BreedGame; source_ids: SourceId[] };
  sources: RegistrySource[];
};

const data = raw as unknown as Registry;
if (data.schema_version !== 1) {
  throw new Error(`breed registry: unsupported schema_version ${String((raw as { schema_version?: unknown }).schema_version)}`);
}

export const registry: Registry = data;

const sourceMap = new Map(registry.sources.map((s) => [s.id, s]));

export function getSource(id: SourceId): RegistrySource {
  const s = sourceMap.get(id);
  if (!s) throw new Error(`breed registry: unknown source ${id}`);
  return s;
}

export function getRegistryBreed(id: string): RegistryBreed {
  const b = registry.breeds.find((x) => x.id === id);
  if (!b) throw new Error(`breed registry: no breed "${id}" — re-run the export in pet-prep and copy registry.json`);
  return b;
}

/** "The Royal Kennel Club (UK)" → "The Royal Kennel Club"; "PDSA (UK veterinary charity)" → "PDSA". */
export function shortPublisher(id: SourceId): string {
  return getSource(id).publisher.split(" — ")[0].split(" (")[0].split(",")[0].trim();
}
