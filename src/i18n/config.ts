export const locales = ["en", "sl", "de", "fr", "es", "it", "pt", "nl"] as const;
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
  fr: { htmlLang: "fr", og: "fr_FR", label: "Français", short: "FR", intl: "fr-FR", country: "FR" },
  es: { htmlLang: "es", og: "es_ES", label: "Español", short: "ES", intl: "es-ES", country: "ES" },
  it: { htmlLang: "it", og: "it_IT", label: "Italiano", short: "IT", intl: "it-IT", country: "IT" },
  pt: { htmlLang: "pt-PT", og: "pt_PT", label: "Português", short: "PT", intl: "pt-PT", country: "PT" },
  nl: { htmlLang: "nl", og: "nl_NL", label: "Nederlands", short: "NL", intl: "nl-NL", country: "NL" },
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
  howItWorks: { en: "how-it-works", sl: "kako-deluje", de: "so-funktioniert-es", fr: "comment-ca-marche", es: "como-funciona", it: "come-funziona", pt: "como-funciona", nl: "zo-werkt-het" },
  parents: { en: "for-parents", sl: "za-starse", de: "fuer-eltern", fr: "pour-les-parents", es: "para-padres", it: "per-i-genitori", pt: "para-pais", nl: "voor-ouders" },
  afterAdoption: { en: "when-it-comes-home", sl: "ko-pride-domov", de: "wenn-es-einzieht", fr: "quand-il-arrive-a-la-maison", es: "cuando-llega-a-casa", it: "quando-arriva-a-casa", pt: "quando-chega-a-casa", nl: "als-het-thuiskomt" },
  pricing: { en: "pricing", sl: "cenik", de: "preise", fr: "tarifs", es: "precios", it: "prezzi", pt: "precos", nl: "prijzen" },
  faq: { en: "faq", sl: "pogosta-vprasanja", de: "haeufige-fragen", fr: "questions-frequentes", es: "preguntas-frecuentes", it: "domande-frequenti", pt: "perguntas-frequentes", nl: "veelgestelde-vragen" },
  partners: { en: "partners", sl: "partnerji", de: "partner", fr: "partenaires", es: "socios", it: "partner", pt: "parceiros", nl: "partners" },
  investors: { en: "investors", sl: "vlagatelji", de: "investoren", fr: "investisseurs", es: "inversores", it: "investitori", pt: "investidores", nl: "investeerders" },
  contact: { en: "contact", sl: "kontakt", de: "kontakt", fr: "contact", es: "contacto", it: "contatti", pt: "contacto", nl: "contact" },
  privacy: { en: "privacy", sl: "zasebnost", de: "datenschutz", fr: "confidentialite", es: "privacidad", it: "privacy", pt: "privacidade", nl: "privacy" },
  terms: { en: "terms", sl: "pogoji", de: "nutzungsbedingungen", fr: "conditions-d-utilisation", es: "condiciones-de-uso", it: "condizioni-d-uso", pt: "termos-de-utilizacao", nl: "gebruiksvoorwaarden" },
  childSafety: { en: "child-safety", sl: "varnost-otrok", de: "kindersicherheit", fr: "securite-des-enfants", es: "seguridad-infantil", it: "sicurezza-dei-bambini", pt: "seguranca-infantil", nl: "kinderveiligheid" },
  deleteAccount: { en: "delete-account", sl: "izbris-racuna", de: "konto-loeschen", fr: "supprimer-le-compte", es: "eliminar-cuenta", it: "elimina-account", pt: "eliminar-conta", nl: "account-verwijderen" },
  accessibility: { en: "accessibility", sl: "dostopnost", de: "barrierefreiheit", fr: "accessibilite", es: "accesibilidad", it: "accessibilita", pt: "acessibilidade", nl: "toegankelijkheid" },
  animals: { en: "animals", sl: "zivali", de: "tiere", fr: "animaux", es: "animales", it: "animali", pt: "animais", nl: "dieren" },
  about: { en: "about", sl: "o-nas", de: "ueber-uns", fr: "a-propos", es: "sobre-nosotros", it: "chi-siamo", pt: "sobre-nos", nl: "over-ons" },
  /** Mascot page (David 2026-10-25): linked from the footer only. */
  curio: { en: "meet-curio", sl: "spoznaj-curia", de: "curio-kennenlernen", fr: "decouvrir-curio", es: "conoce-a-curio", it: "conosci-curio", pt: "conhece-o-curio", nl: "maak-kennis-met-curio" },
  /** #walkyourpet movement (David 2026-10-30): the phrase is never translated, same slug everywhere. */
  walkyourpet: { en: "walkyourpet", sl: "walkyourpet", de: "walkyourpet", fr: "walkyourpet", es: "walkyourpet", it: "walkyourpet", pt: "walkyourpet", nl: "walkyourpet" },
  /** Care knowledge (M6-K, David 2026-10-31): /care → /care/<species> → /care/<species>/<food>. */
  care: { en: "care", sl: "skrb", de: "ratgeber", fr: "conseils", es: "consejos", it: "consigli", pt: "conselhos", nl: "verzorging" },
  /** Free printable colouring pages (David 2026-10-31): /coloring-pages → /coloring-pages/<page>. */
  coloring: { en: "coloring-pages", sl: "pobarvanke", de: "ausmalbilder", fr: "coloriages", es: "dibujos-para-colorear", it: "disegni-da-colorare", pt: "desenhos-para-colorir", nl: "kleurplaten" },
  /** Everything for kids in one section (David 2026-10-31): header dropdown + hub page. */
  kids: { en: "for-kids", sl: "za-otroke", de: "fuer-kinder", fr: "pour-les-enfants", es: "para-ninos", it: "per-bambini", pt: "para-criancas", nl: "voor-kinderen" },
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
export const compareSlug: Record<Locale, string> = { en: "compare", sl: "primerjava", de: "vergleich", fr: "comparer", es: "comparar", it: "confronta", pt: "comparar", nl: "vergelijken" };

export function pathForSpecies(locale: Locale, speciesSlug: string): string {
  return `${pathFor(locale, "animals")}/${speciesSlug}`;
}

export function pathForBreed(locale: Locale, speciesSlug: string, breedSlug: string): string {
  return `${pathForSpecies(locale, speciesSlug)}/${breedSlug}`;
}
