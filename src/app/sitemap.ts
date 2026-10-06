import type { MetadataRoute } from "next";
import { locales, pageKeys, pathFor, type RouteKey } from "@/i18n/config";
import { absoluteUrl, site } from "@/lib/site";
import { alternatesFor } from "@/lib/seo";

const priority: Partial<Record<RouteKey, number>> = {
  home: 1,
  howItWorks: 0.9,
  parents: 0.9,
  pricing: 0.8,
  faq: 0.8,
  afterAdoption: 0.7,
};

export default function sitemap(): MetadataRoute.Sitemap {
  const keys: RouteKey[] = ["home", ...pageKeys];
  return locales.flatMap((locale) =>
    keys.map((key) => ({
      url: absoluteUrl(pathFor(locale, key)),
      lastModified: new Date(site.legalUpdated),
      changeFrequency: key === "home" ? ("weekly" as const) : ("monthly" as const),
      priority: priority[key] ?? 0.5,
      alternates: { languages: alternatesFor(key) },
    })),
  );
}
