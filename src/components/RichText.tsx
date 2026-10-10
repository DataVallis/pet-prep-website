import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { parseLinks } from "@/lib/links";

/** A content string with optional `[label](ref)` links (see src/lib/links.ts). */
export function RichText({ text, locale }: { text: string; locale: Locale }) {
  return (
    <>
      {parseLinks(locale, text).map((p, i) =>
        typeof p === "string" ? (
          p
        ) : p.href.startsWith("/") ? (
          <Link key={i} href={p.href} className="rich-link">
            {p.label}
          </Link>
        ) : (
          <a key={i} href={p.href} className="rich-link" rel="noopener noreferrer">
            {p.label}
          </a>
        ),
      )}
    </>
  );
}
