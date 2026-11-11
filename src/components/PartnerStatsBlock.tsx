import registry from "@/content/registry/registry.json";
import { locales } from "@/i18n/config";
import { partnerCopy, type PartnerLang } from "@/content/partners";
import { computePartnerStats, fill, formatAsOf } from "@/lib/partnerStats";

/**
 * Measured numbers with a date (M6-S03): breeds in the register and website languages, counted from
 * the repo data at build time (the page is static, so the date is the build date). Not derivable yet:
 * views of the "12 Weeks" series and audience size, shown in development only (never in production).
 */
export function PartnerStatsBlock({ lang }: { lang: PartnerLang }) {
  const c = partnerCopy[lang].stats;
  const stats = computePartnerStats(registry as unknown as { breeds: { species?: unknown }[] }, locales, new Date());
  type Item = { value: number; label: string; note: string };
  const items: (Item | null)[] = [
    stats.breeds ? { value: stats.breeds.total, label: c.breeds, note: fill(c.breedsNote, { dogs: stats.breeds.dogs, cats: stats.breeds.cats }) } : null,
    stats.languages ? { value: stats.languages, label: c.languages, note: c.languagesNote } : null,
  ];
  const shown = items.filter((x): x is Item => x !== null);
  if (!shown.length) return null;
  return (
    <section id="stevilke" className="flex scroll-mt-24 flex-col gap-6">
      <h2 className="h-card text-[28px] leading-tight sm:text-[34px]">{c.heading}</h2>
      <p className="max-w-3xl text-[17px] leading-relaxed text-muted">{fill(c.intro, { date: formatAsOf(stats.asOf, lang) })}</p>
      <dl className="grid gap-4 sm:grid-cols-2">
        {shown.map((it) => (
          <div key={it.label} className="flex flex-col gap-1 rounded-[22px] border border-line bg-white p-6">
            <dt className="order-2 font-semibold">{it.label}</dt>
            <dd className="order-1 font-display text-[44px] font-extrabold leading-none tracking-[-0.02em]">{it.value}</dd>
            <dd className="order-3 text-[15px] leading-relaxed text-muted">{it.note}</dd>
          </div>
        ))}
      </dl>
      {/* TODO(David): views of the "12 Weeks" series and the size of the audience — add here once measured. */}
      {process.env.NODE_ENV !== "production" ? (
        <p className="max-w-3xl rounded-[14px] border border-dashed border-graphite/40 px-4 py-3 text-sm">TODO(David): series views / audience size (development only, hidden in production).</p>
      ) : null}
    </section>
  );
}
