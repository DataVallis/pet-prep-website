import "server-only";
import { isPageKey, pathFor, type Locale } from "@/i18n/config";
import { getSpecies, registry } from "@/content/registry/registry";
import { breedHref, speciesHref } from "@/lib/registry/views";

/**
 * Links inside content strings: `[label](ref)`. A ref is resolved per locale, so the same English
 * and Slovenian sentence links to the right localized URL:
 *   page:<PageKey>     → pathFor(locale, key)            e.g. [About us](page:about)
 *   species:<id>       → species catalogue               e.g. [Dogs](species:dog)
 *   breed:<id>         → breed page                      e.g. [Border Collie](breed:border_collie)
 *   /path or https://… → used as is; any ref may end in #anchor
 * An unknown ref fails the build, so a renamed breed or page cannot leave a dead link.
 */
const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;

export type TextPart = string | { label: string; href: string };

export function resolveRef(locale: Locale, refWithHash: string): string {
  const [ref, hash] = refWithHash.split("#");
  const path = resolvePath(locale, ref);
  return hash ? `${path}#${hash}` : path;
}

function resolvePath(locale: Locale, ref: string): string {
  const [kind, id] = ref.split(":");
  if (ref.startsWith("/") || ref.startsWith("https://") || ref.startsWith("mailto:")) return ref;
  if (kind === "page" && id && isPageKey(id)) return pathFor(locale, id);
  if (kind === "page" && id === "home") return pathFor(locale, "home");
  if (kind === "species" && id) return speciesHref(locale, getSpecies(id));
  if (kind === "breed" && id) {
    const b = registry.breeds.find((x) => x.id === id);
    if (b) return breedHref(locale, b);
  }
  throw new Error(`content link: unknown ref "${ref}"`);
}

export function parseLinks(locale: Locale, text: string): TextPart[] {
  const out: TextPart[] = [];
  let last = 0;
  for (const m of text.matchAll(LINK)) {
    if (m.index > last) out.push(text.slice(last, m.index));
    out.push({ label: m[1], href: resolveRef(locale, m[2]) });
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

/** The text without link markup (JSON-LD, meta). */
export function plainText(text: string): string {
  return text.replace(LINK, "$1");
}

/** Markdown with absolute URLs (llms.txt). */
export function markdownText(locale: Locale, text: string, abs: (path: string) => string): string {
  return text.replace(LINK, (_, label: string, ref: string) => {
    const href = resolveRef(locale, ref);
    return `[${label}](${href.startsWith("/") ? abs(href) : href})`;
  });
}
