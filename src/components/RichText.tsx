import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { parseLinks } from "@/lib/links";

/** Screen-reader note on links that open in a new tab. */
const newTabNote: Record<Locale, string> = { en: " (opens in a new tab)", sl: " (odpre se v novem zavihku)", de: " (öffnet sich in einem neuen Tab)" };

/**
 * A content string with optional `[label](ref)` links (see src/lib/links.ts). External links and
 * refs prefixed with "+" open in a new tab.
 */
export function RichText({ text, locale }: { text: string; locale: Locale }) {
  return (
    <>
      {parseLinks(locale, text).map((p, i) => {
        if (typeof p === "string") return p;
        const note = p.newTab ? <span className="sr-only">{newTabNote[locale]}</span> : null;
        const tab = p.newTab ? { target: "_blank", rel: "noopener noreferrer" } : {};
        return p.href.startsWith("/") ? (
          <Link key={i} href={p.href} className="rich-link" {...tab}>
            {p.label}
            {note}
          </Link>
        ) : (
          <a key={i} href={p.href} className="rich-link" rel="noopener noreferrer" {...tab}>
            {p.label}
            {note}
          </a>
        );
      })}
    </>
  );
}
