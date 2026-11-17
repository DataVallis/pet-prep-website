import type { Locale } from "../../i18n/config.ts";
import { STR } from "../../../tools/real-cost/src/strings.js";
import type { QuizCopy } from "./types.ts";
import { en } from "./en.ts";
import { sl } from "./sl.ts";
import { de } from "./de.ts";
import { fr } from "./fr.ts";
import { es } from "./es.ts";
import { it } from "./it.ts";
import { pt } from "./pt.ts";
import { nl } from "./nl.ts";
import { pl } from "./pl.ts";
import { cs } from "./cs.ts";
import { hr } from "./hr.ts";
import { sv } from "./sv.ts";
import { da } from "./da.ts";
import { fi } from "./fi.ts";
import { nb } from "./nb.ts";

/** One object per site language; TypeScript lists a language that is missing. */
export const quizCopy: Record<Locale, QuizCopy> = { en, sl, de, fr, es, it, pt, nl, pl, cs, hr, sv, da, fi, nb };

/**
 * The optional e-mail field and the partner call-out are the real-cost app's strings (tools/real-cost/src/strings.js),
 * so both tools say the same thing in every language: consent sentence, errors, "Want to become our partner?".
 */
export const EMAIL_KEYS = ["news_h", "news_l", "news_ph", "news_consent", "news_b", "news_err_email", "news_err_consent", "news_err", "news_err_proto"] as const;
export const SPONSOR_KEYS = ["sponsor_k", "sponsor_h", "sponsor_p", "sponsor_cta"] as const;
export type EmailStrings = Record<(typeof EMAIL_KEYS)[number], string>;
export type SponsorStrings = Record<(typeof SPONSOR_KEYS)[number], string>;

const table = STR as unknown as Record<string, Record<string, string>>;

export function quizEmailStrings(locale: Locale): EmailStrings {
  return Object.fromEntries(EMAIL_KEYS.map((k) => [k, table[locale][k]])) as EmailStrings;
}
export function quizSponsorStrings(locale: Locale): SponsorStrings {
  return Object.fromEntries(SPONSOR_KEYS.map((k) => [k, table[locale][k]])) as SponsorStrings;
}
/** "Thank you for signing up for the PetPrep news": the same wording as the real-cost app (strings.js `news_done`). */
export const quizThanks: Record<Locale, string> = Object.fromEntries(Object.keys(quizCopy).map((l) => [l, table[l].news_done])) as Record<Locale, string>;
