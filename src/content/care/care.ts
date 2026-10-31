import "server-only";
/**
 * Care knowledge (M6-K, David 2026-10-31): "Can dogs / cats eat …?" pages, exported at build time
 * from the PetPrep monorepo (scripts/export-care-knowledge.mjs → docs/research/care-knowledge.json).
 * Copied here unchanged; see README.md in this folder. Only verified locales are in the export.
 */
import bundled from "./care-knowledge.json";
import { pageSlugs, pathFor, type Locale } from "@/i18n/config";
import { registry, type Species } from "@/content/registry/registry";

export type Level = "toxic" | "dangerous" | "not_recommended" | "small_amounts";
type T = Partial<Record<Locale, string>>;

export type Food = {
  slug: string;
  species: string;
  level: Level;
  locales: string[];
  name: T;
  question: T;
  url_slug: T;
  answer: T;
  why: T;
  signs: Partial<Record<Locale, string[]>> | null;
  what_to_do: T;
  serving: T | null;
  child: T;
  faq: { q: T; a: T }[];
  source_ids: string[];
  related: string[];
  updated: string;
};

export type CareSource = { species: string; id: string; tier: string; publisher: string; title: string; url: string };

import type { VetEntry } from "@/components/care/VetDirectory";

type CareKnowledge = { schema_version: number; levels: Level[]; species: string[]; foods: Food[]; sources: CareSource[]; vets?: VetEntry[] };

const data = bundled as unknown as CareKnowledge;
if (data.schema_version !== 1) throw new Error(`care-knowledge.json: schema_version ${data.schema_version}, expected 1`);

export const levels: Level[] = ["toxic", "dangerous", "not_recommended", "small_amounts"];

/** Foods of a species published in this locale. */
export function foodsOf(speciesId: string, locale: Locale): Food[] {
  return data.foods.filter((f) => f.species === speciesId && f.locales.includes(locale));
}

/** Species (from the animal register) that have at least one published food in this locale. */
export function careSpecies(locale: Locale): Species[] {
  return registry.species.filter((s) => foodsOf(s.id, locale).length > 0);
}

export function careSpeciesBySlug(locale: Locale, slug: string): Species | undefined {
  return careSpecies(locale).find((s) => s.slug[locale] === slug);
}

export function foodBySlug(speciesId: string, locale: Locale, urlSlug: string): Food | undefined {
  return foodsOf(speciesId, locale).find((f) => f.url_slug[locale] === urlSlug);
}

export function foodBySpeciesSlug(speciesId: string, slug: string): Food | undefined {
  return data.foods.find((f) => f.species === speciesId && f.slug === slug);
}

export function sourcesOf(f: Food): CareSource[] {
  return f.source_ids.map((id) => data.sources.find((s) => s.species === f.species && s.id === id)).filter((s): s is CareSource => !!s);
}

export const careHref = (locale: Locale) => pathFor(locale, "care");
export const careSpeciesHref = (locale: Locale, s: Species) => `${careHref(locale)}/${s.slug[locale]}`;
export function foodHref(locale: Locale, f: Food): string {
  const s = registry.species.find((x) => x.id === f.species)!;
  return `${careSpeciesHref(locale, s)}/${f.url_slug[locale]}`;
}

export const isCareSlug = (locale: Locale, slug: string) => slug === pageSlugs.care[locale];

/** Latest update of the published foods (of one species, or all). */
export function careUpdated(locale: Locale, speciesId?: string): string {
  return data.foods
    .filter((f) => f.locales.includes(locale) && (!speciesId || f.species === speciesId))
    .map((f) => f.updated)
    .reduce((a, b) => (b > a ? b : a), "2026-10-31");
}

export const allFoods = () => data.foods;

/** Vets / duty rotas / poison lines by country (M6-K1); empty until the export has them. */
export const allVets = (): VetEntry[] => data.vets ?? [];
