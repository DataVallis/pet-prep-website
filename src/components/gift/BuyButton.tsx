"use client";

import { GIFT_LANG_KEY, type GiftLocale } from "@/lib/gift";

/**
 * Buy button of the gift page. Opens the Lemon Squeezy checkout in a new tab. Before it does, the page
 * remembers only the language (never a code) so the thank-you page, which Lemon Squeezy reaches at one
 * fixed address for both languages, can send a Slovenian buyer to the Slovenian page. Strictly necessary,
 * so no consent banner change (contract §8.1). Without a checkout URL the button is disabled.
 */
export function BuyButton({ href, locale, label, soon, className = "" }: { href: string | null; locale: GiftLocale; label: string; soon: string; className?: string }) {
  if (!href) {
    return (
      <button type="button" disabled className={`btn btn-primary cursor-not-allowed opacity-60 ${className}`}>
        {soon}
      </button>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn btn-primary ${className}`}
      onClick={() => {
        try {
          if (locale === "sl") window.localStorage.setItem(GIFT_LANG_KEY, "sl");
          else window.localStorage.removeItem(GIFT_LANG_KEY);
        } catch {
          // Storage can be blocked; the thank-you page then simply stays in English (it has a language link).
        }
      }}
    >
      {label}
      <span className="sr-only"> ({locale === "sl" ? "odpre se v novem zavihku" : "opens in a new tab"})</span>
    </a>
  );
}
