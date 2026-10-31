export const locales = ["en", "sl", "de"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/**
 * Per language: HTML / Open Graph tags, the language's own name, the Intl locale for dates, numbers and
 * sorting, and the home country (default country of the vet directory; "" = all countries).
 * Adding a language (hourly language run, docs/engineering/LANGUAGE_RUNBOOK.md in pet-prep): add it to
 * `locales` and here — TypeScript then lists every text that still needs a translation.
 */
export const localeMeta: Record<Locale, { htmlLang: string; og: string; label: string; short: string; intl: string; country: string }> = {
  en: { htmlLang: "en", og: "en_US", label: "English", short: "EN", intl: "en-GB", country: "" },
  sl: { htmlLang: "sl", og: "sl_SI", label: "Slovenščina", short: "SL", intl: "sl-SI", country: "SI" },
  de: { htmlLang: "de", og: "de_DE", label: "Deutsch", short: "DE", intl: "de-DE", country: "DE" },
};

/**
 * App screenshots exist only in the app's own languages (public/screens/<locale>/); other site
 * languages show the English app screens until the app is translated (L4).
 */
const screenLocales: readonly Locale[] = ["en", "sl"];
export function screenLocale(locale: Locale): Locale {
  return screenLocales.includes(locale) ? locale : "en";
}

/** Regex alternative of all site languages, for file routes like /llms/<x>.<locale>.txt. */
export const localePattern = locales.join("|");

/** Every page of the site, with its localized slug. "home" has no slug. */
export const pageSlugs = {
  howItWorks: { en: "how-it-works", sl: "kako-deluje", de: "so-funktioniert-es" },
  parents: { en: "for-parents", sl: "za-starse", de: "fuer-eltern" },
  afterAdoption: { en: "when-it-comes-home", sl: "ko-pride-domov", de: "wenn-es-einzieht" },
  pricing: { en: "pricing", sl: "cenik", de: "preise" },
  faq: { en: "faq", sl: "pogosta-vprasanja", de: "haeufige-fragen" },
  partners: { en: "partners", sl: "partnerji", de: "partner" },
  investors: { en: "investors", sl: "vlagatelji", de: "investoren" },
  contact: { en: "contact", sl: "kontakt", de: "kontakt" },
  privacy: { en: "privacy", sl: "zasebnost", de: "datenschutz" },
  terms: { en: "terms", sl: "pogoji", de: "nutzungsbedingungen" },
  childSafety: { en: "child-safety", sl: "varnost-otrok", de: "kindersicherheit" },
  deleteAccount: { en: "delete-account", sl: "izbris-racuna", de: "konto-loeschen" },
  accessibility: { en: "accessibility", sl: "dostopnost", de: "barrierefreiheit" },
  animals: { en: "animals", sl: "zivali", de: "tiere" },
  about: { en: "about", sl: "o-nas", de: "ueber-uns" },
  /** Mascot page (David 2026-10-25): linked from the footer only. */
  curio: { en: "meet-curio", sl: "spoznaj-curia", de: "curio-kennenlernen" },
  /** #walkyourpet movement (David 2026-10-30): the phrase is never translated, same slug everywhere. */
  walkyourpet: { en: "walkyourpet", sl: "walkyourpet", de: "walkyourpet" },
  /** Care knowledge (M6-K, David 2026-10-31): /care → /care/<species> → /care/<species>/<food>. */
  care: { en: "care", sl: "skrb", de: "ratgeber" },
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

export function isPageKey(value: string): value is PageKey {
  return (pageKeys as string[]).includes(value);
}

export function pageKeyFromSlug(locale: Locale, slug: string): PageKey | undefined {
  return pageKeys.find((key) => pageSlugs[key][locale] === slug);
}

/**
 * Animal & breed register (M5-R11, David 2026-10-10): /animals → /animals/<species> →
 * /animals/<species>/<breed> (SL /sl/zivali/…). Species and breed slugs come from the
 * registry (src/content/registry/registry.json); only the comparison page slug is fixed here.
 */
export const compareSlug: Record<Locale, string> = { en: "compare", sl: "primerjava", de: "vergleich" };

export function pathForSpecies(locale: Locale, speciesSlug: string): string {
  return `${pathFor(locale, "animals")}/${speciesSlug}`;
}

export function pathForBreed(locale: Locale, speciesSlug: string, breedSlug: string): string {
  return `${pathForSpecies(locale, speciesSlug)}/${breedSlug}`;
}
