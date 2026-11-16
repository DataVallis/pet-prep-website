import { pathFor } from "@/i18n/config";
import { promiseKitConfig, promiseKitPath } from "@/lib/promiseKit";
import { realCostCopy, type RealCostLocale } from "@/content/realCost";
import { realCostQuery, type RealCostProfile } from "@/lib/realCostProfile";

const card = "rounded-[22px] bg-white shadow-[0_1px_2px_rgba(18,22,20,0.04),0_10px_30px_rgba(18,22,20,0.06)]";

/**
 * "How much work is a dog?" (M6-S04; one page per dog breed since M6-S07). The breed's numbers reach the
 * embedded app as query parameters (src/lib/realCostProfile.ts → realCostQuery; the app validates each one). The interactive 3D part is a self-contained document
 * (public/real-cost/app.html, built by `npm run real-cost:build` from tools/real-cost/) shown in a
 * same-origin <iframe>: three.js loads only here, the experience keeps its own layout, and "Print" inside
 * it prints only the summary sheet. The text below the frame is the indexable content of the page.
 */
export function RealCostPage({ locale, name, profile }: { locale: RealCostLocale; name: string; profile: RealCostProfile }) {
  const c = realCostCopy(locale, name, profile);
  const kit = promiseKitConfig();
  const query = new URLSearchParams({ lang: locale, home: pathFor(locale, "home"), partners: pathFor(locale, "partners"), ...realCostQuery(profile, name) });
  if (kit.enabled) query.set("kit", promiseKitPath(locale));

  return (
    <div className="bg-fog text-graphite">
      <section aria-labelledby="rc-title" className="container-page flex flex-col gap-4 pb-6 pt-10 sm:pt-14">
        <p className="eyebrow">{c.eyebrow}</p>
        <h1 id="rc-title" className="h-display text-[clamp(34px,5vw,56px)] leading-[1.05]">{c.title}</h1>
        <p className="max-w-[680px] text-[18px] leading-7 text-muted">{c.lead}</p>
      </section>

      <section aria-label={c.frameTitle} className="container-page pb-12">
        <iframe
          src={`/real-cost/app.html?${query.toString()}`}
          title={c.frameTitle}
          className="block h-[max(640px,calc(100svh-120px))] w-full rounded-[28px] border border-line bg-fog"
        />
        <noscript>
          <p className="mt-3 text-[15px] text-muted">{c.noScript}</p>
        </noscript>
      </section>

      <section aria-labelledby="rc-facts" className="container-page flex flex-col gap-5 pb-14">
        <h2 id="rc-facts" className="font-display text-[clamp(26px,3vw,36px)] font-bold leading-[1.1] tracking-[-0.6px]">{c.facts.title}</h2>
        <p className="text-[17px] text-muted">{c.facts.intro}</p>
        <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {c.facts.rows.map((r) => (
            <div key={r.label} className={`${card} flex flex-col gap-1 p-5`}>
              <dt className="text-[14px] font-semibold text-muted">{r.label}</dt>
              <dd className="font-display text-[22px] font-bold leading-tight">{r.value}</dd>
              <dd className="text-[15px] text-muted">{r.note}</dd>
            </div>
          ))}
        </dl>
        <p className="max-w-3xl text-[15px] leading-relaxed text-muted">{c.facts.footnote}</p>
      </section>

      <section aria-labelledby="rc-how" className="container-page grid gap-10 pb-16 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <h2 id="rc-how" className="font-display text-[clamp(24px,2.6vw,30px)] font-bold leading-[1.1]">{c.how.title}</h2>
          <ol className="flex list-decimal flex-col gap-2 pl-5 text-[17px] leading-relaxed">
            {c.how.items.map((item) => <li key={item}>{item}</li>)}
          </ol>
          <h3 className="mt-4 text-[17px] font-semibold">{c.email.title}</h3>
          <p className="text-[16px] leading-relaxed text-muted">{c.email.text}</p>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="font-display text-[clamp(24px,2.6vw,30px)] font-bold leading-[1.1]">{c.sources.title}</h2>
          <ul className="flex list-disc flex-col gap-2 pl-5 text-[16px] leading-relaxed text-muted">
            {c.sources.items.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </section>
    </div>
  );
}
