export const locales = ["en", "sl"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Open Graph / HTML language tags. */
export const localeMeta: Record<Locale, { htmlLang: string; og: string; label: string; short: string }> = {
  en: { htmlLang: "en", og: "en_US", label: "English", short: "EN" },
  sl: { htmlLang: "sl", og: "sl_SI", label: "Slovenščina", short: "SL" },
};

/** Every page of the site, with its localized slug. "home" has no slug. */
export const pageSlugs = {
  howItWorks: { en: "how-it-works", sl: "kako-deluje" },
  parents: { en: "for-parents", sl: "za-starse" },
  afterAdoption: { en: "when-it-comes-home", sl: "ko-pride-domov" },
  pricing: { en: "pricing", sl: "cenik" },
  faq: { en: "faq", sl: "pogosta-vprasanja" },
  partners: { en: "partners", sl: "partnerji" },
  investors: { en: "investors", sl: "vlagatelji" },
  contact: { en: "contact", sl: "kontakt" },
  privacy: { en: "privacy", sl: "zasebnost" },
  terms: { en: "terms", sl: "pogoji" },
  childSafety: { en: "child-safety", sl: "varnost-otrok" },
  animals: { en: "animals", sl: "zivali" },
} as const satisfies Record<string, Record<Locale, string>>;

export type PageKey = keyof typeof pageSlugs;
export type RouteKey = PageKey | "home";
export const pageKeys = Object.keys(pageSlugs) as PageKey[];

/** Public path of a page. English lives at the root, Slovenian under /sl. */
export function pathFor(locale: Locale, key: RouteKey): string {
  const prefix = locale === defaultLocale ? "" : `/${locale}`;
  if (key === "home") return prefix === "" ? "/" : prefix;
  return `${prefix}/${pageSlugs[key][locale]}`;
}

export function pageKeyFromSlug(locale: Locale, slug: string): PageKey | undefined {
  return pageKeys.find((key) => pageSlugs[key][locale] === slug);
}

/**
 * Animal & breed register (M5-R11, David 2026-10-10): /animals → /animals/<species> →
 * /animals/<species>/<breed> (SL /sl/zivali/…). Species and breed slugs come from the
 * registry (src/content/registry/registry.json); only the comparison page slug is fixed here.
 */
export const compareSlug: Record<Locale, string> = { en: "compare", sl: "primerjava" };

export function pathForSpecies(locale: Locale, speciesSlug: string): string {
  return `${pathFor(locale, "animals")}/${speciesSlug}`;
}

export function pathForBreed(locale: Locale, speciesSlug: string, breedSlug: string): string {
  return `${pathForSpecies(locale, speciesSlug)}/${breedSlug}`;
}
