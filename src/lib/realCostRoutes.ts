import "server-only";
import { breedsOf, type Breed } from "@/content/registry/registry";
import { isRealCostLocale, realCostCopy, realCostPath, type RealCostLocale } from "@/content/realCost";
import { realCostProfile, type RealCostProfile } from "@/lib/realCostProfile";

/**
 * Every dog breed the register shows (breeds with a portrait, registry.ts) that has the numbers the page needs.
 * A breed added to the register gets its "How much work is a dog?" page, sitemap entry and register link on the
 * next build, with no hand-written entry (M6-S07, David 2026-11-16).
 */
export function realCostBreeds(): { breed: Breed; profile: RealCostProfile }[] {
  return breedsOf("dog").flatMap((breed) => {
    const profile = realCostProfile(breed);
    return profile ? [{ breed, profile }] : [];
  });
}

export function realCostBreedBySlug(locale: RealCostLocale, slug: string) {
  return realCostBreeds().find((x) => x.breed.slug[locale] === slug);
}

/** The register page's link card for `breed` in `locale` (SL + EN only), or null. */
export function realCostLinkFor(locale: string, breed: Breed): { href: string; title: string; text: string; cta: string } | null {
  if (!isRealCostLocale(locale)) return null;
  const profile = breed.species === "dog" ? realCostProfile(breed) : null;
  if (!profile) return null;
  return { href: realCostPath(locale, breed.slug[locale]), ...realCostCopy(locale, breed.name[locale], profile).registryLink };
}
