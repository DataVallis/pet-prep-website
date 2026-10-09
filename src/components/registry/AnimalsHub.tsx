import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { registry } from "@/content/registry/registry";
import { activityText, getRegistryCopy, speciesHref } from "@/lib/registry/views";

/** The /animals page body: one card per species from the registry, then how the register is built. */
export function AnimalsHub({ locale }: { locale: Locale }) {
  const c = getRegistryCopy(locale);
  return (
    <div className="flex flex-col gap-16 sm:gap-20">
      <section aria-label={c.catalogue.eyebrow}>
        <ul className="grid gap-4 md:grid-cols-2">
          {registry.species.map((sp) => (
            <li key={sp.id} className="flex flex-col gap-4 rounded-[22px] border border-line bg-white p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] ${
                    sp.status === "available" ? "bg-graphite text-mint" : "bg-fog text-graphite ring-1 ring-line"
                  }`}
                >
                  {c.speciesStatus[sp.status]}
                </span>
              </div>
              <h2 className="h-card text-[30px] leading-tight">
                <Link href={speciesHref(locale, sp)} className="hover:text-mint-text">
                  {sp.name[locale].many}
                </Link>
              </h2>
              <p className="text-[17px] font-medium">{c.hub.breedCount(sp.breed_count)}</p>
              <p className="text-[15px] leading-relaxed text-muted">{c.hub.freePlan(sp.free_plan.name[locale], activityText(locale, sp.free_plan.adult_activity))}</p>
              <Link href={speciesHref(locale, sp)} className="btn btn-secondary mt-auto self-start">
                {c.hub.open(sp.name[locale].many)} <span aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-4 rounded-[22px] bg-mint-tint px-6 py-4 text-[15px] font-medium">{c.hub.otherSpecies}</p>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="h-card text-[28px] leading-tight sm:text-[34px]">{c.hub.methodTitle}</h2>
        <ul className="grid max-w-4xl gap-3.5">
          {c.hub.method.map((m) => (
            <li key={m} className="flex gap-3 text-[17px] leading-relaxed">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="mt-0.5 shrink-0 text-mint-text">
                <path d="M20 6 9 17l-5-5" />
              </svg>
              {m}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
