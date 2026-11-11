"use client";

import { GIFT_LANG_KEY, type GiftLocale } from "@/lib/gift";

/**
 * Buy button of the gift page. Opens the Lemon Squeezy checkout in a new tab. Before it does, the page
 * remembers only the language (one of the 15 site languages, never a code) so the thank-you page, which Lemon Squeezy
 * reaches at one fixed address (the English one), can send the buyer on to the thank-you page of their own language. Strictly necessary,
 * so no consent banner change (contract §8.1). Without a checkout URL the button is disabled.
 */
export function BuyButton({ href, locale, label, soon, newTab, className = "" }: { href: string | null; locale: GiftLocale; label: string; soon: string; newTab: string; className?: string }) {
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
          if (locale !== "en") window.localStorage.setItem(GIFT_LANG_KEY, locale);
          else window.localStorage.removeItem(GIFT_LANG_KEY);
        } catch {
          // Storage can be blocked; the thank-you page then simply stays in English (it has a language link).
        }
      }}
    >
      {label}
      <span className="sr-only"> ({newTab})</span>
    </a>
  );
}
