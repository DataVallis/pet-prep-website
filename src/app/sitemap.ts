import type { MetadataRoute } from "next";
import { locales, sitePageKeys, pathFor, type Locale, type RouteKey } from "@/i18n/config";
import { absoluteUrl } from "@/lib/site";
import { pageUpdated } from "@/content/updated";
import { alternatesFor, pathAlternates } from "@/lib/seo";
import { giftSitemapPaths } from "@/lib/giftRoutes";
import { giftUpdated } from "@/lib/gift";
import { promiseKitConfig, promiseKitSitemapEntries } from "@/lib/promiseKit";
import { registry } from "@/content/registry/registry";
import { emergencyHref } from "@/components/care/CarePages";
import { coloringPageHref } from "@/components/coloring/ColoringPages";
import { coloringPages, coloringUpdated } from "@/content/coloring/coloring";
import { emergencyUpdated } from "@/content/care/emergency";
import { careSpecies, careSpeciesHref, careUpdated, foodHref, foodsOf } from "@/content/care/care";
import { breedHref, breedUpdated, speciesHref, speciesUpdated } from "@/lib/registry/views";

const priority: Partial<Record<RouteKey, number>> = {
  home: 1,
  howItWorks: 0.9,
  parents: 0.9,
  pricing: 0.8,
  faq: 0.8,
  afterAdoption: 0.7,
  animals: 0.7,
  about: 0.6,
};

export default function sitemap(): MetadataRoute.Sitemap {
  // /investors is noindex and English only (David 2026-11-01) — not in the sitemap, so not in IndexNow either.
  const keys: RouteKey[] = ["home", ...sitePageKeys];
  const pages = locales.flatMap((locale) =>
    keys.map((key) => ({
      url: absoluteUrl(pathFor(locale, key)),
      lastModified: new Date(pageUpdated[key]),
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
      lastModified: new Date(speciesUpdated(sp)),
      changeFrequency: "monthly" as const,
      priority: 0.6,
      alternates: { languages: pathAlternates(each((l) => speciesHref(l, sp))) },
    })),
    ...registry.breeds.map((b) => ({
      url: absoluteUrl(breedHref(locale, b)),
      lastModified: new Date(breedUpdated(b)),
      changeFrequency: "monthly" as const,
      priority: 0.5,
      alternates: { languages: pathAlternates(each((l) => breedHref(l, b))) },
    })),
  ]);
  // Care knowledge (M6-K): species food lists and food pages, only locales that publish them.
  const care = locales.flatMap((locale) => [
    ...careSpecies(locale).map((sp) => ({
      url: absoluteUrl(careSpeciesHref(locale, sp)),
      lastModified: new Date(careUpdated(locale, sp.id)),
      changeFrequency: "monthly" as const,
      priority: 0.6,
      alternates: { languages: pathAlternates(each((l) => careSpeciesHref(l, sp))) },
    })),
    ...careSpecies(locale).flatMap((sp) =>
      foodsOf(sp.id, locale).map((f) => ({
        url: absoluteUrl(foodHref(locale, f)),
        lastModified: new Date(f.updated),
        changeFrequency: "monthly" as const,
        priority: 0.6,
        alternates: { languages: pathAlternates(each((l) => (f.locales.includes(l) ? foodHref(l, f) : careSpeciesHref(l, sp)))) },
      })),
    ),
  ]);
  const emergency = locales.map((locale) => ({
    url: absoluteUrl(emergencyHref(locale)),
    lastModified: new Date(emergencyUpdated),
    changeFrequency: "monthly" as const,
    priority: 0.7,
    alternates: { languages: pathAlternates(each((l) => emergencyHref(l))) },
  }));
  const coloring = locales.flatMap((locale) =>
    coloringPages.map((p) => ({
      url: absoluteUrl(coloringPageHref(locale, p)),
      lastModified: new Date(coloringUpdated),
      changeFrequency: "monthly" as const,
      priority: 0.5,
      alternates: { languages: pathAlternates(each((l) => coloringPageHref(l, p))) },
    })),
  );
  // Gift voucher sales page (M6-S01): only while NEXT_PUBLIC_FEATURE_GIFT=1; the other gift pages are never listed.
  const giftPaths = giftSitemapPaths();
  const gift = giftPaths
    ? (["en", "sl"] as const).map((locale) => ({
        url: absoluteUrl(giftPaths[locale]),
        lastModified: new Date(giftUpdated),
        changeFrequency: "monthly" as const,
        priority: 0.6,
        alternates: { languages: { en: absoluteUrl(giftPaths.en), sl: absoluteUrl(giftPaths.sl), "x-default": absoluteUrl(giftPaths.en) } },
      }))
    : [];
  // Pet Promise Kit (M6-S02): English and Slovenian only, and only while NEXT_PUBLIC_FEATURE_PROMISE_KIT=1.
  const promiseKit = promiseKitSitemapEntries(promiseKitConfig().enabled).map((e) => ({
    url: absoluteUrl(e.path),
    lastModified: new Date(e.lastModified),
    changeFrequency: "monthly" as const,
    priority: 0.6,
    alternates: { languages: Object.fromEntries(Object.entries(e.languages).map(([k, v]) => [k, absoluteUrl(v)])) },
  }));
  return [...pages, ...register, ...care, ...emergency, ...coloring, ...gift, ...promiseKit];
}
