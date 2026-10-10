import type { PageKey } from "@/i18n/config";

export type ScreenKey =
  | "pin"
  | "contract"
  | "hud"
  | "picker"
  | "parent"
  | "report"
  | "assistant"
  | "certificate";

export type Block =
  | { type: "prose"; id?: string; heading?: string; paragraphs: string[] }
  | { type: "list"; id?: string; heading?: string; intro?: string; items: string[] }
  | {
      type: "cards";
      id?: string;
      heading?: string;
      intro?: string;
      columns?: 2 | 3;
      items: { title: string; text: string; tag?: string }[];
    }
  | { type: "steps"; id?: string; heading?: string; intro?: string; items: { title: string; text: string }[] }
  | {
      type: "screens";
      id?: string;
      heading?: string;
      intro?: string;
      items: { screen: ScreenKey; caption: string }[];
    }
  | { type: "table"; id?: string; heading?: string; intro?: string; head: string[]; rows: string[][]; note?: string }
  | { type: "faq"; id?: string; heading?: string; items: { q: string; a: string }[] }
  | { type: "callout"; title: string; text: string; tone?: "mint" | "dark" }
  | { type: "pricing" }
  /** Live cookie list rendered by CookieYes from the site's latest cookie scan. */
  | { type: "cookies"; heading: string; paragraphs: string[]; settings: string; fallback: string }
  | { type: "contact" }
  /** The operator's legal identity (src/lib/site.ts company). */
  | { type: "company"; id?: string; heading?: string; intro?: string }
  /** Animal register hub: species from src/content/registry/registry.json (M5-R11). */
  | { type: "animalsHub" }
  | {
      type: "legal";
      sections: { heading: string; paragraphs?: string[]; items?: string[] }[];
    };

export type PageContent = {
  meta: { title: string; description: string };
  /** Short label for menus; defaults to the eyebrow. */
  navLabel?: string;
  eyebrow: string;
  title: string;
  lead: string;
  /** Shown as a badge: the page describes features that are planned, not built yet. */
  planned?: boolean;
  blocks: Block[];
};

export type Dictionary = {
  meta: { siteTitle: string; siteDescription: string; slogan: string; keywords: string[] };
  nav: { home: string; menu: string; close: string; skip: string };
  lang: { label: string; switchTo: string };
  cta: {
    primary: string;
    secondary: string;
    earlyAccess: string;
    earlyAccessSubject: string;
    ios: string;
    android: string;
    comingSoon: string;
    readMore: string;
    contactUs: string;
  };
  common: {
    planned: string;
    plannedNote: string;
    legalDraft: string;
    lastUpdated: string;
    breadcrumbHome: string;
    screensNote: string;
    perPet: string;
    free: string;
    forever: string;
    notFoundTitle: string;
    notFoundText: string;
    notFoundCta: string;
  };
  footer: {
    tagline: string;
    groups: { title: string; links: PageKey[] }[];
    rights: string;
    dataEu: string;
    languages: string;
    company: string;
    cookieSettings: string;
  };
  screens: Record<ScreenKey, string>;
  pricingPlans: {
    free: { name: string; text: string; features: string[]; cta: string };
    challenge: { name: string; badge: string; text: string; features: string[]; cta: string; unit: string };
    note: string;
  };
  earlyAccess: {
    title: string;
    text: string;
    label: string;
    placeholder: string;
    button: string;
    sending: string;
    successTitle: string;
    successText: string;
    invalid: string;
    error: string;
    consent: string;
    privacyLink: string;
  };
  contactCards: { title: string; text: string; email: "hello" | "privacy" | "partners" | "investors" }[];
  home: {
    meta: { title: string; description: string };
    hero: { eyebrow: string; title: string; lead: string; trust: string[] };
    phone: { petName: string; petAge: string; live: string; video: string; actions: [string, string, string, string] };
    parentCard: { child: string; status: string; scoreLabel: string; progress: string };
    notification: { app: string; text: string };
    promise: { quote: string; highlight: string; text: string };
    how: { eyebrow: string; title: string; steps: { title: string; text: string }[]; link: string };
    realism: { title: string; text: string; items: { title: string; text: string }[] };
    parents: {
      eyebrow: string;
      title: string;
      text: string;
      points: { strong: string; text: string }[];
      link: string;
    };
    /** Adults who want a specific breed and test it on themselves first (David, 2026-10-09). */
    adults: {
      eyebrow: string;
      title: string;
      text: string;
      points: { strong: string; text: string }[];
      /** How an adult starts on their own: parent account → add yourself → code. */
      how: string;
      /** Honest note on which breeds are available today. */
      note: string;
      link: string;
    };
    after: {
      eyebrow: string;
      title: string;
      text: string;
      features: { title: string; text: string }[];
      link: string;
      planned: string;
    };
    /** `link` is a content ref (page:…, species:…, breed:…; see src/lib/links.ts). */
    species: { title: string; text: string; chips: { label: string; active?: boolean; link?: string }[] };
    pricing: { eyebrow: string; title: string };
    faq: { title: string; link: string };
    final: { title: string; text: string };
  };
  pages: Record<PageKey, PageContent>;
};
