import "server-only";
import type { Locale } from "@/i18n/config";
import { site } from "@/lib/site";
import en from "./en";
import sl from "./sl";
import type { Dictionary } from "./types";

const dictionaries: Record<Locale, Dictionary> = { en, sl };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

const countryName: Record<Locale, string> = { en: "Slovenia", sl: "Slovenija" };

/** Fills {company}, {city}, {privacyEmail}… placeholders used in legal texts. */
export function fillPlaceholders(text: string, locale: Locale): string {
  const address = site.company.address ? `, ${site.company.address}` : "";
  return text
    .replaceAll("{company}", site.company.name)
    .replaceAll("{city}", site.company.city)
    .replaceAll("{country}", countryName[locale])
    .replaceAll("{address}", address)
    .replaceAll("{privacyEmail}", site.email.privacy)
    .replaceAll("{helloEmail}", site.email.hello);
}
