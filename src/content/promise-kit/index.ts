import type { Locale } from "@/i18n/config";
import { en } from "./en.ts";
import { sl } from "./sl.ts";
import type { KitCopy, KitLang } from "./types.ts";

export const kitCopy: Record<KitLang, KitCopy> = { en, sl };
export const kitLangs: readonly KitLang[] = ["en", "sl"];
export function kitLangOf(locale: Locale | string): KitLang | undefined {
  return (kitLangs as readonly string[]).includes(locale) ? (locale as KitLang) : undefined;
}
