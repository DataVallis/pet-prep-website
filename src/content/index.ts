import "server-only";
import type { Locale } from "@/i18n/config";
import { site } from "@/lib/site";
import en from "./en";
import sl from "./sl";
import de from "./de";
import fr from "./fr";
import es from "./es";
import it from "./it";
import pt from "./pt";
import nl from "./nl";
import pl from "./pl";
import cs from "./cs";
import hr from "./hr";
import sv from "./sv";
import type { Dictionary } from "./types";

/** One dictionary per site language — a new language adds its file here (TypeScript lists missing keys). */
const dictionaries: Record<Locale, Dictionary> = { en, sl, de, fr, es, it, pt, nl, pl, cs, hr, sv };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

/** e.g. "Robindvor 39, 2370 Dravograd, Slovenia". */
export function companyAddress(locale: Locale): string {
  const c = site.company;
  return `${c.street}, ${c.postalCode} ${c.city}, ${c.country[locale]}`;
}

/** Labels of the company identifiers, per language. */
export const companyIdLabels: Record<Locale, { vat: string; vatPayer: string; registration: string; legalName: string; address: string; web: string }> = {
  en: { vat: "VAT ID", vatPayer: "registered for VAT", registration: "Company registration no.", legalName: "Company", address: "Registered address", web: "Website" },
  sl: { vat: "ID za DDV", vatPayer: "zavezanec za DDV", registration: "Matična številka", legalName: "Podjetje", address: "Sedež", web: "Spletna stran" },
  de: { vat: "USt-IdNr.", vatPayer: "umsatzsteuerpflichtig", registration: "Registernummer", legalName: "Unternehmen", address: "Sitz", web: "Website" },
  fr: { vat: "N° de TVA", vatPayer: "assujetti à la TVA", registration: "Numéro d’immatriculation", legalName: "Société", address: "Siège social", web: "Site web" },
  es: { vat: "NIF-IVA", vatPayer: "sujeto pasivo del IVA", registration: "Número de registro mercantil", legalName: "Empresa", address: "Domicilio social", web: "Sitio web" },
  it: { vat: "Partita IVA", vatPayer: "soggetto passivo IVA", registration: "Numero di registrazione", legalName: "Ragione sociale", address: "Sede legale", web: "Sito web" },
  pt: { vat: "N.º de IVA", vatPayer: "sujeito passivo de IVA", registration: "Número de registo", legalName: "Denominação social", address: "Sede", web: "Sítio web" },
  nl: { vat: "Btw-identificatienummer", vatPayer: "btw-plichtig", registration: "Inschrijvingsnummer", legalName: "Bedrijf", address: "Statutaire zetel", web: "Website" },
  pl: { vat: "Numer VAT UE", vatPayer: "czynny podatnik VAT", registration: "Numer rejestrowy", legalName: "Nazwa firmy", address: "Siedziba", web: "Strona internetowa" },
  cs: { vat: "DIČ", vatPayer: "plátce DPH", registration: "IČO", legalName: "Obchodní firma", address: "Sídlo", web: "Webové stránky" },
  hr: { vat: "PDV ID broj", vatPayer: "obveznik PDV-a", registration: "Matični broj", legalName: "Naziv tvrtke", address: "Sjedište", web: "Web-stranica" },
  sv: { vat: "Momsregistreringsnummer", vatPayer: "momsregistrerat", registration: "Organisationsnummer", legalName: "Företagsnamn", address: "Säte", web: "Webbplats" },
};

/** e.g. "VAT ID SI36130800 (registered for VAT), company registration no. 6560024000". */
export function companyIds(locale: Locale): string {
  const c = site.company;
  const l = companyIdLabels[locale];
  const vat = `${l.vat} ${c.vatId}${c.vatRegistered ? ` (${l.vatPayer})` : ""}`;
  // German capitalises nouns: keep the label as written.
  const reg = locale === "de" ? l.registration : `${l.registration.charAt(0).toLowerCase()}${l.registration.slice(1)}`;
  return `${vat}, ${reg} ${c.registrationNumber}`;
}

/** Fills {company}, {address}, {companyIds}, {privacyEmail}… placeholders used in legal texts. */
export function fillPlaceholders(text: string, locale: Locale): string {
  return text
    .replaceAll("{company}", site.company.legalName)
    .replaceAll("{address}", companyAddress(locale))
    .replaceAll("{companyIds}", companyIds(locale))
    .replaceAll("{city}", site.company.city)
    .replaceAll("{country}", site.company.country[locale])
    .replaceAll("{privacyEmail}", site.email.privacy)
    .replaceAll("{helloEmail}", site.email.hello)
    .replaceAll("{termsEmail}", site.email.terms);
}
