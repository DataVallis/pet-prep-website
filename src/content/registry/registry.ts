import "server-only";
import { readFileSync } from "node:fs";
/**
 * The animal & breed register, exported at build time from the PetPrep monorepo
 * (scripts/export-breed-registry.mjs → docs/research/breed-registry.json, schema 2).
 * Copied here unchanged; see README.md in this folder.
 *
 * PETPREP_REGISTRY_FILE=<path> builds the site from another file (e.g. a large synthetic
 * fixture to test the catalogue at scale). Never set in production.
 */
import bundled from "./registry.json";

export type SourceId = string;
export type Range = [number, number];
export type SexValue = { male: Range | null; female: Range | null };

export type FactItem = {
  group: string;
  field: string;
  kind: "quantity" | "category" | "statement";
  value: unknown;
  unit?: string;
  qualifier?: string;
  context?: string;
  note?: string;
  source_ids: SourceId[];
  ref: string;
  confidence: string | null;
};

export type HealthItem = { key: string; source_ids: SourceId[]; ref: string; confidence: string | null };

export type Activity =
  | { kind: "steps"; value: number }
  | { kind: "steps_range"; from: number; to: number }
  | { kind: "steps_growing"; per_month: number; first: number; cap: number; cap_month: number }
  | { kind: "play_sessions"; value: number };

export type GameStage = {
  stage: "puppy" | "young" | "adult" | "senior";
  starts: { arrival_months?: number; month?: number };
  meals: { from_months: number | null; meals: number }[];
  activity: Activity;
};

export type Game = {
  stages: GameStage[];
  adult_activity: Activity;
  rules: { key: string; params: Record<string, number> }[];
  values: { ref: string; basis_source_ids: SourceId[]; decision: string | null }[];
  basis_source_ids: SourceId[];
};

export type Availability = "in_app" | "coming_soon" | "info_only";
export type Localized<T = string> = { en: T; sl: T };

export type Breed = {
  id: string;
  species: string;
  order: number;
  availability: Availability;
  name: Localized;
  slug: Localized;
  synonyms: Localized<string[]>;
  facets: Record<string, string>;
  facts: FactItem[];
  compare: Record<string, number>;
  health: HealthItem[];
  suitability: { suits: { tag: string; source_ids: SourceId[] }[]; consider: { tag: string; source_ids: SourceId[] }[] };
  game: Game | null;
  source_ids: SourceId[];
};

export type Species = {
  id: string;
  slug: Localized;
  name: Localized<{ one: string; many: string }>;
  status: "available" | "coming_soon" | "info_only";
  breed_count: number;
  fact_groups: string[];
  facets: string[];
  compare_fields: string[];
  general_facts: FactItem[];
  free_plan: { id: string; name: Localized; adult_activity: Activity; basis_source_ids: SourceId[] };
};

export type Source = { id: SourceId; tier: string; publisher: string; title: string; url: string };

export type Registry = {
  schema_version: 2;
  data_compiled: Record<string, string>;
  suitability_vocabulary: Record<string, "suits" | "consider">;
  suitability_labels: Localized<{ suits_title: string; consider_title: string; tags: Record<string, string> }>;
  species: Species[];
  breeds: Breed[];
  sources: Source[];
};

function load(): Registry {
  const file = process.env.PETPREP_REGISTRY_FILE;
  const raw: unknown = file ? JSON.parse(readFileSync(file, "utf8")) : bundled;
  const r = raw as Registry;
  if (r.schema_version !== 2) throw new Error(`registry: unsupported schema_version ${String(r.schema_version)} — re-export in pet-prep`);
  return r;
}

export const registry: Registry = load();

/** Markdown emphasis in sources.md ("*PeerJ*") is not shown on the site. */
const plain = (t: string) => t.replace(/\*/g, "");
const sourceMap = new Map(registry.sources.map((s) => [s.id, { ...s, publisher: plain(s.publisher), title: plain(s.title) }]));
const speciesById = new Map(registry.species.map((s) => [s.id, s]));

export function getSource(id: SourceId): Source {
  const s = sourceMap.get(id);
  if (!s) throw new Error(`registry: unknown source ${id}`);
  return s;
}

export function getSpecies(id: string): Species {
  const s = speciesById.get(id);
  if (!s) throw new Error(`registry: unknown species ${id}`);
  return s;
}

export function speciesBySlug(locale: "en" | "sl", slug: string): Species | undefined {
  return registry.species.find((s) => s.slug[locale] === slug);
}

export function breedsOf(speciesId: string): Breed[] {
  return registry.breeds.filter((b) => b.species === speciesId);
}

export function breedBySlug(speciesId: string, locale: "en" | "sl", slug: string): Breed | undefined {
  return registry.breeds.find((b) => b.species === speciesId && b.slug[locale] === slug);
}

/** "The Royal Kennel Club (UK)" → "The Royal Kennel Club"; "PDSA (UK veterinary charity)" → "PDSA". */
export function shortPublisher(id: SourceId): string {
  return getSource(id).publisher.split(" — ")[0].split(" (")[0].split(",")[0].split(";")[0].trim();
}
