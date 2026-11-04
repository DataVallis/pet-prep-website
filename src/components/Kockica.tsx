"use client";

import { initConsent } from "@datavallis/consent";
import "@datavallis/consent/style.css";
import { locales, pathFor, type Locale } from "@/i18n/config";
import { site } from "@/lib/site";

/**
 * Cookie banner: Kockica (@datavallis/consent), replacing CookieYes (David 2026-11-04). It blocks known
 * trackers until consent, runs Google Consent Mode v2 (Google Analytics loads cookieless until the visitor
 * allows "Analytics") and fills the cookie table on the privacy page. The cookie policy is the "Cookies"
 * section of each language's privacy page. English first = fallback language. Kockica has no built-in
 * Swedish, Finnish or Norwegian texts yet, so on /sv, /fi and /nb the banner speaks English.
 */
const COOKIE_POLICY = Object.fromEntries(locales.map((l) => [l, `${pathFor(l as Locale, "privacy")}#cookies`])) as Record<string, string>;

// Module top level, not useEffect: runs before next/script (afterInteractive) adds gtag.js.
if (typeof window !== "undefined") {
  const lang = document.documentElement.lang.slice(0, 2);
  initConsent({
    siteId: "petprep-si",
    controller: { name: `${site.company.legalName}, ${site.company.city}` },
    policyUrl: COOKIE_POLICY[lang] ?? COOKIE_POLICY.en!,
    languages: [...locales],
    branding: false,
    // gtag.js loads after this (next/script), so Kockica cannot see it on load — declare it.
    services: ["ga4"],
  });
}

export function Kockica() {
  return null;
}
