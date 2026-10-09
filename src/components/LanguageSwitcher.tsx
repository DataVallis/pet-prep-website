"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  breedIdFromSlug,
  defaultLocale,
  isLocale,
  locales,
  localeMeta,
  pageKeyFromSlug,
  pathFor,
  pathForBreed,
  type BreedId,
  type Locale,
  type RouteKey,
} from "@/i18n/config";

/** Works out which page the visitor is on from the public URL. */
function currentRoute(pathname: string): { locale: Locale; key: RouteKey; breed?: BreedId } {
  const parts = pathname.split("/").filter(Boolean);
  let locale: Locale = defaultLocale;
  if (parts[0] && isLocale(parts[0]) && parts[0] !== defaultLocale) {
    locale = parts[0];
    parts.shift();
  } else if (parts[0] === defaultLocale) {
    parts.shift();
  }
  if (parts.length === 0) return { locale, key: "home" };
  const key = pageKeyFromSlug(locale, parts[0]) ?? "home";
  const breed = key === "breeds" && parts[1] ? breedIdFromSlug(locale, parts[1]) : undefined;
  return { locale, key, breed };
}

export function LanguageSwitcher({ label, dark = false }: { label: string; dark?: boolean }) {
  const pathname = usePathname() ?? "/";
  const { locale, key, breed } = currentRoute(pathname);
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
            href={breed ? pathForBreed(l, breed) : pathFor(l, key)}
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
