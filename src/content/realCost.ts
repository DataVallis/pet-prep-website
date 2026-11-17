/**
 * "How much work is a dog?" — interactive 3D page (M6-S04, David 2026-11-15), one page per dog breed of the register
 * since M6-S07 (David 2026-11-16: »Kalkulator razširi na vse pasme, pa da bo dinamično dodajalo tudi vse bodoče
 * pasme«). All 15 site languages since M6-S08 (David 2026-11-16: »Vse mora biti v vseh jezikih«). The interactive part is public/real-cost/app.html (built from tools/real-cost/,
 * its own strings in tools/real-cost/src/strings.js); this file holds the copy of the page around it.
 * The breed's numbers come from the register via src/lib/realCostProfile.ts; "PetPrep rule" marks simulation rules
 * that are not from a source.
 */
import { locales, localeMeta, defaultLocale, type Locale } from "../i18n/config.ts";
import { GROOM_PER_WEEK, PDSA_COSTS, type RealCostProfile } from "../lib/realCostProfile.ts";
import { PHRASES, unit } from "../../tools/real-cost/src/phrases.js";
import { STR } from "../../tools/real-cost/src/strings.js";
import { RATES, SYMBOL } from "../../tools/real-cost/src/rates.js";
import { realCostText } from "./realCostText.ts";

export const realCostLocales = locales;
export type RealCostLocale = Locale;

export const realCostUpdated = "2026-11-17";

/**
 * One localized URL base per language (ASCII, "how much work is a dog"). The pages are built by the shared
 * `/[locale]/[slug]/[species]` route (src/app/[locale]/[slug]/[species]/page.tsx, like care and colouring pages): `slug`
 * is this base and `species` the breed slug. Titles are not declined by breed (David 2026-11-16: »brez sklanjanja«),
 * so a new breed needs no hand-written form. English and Slovenian keep the URLs of M6-S07.
 */
export const realCostBase: Record<Locale, string> = {
  en: "how-much-work-is-a-dog",
  sl: "koliko-je-dela-s-psom",
  de: "wie-viel-arbeit-ist-ein-hund",
  fr: "combien-de-travail-pour-un-chien",
  es: "cuanto-trabajo-es-un-perro",
  it: "quanto-lavoro-e-un-cane",
  pt: "quanto-trabalho-da-um-cao",
  nl: "hoeveel-werk-is-een-hond",
  pl: "ile-pracy-wymaga-pies",
  cs: "kolik-prace-da-pes",
  hr: "koliko-posla-je-pas",
  sv: "hur-mycket-jobb-ar-en-hund",
  da: "hvor-meget-arbejde-er-en-hund",
  fi: "paljonko-koira-vaatii-tyota",
  nb: "hvor-mye-jobb-er-en-hund",
};

/** Before M6-S07 the page existed for the Labrador only; these URLs redirect permanently (next.config.ts). */
export const realCostLegacy: { source: string; locale: RealCostLocale; breedSlug: string }[] = [
  { source: "/how-much-work-is-a-labrador", locale: "en", breedSlug: "labrador-retriever" },
  { source: "/sl/koliko-dela-je-z-labradorcem", locale: "sl", breedSlug: "labradorec" },
];

export function isRealCostLocale(locale: string): locale is RealCostLocale {
  return (locales as readonly string[]).includes(locale);
}

export const isRealCostSlug = (locale: Locale, slug: string) => slug === realCostBase[locale];

export function realCostPath(locale: RealCostLocale, breedSlug: string): string {
  return locale === defaultLocale ? `/${realCostBase.en}/${breedSlug}` : `/${locale}/${realCostBase[locale]}/${breedSlug}`;
}

/** hreflang map of all language versions (absolute URLs), English as x-default. */
export function realCostAlternates(absolute: (path: string) => string, slug: Record<Locale, string>): Record<string, string> {
  const map: Record<string, string> = Object.fromEntries(locales.map((l) => [l, absolute(realCostPath(l, slug[l]))]));
  return { ...map, "x-default": map.en };
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

const nf = (l: Locale, n: number, digits = 0) => new Intl.NumberFormat(localeMeta[l].intl, { maximumFractionDigits: digits }).format(n);
/** PDSA figures are GBP; the page shows EUR (the default, same as the app), converted at the fixed ECB rate and marked "~". */
const eur = (l: Locale, gbp: number) => `~${new Intl.NumberFormat(localeMeta[l].intl, { style: "currency", currency: "EUR", currencyDisplay: "narrowSymbol", maximumFractionDigits: 0 }).format(Math.round(gbp * RATES.EUR))}`;
/** "Converted at the ECB rate of 13 November 2026: 1 £ = 1,1968 €. Amounts with ~ are approximate." (the app's own wording per language). */
const rateNote = (l: Locale) => (STR as Record<string, { rate_note: string }>)[l].rate_note.replace("{r}", `1 ${SYMBOL.GBP} = ${new Intl.NumberFormat(localeMeta[l].intl, { maximumFractionDigits: 4 }).format(RATES.EUR)} ${SYMBOL.EUR}`);

/** "a Labrador Retriever" / "an Afghan Hound". */
export const withArticle = (name: string) => `${/^[aeiou]/i.test(name) ? "an" : "a"} ${name}`;

const YEAR = 365.25;

const fill = (tpl: string, vars: Record<string, string>) => tpl.replace(/\{(\w+)\}/g, (_, k: string) => vars[k] ?? `{${k}}`);

/** The page copy for one breed (`name` in the page language). */
export function realCostCopy(l: Locale, name: string, p: RealCostProfile): RealCostCopy {
  const T = realCostText[l];
  const P = PHRASES[l];
  const cost = PDSA_COSTS[p.size];
  const u = (kind: "min" | "hour" | "year", n: number) => unit(l, kind, n, (v: number) => nf(l, v, 1));
  const lifeRounded = Math.round(p.lifeYears);
  const years = nf(l, lifeRounded);
  const yearsX = u("year", lifeRounded);
  const [lo, hi] = p.lifeRange;

  // Mid-sentence a Slovenian breed name starts lower-case ("pasme labradorec").
  const mid = name.charAt(0).toLocaleLowerCase("sl") + name.slice(1);
  const vars: Record<string, string> = {
    name, name_a: withArticle(name), mid, x: yearsX, years, size: P.size[p.size], giant: p.sizeIsGiant ? T.giant : "",
  };

  const walkText = fill(P.q[p.walkQ], { x: u("min", p.walkMin) });
  const lifeVars = { x: p.lifeQ === "span" ? u("year", hi) : yearsX, lo: nf(l, lo) };
  const lifeValue = fill(P.life[p.lifeQ], lifeVars);
  const lifeNote = fill(p.lifeQ === "median" ? P.life.median_note : P.life.total_note, { x: p.lifeQ === "median" ? u("year", p.lifeYears) : yearsX });
  const perYear = nf(l, Math.round(GROOM_PER_WEEK[p.groom ?? "once_a_week"] * 52));
  const rows = [
    { label: T.label.walks, value: fill(T.walksVal, { x: walkText }), note: fill(T.walksNote, { x: u("hour", Math.round((p.walkMin * YEAR) / 60)) }) },
    { label: T.label.meals, value: T.mealsVal, note: T.mealsNote },
    { label: T.label.training, value: T.trainVal, note: T.trainNote },
    ...(p.groom
      ? [{ label: T.label.brushing, value: P.groom[p.groom], note: fill(p.groom === "more_than_once_a_week" ? P.groom_note_more : P.groom_note, { n: perYear }) }]
      : []),
    { label: T.label.life, value: lifeValue, note: lifeNote },
    { label: T.label.costs, value: fill(T.costVal, { m: eur(l, cost.monthly) }), note: `${fill(T.costNote, { ...vars, s: eur(l, cost.setup) })}. ${rateNote(l)}` },
  ];

  return {
    meta: { title: fill(T.metaTitle, vars), description: fill(T.metaDesc, vars) },
    eyebrow: T.eyebrow,
    title: fill(T.title, vars),
    lead: T.lead,
    frameTitle: fill(T.frame, vars),
    noScript: T.noScript,
    facts: { title: fill(T.factsTitle, vars), intro: T.factsIntro, rows, footnote: fill(T.footnote, vars) },
    how: { title: T.howTitle, items: T.how.map((s) => fill(s, vars)) },
    sources: { title: T.sourcesTitle, items: [...T.sources] },
    email: { title: T.emailTitle, text: T.emailText },
    registryLink: { title: fill(T.regTitle, vars), text: fill(T.regText, vars), cta: T.cta },
  };
}
