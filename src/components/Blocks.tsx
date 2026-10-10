import type { Locale } from "@/i18n/config";
import type { Block, Dictionary } from "@/content/types";
import { companyAddress, companyIdLabels, fillPlaceholders } from "@/content";
import { site } from "@/lib/site";
import { ContactCards } from "./ContactCards";
import { AnimalsHub } from "./registry/AnimalsHub";
import { Faq } from "./Faq";
import { Pricing } from "./Pricing";
import { Screen } from "./Screen";
import { RichText } from "./RichText";

const tagDot: Record<string, string> = { ok: "bg-ok", warn: "bg-warn-fill", danger: "bg-danger" };
const tagBg: Record<string, string> = { ok: "bg-mint-tint", warn: "bg-warn-tint", danger: "bg-danger-tint" };

function Heading({ children }: { children?: string }) {
  if (!children) return null;
  return <h2 className="h-card text-[28px] leading-tight sm:text-[34px]">{children}</h2>;
}

function Intro({ children, locale }: { children?: string; locale: Locale }) {
  if (!children) return null;
  return (
    <p className="max-w-3xl text-[17px] leading-relaxed text-muted">
      <RichText text={children} locale={locale} />
    </p>
  );
}

/** The operator's legal identity as a definition list (footer-independent, quotable). */
export function CompanyDetails({ locale }: { locale: Locale }) {
  const c = site.company;
  const l = companyIdLabels[locale];
  const rows: [string, React.ReactNode][] = [
    [l.legalName, c.legalName],
    [l.address, companyAddress(locale)],
    [l.vat, `${c.vatId}${c.vatRegistered ? ` (${l.vatPayer})` : ""}`],
    [l.registration, c.registrationNumber],
    [l.web, <a key="w" href={c.url} className="rich-link" rel="noopener">{c.url.replace(/^https:\/\//, "")}</a>],
  ];
  return (
    <dl className="grid max-w-3xl gap-x-6 gap-y-2 rounded-[22px] border border-line bg-white p-6 text-[15px] sm:grid-cols-[max-content_1fr]">
      {rows.map(([k, v]) => (
        <div key={k} className="contents">
          <dt className="font-semibold">{k}</dt>
          <dd className="text-[#2a312d]">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

function Tick() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="mt-0.5 shrink-0 text-mint-text">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export function Blocks({ blocks, locale, dict }: { blocks: Block[]; locale: Locale; dict: Dictionary }) {
  return (
    <div className="flex flex-col gap-16 sm:gap-20">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "prose":
            return (
              <section key={i} id={b.id} className="flex scroll-mt-24 flex-col gap-4">
                <Heading>{b.heading}</Heading>
                <div className="flex max-w-3xl flex-col gap-4 text-[17px] leading-relaxed text-[#2a312d]">
                  {b.paragraphs.map((p) => <p key={p}><RichText text={p} locale={locale} /></p>)}
                </div>
              </section>
            );
          case "list":
            return (
              <section key={i} id={b.id} className="flex scroll-mt-24 flex-col gap-5">
                <Heading>{b.heading}</Heading>
                <Intro locale={locale}>{b.intro}</Intro>
                <ul className="grid max-w-4xl gap-3.5">
                  {b.items.map((item) => (
                    <li key={item} className="flex gap-3 text-[17px] leading-relaxed"><Tick /><span><RichText text={item} locale={locale} /></span></li>
                  ))}
                </ul>
              </section>
            );
          case "cards":
            return (
              <section key={i} className="flex flex-col gap-6">
                <Heading>{b.heading}</Heading>
                <Intro locale={locale}>{b.intro}</Intro>
                <div className={`grid gap-4 sm:grid-cols-2 ${b.columns === 3 ? "lg:grid-cols-3" : ""}`}>
                  {b.items.map((c) => (
                    <div key={c.title} className={`flex flex-col gap-2.5 rounded-[22px] border border-line p-6 ${c.tag ? tagBg[c.tag] : "bg-white"}`}>
                      <h3 className="h-card flex items-center gap-2.5 text-xl">
                        {c.tag ? <span aria-hidden="true" className={`h-2.5 w-2.5 rounded-full ${tagDot[c.tag]}`} /> : null}
                        {c.title}
                      </h3>
                      <p className="text-[15px] leading-relaxed text-muted"><RichText text={c.text} locale={locale} /></p>
                    </div>
                  ))}
                </div>
              </section>
            );
          case "steps":
            return (
              <section key={i} className="flex flex-col gap-6">
                <Heading>{b.heading}</Heading>
                <Intro locale={locale}>{b.intro}</Intro>
                <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {b.items.map((s, n) => (
                    <li key={s.title} className="flex flex-col gap-3 rounded-[22px] border border-line bg-white p-6">
                      <span className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-graphite font-display text-xl font-extrabold text-mint" aria-hidden="true">{n + 1}</span>
                      <h3 className="h-card text-xl">{s.title}</h3>
                      <p className="text-[15px] leading-relaxed text-muted">{s.text}</p>
                    </li>
                  ))}
                </ol>
              </section>
            );
          case "screens":
            return (
              <section key={i} className="flex flex-col gap-8 rounded-[30px] bg-mint-tint px-5 py-10 sm:px-10">
                <div className="flex flex-col gap-3">
                  <Heading>{b.heading}</Heading>
                  <Intro locale={locale}>{b.intro}</Intro>
                </div>
                <div className={`grid justify-items-center gap-10 ${b.items.length > 1 ? "sm:grid-cols-2 lg:grid-cols-3" : ""}`}>
                  {b.items.map((s) => (
                    <Screen key={s.screen} locale={locale} screen={s.screen} caption={s.caption || dict.screens[s.screen]} />
                  ))}
                </div>
                <p className="text-center text-[13px] text-muted">{dict.common.screensNote}</p>
              </section>
            );
          case "table":
            return (
              <section key={i} className="flex flex-col gap-5">
                <Heading>{b.heading}</Heading>
                <Intro locale={locale}>{b.intro}</Intro>
                <div className="overflow-x-auto rounded-[22px] border border-line bg-white">
                  <table className="w-full min-w-[560px] border-collapse text-left text-[15px]">
                    <thead>
                      <tr className="border-b border-line bg-fog/60">
                        {b.head.map((h) => <th key={h} scope="col" className="px-5 py-3.5 font-semibold">{h}</th>)}
                      </tr>
                    </thead>
                    <tbody>
                      {b.rows.map((r) => (
                        <tr key={r.join("|")} className="border-b border-line last:border-0">
                          {r.map((c, ci) => (ci === 0 ? <th key={ci} scope="row" className="px-5 py-3.5 font-semibold">{c}</th> : <td key={ci} className="px-5 py-3.5 text-muted">{c}</td>))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {b.note ? <p className="max-w-3xl text-sm leading-relaxed text-muted"><RichText text={b.note} locale={locale} /></p> : null}
              </section>
            );
          case "faq":
            return (
              <section key={i} id={b.id} className="flex scroll-mt-24 flex-col gap-6">
                <Heading>{b.heading}</Heading>
                {/* Without a block heading the questions are the page's second level (no H1 → H3 jump). */}
                <Faq items={b.items} locale={locale} headingLevel={b.heading ? 3 : 2} />
              </section>
            );
          case "callout":
            return (
              <aside key={i} className={`flex flex-col gap-3 rounded-[30px] p-8 sm:p-10 ${b.tone === "dark" ? "on-dark bg-graphite text-fog" : "bg-mint"}`}>
                <p className="font-display text-[28px] font-extrabold leading-tight tracking-[-0.02em] sm:text-[34px]">{b.title}</p>
                <p className={`max-w-2xl text-[17px] leading-relaxed ${b.tone === "dark" ? "text-muted-dark" : ""}`}>{b.text}</p>
              </aside>
            );
          case "pricing":
            // The plans are first on /pricing, right under the H1: plan names are H2 there.
            return <Pricing key={i} locale={locale} dict={dict} headingLevel={i === 0 ? 2 : 3} />;
          case "contact":
            return <ContactCards key={i} dict={dict} />;
          case "company":
            return (
              <section key={i} id={b.id} className="flex scroll-mt-24 flex-col gap-5">
                <Heading>{b.heading}</Heading>
                <Intro locale={locale}>{b.intro}</Intro>
                <CompanyDetails locale={locale} />
              </section>
            );
          case "animalsHub":
            return <AnimalsHub key={i} locale={locale} />;
          case "cookies":
            return (
              <section key={i} className="prose-legal max-w-3xl" aria-labelledby="cookies">
                <h2 id="cookies">{b.heading}</h2>
                {b.paragraphs.map((p) => <p key={p}>{fillPlaceholders(p, locale)}</p>)}
                <p>
                  <button type="button" className="cky-banner-element btn btn-secondary mt-2">
                    {b.settings}
                  </button>
                </p>
                {/* CookieYes fills this element with the live cookie table from its latest scan. */}
                <div className="cky-audit-table-element cookie-table mt-6" />
                <noscript>
                  <p>{fillPlaceholders(b.fallback, locale)}</p>
                </noscript>
              </section>
            );
          case "legal":
            return (
              <div key={i} className="prose-legal max-w-3xl">
                {b.sections.map((s) => (
                  <section key={s.heading}>
                    <h2>{s.heading}</h2>
                    {s.paragraphs?.map((p) => <p key={p}>{fillPlaceholders(p, locale)}</p>)}
                    {s.items ? (
                      <ul>{s.items.map((it) => <li key={it}>{fillPlaceholders(it, locale)}</li>)}</ul>
                    ) : null}
                  </section>
                ))}
              </div>
            );
        }
      })}
    </div>
  );
}
