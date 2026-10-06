import { site } from "@/lib/site";

const consentDefault = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag("consent","default",{ad_storage:"denied",ad_user_data:"denied",ad_personalization:"denied",analytics_storage:"denied",functionality_storage:"denied",personalization_storage:"denied",security_storage:"granted",wait_for_update:2000});
gtag("set","ads_data_redaction",true);
gtag("js",new Date());
gtag("config","${site.gaMeasurementId}");`;

/**
 * Rendered inside <head>, in this order:
 * 1. Google Consent Mode v2 defaults (everything denied) + GA4 config,
 * 2. CookieYes banner, which updates consent when the visitor chooses,
 * 3. gtag.js (async; React may hoist it earlier, which is safe — gtag.js replays the dataLayer queue in order).
 * GA sets no cookies until the visitor allows "Analytics" in CookieYes
 * ("Google Consent Mode" must be enabled in the CookieYes dashboard).
 */
export function ConsentAndAnalytics() {
  return (
    <>
      <script id="consent-default" dangerouslySetInnerHTML={{ __html: consentDefault }} />
      {/* CookieYes must load synchronously in <head> so it runs before other scripts. */}
      {/* eslint-disable-next-line @next/next/no-sync-scripts */}
      <script id="cookieyes" type="text/javascript" src={site.cookieyesScript} />
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${site.gaMeasurementId}`} />
    </>
  );
}
