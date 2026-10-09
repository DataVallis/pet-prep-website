import type { MetadataRoute } from "next";
import { breedIds, locales, pageKeys, pathFor, pathForBreed, type RouteKey } from "@/i18n/config";
import { absoluteUrl, site } from "@/lib/site";
import { alternatesFor, breedAlternates } from "@/lib/seo";
import { registryUpdated } from "@/content/breeds";

const priority: Partial<Record<RouteKey, number>> = {
  home: 1,
  howItWorks: 0.9,
  parents: 0.9,
  pricing: 0.8,
  faq: 0.8,
  afterAdoption: 0.7,
  breeds: 0.7,
};

export default function sitemap(): MetadataRoute.Sitemap {
  const keys: RouteKey[] = ["home", ...pageKeys];
  const pages = locales.flatMap((locale) =>
    keys.map((key) => ({
      url: absoluteUrl(pathFor(locale, key)),
      lastModified: new Date(key === "breeds" ? registryUpdated : site.legalUpdated),
      changeFrequency: key === "home" ? ("weekly" as const) : ("monthly" as const),
      priority: priority[key] ?? 0.5,
      alternates: { languages: alternatesFor(key) },
    })),
  );
  // Breed register pages (M5-R11).
  const breeds = locales.flatMap((locale) =>
    breedIds.map((id) => ({
      url: absoluteUrl(pathForBreed(locale, id)),
      lastModified: new Date(registryUpdated),
      changeFrequency: "monthly" as const,
      priority: 0.6,
      alternates: { languages: breedAlternates(id) },
    })),
  );
  return [...pages, ...breeds];
}
