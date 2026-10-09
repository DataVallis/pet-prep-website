import { localeMeta, pathFor, type Locale, type RouteKey } from "@/i18n/config";
import { absoluteUrl, site } from "@/lib/site";
import type { Dictionary } from "@/content/types";

const ORG_ID = `${site.url}/#organization`;
const SITE_ID = `${site.url}/#website`;
const APP_ID = `${site.url}/#app`;

export function organizationLd(dict: Dictionary) {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: site.name,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/icon-512.png"),
    slogan: dict.meta.slogan,
    description: dict.meta.siteDescription,
    email: site.email.hello,
    parentOrganization: { "@type": "Organization", name: site.company.name },
    founder: { "@type": "Person", name: site.company.founder },
    address: { "@type": "PostalAddress", addressLocality: site.company.city, addressCountry: site.company.countryCode },
    ...(site.social.links.length ? { sameAs: site.social.links } : {}),
  };
}

export function websiteLd(dict: Dictionary) {
  return {
    "@type": "WebSite",
    "@id": SITE_ID,
    name: site.name,
    url: absoluteUrl("/"),
    description: dict.meta.siteDescription,
    inLanguage: ["en", "sl"],
    publisher: { "@id": ORG_ID },
  };
}

export function appLd(locale: Locale, dict: Dictionary) {
  return {
    "@type": "MobileApplication",
    "@id": APP_ID,
    name: site.name,
    operatingSystem: "iOS, Android",
    applicationCategory: "EducationalApplication",
    description: dict.meta.siteDescription,
    inLanguage: localeMeta[locale].htmlLang,
    audience: { "@type": "PeopleAudience", suggestedMinAge: 7, suggestedMaxAge: 16 },
    publisher: { "@id": ORG_ID },
    offers: [
      {
        "@type": "Offer",
        name: dict.pricingPlans.free.name,
        price: "0",
        priceCurrency: site.price.currency,
      },
      {
        "@type": "Offer",
        name: dict.pricingPlans.challenge.name,
        price: site.price.challenge.toFixed(2),
        priceCurrency: site.price.currency,
        description: dict.pricingPlans.challenge.text,
      },
    ],
  };
}

export function webPageLd(locale: Locale, key: RouteKey, title: string, description: string) {
  return {
    "@type": "WebPage",
    "@id": `${absoluteUrl(pathFor(locale, key))}#webpage`,
    url: absoluteUrl(pathFor(locale, key)),
    name: title,
    description,
    inLanguage: localeMeta[locale].htmlLang,
    isPartOf: { "@id": SITE_ID },
    about: { "@id": APP_ID },
    dateModified: site.legalUpdated,
  };
}

export function breadcrumbLd(locale: Locale, dict: Dictionary, key: RouteKey, title: string) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: dict.common.breadcrumbHome, item: absoluteUrl(pathFor(locale, "home")) },
      { "@type": "ListItem", position: 2, name: title, item: absoluteUrl(pathFor(locale, key)) },
    ],
  };
}

/** WebPage of a breed register page, with its sources as citations. */
export function breedPageLd(opts: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  breedName: string;
  sources: { publisher: string; title: string; url: string }[];
  dateModified: string;
}) {
  const url = absoluteUrl(opts.path);
  return {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: opts.title,
    description: opts.description,
    inLanguage: localeMeta[opts.locale].htmlLang,
    isPartOf: { "@id": SITE_ID },
    about: { "@type": "Thing", name: opts.breedName },
    dateModified: opts.dateModified,
    citation: opts.sources.map((s) => ({
      "@type": "CreativeWork",
      name: s.title,
      url: s.url,
      publisher: { "@type": "Organization", name: s.publisher },
    })),
  };
}

/** A list of breadcrumbs (Home → … → current page). */
export function breadcrumbsLd(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: absoluteUrl(it.path) })),
  };
}

/** A species catalogue: CollectionPage + the breeds as an ItemList (URLs only). */
export function collectionLd(opts: { locale: Locale; path: string; title: string; description: string; items: { name: string; path: string }[]; dateModified: string }) {
  const url = absoluteUrl(opts.path);
  return {
    "@type": "CollectionPage",
    "@id": `${url}#webpage`,
    url,
    name: opts.title,
    description: opts.description,
    inLanguage: localeMeta[opts.locale].htmlLang,
    isPartOf: { "@id": SITE_ID },
    dateModified: opts.dateModified,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: opts.items.length,
      itemListElement: opts.items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, url: absoluteUrl(it.path) })),
    },
  };
}

export function faqLd(items: { q: string; a: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };
}

export function graph(...nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}
