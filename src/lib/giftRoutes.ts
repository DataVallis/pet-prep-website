/**
 * Routing of the gift voucher pages (M6-S01, contract §8), in all 15 site languages, everything behind
 * NEXT_PUBLIC_FEATURE_GIFT. Pure (no alias imports) so the sitemap, the route files and the unit tests share it.
 * Switch off → no static params and no sitemap entry: the URLs answer the branded 404.
 * The pages are served by the `[locale]/[slug]` routes (sales page, redeem) and `[locale]/[slug]/[species]`
 * (thank-you, a child of the sales page), like every other localized page.
 */
import { locales, salesSlugs, type Locale } from "../i18n/config.ts";
import { giftBuyUrl, giftPathsOf, isGiftEnabled } from "./gift.ts";

/** Static params `{ locale, slug }` of the top-level gift pages (sales page and redeem): none while the switch is off. */
export function giftSlugParams(enabled: boolean = isGiftEnabled()): { locale: Locale; slug: string }[] {
  return enabled ? locales.flatMap((locale) => [{ locale, slug: salesSlugs.gift[locale] }, { locale, slug: salesSlugs.redeem[locale] }]) : [];
}

/** Static params of the thank-you page, which lives one level below the sales page. */
export function giftThanksParams(locale: Locale, enabled: boolean = isGiftEnabled()): { slug: string; species: string }[] {
  return enabled ? [{ slug: salesSlugs.gift[locale], species: salesSlugs.giftThanks[locale] }] : [];
}

/**
 * Only the sales page is indexable; thanks and redeem never reach the sitemap. While the checkout URL is
 * missing the page has a dead buy button, so it stays out of the sitemap (and is noindex) until the URL is set.
 * Returns the sales-page path of every language, or null.
 */
export function giftSitemapPaths(enabled: boolean = isGiftEnabled(), hasBuyUrl: boolean = giftBuyUrl() !== null): Record<Locale, string> | null {
  return enabled && hasBuyUrl ? giftPathsOf("gift") : null;
}

/** Static params of `/auth/return` (M6-S01b): the one English-tree page, only while the switch is on. Never in the sitemap. */
export function authReturnParams(enabled: boolean = isGiftEnabled()): { locale: Locale }[] {
  return enabled ? [{ locale: "en" }] : [];
}
