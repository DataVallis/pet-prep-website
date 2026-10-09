import "server-only";
import { breedIds, type BreedId, type Locale } from "@/i18n/config";
import { availability, registryUpdated } from "./availability";
import en from "./en";
import { getRegistryBreed, registry } from "./registry";
import sl from "./sl";
import type { BreedCopy } from "./types";

const copies: Record<Locale, BreedCopy> = { en, sl };

export function getBreedCopy(locale: Locale): BreedCopy {
  return copies[locale];
}

export { availability, registry, registryUpdated };

/**
 * Build-time consistency checks: every breed with a page exists in the registry,
 * every registry breed has a page, and each intro only cites sources that the
 * breed page lists. A failure stops `next build`.
 */
function validate() {
  const pageIds = new Set<string>(breedIds);
  for (const b of registry.breeds) {
    if (!pageIds.has(b.id)) throw new Error(`breed registry: "${b.id}" has no slug in src/i18n/config.ts (breedSlugs)`);
  }
  for (const id of breedIds) {
    const b = getRegistryBreed(id);
    for (const locale of Object.keys(copies) as Locale[]) {
      const text = copies[locale].breeds[id];
      for (const s of text.introSources) {
        if (!b.source_ids.includes(s)) throw new Error(`breeds/${locale}.ts: ${id} intro cites ${s}, which is not in the breed's sources`);
      }
    }
  }
}
validate();

export function breedOrder(): BreedId[] {
  return registry.breeds.map((b) => b.id as BreedId);
}
