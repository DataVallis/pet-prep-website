import Link from "next/link";
import { pathFor, type Locale, type PageKey } from "@/i18n/config";
import type { Dictionary } from "@/content/types";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { PrimaryCta } from "./Cta";

const navKeys: PageKey[] = ["howItWorks", "parents", "animals", "afterAdoption", "pricing"];

export function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const label = (k: PageKey) => dict.pages[k].navLabel ?? dict.pages[k].eyebrow;
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-fog/90 backdrop-blur-md">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-white focus:px-3 focus:py-2">
        {dict.nav.skip}
      </a>
      <div className="container-page flex h-16 items-center gap-6">
        <Link href={pathFor(locale, "home")} className="flex shrink-0 items-center" aria-label={`PetPrep — ${dict.nav.home}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/petprep-logo-horizontal.svg" alt="PetPrep" width={128} height={32} className="h-8 w-auto" />
        </Link>

        <nav aria-label="Main" className="hidden flex-1 items-center gap-7 text-[15px] font-medium lg:flex">
          {navKeys.map((k) => (
            <Link key={k} href={pathFor(locale, k)} className="hover:text-mint-text">
              {label(k)}
            </Link>
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-3 lg:flex">
          <LanguageSwitcher label={dict.lang.label} />
          <PrimaryCta locale={locale} dict={dict} className="!min-h-10 !px-4 !text-[15px]" />
        </div>

        {/* Mobile menu: works without JavaScript */}
        <details className="group relative ml-auto lg:hidden">
          <summary className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-xl border border-line bg-white [&::-webkit-details-marker]:hidden" aria-label={dict.nav.menu}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" className="group-open:hidden">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" className="hidden group-open:block">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </summary>
          <div className="absolute right-0 top-14 w-[min(88vw,340px)] rounded-[22px] border border-line bg-white p-5 shadow-xl">
            <nav aria-label="Mobile" className="flex flex-col">
              {(["howItWorks", "parents", "animals", "afterAdoption", "pricing", "faq", "contact"] as PageKey[]).map((k) => (
                <Link key={k} href={pathFor(locale, k)} className="border-b border-line py-3 text-[17px] font-semibold last:border-0">
                  {label(k)}
                </Link>
              ))}
            </nav>
            <div className="mt-4 flex flex-col gap-4">
              <LanguageSwitcher label={dict.lang.label} />
              <PrimaryCta locale={locale} dict={dict} />
            </div>
          </div>
        </details>
      </div>
    </header>
  );
}
