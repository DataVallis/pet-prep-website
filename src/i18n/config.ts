export const locales = ["en", "sl", "de", "fr", "es", "it", "pt", "nl", "pl", "cs", "hr", "sv", "da", "fi", "nb"] as const;
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
  pl: { htmlLang: "pl", og: "pl_PL", label: "Polski", short: "PL", intl: "pl-PL", country: "PL" },
  cs: { htmlLang: "cs", og: "cs_CZ", label: "Čeština", short: "CS", intl: "cs-CZ", country: "CZ" },
  hr: { htmlLang: "hr", og: "hr_HR", label: "Hrvatski", short: "HR", intl: "hr-HR", country: "HR" },
  sv: { htmlLang: "sv", og: "sv_SE", label: "Svenska", short: "SV", intl: "sv-SE", country: "SE" },
  da: { htmlLang: "da", og: "da_DK", label: "Dansk", short: "DA", intl: "da-DK", country: "DK" },
  fi: { htmlLang: "fi", og: "fi_FI", label: "Suomi", short: "FI", intl: "fi-FI", country: "FI" },
  nb: { htmlLang: "nb", og: "nb_NO", label: "Norsk bokmål", short: "NB", intl: "nb-NO", country: "NO" },
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
  howItWorks: { en: "how-it-works", sl: "kako-deluje", de: "so-funktioniert-es", fr: "comment-ca-marche", es: "como-funciona", it: "come-funziona", pt: "como-funciona", nl: "zo-werkt-het", pl: "jak-to-dziala", cs: "jak-to-funguje", hr: "kako-funkcionira", sv: "sa-fungerar-det", da: "saadan-virker-det", fi: "nain-se-toimii", nb: "slik-fungerer-det" },
  parents: { en: "for-parents", sl: "za-starse", de: "fuer-eltern", fr: "pour-les-parents", es: "para-padres", it: "per-i-genitori", pt: "para-pais", nl: "voor-ouders", pl: "dla-rodzicow", cs: "pro-rodice", hr: "za-roditelje", sv: "for-foraldrar", da: "for-foraeldre", fi: "vanhemmille", nb: "for-foreldre" },
  afterAdoption: { en: "when-it-comes-home", sl: "ko-pride-domov", de: "wenn-es-einzieht", fr: "quand-il-arrive-a-la-maison", es: "cuando-llega-a-casa", it: "quando-arriva-a-casa", pt: "quando-chega-a-casa", nl: "als-het-thuiskomt", pl: "gdy-trafi-do-domu", cs: "az-prijde-domu", hr: "kad-stigne-kuci", sv: "nar-den-kommer-hem", da: "naar-den-kommer-hjem", fi: "kun-lemmikki-tulee-kotiin", nb: "nar-den-kommer-hjem" },
  pricing: { en: "pricing", sl: "cenik", de: "preise", fr: "tarifs", es: "precios", it: "prezzi", pt: "precos", nl: "prijzen", pl: "cennik", cs: "cenik", hr: "cjenik", sv: "priser", da: "priser", fi: "hinnat", nb: "priser" },
  faq: { en: "faq", sl: "pogosta-vprasanja", de: "haeufige-fragen", fr: "questions-frequentes", es: "preguntas-frecuentes", it: "domande-frequenti", pt: "perguntas-frequentes", nl: "veelgestelde-vragen", pl: "najczestsze-pytania", cs: "caste-dotazy", hr: "cesta-pitanja", sv: "vanliga-fragor", da: "ofte-stillede-spoergsmaal", fi: "usein-kysyttya", nb: "ofte-stilte-sporsmal" },
  partners: { en: "partners", sl: "partnerji", de: "partner", fr: "partenaires", es: "socios", it: "partner", pt: "parceiros", nl: "partners", pl: "partnerzy", cs: "partneri", hr: "partneri", sv: "partner", da: "partnere", fi: "kumppanit", nb: "partnere" },
  investors: { en: "investors", sl: "vlagatelji", de: "investoren", fr: "investisseurs", es: "inversores", it: "investitori", pt: "investidores", nl: "investeerders", pl: "inwestorzy", cs: "investori", hr: "investitori", sv: "investerare", da: "investorer", fi: "sijoittajat", nb: "investorer" },
  contact: { en: "contact", sl: "kontakt", de: "kontakt", fr: "contact", es: "contacto", it: "contatti", pt: "contacto", nl: "contact", pl: "kontakt", cs: "kontakt", hr: "kontakt", sv: "kontakt", da: "kontakt", fi: "yhteystiedot", nb: "kontakt" },
  privacy: { en: "privacy", sl: "zasebnost", de: "datenschutz", fr: "confidentialite", es: "privacidad", it: "privacy", pt: "privacidade", nl: "privacy", pl: "prywatnosc", cs: "ochrana-soukromi", hr: "privatnost", sv: "integritetspolicy", da: "privatlivspolitik", fi: "tietosuoja", nb: "personvern" },
  terms: { en: "terms", sl: "pogoji", de: "nutzungsbedingungen", fr: "conditions-d-utilisation", es: "condiciones-de-uso", it: "condizioni-d-uso", pt: "termos-de-utilizacao", nl: "gebruiksvoorwaarden", pl: "regulamin", cs: "podminky-uzivani", hr: "uvjeti-koristenja", sv: "anvandarvillkor", da: "brugsvilkaar", fi: "kayttoehdot", nb: "brukervilkar" },
  childSafety: { en: "child-safety", sl: "varnost-otrok", de: "kindersicherheit", fr: "securite-des-enfants", es: "seguridad-infantil", it: "sicurezza-dei-bambini", pt: "seguranca-infantil", nl: "kinderveiligheid", pl: "bezpieczenstwo-dzieci", cs: "bezpecnost-deti", hr: "sigurnost-djece", sv: "barnsakerhet", da: "boerns-sikkerhed", fi: "lasten-turvallisuus", nb: "barns-sikkerhet" },
  deleteAccount: { en: "delete-account", sl: "izbris-racuna", de: "konto-loeschen", fr: "supprimer-le-compte", es: "eliminar-cuenta", it: "elimina-account", pt: "eliminar-conta", nl: "account-verwijderen", pl: "usuwanie-konta", cs: "smazani-uctu", hr: "brisanje-racuna", sv: "radera-konto", da: "slet-konto", fi: "tilin-poistaminen", nb: "slett-konto" },
  accessibility: { en: "accessibility", sl: "dostopnost", de: "barrierefreiheit", fr: "accessibilite", es: "accesibilidad", it: "accessibilita", pt: "acessibilidade", nl: "toegankelijkheid", pl: "dostepnosc", cs: "pristupnost", hr: "pristupacnost", sv: "tillganglighet", da: "tilgaengelighed", fi: "saavutettavuus", nb: "tilgjengelighet" },
  animals: { en: "animals", sl: "zivali", de: "tiere", fr: "animaux", es: "animales", it: "animali", pt: "animais", nl: "dieren", pl: "zwierzeta", cs: "zvirata", hr: "zivotinje", sv: "djur", da: "dyr", fi: "elaimet", nb: "dyr" },
  about: { en: "about", sl: "o-nas", de: "ueber-uns", fr: "a-propos", es: "sobre-nosotros", it: "chi-siamo", pt: "sobre-nos", nl: "over-ons", pl: "o-nas", cs: "o-nas", hr: "o-nama", sv: "om-oss", da: "om-os", fi: "meista", nb: "om-oss" },
  /** Mascot page (David 2026-10-25): linked from the footer only. */
  curio: { en: "meet-curio", sl: "spoznaj-curia", de: "curio-kennenlernen", fr: "decouvrir-curio", es: "conoce-a-curio", it: "conosci-curio", pt: "conhece-o-curio", nl: "maak-kennis-met-curio", pl: "poznaj-curio", cs: "poznejte-curio", hr: "upoznaj-curija", sv: "mot-curio", da: "moed-curio", fi: "tutustu-curioon", nb: "mot-curio" },
  /** #walkyourpet movement (David 2026-10-30): the phrase is never translated, same slug everywhere. */
  walkyourpet: { en: "walkyourpet", sl: "walkyourpet", de: "walkyourpet", fr: "walkyourpet", es: "walkyourpet", it: "walkyourpet", pt: "walkyourpet", nl: "walkyourpet", pl: "walkyourpet", cs: "walkyourpet", hr: "walkyourpet", sv: "walkyourpet", da: "walkyourpet", fi: "walkyourpet", nb: "walkyourpet" },
  /** Care knowledge (M6-K, David 2026-10-31): /care → /care/<species> → /care/<species>/<food>. */
  care: { en: "care", sl: "skrb", de: "ratgeber", fr: "conseils", es: "consejos", it: "consigli", pt: "conselhos", nl: "verzorging", pl: "opieka", cs: "pece", hr: "njega", sv: "skotsel", da: "pleje", fi: "hoito", nb: "stell" },
  /** Free printable colouring pages (David 2026-10-31): /coloring-pages → /coloring-pages/<page>. */
  coloring: { en: "coloring-pages", sl: "pobarvanke", de: "ausmalbilder", fr: "coloriages", es: "dibujos-para-colorear", it: "disegni-da-colorare", pt: "desenhos-para-colorir", nl: "kleurplaten", pl: "kolorowanki", cs: "omalovanky", hr: "bojanke", sv: "malarbilder", da: "tegninger-til-farvelaegning", fi: "varityskuvat", nb: "fargeleggingsark" },
  /** Everything for kids in one section (David 2026-10-31): header dropdown + hub page. */
  kids: { en: "for-kids", sl: "za-otroke", de: "fuer-kinder", fr: "pour-les-enfants", es: "para-ninos", it: "per-bambini", pt: "para-criancas", nl: "voor-kinderen", pl: "dla-dzieci", cs: "pro-deti", hr: "za-djecu", sv: "for-barn", da: "for-boern", fi: "lapsille", nb: "for-barn" },
} as const satisfies Record<string, Record<Locale, string>>;

export type PageKey = keyof typeof pageSlugs;
export type RouteKey = PageKey | "home";
export const pageKeys = Object.keys(pageSlugs) as PageKey[];
/**
 * Pages with their own English-only route (David 2026-11-01): /investors. They are not built under
 * [slug], not in the sitemap or llms files, and their other-language slugs redirect to the English URL
 * (next.config.ts).
 */
export const englishOnlyPages: readonly PageKey[] = ["investors"];
/** Pages built by the [slug] route in every language. */
export const sitePageKeys = pageKeys.filter((k) => !englishOnlyPages.includes(k));

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
 * Gift voucher and Pet Promise Kit (M6-S01 / M6-S02, David 2026-11-11: all 15 languages). Their pages are not
 * in `pageSlugs` (they exist only while their build switch is on, so they are not part of the site-wide page
 * list), but follow the same rules: one ASCII slug per language, English at the root, the others under /<locale>.
 * Paths: sales page `/<gift>`, thank-you `/<gift>/<thanks>`, redeem `/<redeem>`, kit `/<promiseKit>`.
 * English keeps `/gift`, `/gift/thanks`, `/redeem` and `/promise-kit` (Lemon Squeezy redirects every buyer to
 * the English thank-you address; the page then forwards the buyer to their own language).
 */
export const salesSlugs = {
  gift: { en: "gift", sl: "darilni-bon", de: "geschenkgutschein", fr: "bon-cadeau", es: "vale-regalo", it: "buono-regalo", pt: "vale-de-oferta", nl: "cadeaubon", pl: "bon-podarunkowy", cs: "darkovy-poukaz", hr: "poklon-bon", sv: "presentkort", da: "gavekort", fi: "lahjakortti", nb: "gavekort" },
  giftThanks: { en: "thanks", sl: "hvala", de: "danke", fr: "merci", es: "gracias", it: "grazie", pt: "obrigado", nl: "bedankt", pl: "dziekujemy", cs: "dekujeme", hr: "hvala", sv: "tack", da: "tak", fi: "kiitos", nb: "takk" },
  redeem: { en: "redeem", sl: "unovci", de: "einloesen", fr: "utiliser-le-bon", es: "canjear", it: "riscatta", pt: "resgatar", nl: "inwisselen", pl: "zrealizuj", cs: "uplatnit", hr: "iskoristi", sv: "los-in", da: "indloes", fi: "lunasta", nb: "los-inn" },
  promiseKit: { en: "promise-kit", sl: "obljuba-o-ljubljencku", de: "haustier-versprechen", fr: "promesse-animal", es: "promesa-mascota", it: "promessa-animale", pt: "promessa-animal", nl: "huisdierbelofte", pl: "obietnica-dla-zwierzaka", cs: "slib-pro-mazlicka", hr: "obecanje-za-ljubimca", sv: "husdjursloftet", da: "kaeledyrsloeftet", fi: "lemmikkilupaus", nb: "kjaeledyrloftet" },
} as const satisfies Record<string, Record<Locale, string>>;
export type SalesPageKey = "gift" | "redeem" | "promiseKit";

/** Top-level sales slugs (the thank-you page is a child of the gift page). */
export function salesPageFromSlug(locale: Locale, slug: string): SalesPageKey | undefined {
  return (["gift", "redeem", "promiseKit"] as const).find((k) => salesSlugs[k][locale] === slug);
}

/**
 * Animal & breed register (M5-R11, David 2026-10-10): /animals → /animals/<species> →
 * /animals/<species>/<breed> (SL /sl/zivali/…). Species and breed slugs come from the
 * registry (src/content/registry/registry.json); only the comparison page slug is fixed here.
 */
export const compareSlug: Record<Locale, string> = { en: "compare", sl: "primerjava", de: "vergleich", fr: "comparer", es: "comparar", it: "confronta", pt: "comparar", nl: "vergelijken", pl: "porownanie", cs: "srovnani", hr: "usporedba", sv: "jamfor", da: "sammenlign", fi: "vertailu", nb: "sammenlign" };

export function pathForSpecies(locale: Locale, speciesSlug: string): string {
  return `${pathFor(locale, "animals")}/${speciesSlug}`;
}

export function pathForBreed(locale: Locale, speciesSlug: string, breedSlug: string): string {
  return `${pathForSpecies(locale, speciesSlug)}/${breedSlug}`;
}
