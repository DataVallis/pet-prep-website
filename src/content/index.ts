import "server-only";
import type { Locale } from "@/i18n/config";
import { site } from "@/lib/site";
import en from "./en";
import sl from "./sl";
import de from "./de";
import type { Dictionary } from "./types";

/** One dictionary per site language — a new language adds its file here (TypeScript lists missing keys). */
const dictionaries: Record<Locale, Dictionary> = { en, sl, de };

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
