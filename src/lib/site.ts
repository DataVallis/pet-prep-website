/**
 * Site-wide settings. Values marked TODO must be confirmed by David before launch.
 */
export const site = {
  name: "PetPrep",
  /** Canonical origin, no trailing slash. Override with NEXT_PUBLIC_SITE_URL. */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://petprep.si").replace(/\/$/, ""),
  /** Company operating the service. */
  company: {
    name: "Data Vallis",
    founder: "David Tacer",
    city: "Maribor",
    country: "Slovenia",
    countryCode: "SI",
    // TODO(David): full registered address and registration / VAT number for the legal pages.
    address: "",
    registrationNumber: "",
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
  legalUpdated: "2026-10-06",
  price: { challenge: 49.99, currency: "EUR", trialDays: 7, weeks: 12 },
} as const;

export function absoluteUrl(path: string): string {
  if (path === "/" || path === "") return site.url + "/";
  return site.url + (path.startsWith("/") ? path : `/${path}`);
}
