/**
 * Pet Promise Kit (M6-S02) — the text of the printable kit, one object per language. The kit PDF
 * (print.ts → scripts/build-promise-kit.mjs) and the sales page both read these files, so a text is
 * changed in exactly one place. Rules: no ages, no health advice, no amounts (the cost sheet has empty
 * fields only), no child data beyond what the family writes by hand on paper, Curio is the mascot,
 * Slovenian addresses parents formally and child pages are gender-neutral (no l-participles).
 */
import type { Locale } from "../../i18n/config.ts";

export type KitLang = Locale;

export type KitSection = { id: string; title: string; text: string };

export type KitCopy = {
  lang: KitLang;
  htmlLang: string;
  /** Section titles as the sales page lists them (also used for the contents list on the cover). */
  sections: KitSection[];
  common: {
    kitName: string;
    brand: string;
    site: string;
    /** "{n}" and "{total}" are replaced. */
    pageOf: string;
    name: string;
    date: string;
    yes: string;
    notSure: string;
    no: string;
    licence: string;
    /** Printed under the free sample page. */
    sampleFoot: string;
  };
  cover: {
    kicker: string;
    title: string;
    subtitle: string;
    noteHeading: string;
    note: string[];
    notHeading: string;
    notItems: string[];
    insideHeading: string;
    mascot: string;
  };
  talk: { title: string; intro: string; questions: string[]; outro: string };
  promise: {
    title: string;
    lead: string;
    petLabel: string;
    childHeading: string;
    childIntro: string;
    tasks: { label: string; blank: string }[];
    ownTask: string;
    childOutro: string;
    adultsHeading: string;
    adultsText: string;
    adultsBlank: string;
    rulesHeading: string;
    reviewLabel: string;
    signChild: string;
    signAdult: string;
  };
  weeks: {
    title: string;
    /** "{n}" is replaced. */
    weekTitle: string;
    weekOf: string;
    howTo: string;
    days: string[];
    taskHead: string;
    tasks: string[];
    ownTask: string;
    notes: string[];
    wentWell: string;
    change: string;
    parentSigns: string;
  };
  cost: {
    title: string;
    intro: string;
    head: string[];
    rows: string[];
    other: string;
    total: string;
    yearNote: string;
    questions: string[];
  };
  ready: {
    title: string;
    intro: string;
    items: { topic: string; text: string }[];
    note: string;
    readHeading: string;
    read: string[];
    pointer: string;
  };
  award: {
    title: string;
    lead: string;
    forLabel: string;
    better: string;
    moment: string;
    colour: string;
    signed: string;
    parents: string;
  };
  next: {
    title: string;
    lead: string;
    steps: { title: string; text: string }[];
    appHeading: string;
    appText: string;
    cta: string;
    slogan: string;
    mascotLine: string;
  };
};

/** Sales-page copy of the Pet Promise Kit (the price is not here: src/lib/promiseKit.ts formats it per language). */
export type KitSales = {
  eyebrow: string;
  title: string;
  lead: string;
  metaTitle: string;
  metaDescription: string;
  breadcrumb: string;
  priceNote: string;
  buy: string;
  sample: string;
  sampleHeading: string;
  sampleText: string;
  sampleNote: string;
  insideHeading: string;
  insideIntro: string;
  previewHeading: string;
  previewAlt: { cover: string; promise: string; cost: string };
  forHeading: string;
  forItems: string[];
  notHeading: string;
  notItems: string[];
  giftText: string;
  giftLink: string;
  faqHeading: string;
  faq: { q: string; a: string }[];
};
