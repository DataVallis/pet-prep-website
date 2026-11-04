import Script from "next/script";
import { consentModeDefaultsSnippet } from "@datavallis/consent";
import { site } from "@/lib/site";

/**
 * Google Consent Mode v2 defaults (everything denied, from Kockica) + GA4 config, inline in <head> so they
 * run before any Google tag. gtag.js itself loads through next/script (afterInteractive), i.e. after the
 * Kockica banner (src/components/Kockica.tsx) has initialised; until the visitor allows "Analytics" GA runs
 * cookieless (Consent Mode "advanced"). CookieYes was replaced by Kockica on 2026-11-04.
 */
const consentDefault = `${consentModeDefaultsSnippet()}gtag("js",new Date());gtag("config","${site.gaMeasurementId}");`;

export function ConsentDefaults() {
  return <script id="consent-default" dangerouslySetInnerHTML={{ __html: consentDefault }} />;
}

export function GoogleAnalytics() {
  return <Script id="gtag-js" src={`https://www.googletagmanager.com/gtag/js?id=${site.gaMeasurementId}`} strategy="afterInteractive" />;
}
