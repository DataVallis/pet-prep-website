/**
 * Site-wide settings. Values marked TODO must be confirmed by David before launch.
 */
export const site = {
  name: "PetPrep",
  /** Canonical origin, no trailing slash. Override with NEXT_PUBLIC_SITE_URL. */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://petprep.si").replace(/\/$/, ""),
  /**
   * Company operating the service (legal identity confirmed by David, 2026-10-15).
   * Currently David's sole proprietorship (s.p.); will switch to a new d.o.o. later —
   * change these values plus the hard-coded company mentions in content/en.ts + sl.ts (grep "s.p.").
   */
  company: {
    /** Short trading name used in running text. */
    name: "Data Vallis",
    /** Registered legal name (AJPES). */
    legalName: "Data Vallis David Tacer s.p.",
    founder: "David Tacer",
    street: "Robindvor 39",
    postalCode: "2370",
    city: "Dravograd",
    country: { en: "Slovenia", sl: "Slovenija", de: "Slowenien", fr: "Slovénie", es: "Eslovenia", it: "Slovenia" },
    countryCode: "SI",
    /** ID za DDV (VAT ID); the business is registered for VAT. */
    vatId: "SI36130800",
    /** Davčna številka (tax number) = the VAT ID without the country prefix. */
    taxNumber: "36130800",
    vatRegistered: true,
    /** Matična številka (business registration number). */
    registrationNumber: "6560024000",
    url: "https://datavallis.com",
  },
  // TODO(David): create these mailboxes (or change the addresses).
  email: {
    hello: "hello@petprep.si",
    privacy: "privacy@petprep.si",
    partners: "partners@petprep.si",
    investors: "investors@petprep.si",
    /** Contact for questions about the terms of use (David, 2026-10-24). */
    terms: "david@petprep.si",
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
    links: ["https://www.tiktok.com/@petprep.si", "https://www.instagram.com/petprep.si/"] as string[],
    tiktok: "https://www.tiktok.com/@petprep.si",
    instagram: "https://www.instagram.com/petprep.si/",
    handle: "@petprep.si",
  },
  /** Legal texts are drafts until reviewed by a lawyer; a notice is shown while false. */
  legalReviewed: false,
  /** Last change of the privacy policy and terms (shown on those pages only). */
  legalUpdated: "2026-10-24",
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
