import { site } from "@/lib/site";

/**
 * 1. Google Consent Mode v2 defaults: everything denied until the visitor chooses.
 * 2. Then (same inline script, so the order is guaranteed) the CookieYes banner is added as an
 *    async script. It no longer blocks rendering; when it runs it reads the stored choice and sends
 *    gtag("consent", "update"). `wait_for_update` makes GA wait up to 2 s for that update.
 */
const consentDefault = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag("consent","default",{ad_storage:"denied",ad_user_data:"denied",ad_personalization:"denied",analytics_storage:"denied",functionality_storage:"denied",personalization_storage:"denied",security_storage:"granted",wait_for_update:2000});
gtag("set","ads_data_redaction",true);
gtag("js",new Date());
gtag("config","${site.gaMeasurementId}");
(function(d){var s=d.createElement("script");s.id="cookieyes";s.async=true;s.src=${JSON.stringify(site.cookieyesScript)};d.head.appendChild(s);})(document);`;

/**
 * Rendered inside <head>:
 * - preconnect to the CookieYes CDN (the banner script is injected by the inline script below),
 * - Consent Mode defaults + GA4 config + CookieYes loader (inline, runs first),
 * - gtag.js (async; React may hoist it earlier, which is safe — gtag.js replays the dataLayer queue in order).
 * GA sets no cookies until the visitor allows "Analytics" in CookieYes ("Google Consent Mode" must be
 * enabled in the CookieYes dashboard). No other script on the site sets cookies, so CookieYes does not
 * need to load synchronously to block anything.
 */
export function ConsentAndAnalytics() {
  return (
    <>
      <link rel="preconnect" href="https://cdn-cookieyes.com" />
      <script id="consent-default" dangerouslySetInnerHTML={{ __html: consentDefault }} />
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${site.gaMeasurementId}`} />
    </>
  );
}
