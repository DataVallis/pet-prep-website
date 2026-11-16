/**
 * "Before you get a dog" hub and the breed quiz "Which breed is for you?" (M6-S06, David 2026-11-16):
 * localized URLs in all 15 site languages. Pure (no alias imports) so the sitemap, route files and tests share it.
 * Hub: `/<hub>` (English at the root, the others under /<locale>); quiz: `/<hub>/<quiz>`. The hub is built by
 * `src/app/[locale]/[slug]/page.tsx`, the quiz by `src/app/[locale]/[slug]/[species]/page.tsx` (like the
 * real-cost, care and colouring pages).
 */
import { defaultLocale, localeMeta, locales, type Locale } from "../../i18n/config.ts";

export const quizSlugs = {
  hub: { en: "before-you-get-a-dog", sl: "pred-nakupom-psa", de: "vor-dem-hundekauf", fr: "avant-d-adopter-un-chien", es: "antes-de-tener-un-perro", it: "prima-di-prendere-un-cane", pt: "antes-de-ter-um-cao", nl: "voordat-je-een-hond-neemt", pl: "zanim-wezmiesz-psa", cs: "pred-porizenim-psa", hr: "prije-nego-uzmete-psa", sv: "innan-du-skaffar-hund", da: "foer-du-faar-hund", fi: "ennen-koiran-hankintaa", nb: "for-du-skaffer-hund" },
  quiz: { en: "which-breed", sl: "katera-pasma", de: "welche-rasse", fr: "quelle-race", es: "que-raza", it: "quale-razza", pt: "que-raca", nl: "welk-ras", pl: "jaka-rasa", cs: "ktere-plemeno", hr: "koja-pasmina", sv: "vilken-ras", da: "hvilken-race", fi: "mika-rotu", nb: "hvilken-rase" },
} as const satisfies Record<string, Record<Locale, string>>;

/** Last content change of the hub and the quiz (sitemap lastmod, ISO date). */
export const quizUpdated = "2026-11-16";

const prefix = (locale: Locale) => (locale === defaultLocale ? "" : `/${locale}`);

export const quizHubPath = (locale: Locale) => `${prefix(locale)}/${quizSlugs.hub[locale]}`;
export const quizPath = (locale: Locale) => `${quizHubPath(locale)}/${quizSlugs.quiz[locale]}`;

export const isQuizHubSlug = (locale: Locale, slug: string) => slug === quizSlugs.hub[locale];
/** The quiz is the one child of the hub: `/<hub>/<quiz>`. */
export const isQuizSlug = (locale: Locale, slug: string, child: string) => isQuizHubSlug(locale, slug) && child === quizSlugs.quiz[locale];

const withDefault = (map: Record<string, string>) => ({ ...map, "x-default": map[localeMeta[defaultLocale].htmlLang] });

/** hreflang map (absolute URLs) of the hub, English as x-default. The keys are the HTML language tags, as in `alternatesFor` (src/lib/seo.ts). */
export function quizHubAlternates(absolute: (path: string) => string): Record<string, string> {
  return withDefault(Object.fromEntries(locales.map((l) => [localeMeta[l].htmlLang, absolute(quizHubPath(l))])));
}

export function quizAlternates(absolute: (path: string) => string): Record<string, string> {
  return withDefault(Object.fromEntries(locales.map((l) => [localeMeta[l].htmlLang, absolute(quizPath(l))])));
}
