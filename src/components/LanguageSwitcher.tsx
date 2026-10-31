"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
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

export function LanguageSwitcher({ label, dark = false, align = "right" }: { label: string; dark?: boolean; align?: "left" | "right" }) {
  const pathname = usePathname() ?? "/";
  const { locale, key } = currentRoute(pathname);
  const [alternates, setAlternates] = useState<{ path: string; hrefs: Partial<Record<Locale, string>> }>({ path: "", hrefs: {} });
  useEffect(() => {
    // Read after the new page's <head> is in place.
    const id = window.setTimeout(() => setAlternates({ path: pathname, hrefs: alternatesFromHead() }), 0);
    return () => window.clearTimeout(id);
  }, [pathname]);
  const hrefs = alternates.path === pathname ? alternates.hrefs : {};
  // Dropdown (David 2026-10-31: 13+ languages would not fit in a row). <details> opens without JavaScript;
  // with it, the list closes on navigation, on Escape and on a click outside.
  const ref = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    if (ref.current) ref.current.open = false;
  }, [pathname]);
  useEffect(() => {
    const close = (e: MouseEvent | KeyboardEvent) => {
      const d = ref.current;
      if (!d?.open) return;
      if (e instanceof KeyboardEvent ? e.key === "Escape" : !d.contains(e.target as Node)) {
        d.open = false;
        if (e instanceof KeyboardEvent) d.querySelector("summary")?.focus();
      }
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", close);
    };
  }, []);
  const tone = dark
    ? { button: "border-graphite-3 text-fog hover:border-mint", panel: "border-graphite-3 bg-graphite-2", item: "text-muted-dark hover:bg-graphite-3 hover:text-fog", active: "bg-graphite-3 text-fog" }
    : { button: "border-line bg-white text-graphite hover:border-graphite", panel: "border-line bg-white", item: "text-graphite hover:bg-mint-tint", active: "bg-mint-tint font-semibold" };
  return (
    <details ref={ref} className="group relative self-start">
      <summary
        aria-label={`${label}: ${localeMeta[locale].label}`}
        className={`flex min-h-10 cursor-pointer list-none items-center gap-1.5 rounded-xl border px-3 text-sm font-semibold [&::-webkit-details-marker]:hidden ${tone.button}`}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        <span aria-hidden="true">{localeMeta[locale].short}</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="transition-transform group-open:rotate-180">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </summary>
      <nav aria-label={label} className={`absolute ${align === "left" ? "left-0" : "right-0"} z-50 mt-2 max-h-[70vh] w-56 overflow-y-auto rounded-[18px] border p-1.5 shadow-[0_12px_32px_rgba(18,22,20,0.16)] ${dark ? "bottom-full mb-2 mt-0" : "top-full"} ${tone.panel}`}>
        <ul className="flex flex-col">
          {locales.map((l) => {
            const active = l === locale;
            return (
              <li key={l}>
                <Link
                  href={hrefs[l] ?? pathFor(l, key)}
                  hrefLang={localeMeta[l].htmlLang}
                  lang={localeMeta[l].htmlLang}
                  aria-current={active ? "true" : undefined}
                  className={`flex items-center justify-between gap-3 rounded-[12px] px-3 py-2 text-[15px] ${active ? tone.active : tone.item}`}
                >
                  <span>{localeMeta[l].label}</span>
                  <span className="text-xs font-semibold opacity-70" aria-hidden="true">{localeMeta[l].short}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </details>
  );
}
