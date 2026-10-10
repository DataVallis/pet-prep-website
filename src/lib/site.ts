/**
 * Site-wide settings. Values marked TODO must be confirmed by David before launch.
 */
export const site = {
  name: "PetPrep",
  /** Canonical origin, no trailing slash. Override with NEXT_PUBLIC_SITE_URL. */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://petprep.si").replace(/\/$/, ""),
  /** Company operating the service (legal identity confirmed by David, 2026-10-10). */
  company: {
    /** Short trading name used in running text. */
    name: "Data Vallis",
    /** Registered legal name (AJPES). */
    legalName: "DATA VALLIS d.o.o.",
    founder: "David Tacer",
    street: "Ulica Šercerjeve brigade 5",
    postalCode: "2000",
    city: "Maribor",
    country: { en: "Slovenia", sl: "Slovenija" },
    countryCode: "SI",
    /** ID za DDV (VAT ID); the company is registered for VAT. */
    vatId: "SI89424999",
    /** Davčna številka (tax number) = the VAT ID without the country prefix. */
    taxNumber: "89424999",
    vatRegistered: true,
    /** Matična številka (company registration number). */
    registrationNumber: "8552967000",
    url: "https://datavallis.com",
  },
  // TODO(David): create these mailboxes (or change the addresses).
  email: {
    hello: "hello@petprep.si",
    privacy: "privacy@petprep.si",
    partners: "partners@petprep.si",
    investors: "investors@petprep.si",
  },
  /**
   * "prelaunch": the app is not in the stores yet; calls to action ask for early access by email.
   * "live": calls to action link to the stores below.
   */
  launchState: "prelaunch" as "prelaunch" | "live",
  stores: {
    ios: "", // TODO(David): App Store URL at launch
    android: "", // TODO(David): Google Play URL at launch
  },
  social: {
    // Add profile URLs when they exist; they are used in structured data (sameAs).
    links: [] as string[],
  },
  /** Legal texts are drafts until reviewed by a lawyer; a notice is shown while false. */
  legalReviewed: false,
  /** Last change of the privacy policy and terms (shown on those pages only). */
  legalUpdated: "2026-10-10",
  /** Consent banner (CookieYes) and Google Analytics 4. Analytics only runs after consent (Consent Mode v2). */
  cookieyesScript: "https://cdn-cookieyes.com/client_data/62f2cbd0a9ac6653c320370d143f369f/script.js",
  gaMeasurementId: "G-CGSBN9N46F",
  price: { challenge: 49.99, currency: "EUR", weeks: 12 },
} as const;

/**
 * Absolute URL of a path. The home page is the bare origin (no trailing slash), the same form
 * Next.js prints in the canonical link, so canonical, og:url, sitemap and JSON-LD all match.
 */
export function absoluteUrl(path: string): string {
  if (path === "/" || path === "") return site.url;
  return site.url + (path.startsWith("/") ? path : `/${path}`);
}
