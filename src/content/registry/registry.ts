import "server-only";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { locales, type Locale } from "@/i18n/config";
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

/** Breeder checklist (M5-R11-06): what to check before buying; tests = parents' health tests. */
export type ChecklistLevel = "minimum" | "best_practice" | "other_scheme";
/** `country` (ISO 3166-1 alpha-2) = a national rule, shown only on that country's language pages. */
export type ChecklistItem = { key: string; source_ids: SourceId[]; country?: string };
export type BreederChecklist = {
  status: "listed" | "none_recommended" | "not_found" | "not_checked";
  tests: { key: string; level: ChecklistLevel; source_ids: SourceId[] }[];
  basis_source_ids: SourceId[];
};

export type Availability = "in_app" | "coming_soon" | "info_only";
/**
 * Text per site language. The pet-prep export carries EN + SL; any other site language is filled at load
 * time from src/content/registry/locales/<locale>.json (written by the hourly language run, L1–L3), and
 * falls back to English where a translation is still missing (build prints a warning).
 */
export type Localized<T = string> = Record<Locale, T>;

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
  /** Since M5-R11-06 (2026-10-11); the build fails without it (views.ts). */
  breeder_checklist?: BreederChecklist;
  source_ids: SourceId[];
  /**
   * Optional fields the website reads when the export provides them (absent today):
   * `updated` — ISO date of the breed's last content change (else the register date);
   * `portrait` — an AI-generated photo (older exports: illustration) at public/animals/<species EN slug>/<file>;
   * `same_as` — authority URLs for the breed (Wikidata / Wikipedia), JSON-LD only.
   */
  updated?: string;
  portrait?: Portrait | null;
  same_as?: string[];
};

/** `ai_photo` = realistic AI photo (David 2026-10-10, M5-R11-05); `ai_illustration` = older exports, still read. */
export type PortraitKind = "ai_photo" | "ai_illustration";

/**
 * One standard coat colour of a breed's portrait (M5-R11-08, David 2026-10-26): `file` is the AI image of that
 * colour, same size as the portrait, e.g. "dog/border-collie--red-white.webp" (the pet-prep output path) or
 * "border-collie--red-white.webp"; both resolve to public/animals/<species EN slug>/<file name>. `default` marks
 * the colour of the main portrait (else the first one).
 */
export type PortraitColour = { key: string; label: Localized; file: string; default?: true };

/** `colours` is optional: absent (older exports) or fewer than two → the page shows only the portrait. */
export type Portrait = { file: string; width: number; height: number; kind: PortraitKind; colours?: PortraitColour[] };

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
  /** What to check with the breeder for every breed of the species (M5-R11-06); absent in older exports. */
  buyer_checklist?: ChecklistItem[];
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

type LocaleOverrides = {
  species?: Record<string, { name?: { one: string; many: string }; slug?: string; free_plan?: string }>;
  breeds?: Record<string, { name?: string; slug?: string; synonyms?: string[]; colours?: Record<string, string> }>;
  suitability_labels?: { suits_title: string; consider_title: string; tags: Record<string, string> };
};

function overridesFor(locale: Locale): LocaleOverrides {
  const f = join(process.cwd(), "src/content/registry/locales", `${locale}.json`);
  return existsSync(f) ? (JSON.parse(readFileSync(f, "utf8")) as LocaleOverrides) : {};
}

/** Fills every site language that the export does not carry (see Localized). */
function fillLocales(r: Registry): Registry {
  const missing: string[] = [];
  for (const l of locales as readonly string[]) {
    if (l === "en" || l === "sl") continue;
    const locale = l as Locale;
    const o = overridesFor(locale);
    const pick = <T,>(v: T | undefined, en: T, what: string): T => { if (v === undefined) missing.push(what); return v ?? en; };
    for (const sp of r.species) {
      const so = o.species?.[sp.id];
      sp.name[locale] = pick(so?.name, sp.name.en, `${locale} species ${sp.id} name`);
      sp.slug[locale] = pick(so?.slug, sp.slug.en, `${locale} species ${sp.id} slug`);
      sp.free_plan.name[locale] = pick(so?.free_plan, sp.free_plan.name.en, `${locale} species ${sp.id} free plan`);
    }
    for (const b of r.breeds) {
      const bo = o.breeds?.[b.id];
      b.name[locale] = pick(bo?.name, b.name.en, `${locale} breed ${b.id} name`);
      b.slug[locale] = pick(bo?.slug, b.slug.en, `${locale} breed ${b.id} slug`);
      (b.synonyms as Record<string, string[]>)[locale] = bo?.synonyms ?? [];
      for (const c of b.portrait?.colours ?? []) c.label[locale] = pick(bo?.colours?.[c.key], c.label.en, `${locale} breed ${b.id} colour ${c.key}`);
    }
    r.suitability_labels[locale] = pick(o.suitability_labels, r.suitability_labels.en, `${locale} suitability labels`);
  }
  if (missing.length) console.warn(`registry: ${missing.length} translations missing, English used: ${missing.slice(0, 8).join("; ")}${missing.length > 8 ? " …" : ""}`);
  return r;
}

function load(): Registry {
  const file = process.env.PETPREP_REGISTRY_FILE;
  const raw: unknown = file ? JSON.parse(readFileSync(file, "utf8")) : structuredClone(bundled);
  const r = raw as Registry;
  if (r.schema_version !== 2) throw new Error(`registry: unsupported schema_version ${String(r.schema_version)} — re-export in pet-prep`);
  return fillLocales(r);
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

export function speciesBySlug(locale: Locale, slug: string): Species | undefined {
  return registry.species.find((s) => s.slug[locale] === slug);
}

export function breedsOf(speciesId: string): Breed[] {
  return registry.breeds.filter((b) => b.species === speciesId);
}

export function breedBySlug(speciesId: string, locale: Locale, slug: string): Breed | undefined {
  return registry.breeds.find((b) => b.species === speciesId && b.slug[locale] === slug);
}

/** "The Royal Kennel Club (UK)" → "The Royal Kennel Club"; "PDSA (UK veterinary charity)" → "PDSA". */
export function shortPublisher(id: SourceId): string {
  return getSource(id).publisher.split(" — ")[0].split(" (")[0].split(",")[0].split(";")[0].trim();
}
