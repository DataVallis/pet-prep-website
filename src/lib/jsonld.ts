import { localeMeta, pathFor, type Locale, type RouteKey } from "@/i18n/config";
import { absoluteUrl, site } from "@/lib/site";
import type { Dictionary } from "@/content/types";
import { pageUpdated } from "@/content/updated";
import { plainText } from "@/lib/links";

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
    parentOrganization: companyLd(),
    founder: { "@type": "Person", name: site.company.founder },
    address: postalAddressLd(),
    ...(site.social.links.length ? { sameAs: site.social.links } : {}),
  };
}

function postalAddressLd() {
  const c = site.company;
  return { "@type": "PostalAddress", streetAddress: c.street, postalCode: c.postalCode, addressLocality: c.city, addressCountry: c.countryCode };
}

/** DATA VALLIS d.o.o. — the legal entity behind PetPrep. */
function companyLd() {
  const c = site.company;
  return {
    "@type": "Organization",
    "@id": `${c.url}/#organization`,
    name: c.name,
    legalName: c.legalName,
    url: c.url,
    address: postalAddressLd(),
    vatID: c.vatId,
    taxID: c.taxNumber,
    identifier: { "@type": "PropertyValue", propertyID: "SI-MS", name: "Matična številka", value: c.registrationNumber },
    founder: { "@type": "Person", name: c.founder },
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
    // Offers and store links only once the app is in the stores: until then it is in closed
    // testing and cannot be bought or pre-ordered, so advertising an offer would not be honest.
    ...(site.launchState === "live"
      ? {
          ...(site.stores.ios || site.stores.android ? { downloadUrl: [site.stores.ios, site.stores.android].filter(Boolean) } : {}),
          ...(site.stores.ios || site.stores.android ? { installUrl: [site.stores.ios, site.stores.android].filter(Boolean) } : {}),
          offers: [
            { "@type": "Offer", name: dict.pricingPlans.free.name, price: "0", priceCurrency: site.price.currency },
            {
              "@type": "Offer",
              name: dict.pricingPlans.challenge.name,
              price: site.price.challenge.toFixed(2),
              priceCurrency: site.price.currency,
              description: dict.pricingPlans.challenge.text,
            },
          ],
        }
      : {}),
  };
}

export function webPageLd(locale: Locale, key: RouteKey, title: string, description: string) {
  return {
    "@type": key === "about" ? "AboutPage" : key === "contact" ? "ContactPage" : "WebPage",
    "@id": `${absoluteUrl(pathFor(locale, key))}#webpage`,
    url: absoluteUrl(pathFor(locale, key)),
    name: title,
    description,
    inLanguage: localeMeta[locale].htmlLang,
    isPartOf: { "@id": SITE_ID },
    about: key === "about" ? { "@id": ORG_ID } : { "@id": APP_ID },
    publisher: { "@id": ORG_ID },
    dateModified: pageUpdated[key],
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

/**
 * Source "publisher" strings of the registry mix publisher, author and date
 * ("PetMD — S. C. Mitchell, DVM, DABVP, 2025-05-20", "VCA Animal Hospitals (2025-02-21)").
 * Split them for CreativeWork: publisher, author (only when the text names a person) and
 * datePublished (only an ISO date the text states). Nothing is guessed.
 */
const PERSON = /^(?:(?:[A-Z]\.\s?)+[A-Z][\w'-]+|[A-Z][a-z]+ [A-Z][\w'-]+(?=,|;|$)|[A-Z][\w'-]+ (?:[A-Z]\.\s?)+)/;

export function splitSourcePublisher(raw: string): { publisher: string; author?: string; date?: string; modified?: string } {
  const m = /(\b(?:updated|modified|edited)\s+)?\b(\d{4}-\d{2}-\d{2})\b/.exec(raw);
  const [head, ...rest] = raw.split(" — ");
  const publisher = head
    .split(/\.\s+(?=[A-Z][a-z])/)[0] // "AAHA / AAFP, … 2021. Read through …" → first sentence
    .replace(/\s*\([^)]*\d{4}-\d{2}-\d{2}[^)]*\)/, "") // "(published 2011, modified 2026-05-26)"
    .replace(/[,;]?\s*\d{4}-\d{2}-\d{2}\.?/, "")
    .replace(/[,;\s]+$/, "")
    .trim();
  const tail = rest.join(" — ").split(";")[0].split(" (")[0].replace(/\b\d{4}-\d{2}-\d{2}\b/, "").replace(/[,\s]+$/, "").trim();
  const author = PERSON.test(tail) ? tail : undefined;
  const dates = m ? (m[1] ? { modified: m[2] } : { date: m[2] }) : {};
  return { publisher, ...(author ? { author } : {}), ...dates };
}

/** WebPage of a breed register page, with its sources as citations. */
export function breedPageLd(opts: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  breedName: string;
  alternateNames: string[];
  sameAs: string[];
  image?: string;
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
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    about: {
      "@type": "Thing",
      name: opts.breedName,
      ...(opts.alternateNames.length ? { alternateName: opts.alternateNames } : {}),
      ...(opts.sameAs.length ? { sameAs: opts.sameAs } : {}),
    },
    ...(opts.image ? { primaryImageOfPage: { "@type": "ImageObject", url: absoluteUrl(opts.image) } } : {}),
    dateModified: opts.dateModified,
    citation: opts.sources.map((s) => {
      const p = splitSourcePublisher(s.publisher);
      return {
        "@type": "CreativeWork",
        name: s.title,
        url: s.url,
        publisher: { "@type": "Organization", name: p.publisher },
        ...(p.author ? { author: { "@type": "Person", name: p.author } } : {}),
        ...(p.date ? { datePublished: p.date } : {}),
        ...(p.modified ? { dateModified: p.modified } : {}),
      };
    }),
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
      acceptedAnswer: { "@type": "Answer", text: plainText(i.a) },
    })),
  };
}

export function graph(...nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}
