"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { defaultLocale, isLocale, locales, localeMeta, pageKeyFromSlug, pathFor, type Locale, type RouteKey } from "@/i18n/config";

/** Works out which page the visitor is on from the public URL. */
function currentRoute(pathname: string): { locale: Locale; key: RouteKey } {
  const parts = pathname.split("/").filter(Boolean);
  let locale: Locale = defaultLocale;
  if (parts[0] && isLocale(parts[0]) && parts[0] !== defaultLocale) {
    locale = parts[0];
    parts.shift();
  } else if (parts[0] === defaultLocale) {
    parts.shift();
  }
  if (parts.length === 0) return { locale, key: "home" };
  return { locale, key: pageKeyFromSlug(locale, parts[0]) ?? "home" };
}

/**
 * Pages below a page (species, breeds of the animal register) have localized slugs that only
 * the page knows; it publishes them as <link rel="alternate" hreflang> in <head>, so the switcher
 * reads them from there after load. Without JavaScript it links to the parent page.
 */
function alternatesFromHead(): Partial<Record<Locale, string>> {
  const out: Partial<Record<Locale, string>> = {};
  for (const l of locales) {
    const el = document.querySelector<HTMLLinkElement>(`link[rel="alternate"][hreflang="${localeMeta[l].htmlLang}"]`);
    if (el?.href) {
      try {
        out[l] = new URL(el.href).pathname;
      } catch {
        // ignore a malformed link
      }
    }
  }
  return out;
}

export function LanguageSwitcher({ label, dark = false }: { label: string; dark?: boolean }) {
  const pathname = usePathname() ?? "/";
  const { locale, key } = currentRoute(pathname);
  const [alternates, setAlternates] = useState<{ path: string; hrefs: Partial<Record<Locale, string>> }>({ path: "", hrefs: {} });
  useEffect(() => {
    // Read after the new page's <head> is in place.
    const id = window.setTimeout(() => setAlternates({ path: pathname, hrefs: alternatesFromHead() }), 0);
    return () => window.clearTimeout(id);
  }, [pathname]);
  const hrefs = alternates.path === pathname ? alternates.hrefs : {};
  return (
    <nav aria-label={label} className="flex items-center gap-1">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={dark ? "text-muted-dark" : "text-muted"}>
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
      {locales.map((l) => {
        const active = l === locale;
        return (
          <Link
            key={l}
            href={hrefs[l] ?? pathFor(l, key)}
            hrefLang={localeMeta[l].htmlLang}
            lang={localeMeta[l].htmlLang}
            aria-current={active ? "true" : undefined}
            title={localeMeta[l].label}
            className={`rounded-md px-2 py-1 text-sm font-semibold ${
              active
                ? dark
                  ? "bg-graphite-3 text-fog"
                  : "bg-white text-graphite ring-1 ring-line"
                : dark
                  ? "text-muted-dark hover:text-fog"
                  : "text-muted hover:text-graphite"
            }`}
          >
            <span aria-hidden="true">{localeMeta[l].short}</span>
            <span className="sr-only">{localeMeta[l].label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
