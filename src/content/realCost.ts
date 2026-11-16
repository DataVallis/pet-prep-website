/**
 * "How much work is a dog?" — interactive 3D page (M6-S04, David 2026-11-15), one page per dog breed of the register
 * since M6-S07 (David 2026-11-16: »Kalkulator razširi na vse pasme, pa da bo dinamično dodajalo tudi vse bodoče
 * pasme«). Slovenian and English. The interactive part is public/real-cost/app.html (built from tools/real-cost/,
 * its own strings in tools/real-cost/src/strings.js); this file holds the copy of the page around it.
 * The breed's numbers come from the register via src/lib/realCostProfile.ts; "PetPrep rule" marks simulation rules
 * that are not from a source.
 */
import { GROOM_PER_WEEK, PDSA_COSTS, type RealCostProfile } from "../lib/realCostProfile.ts";

export const realCostLocales = ["en", "sl"] as const;
export type RealCostLocale = (typeof realCostLocales)[number];

export const realCostUpdated = "2026-11-16";

/**
 * One static route folder per language (src/app/[locale]/<base>/[breed]/page.tsx). Titles are not declined by breed
 * (David 2026-11-16: »brez sklanjanja … koliko-je-dela-s-psom je pravilno«), so a new breed needs no hand-written form.
 */
export const realCostBase: Record<RealCostLocale, string> = {
  en: "how-much-work-is-a-dog",
  sl: "koliko-je-dela-s-psom",
};

/** Before M6-S07 the page existed for the Labrador only; these URLs redirect permanently (next.config.ts). */
export const realCostLegacy: { source: string; locale: RealCostLocale; breedSlug: string }[] = [
  { source: "/how-much-work-is-a-labrador", locale: "en", breedSlug: "labrador-retriever" },
  { source: "/sl/koliko-dela-je-z-labradorcem", locale: "sl", breedSlug: "labradorec" },
];

export function isRealCostLocale(locale: string): locale is RealCostLocale {
  return (realCostLocales as readonly string[]).includes(locale);
}

export function realCostPath(locale: RealCostLocale, breedSlug: string): string {
  return locale === "en" ? `/${realCostBase.en}/${breedSlug}` : `/${locale}/${realCostBase[locale]}/${breedSlug}`;
}

/** hreflang map of the two language versions (absolute URLs), English as x-default. */
export function realCostAlternates(absolute: (path: string) => string, slug: Record<RealCostLocale, string>): Record<string, string> {
  const en = absolute(realCostPath("en", slug.en));
  return { en, sl: absolute(realCostPath("sl", slug.sl)), "x-default": en };
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

const nf = (locale: RealCostLocale, n: number, digits = 0) =>
  new Intl.NumberFormat(locale === "sl" ? "sl-SI" : "en-GB", { maximumFractionDigits: digits }).format(n);

/** "a Labrador Retriever" / "an Afghan Hound". */
export const withArticle = (name: string) => `${/^[aeiou]/i.test(name) ? "an" : "a"} ${name}`;

const YEAR = 365.25;

function walkText(l: RealCostLocale, p: RealCostProfile): string {
  const m = nf(l, p.walkMin);
  const sl = { at_least: `vsaj ${m} minut`, more_than: `več kot ${m} minut`, up_to: `do ${m} minut`, about: `približno ${m} minut` };
  const en = { at_least: `at least ${m} minutes`, more_than: `more than ${m} minutes`, up_to: `up to ${m} minutes`, about: `about ${m} minutes` };
  return (l === "sl" ? sl : en)[p.walkQ];
}

function lifeText(l: RealCostLocale, p: RealCostProfile): { value: string; note: string } {
  const [lo, hi] = p.lifeRange;
  const y = nf(l, Math.round(p.lifeYears));
  if (l === "sl") {
    const v = { median: `približno ${y} let`, span: `${nf(l, lo)} do ${nf(l, hi)} let`, more_than: `več kot ${y} let`, less_than: `manj kot ${y} let`, about: `približno ${y} let` }[p.lifeQ];
    return { value: v, note: p.lifeQ === "median" ? `mediana ${nf(l, p.lifeYears, 1)} leta` : `račun vzame ${y} let` };
  }
  const v = { median: `about ${y} years`, span: `${nf(l, lo)} to ${nf(l, hi)} years`, more_than: `more than ${y} years`, less_than: `less than ${y} years`, about: `about ${y} years` }[p.lifeQ];
  return { value: v, note: p.lifeQ === "median" ? `median ${nf(l, p.lifeYears, 1)} years` : `the totals use ${y} years` };
}

function groomText(l: RealCostLocale, p: RealCostProfile): { value: string; note: string } | null {
  if (!p.groom) return null;
  const perYear = nf(l, Math.round(GROOM_PER_WEEK[p.groom] * 52));
  const sl = { once_a_week: "enkrat na teden", more_than_once_a_week: "večkrat na teden", every_day: "vsak dan" };
  const en = { once_a_week: "once a week", more_than_once_a_week: "more than once a week", every_day: "every day" };
  const prefix = p.groom === "more_than_once_a_week" ? (l === "sl" ? "vsaj " : "at least ") : "";
  return { value: (l === "sl" ? sl : en)[p.groom], note: l === "sl" ? `${prefix}${perYear}-krat na leto` : `${prefix}${perYear} times a year` };
}

/** The page copy for one breed (`name` in the page language). */
export function realCostCopy(l: RealCostLocale, name: string, p: RealCostProfile): RealCostCopy {
  const cost = PDSA_COSTS[p.size];
  const years = nf(l, Math.round(p.lifeYears));
  const walkHoursYear = nf(l, (p.walkMin * YEAR) / 60);
  const life = lifeText(l, p);
  const groom = groomText(l, p);
  const sizeSl = { small: "majhen pes", medium: "srednje velik pes", large: "velik pes" }[p.size];
  const sizeEn = { small: "small dog", medium: "medium dog", large: "large dog" }[p.size];
  const giantSl = p.sizeIsGiant ? " (za orjaške pse PDSA nima svoje številke; to je spodnja meja)" : "";
  const giantEn = p.sizeIsGiant ? " (PDSA has no figure for giant dogs; this is a floor)" : "";

  if (l === "sl") {
    // Mid-sentence a Slovenian breed name starts lower-case ("pasme labradorec").
    const mid = name.charAt(0).toLocaleLowerCase("sl") + name.slice(1);
    const rows = [
      { label: "Sprehodi", value: `${walkText(l, p)} na dan`, note: `približno ${walkHoursYear} ur na leto` },
      { label: "Obroki", value: "2 na dan", note: "približno 731 na leto" },
      { label: "Vaja", value: "5 minut na dan", note: "približno 30 ur na leto" },
      ...(groom ? [{ label: "Krtačenje", value: groom.value, note: groom.note }] : []),
      { label: "Življenjska doba", value: life.value, note: life.note },
      { label: "Stroški", value: `najmanj ${nf(l, cost.monthly)} £ na mesec`, note: `in približno ${nf(l, cost.setup)} £ na začetku, ${sizeSl}, Združeno kraljestvo${giantSl}` },
    ];
    return {
      meta: {
        title: `${name}: koliko je dela s tem psom? Dan, leto, ${years} let | PetPrep`,
        description: `En dan s psom pasme ${mid} v 3D, pomnožen na teden, leto in ${years} let: sprehodi, obroki in stroški. Z viri in povzetkom za starše.`,
      },
      eyebrow: "Preden pride pes",
      title: `${name}: koliko je dela s tem psom?`,
      lead: "Zaženi en dan s tem psom. Vsako opravilo pade na kup. Potem poglej kup za teden, leto in celo življenje ter koliko to stane.",
      frameTitle: `Interaktivni 3D: en dan s psom pasme ${mid}`,
      noScript: "Interaktivni del potrebuje JavaScript. Številke so v spodnji tabeli.",
      facts: {
        title: "Številke za odraslega psa te pasme",
        intro: "Iste številke uporablja interaktivni del.",
        rows,
        footnote:
          `Mladiček pri 2 mesecih je drugačen: 4 obroki na dan in ven približno vsaki 2 uri. Seštevki za ${years} let vzamejo številke odraslega psa za vsa leta. Koraki (100 na minuto) in 2 vrečki na dan sta pravili simulacije PetPrep, ne vir.`,
      },
      how: {
        title: "Kako se uporablja",
        items: [
          "Izberi odraslega psa ali mladička pri 2 mesecih in zaženi dan.",
          `Preklapljaj med dnevom, tednom, letom in ${years} leti in glej, kako kup raste.`,
          "Starši: nastavite svoje mesečne in začetne stroške ter izberite valuto. Zneski v evrih in dolarjih so preračunani po fiksnem tečaju in označeni z ~.",
          "Odprite povzetek za starše, natisnite ga ali shranite kot PDF in skupaj podpišite obljubo.",
        ],
      },
      sources: {
        title: "Viri",
        items: [
          "Gibanje, življenjska doba in krtačenje te pasme: viri na strani pasme v registru PetPrep.",
          "Obroki po starosti, vaje po 5 do 10 minut, mladiček zdrži približno 1 uro na mesec starosti: viri v registru pasem PetPrep.",
          "Spanje: The Royal Kennel Club.",
          "Stroški: PDSA, The cost of owning a dog (Združeno kraljestvo), po velikosti psa.",
          "Tečaj: referenčni tečaji ECB, 13. 11. 2026.",
        ],
      },
      email: {
        title: "O polju za e-naslov",
        text: "Povzetek deluje brez e-naslova. Če ga vpišete in označite privolitev, ga shranimo za novice in nasvete PetPrep; v vsakem sporočilu je povezava za odjavo.",
      },
      registryLink: {
        title: "Koliko je dela s tem psom?",
        text: `Zaženite en dan s tem psom v 3D in poglejte, koliko sprehodov, obrokov in stroškov se nabere v tednu, letu in ${years} letih. S povzetkom za starše, ki ga lahko natisnete.`,
        cta: "Preizkusi",
      },
    };
  }

  const rows = [
    { label: "Walks", value: `${walkText(l, p)} a day`, note: `about ${walkHoursYear} hours a year` },
    { label: "Meals", value: "2 a day", note: "about 731 a year" },
    { label: "Training", value: "5 minutes a day", note: "about 30 hours a year" },
    ...(groom ? [{ label: "Brushing", value: groom.value, note: groom.note }] : []),
    { label: "Life span", value: life.value, note: life.note },
    { label: "Costs", value: `at least £${nf(l, cost.monthly)} a month`, note: `plus about £${nf(l, cost.setup)} to get started, ${sizeEn}, United Kingdom${giantEn}` },
  ];
  return {
    meta: {
      title: `How much work is ${withArticle(name)}? One day, a year, ${years} years | PetPrep`,
      description: `One day with ${withArticle(name)} in 3D, multiplied to a week, a year and ${years} years: walks, meals and costs. With sources and a summary for parents.`,
    },
    eyebrow: "Before you get a dog",
    title: `How much work is ${withArticle(name)}?`,
    lead: "Play one day with this dog. Every task drops onto a pile. Then see the pile for a week, a year and a whole life, and what it costs.",
    frameTitle: `Interactive 3D: one day with ${withArticle(name)}`,
    noScript: "The interactive part needs JavaScript. The numbers are in the table below.",
    facts: {
      title: `The numbers for an adult ${name}`,
      intro: "The same numbers the interactive part uses.",
      rows,
      footnote:
        `A 2-month-old puppy is different: 4 meals a day and a trip outside about every 2 hours. The ${years}-year totals use the adult numbers for every year. Steps (100 a minute) and 2 poo bags a day are PetPrep simulation rules, not a source.`,
    },
    how: {
      title: "How to use it",
      items: [
        "Choose an adult dog or a 2-month-old puppy and start the day.",
        `Switch between day, week, year and ${years} years to see the pile grow.`,
        "Parents: set your own monthly and starting costs and pick the currency. Amounts in euros and dollars are converted at a fixed rate and marked with ~.",
        "Open the summary for parents, print it or save it as a PDF, and sign the promise together.",
      ],
    },
    sources: {
      title: "Sources",
      items: [
        "Exercise, life span and brushing of this breed: the sources on the breed page in the PetPrep breed register.",
        "Meals by age, training sessions of 5 to 10 minutes, a puppy holding on for about 1 hour per month of age: the sources in the PetPrep breed register.",
        "Sleep: The Royal Kennel Club.",
        "Costs: PDSA, The cost of owning a dog (United Kingdom), by size of dog.",
        "Exchange rate: ECB euro reference rates, 13 November 2026.",
      ],
    },
    email: {
      title: "About the e-mail field",
      text: "The summary works without an e-mail. If you leave one and tick the box, we save it for PetPrep news and tips; every message has an unsubscribe link.",
    },
    registryLink: {
      title: `How much work is ${withArticle(name)}?`,
      text: `Play one day with this dog in 3D and see the walks, meals and costs add up over a week, a year and ${years} years. With a summary parents can print.`,
      cta: "Try it",
    },
  };
}
