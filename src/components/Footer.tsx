import Link from "next/link";
import { pathFor, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/content/types";
import { site } from "@/lib/site";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const year = new Date().getFullYear();
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
                {g.links.map((k) => (
                  <Link key={k} href={pathFor(locale, k)} className="hover:text-fog">
                    {dict.pages[k].navLabel ?? dict.pages[k].eyebrow}
                  </Link>
                ))}
              </nav>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-4 border-t border-graphite-3 pt-6 text-[13px]">
          <span>
            © {year} {site.name}. {dict.footer.rights} {dict.footer.dataEu}
          </span>
          <span>
            {dict.footer.company} {site.company.name}, {site.company.city}. {dict.footer.languages}
          </span>
          {/* CookieYes opens its preference centre on any element with this class. */}
          <button type="button" className="cky-banner-element underline-offset-2 hover:text-fog hover:underline">
            {dict.footer.cookieSettings}
          </button>
        </div>
      </div>
    </footer>
  );
}
