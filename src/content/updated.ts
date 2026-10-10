import type { RouteKey } from "@/i18n/config";

/**
 * Last content change of each page (ISO date): sitemap <lastmod> and WebPage.dateModified.
 * Change a page's date in the same commit that changes its text. Privacy and terms also show it
 * on the page (site.legalUpdated must match). Register pages use the registry dates instead.
 */
export const pageUpdated: Record<RouteKey, string> = {
  home: "2026-10-10",
  howItWorks: "2026-10-10",
  parents: "2026-10-09",
  afterAdoption: "2026-10-09",
  pricing: "2026-10-10",
  faq: "2026-10-10",
  partners: "2026-10-09",
  investors: "2026-10-10",
  contact: "2026-10-10",
  privacy: "2026-10-10",
  terms: "2026-10-10",
  childSafety: "2026-10-10",
  animals: "2026-10-10",
  about: "2026-10-10",
};
