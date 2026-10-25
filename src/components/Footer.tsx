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
              <LanguageSwitcher label={dict.lang.label} dark />
              <span className="flex gap-4 text-sm">
                <a href={site.social.tiktok} target="_blank" rel="noopener noreferrer" className="hover:text-fog">TikTok</a>
                <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-fog">Instagram</a>
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
