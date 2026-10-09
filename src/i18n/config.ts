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
  breeds: { en: "breeds", sl: "pasme" },
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
 * Breed register (M5-R11): one page per breed under the "breeds" page,
 * e.g. /breeds/labrador-retriever and /sl/pasme/labradorec.
 * Keys are the breed ids of src/content/breeds/registry.json.
 */
export const breedSlugs = {
  border_collie: { en: "border-collie", sl: "border-collie" },
  labrador_retriever: { en: "labrador-retriever", sl: "labradorec" },
  golden_retriever: { en: "golden-retriever", sl: "zlati-prinasalec" },
} as const satisfies Record<string, Record<Locale, string>>;

export type BreedId = keyof typeof breedSlugs;
export const breedIds = Object.keys(breedSlugs) as BreedId[];

export function isBreedId(value: string): value is BreedId {
  return (breedIds as string[]).includes(value);
}

export function pathForBreed(locale: Locale, id: BreedId): string {
  return `${pathFor(locale, "breeds")}/${breedSlugs[id][locale]}`;
}

export function breedIdFromSlug(locale: Locale, slug: string): BreedId | undefined {
  return breedIds.find((id) => breedSlugs[id][locale] === slug);
}
