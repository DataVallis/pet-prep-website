/**
 * Partner & sponsor page (M6-S03, all 15 site languages since M6-S08): copy of the inquiry form, the
 * numbers block and the media kit PDFs. Slovenian and English live in this file, the other 13 languages
 * in ./partners/<locale>.ts (each also carries its page blocks, `page`). Only type imports on purpose:
 * scripts/build-media-kit.mjs and the unit tests load this file with plain Node.
 */
import type { Locale } from "../i18n/config.ts";
import type { PageContent } from "./types.ts";
import { de } from "./partners/de.ts";
import { fr } from "./partners/fr.ts";
import { es } from "./partners/es.ts";
import { it } from "./partners/it.ts";
import { pt } from "./partners/pt.ts";
import { nl } from "./partners/nl.ts";
import { pl } from "./partners/pl.ts";
import { cs } from "./partners/cs.ts";
import { hr } from "./partners/hr.ts";
import { sv } from "./partners/sv.ts";
import { da } from "./partners/da.ts";
import { fi } from "./partners/fi.ts";
import { nb } from "./partners/nb.ts";

export type PartnerLang = Locale;
export type PartnerType = "series" | "sponsored_content" | "insurer" | "directory" | "shelter" | "other";

export const partnerContactEmail = "david@petprep.si";

export type PartnerCopy = {
  form: {
    heading: string; intro: string; company: string; contactName: string; email: string; type: string; typePlaceholder: string;
    message: string; messageHint: string; types: Record<PartnerType, string>;
    consentBefore: string; consentLink: string; consentAfter: string; submit: string; sending: string; successTitle: string; successText: string;
    errors: Record<"company" | "contact_name" | "email" | "type" | "message" | "consent", string>;
    rateLimited: string; invalid: string; fallbackBefore: string; fallbackAfter: string;
  };
  /** `breeds` / `languages` are labels after a number: `{n|one=…|other=…}` picks the plural form for n (lib/partnerStats.ts `fill`). */
  stats: { heading: string; intro: string; breeds: string; breedsNote: string; languages: string; languagesNote: string };
};

/** Media kit PDF text (scripts/build-media-kit.mjs). Counts take their noun in the right plural form per language: `{dogs|one=…|few=…|other=…}` (see `fill` in lib/partnerStats.ts). Placeholders: {breeds} {dogs} {cats} {date} in the example cards, {email} {url} in contact.text. */
export type KitDoc = {
  htmlLang: string;
  company: string;
  title: string;
  tagline: string;
  what: { heading: string; paragraphs: readonly string[] };
  audience: { heading: string; paragraphs: readonly string[] };
  coop: { heading: string; items: readonly (readonly [string, string])[] };
  examples: { heading: string; items: readonly (readonly [string, string])[] };
  never: { heading: string; text: string };
  contact: { heading: string; text: string };
  page: string;
};

/** One non-SL/EN language: UI copy, media kit PDF text and the page (pages.partners). */
export type PartnerLocalePack = { copy: PartnerCopy; kit: KitDoc; page: PageContent };

const baseCopy = {
  sl: {
    form: {
      heading: "Povpraševanje za sodelovanje",
      intro: "Opišite, kdo ste in kaj imate v mislih. Odgovorimo osebno, običajno v nekaj delovnih dneh. Samodejnih e-sporočil ne pošiljamo.",
      company: "Podjetje ali organizacija",
      contactName: "Kontaktna oseba",
      email: "E-naslov",
      type: "Vrsta sodelovanja",
      typePlaceholder: "Izberite …",
      message: "Sporočilo",
      messageHint: "Kratek opis ideje, države in časovnice.",
      types: {
        series: "Sponzorstvo serije »12 Weeks«",
        sponsored_content: "Sponzorirana vsebina na petprep.si",
        insurer: "Zavarovalnica (posredovanje stikov v pripravi)",
        directory: "Ustanovni partner v imeniku",
        shelter: "Zavetišče ali društvo",
        other: "Drugo",
      },
      consentBefore: "Strinjam se, da PetPrep obdela moje podatke iz obrazca zaradi odgovora na povpraševanje, kot je opisano v ",
      consentLink: "politiki zasebnosti",
      consentAfter: ".",
      submit: "Pošlji povpraševanje",
      sending: "Pošiljam …",
      successTitle: "Hvala, povpraševanje je prejeto.",
      successText: "Odgovorimo vam po e-pošti.",
      errors: {
        company: "Vpišite ime podjetja ali organizacije.",
        contact_name: "Vpišite kontaktno osebo.",
        email: "Vpišite veljaven e-naslov.",
        type: "Izberite vrsto sodelovanja.",
        message: "Napišite kratko sporočilo.",
        consent: "Za pošiljanje je potrebna privolitev.",
      },
      rateLimited: "Poslali ste že več povpraševanj. Poskusite znova čez nekaj minut.",
      invalid: "Nekaj v obrazcu ni v redu. Preverite označena polja.",
      fallbackBefore: "Obrazca trenutno ni mogoče poslati. Pišite nam na ",
      fallbackAfter: ".",
    },
    stats: {
      heading: "Številke",
      intro: "Navajamo samo to, kar lahko preverimo v izdelku. Stanje na dan {date}.",
      breeds: "{n|one=pasma|two=pasmi|few=pasme|other=pasem} v registru živali",
      breedsNote: "{dogs} {dogs|one=pasma|two=pasmi|few=pasme|other=pasem} psov in {cats} {cats|one=pasma|two=pasmi|few=pasme|other=pasem} mačk, vsaka z lastno stranjo in navedenimi viri.",
      languages: "{n|one=jezik|two=jezika|few=jeziki|other=jezikov} spletne strani",
      languagesNote: "Aplikacija je danes v slovenščini in angleščini.",
    },
  },
  en: {
    form: {
      heading: "Partnership enquiry",
      intro: "Tell us who you are and what you have in mind. We reply personally, usually within a few working days. We do not send automated emails.",
      company: "Company or organisation",
      contactName: "Contact person",
      email: "Email",
      type: "Type of cooperation",
      typePlaceholder: "Choose…",
      message: "Message",
      messageHint: "A short description of your idea, country and timing.",
      types: {
        series: "Sponsoring the “12 Weeks” series",
        sponsored_content: "Sponsored content on petprep.si",
        insurer: "Insurer (lead referral in preparation)",
        directory: "Founding directory partner",
        shelter: "Shelter or association",
        other: "Other",
      },
      consentBefore: "I agree that PetPrep processes the data in this form to answer my enquiry, as described in the ",
      consentLink: "privacy policy",
      consentAfter: ".",
      submit: "Send enquiry",
      sending: "Sending…",
      successTitle: "Thank you, your enquiry has arrived.",
      successText: "We will reply by email.",
      errors: {
        company: "Please enter your company or organisation.",
        contact_name: "Please enter a contact person.",
        email: "Please enter a valid email address.",
        type: "Please choose a type of cooperation.",
        message: "Please write a short message.",
        consent: "Your consent is needed to send the form.",
      },
      rateLimited: "You have already sent several enquiries. Please try again in a few minutes.",
      invalid: "Something in the form is not right. Please check the marked fields.",
      fallbackBefore: "The form cannot be sent right now. Please write to ",
      fallbackAfter: ".",
    },
    stats: {
      heading: "Numbers",
      intro: "We only state what we can verify in the product. As of {date}.",
      breeds: "{n|one=breed|other=breeds} in the animal register",
      breedsNote: "{dogs} dog {dogs|one=breed|other=breeds} and {cats} cat {cats|one=breed|other=breeds}, each with its own page and cited sources.",
      languages: "{n|one=website language|other=website languages}",
      languagesNote: "The app is currently in Slovenian and English.",
    },
  },
} satisfies Partial<Record<Locale, PartnerCopy>>;

const packs: Record<Exclude<Locale, "sl" | "en">, PartnerLocalePack> = { de, fr, es, it, pt, nl, pl, cs, hr, sv, da, fi, nb };

/** Form and numbers copy per site language. */
export const partnerCopy: Record<Locale, PartnerCopy> = { ...baseCopy, ...mapPacks((p) => p.copy) };

/** The partner page (pages.partners) of the 13 languages that are not in content/sl.ts / content/en.ts. */
export const partnerPages = mapPacks((p) => p.page);

function mapPacks<T>(pick: (p: PartnerLocalePack) => T): Record<Exclude<Locale, "sl" | "en">, T> {
  return Object.fromEntries(Object.entries(packs).map(([k, v]) => [k, pick(v)])) as Record<Exclude<Locale, "sl" | "en">, T>;
}

/** Path of the media kit PDF of a language (the build script writes one per site language). */
export const mediaKitHref = (locale: Locale): string => `/media/petprep-media-kit-${locale}.pdf`;

const baseKit = {
  sl: {
    htmlLang: "sl",
    company: "PetPrep (v ustanavljanju)",
    title: "Medijski komplet",
    tagline: "Pripravljeni na žival. Ob njej vse življenje.",
    what: {
      heading: "Kaj je PetPrep",
      paragraphs: [
        "PetPrep je aplikacija in register živali, ki družini pomaga, da se na psa ali mačko pripravi, še preden jo pripelje domov. V 12-tedenskem izzivu skrbi za realističnega AI ljubljenčka, starš pa v nadzorni plošči vidi, kako skrb poteka v resnici.",
        "Register pasem razloži, kaj posamezna žival potrebuje, z navedenimi viri. Vsaka številka je sledljiva do vira, vsaka partnerska vsebina pa označena.",
      ],
    },
    audience: {
      heading: "Publika",
      paragraphs: [
        "Družine tik pred odločitvijo o ljubljenčku in odrasli, ki preizkušajo, ali jim določena pasma res ustreza. Bralec že ve, katero vrsto in pasmo preučuje, zato je pozornost konkretna.",
      ],
    },
    coop: {
      heading: "Oblike sodelovanja",
      items: [
        ["Sponzorstvo serije »12 Weeks«", "Omemba sponzorja v epizodi in opisu. Sponzor ne ureja vsebine serije."],
        ["Sponzorirane vsebine na petprep.si", "Označen prispevek ob strani pasme ali v bazi znanja, brez vpliva na vsebino in vire."],
        ["Zavarovalnice", "Fiksno sponzorstvo ali plačilo za posredovan stik. Stik le z izrecno privolitvijo starša. Posredovanje stikov je v pripravi."],
        ["Ustanovni partner v imenikih", "Veterinarji, pasje šole, frizerji, vzreditelji: izpostavljen vpis. 190 € na leto, cena zaklenjena, število mest omejeno na državo."],
        ["Zavetišča in društva", "Brezplačen vpis in možnost priporočila PetPrep posvojiteljem."],
      ],
    },
    examples: {
      heading: "Primeri vsebin",
      items: [
        ["Aplikacija", "12-tedenski izziv z realističnim AI ljubljenčkom in nadzorno ploščo za starše."],
        ["Register pasem", "{breeds} {breeds|one=pasma|two=pasmi|few=pasme|other=pasem} ({dogs} {dogs|one=pes|two=psa|few=psi|other=psov}, {cats} {cats|one=mačka|two=mački|few=mačke|other=mačk}) z viri, stanje na dan {date}."],
        ["Serija »12 Weeks«", "Video serija, ki spremlja 12 tednov skrbi za ljubljenčka; priložnost za omembo sponzorja."],
      ],
    },
    never: {
      heading: "Česa ne delamo",
      text: "Oglasov v otroški aplikaciji, prodaje podatkov, zdravstvenih obljub in promocije pasem, ki jih veterinarska združenja odsvetujejo v oglaševanju.",
    },
    contact: { heading: "Kontakt", text: "Pišite nam na {email} ali izpolnite obrazec na {url}." },
    page: "Stran",
  },
  en: {
    htmlLang: "en",
    company: "PetPrep (company in formation)",
    title: "Media kit",
    tagline: "Ready for a pet. There for its whole life.",
    what: {
      heading: "What PetPrep is",
      paragraphs: [
        "PetPrep is an app and animal register that helps a family prepare for a dog or a cat before bringing one home. In a 12-week challenge they care for a realistic AI pet, while a parent sees in a dashboard how the care really goes.",
        "The breed register explains what each animal needs, with cited sources. Every number traces back to a source and every partner content is labelled.",
      ],
    },
    audience: {
      heading: "Audience",
      paragraphs: [
        "Families just before deciding on a pet, and adults testing whether a breed really suits them. The reader already knows which species and breed they are studying, so attention is concrete.",
      ],
    },
    coop: {
      heading: "Forms of cooperation",
      items: [
        ["Sponsoring the “12 Weeks” series", "A sponsor mention in the episode and its description. The sponsor does not edit the series."],
        ["Sponsored content on petprep.si", "A labelled piece beside a breed page or in the knowledge base, with no influence on content or sources."],
        ["Insurers", "Fixed sponsorship or payment per referred contact. Contacts only with a parent’s explicit consent. Lead referral is in preparation."],
        ["Founding directory partner", "Vets, dog schools, groomers, breeders: a highlighted listing. 190 € per year, price locked, places limited per country."],
        ["Shelters and associations", "A free listing and the option to recommend PetPrep to adopters."],
      ],
    },
    examples: {
      heading: "Content examples",
      items: [
        ["The app", "A 12-week challenge with a realistic AI pet and a parent dashboard."],
        ["Breed register", "{breeds} {breeds|one=breed|other=breeds} ({dogs} {dogs|one=dog|other=dogs}, {cats} {cats|one=cat|other=cats}) with sources, as of {date}."],
        ["“12 Weeks” series", "A video series following 12 weeks of pet care; a place for a sponsor mention."],
      ],
    },
    never: {
      heading: "What we do not do",
      text: "Ads in the children’s app, selling data, health promises, and promoting breeds that veterinary associations advise against advertising.",
    },
    contact: { heading: "Contact", text: "Write to {email} or use the form at {url}." },
    page: "Page",
  },
} satisfies Partial<Record<Locale, KitDoc>>;

/** Media kit text (scripts/build-media-kit.mjs). Company line: PetPrep is in formation, no other company name. */
export const kitCopy: Record<Locale, KitDoc> = { ...baseKit, ...mapPacks((p) => p.kit) };
