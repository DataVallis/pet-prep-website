import type { Metadata } from "next";
import Link from "next/link";
import en from "@/content/en";
import { getDictionary } from "@/content";
import { defaultLocale, localeMeta, locales, pathFor, type Locale } from "@/i18n/config";
import { site } from "@/lib/site";
import { fontClasses } from "./fonts";
import "./globals.css";

/**
 * 404 for URLs that match no route (experimental.globalNotFound): the root layout lives under
 * [locale], so without this file Next.js would show its unbranded default page. English first
 * (the default locale), with the way back in every other site language below. Next.js adds noindex.
 */
export const metadata: Metadata = {
  title: `${en.common.notFoundTitle} | PetPrep`,
  description: en.common.notFoundText,
};

const links = (dict: typeof en, locale: Locale) => [
  { href: pathFor(locale, "home"), label: dict.common.notFoundCta, primary: true },
  { href: pathFor(locale, "animals"), label: dict.pages.animals.navLabel ?? dict.pages.animals.eyebrow },
  { href: pathFor(locale, "howItWorks"), label: dict.pages.howItWorks.eyebrow },
  { href: pathFor(locale, "faq"), label: dict.pages.faq.navLabel ?? dict.pages.faq.eyebrow },
];

export default function GlobalNotFound() {
  return (
    <html lang="en" className={fontClasses}>
      <body className="flex min-h-screen flex-col">
        <header className="border-b border-line bg-fog">
          <div className="container-page flex h-16 items-center">
            <Link href="/" aria-label="PetPrep — Home">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/petprep-logo-horizontal.svg" alt="PetPrep" width={128} height={32} className="h-8 w-auto" />
            </Link>
          </div>
        </header>
        <main id="main" className="container-page flex flex-1 flex-col items-start gap-6 py-20 sm:py-28">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/petprep-mark.svg" alt="" width={96} height={96} />
          <p className="eyebrow">404</p>
          <h1 className="h-display text-[clamp(36px,5vw,60px)]">{en.common.notFoundTitle}</h1>
          <p className="text-lg text-muted">{en.common.notFoundText}</p>
          <nav aria-label="English" className="flex flex-wrap gap-3">
            {links(en, "en").map((l) => (
              <Link key={l.href} href={l.href} className={`btn ${l.primary ? "btn-primary" : "btn-secondary"}`}>
                {l.label}
              </Link>
            ))}
          </nav>
          {locales.filter((l) => l !== defaultLocale).map((l) => {
            const d = getDictionary(l);
            const lang = localeMeta[l].htmlLang;
            return (
              <section key={l} lang={lang} aria-labelledby={`nf-${l}`} className="mt-8 flex flex-col gap-3 border-t border-line pt-8">
                <h2 id={`nf-${l}`} className="h-card text-2xl">{d.common.notFoundTitle}</h2>
                <p className="text-muted">{d.common.notFoundText}</p>
                <nav aria-label={localeMeta[l].label} className="flex flex-wrap gap-3">
                  {links(d, l).map((x) => (
                    <Link key={x.href} href={x.href} hrefLang={lang} className={`btn ${x.primary ? "btn-primary" : "btn-secondary"}`}>
                      {x.label}
                    </Link>
                  ))}
                </nav>
              </section>
            );
          })}
        </main>
        <footer className="on-dark bg-graphite py-6 text-[13px] text-muted-dark">
          <div className="container-page">© PetPrep · {site.company.legalName}, {site.company.city}</div>
        </footer>
      </body>
    </html>
  );
}
