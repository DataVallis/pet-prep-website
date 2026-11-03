import Link from "next/link";
import { pathFor, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/content/types";
import { site } from "@/lib/site";
import { companyAddress, companyIdLabels } from "@/content";
import { registry } from "@/content/registry/registry";
import { speciesHref } from "@/lib/registry/views";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const year = new Date().getFullYear();
  const ids = companyIdLabels[locale];
  return (
    <footer className="on-dark bg-graphite text-muted-dark">
      <div className="container-page flex flex-col gap-10 pb-10 pt-14">
        {/* Even grid: brand column + one column per link group (David 2026-10-25: no empty middle). */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-[minmax(0,1.5fr)_repeat(3,minmax(0,1fr))] lg:gap-x-10">
          <div className="col-span-2 flex max-w-sm flex-col gap-5 lg:col-span-1">
            <Link href={pathFor(locale, "home")} aria-label={`PetPrep — ${dict.nav.home}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/petprep-logo-horizontal-inverse.svg" alt="PetPrep" width={128} height={32} className="h-8 w-auto" />
            </Link>
            <p className="text-[15px] leading-relaxed">{dict.footer.tagline}</p>
            {/* Accessibility badge (David 2026-10-23/25): only facts that are in the app, no "certified". */}
            <Link
              href={pathFor(locale, "accessibility")}
              className="flex w-fit items-center gap-3 rounded-full border border-graphite-3 bg-white/5 py-2.5 pl-2.5 pr-4 hover:border-mint"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-mint">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#121614" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="4.5" r="1.8" />
                  <path d="M5 8.5l7 1.5 7-1.5M12 10v5M9 21l3-6 3 6" />
                </svg>
              </span>
              <span className="flex flex-col">
                <span className="text-[15px] font-semibold text-fog">{dict.footer.a11yBadge.title}</span>
                <span className="text-[13px] leading-snug">{dict.footer.a11yBadge.text}</span>
              </span>
            </Link>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
              <LanguageSwitcher label={dict.lang.label} dark align="left" />
              <span className="flex items-center gap-4">
                <a href={site.social.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok" title="TikTok" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-graphite-3 hover:border-mint hover:text-mint">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12.53.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                  </svg>
                </a>
                <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" title="Instagram" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-graphite-3 hover:border-mint hover:text-mint">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                  </svg>
                </a>
                <a href={site.social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" title="YouTube" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-graphite-3 hover:border-mint hover:text-mint">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M2.5 7.2c.2-1.5 1.3-2.6 2.8-2.8C7.4 4.1 9.7 4 12 4s4.6.1 6.7.4c1.5.2 2.6 1.3 2.8 2.8.3 1.6.5 3.2.5 4.8s-.2 3.2-.5 4.8c-.2 1.5-1.3 2.6-2.8 2.8-2.1.3-4.4.4-6.7.4s-4.6-.1-6.7-.4c-1.5-.2-2.6-1.3-2.8-2.8C2.2 15.2 2 13.6 2 12s.2-3.2.5-4.8zM10 8.5v7l6-3.5-6-3.5z" />
                  </svg>
                </a>
              </span>
            </div>
          </div>
          <div className="contents text-sm">
            {dict.footer.groups.map((g) => (
              <nav key={g.title} aria-label={g.title} className="flex flex-col gap-2.5">
                <h2 className="font-semibold text-fog">{g.title}</h2>
                {g.links.flatMap((k) => [
                  <Link key={k} href={pathFor(locale, k)} className="hover:text-fog">
                    {dict.pages[k].navLabel ?? dict.pages[k].eyebrow}
                  </Link>,
                  // Species catalogues of the animal register, indented under "Animals".
                  ...(k === "animals"
                    ? registry.species.map((sp) => (
                        <Link key={sp.id} href={speciesHref(locale, sp)} className="pl-3 hover:text-fog">
                          {sp.name[locale].many}
                        </Link>
                      ))
                    : []),
                ])}
              </nav>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-4 border-t border-graphite-3 pt-6 text-[13px]">
          <span>
            © {year} {site.name}. {dict.footer.rights} {dict.footer.dataEu}
          </span>
          <span>{dict.footer.languages}</span>
          {/* CookieYes opens its preference centre on any element with this class. */}
          <button type="button" className="cky-banner-element underline-offset-2 hover:text-fog hover:underline">
            {dict.footer.cookieSettings}
          </button>
          {/* Operator identity (ZEPT / GDPR): legal name, registered address and identifiers. */}
          <p className="w-full text-[12px] leading-relaxed">
            {dict.footer.company} {site.company.legalName}, {companyAddress(locale)} · {ids.vat} {site.company.vatId} · {ids.registration} {site.company.registrationNumber}
          </p>
        </div>
      </div>
    </footer>
  );
}
