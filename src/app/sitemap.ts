import type { MetadataRoute } from "next";
import { locales, pageKeys, pathFor, type Locale, type RouteKey } from "@/i18n/config";
import { absoluteUrl, site } from "@/lib/site";
import { alternatesFor, pathAlternates } from "@/lib/seo";
import { registry } from "@/content/registry/registry";
import { breedHref, registryUpdated, speciesHref } from "@/lib/registry/views";

const priority: Partial<Record<RouteKey, number>> = {
  home: 1,
  howItWorks: 0.9,
  parents: 0.9,
  pricing: 0.8,
  faq: 0.8,
  afterAdoption: 0.7,
  animals: 0.7,
};

export default function sitemap(): MetadataRoute.Sitemap {
  const keys: RouteKey[] = ["home", ...pageKeys];
  const pages = locales.flatMap((locale) =>
    keys.map((key) => ({
      url: absoluteUrl(pathFor(locale, key)),
      lastModified: new Date(key === "animals" ? registryUpdated : site.legalUpdated),
      changeFrequency: key === "home" ? ("weekly" as const) : ("monthly" as const),
      priority: priority[key] ?? 0.5,
      alternates: { languages: alternatesFor(key) },
    })),
  );
  // Animal register (M5-R11): species catalogues and breed pages (the comparison page is noindex).
  const each = (fn: (l: Locale) => string) => Object.fromEntries(locales.map((l) => [l, fn(l)])) as Record<Locale, string>;
  const register = locales.flatMap((locale) => [
    ...registry.species.map((sp) => ({
      url: absoluteUrl(speciesHref(locale, sp)),
      lastModified: new Date(registryUpdated),
      changeFrequency: "monthly" as const,
      priority: 0.6,
      alternates: { languages: pathAlternates(each((l) => speciesHref(l, sp))) },
    })),
    ...registry.breeds.map((b) => ({
      url: absoluteUrl(breedHref(locale, b)),
      lastModified: new Date(registryUpdated),
      changeFrequency: "monthly" as const,
      priority: 0.5,
      alternates: { languages: pathAlternates(each((l) => breedHref(l, b))) },
    })),
  ]);
  return [...pages, ...register];
}
