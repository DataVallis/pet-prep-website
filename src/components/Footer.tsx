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
        <div className="flex flex-wrap justify-between gap-10">
          <div className="flex max-w-xs flex-col gap-4">
            <Link href={pathFor(locale, "home")} aria-label={`PetPrep — ${dict.nav.home}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/petprep-logo-horizontal-inverse.svg" alt="PetPrep" width={128} height={32} className="h-8 w-auto" />
            </Link>
            <p className="text-[15px] leading-relaxed">{dict.footer.tagline}</p>
            <LanguageSwitcher label={dict.lang.label} dark />
          </div>
          <div className="flex flex-wrap gap-12 text-sm">
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
