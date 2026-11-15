/**
 * "How much work is a Labrador?" — interactive 3D page (M6-S04, David 2026-11-15). Slovenian and English.
 * The interactive part is public/real-cost/app.html (built from tools/real-cost/, its own strings in
 * tools/real-cost/src/strings.js); this file holds the copy of the page around it.
 * Every number comes from the PetPrep breed register (docs/product/THREEJS_OPPORTUNITIES.md in pet-prep
 * lists each source); "PetPrep rule" marks simulation rules that are not from a source.
 */
export const realCostLocales = ["en", "sl"] as const;
export type RealCostLocale = (typeof realCostLocales)[number];

export const realCostUpdated = "2026-11-15";

/** One static route folder per language (src/app/[locale]/<slug>/page.tsx). */
export const realCostSlug: Record<RealCostLocale, string> = {
  en: "how-much-work-is-a-labrador",
  sl: "koliko-dela-je-z-labradorcem",
};

export function realCostPath(locale: RealCostLocale): string {
  return locale === "en" ? `/${realCostSlug.en}` : `/${locale}/${realCostSlug[locale]}`;
}

/** Breeds whose register page links to this page (David 2026-11-15: Labrador only for now). */
export const realCostBreedIds: readonly string[] = ["labrador_retriever"];

/** The register page's link card for `breedId` in `locale`, or null (other breeds, other 13 languages). */
export function realCostLinkFor(locale: string, breedId: string): { href: string; title: string; text: string; cta: string } | null {
  if (!realCostBreedIds.includes(breedId) || !(realCostLocales as readonly string[]).includes(locale)) return null;
  const l = locale as RealCostLocale;
  return { href: realCostPath(l), ...realCostCopy[l].registryLink };
}

/** hreflang map of the two language versions (absolute URLs), English as x-default. */
export function realCostAlternates(absolute: (path: string) => string): Record<string, string> {
  return { en: absolute(realCostPath("en")), sl: absolute(realCostPath("sl")), "x-default": absolute(realCostPath("en")) };
}

export type RealCostCopy = {
  meta: { title: string; description: string };
  eyebrow: string;
  title: string;
  lead: string;
  frameTitle: string;
  noScript: string;
  facts: { title: string; intro: string; rows: { label: string; value: string; note: string }[]; footnote: string };
  how: { title: string; items: string[] };
  sources: { title: string; items: string[] };
  email: { title: string; text: string };
  /** Card on the breed's register page (src/app/[locale]/[slug]/[species]/[breed]/page.tsx). */
  registryLink: { title: string; text: string; cta: string };
};

export const realCostCopy: Record<RealCostLocale, RealCostCopy> = {
  en: {
    meta: {
      title: "How much work is a Labrador? One day, a year, 13 years | PetPrep",
      description:
        "Watch one day with a Labrador in 3D, then multiply it: walks, meals, poo bags and costs over a week, a year and 13 years. With sources, and a summary parents can print.",
    },
    eyebrow: "Before you get a dog",
    title: "How much work is a Labrador?",
    lead: "Play one day with a Labrador. Every task drops onto a pile. Then see the pile for a week, a year and a whole life, and what it costs.",
    frameTitle: "Interactive 3D: one day with a Labrador",
    noScript: "The interactive part needs JavaScript. The numbers are in the table below.",
    facts: {
      title: "The numbers for an adult Labrador",
      intro: "The same numbers the interactive part uses.",
      rows: [
        { label: "Walks", value: "90 minutes a day", note: "about 548 hours a year" },
        { label: "Meals", value: "2 a day", note: "about 731 a year" },
        { label: "Training", value: "5 minutes a day", note: "about 30 hours a year" },
        { label: "Brushing", value: "once a week", note: "52 times a year" },
        { label: "Life span", value: "about 13 years", note: "median 13.1 years" },
        { label: "Costs", value: "at least £116 a month", note: "plus about £560 to get started, large dog, United Kingdom" },
      ],
      footnote:
        "A 2-month-old puppy is different: 4 meals a day and a trip outside about every 2 hours. The 13-year totals use the adult numbers for every year. Steps (100 a minute) and 2 poo bags a day are PetPrep simulation rules, not figures from a source.",
    },
    how: {
      title: "How to use it",
      items: [
        "Choose an adult dog or a 2-month-old puppy and start the day.",
        "Switch between day, week, year and 13 years to see the pile grow.",
        "Parents: set your own monthly and starting costs and pick the currency. Amounts in euros and dollars are converted at a fixed rate and marked with ~.",
        "Open the summary for parents, print it or save it as a PDF, and sign the promise together.",
      ],
    },
    sources: {
      title: "Sources",
      items: [
        "Exercise, 90 minutes a day: Guide Dogs UK.",
        "Meals by age, training sessions of 5 to 10 minutes, a puppy holding on for about 1 hour per month of age: the sources in the PetPrep breed register.",
        "Sleep: The Royal Kennel Club.",
        "Life span, 13.1 years: McMillan et al. 2024.",
        "Costs: PDSA, The cost of owning a dog (United Kingdom).",
        "Exchange rate: ECB euro reference rates, 13 November 2026.",
      ],
    },
    email: {
      title: "About the e-mail field",
      text: "The summary works without an e-mail. If you leave one and tick the box, we save it for PetPrep news and tips; every message has an unsubscribe link.",
    },
    registryLink: {
      title: "How much work is a Labrador?",
      text: "Play one day with a Labrador in 3D and see the walks, meals and costs add up over a week, a year and 13 years. With a summary parents can print.",
      cta: "Try it",
    },
  },
  sl: {
    meta: {
      title: "Koliko dela je z labradorcem? En dan, leto, 13 let | PetPrep",
      description:
        "Oglejte si en dan z labradorcem v 3D in ga pomnožite: sprehodi, obroki, vrečke in stroški v tednu, letu in 13 letih. Z viri in povzetkom, ki ga starši lahko natisnete.",
    },
    eyebrow: "Preden pride pes",
    title: "Koliko dela je z labradorcem?",
    lead: "Zaženi en dan z labradorcem. Vsako opravilo pade na kup. Potem poglej kup za teden, leto in celo življenje ter koliko to stane.",
    frameTitle: "Interaktivni 3D: en dan z labradorcem",
    noScript: "Interaktivni del potrebuje JavaScript. Številke so v spodnji tabeli.",
    facts: {
      title: "Številke za odraslega labradorca",
      intro: "Iste številke uporablja interaktivni del.",
      rows: [
        { label: "Sprehodi", value: "90 minut na dan", note: "približno 548 ur na leto" },
        { label: "Obroki", value: "2 na dan", note: "približno 731 na leto" },
        { label: "Vaja", value: "5 minut na dan", note: "približno 30 ur na leto" },
        { label: "Krtačenje", value: "enkrat na teden", note: "52-krat na leto" },
        { label: "Življenjska doba", value: "približno 13 let", note: "mediana 13,1 leta" },
        { label: "Stroški", value: "najmanj 116 £ na mesec", note: "in približno 560 £ na začetku, velik pes, Združeno kraljestvo" },
      ],
      footnote:
        "Mladiček pri 2 mesecih je drugačen: 4 obroki na dan in ven približno vsaki 2 uri. Seštevki za 13 let vzamejo številke odraslega psa za vsa leta. Koraki (100 na minuto) in 2 vrečki na dan sta pravili simulacije PetPrep, ne podatka iz vira.",
    },
    how: {
      title: "Kako se uporablja",
      items: [
        "Izberi odraslega psa ali mladička pri 2 mesecih in zaženi dan.",
        "Preklapljaj med dnevom, tednom, letom in 13 leti in glej, kako kup raste.",
        "Starši: nastavite svoje mesečne in začetne stroške ter izberite valuto. Zneski v evrih in dolarjih so preračunani po fiksnem tečaju in označeni z ~.",
        "Odprite povzetek za starše, natisnite ga ali shranite kot PDF in skupaj podpišite obljubo.",
      ],
    },
    sources: {
      title: "Viri",
      items: [
        "Gibanje, 90 minut na dan: Guide Dogs UK.",
        "Obroki po starosti, vaje po 5 do 10 minut, mladiček zdrži približno 1 uro na mesec starosti: viri v registru pasem PetPrep.",
        "Spanje: The Royal Kennel Club.",
        "Življenjska doba, 13,1 leta: McMillan idr. 2024.",
        "Stroški: PDSA, The cost of owning a dog (Združeno kraljestvo).",
        "Tečaj: referenčni tečaji ECB, 13. 11. 2026.",
      ],
    },
    email: {
      title: "O polju za e-naslov",
      text: "Povzetek deluje brez e-naslova. Če ga vpišete in označite privolitev, ga shranimo za novice in nasvete PetPrep; v vsakem sporočilu je povezava za odjavo.",
    },
    registryLink: {
      title: "Koliko dela je z labradorcem?",
      text: "Zaženite en dan z labradorcem v 3D in poglejte, koliko sprehodov, obrokov in stroškov se nabere v tednu, letu in 13 letih. S povzetkom za starše, ki ga lahko natisnete.",
      cta: "Preizkusi",
    },
  },
};
