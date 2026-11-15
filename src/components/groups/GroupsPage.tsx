import Image from "next/image";
import { groupsContact, groupsCopy as c } from "@/content/groups";
import { Faq } from "@/components/Faq";

const card = "rounded-[22px] bg-white shadow-[0_1px_2px_rgba(18,22,20,0.04),0_10px_30px_rgba(18,22,20,0.06)]";
const btnDark = "inline-flex min-h-12 items-center rounded-xl bg-graphite px-5 text-[15px] font-semibold text-white hover:opacity-90";

function Head({ id, eyebrow, title, dark = false }: { id: string; eyebrow: string; title: string; dark?: boolean }) {
  return (
    <div className="flex max-w-3xl flex-col gap-3">
      <p className={`eyebrow ${dark ? "!text-mint" : ""}`}>{eyebrow}</p>
      <h2 id={id} className="font-display text-[clamp(28px,3.4vw,40px)] font-bold leading-[1.1] tracking-[-0.6px]">{title}</h2>
    </div>
  );
}

function Ticks({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item} className={`${card} flex items-start gap-3 p-5`}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="mt-0.5 shrink-0 text-mint-text">
            <path d="M20 6 9 17l-5-5" />
          </svg>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** /groups — hidden English-only pilot page (see src/content/groups.ts for the rules). */
export function GroupsPage() {
  return (
    <div className="bg-fog text-graphite">
      <section aria-labelledby="grp-hero" className="container-page grid items-center gap-10 pb-16 pt-12 sm:pb-20 sm:pt-20 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="flex flex-col gap-6">
          <p className="inline-flex w-fit rounded-full bg-mint-tint px-3 py-1 text-[13px] font-semibold text-mint-text">{c.badge}</p>
          <h1 id="grp-hero" className="h-display text-[clamp(36px,5vw,60px)] leading-[1.05]">{c.title}</h1>
          <p className="max-w-[640px] text-[18px] leading-7 text-muted">{c.lead}</p>
          <div>
            <a href={groupsContact} className={btnDark}>{c.cta}</a>
          </div>
          <p className="max-w-[640px] text-[14px] text-muted">{c.small}</p>
        </div>
        <figure className="mx-auto w-full max-w-[380px]">
          <Image src={c.image.src} alt={c.image.alt} width={1024} height={1024} sizes="(min-width: 1024px) 380px, 80vw" priority className="aspect-square w-full rounded-[28px] object-cover" />
          <figcaption className="mt-2 text-center text-[13px] text-muted">{c.image.caption}</figcaption>
        </figure>
      </section>

      <section aria-labelledby="grp-why" className="container-page flex flex-col gap-6 pb-16 sm:pb-20">
        <Head id="grp-why" eyebrow={c.why.eyebrow} title={c.why.title} />
        <div className="flex max-w-3xl flex-col gap-4 text-[17px] leading-relaxed text-muted">
          {c.why.text.map((p) => <p key={p}>{p}</p>)}
        </div>
      </section>

      <section aria-labelledby="grp-week" className="container-page flex flex-col gap-8 pb-16 sm:pb-20">
        <Head id="grp-week" eyebrow={c.week.eyebrow} title={c.week.title} />
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {c.week.steps.map((s, i) => (
            <li key={s.title} className={`${card} flex flex-col gap-2 p-6`}>
              <span className="font-display text-[32px] font-bold leading-none text-mint-text" aria-hidden="true">{i + 1}</span>
              <h3 className="text-[18px] font-semibold">{s.title}</h3>
              <p className="text-[15px] leading-relaxed text-muted">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="grp-practise" className="container-page flex flex-col gap-8 pb-16 sm:pb-20">
        <Head id="grp-practise" eyebrow={c.practise.eyebrow} title={c.practise.title} />
        <Ticks items={c.practise.items} />
      </section>

      <section aria-labelledby="grp-adult" className="bg-graphite text-fog">
        <div className="container-page flex flex-col gap-8 py-16 sm:py-20">
          <Head id="grp-adult" eyebrow={c.adult.eyebrow} title={c.adult.title} dark />
          <ul className="grid gap-3 sm:grid-cols-2">
            {c.adult.items.map((item) => (
              <li key={item} className="flex items-start gap-3 rounded-[18px] bg-graphite-2 p-5">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="mt-0.5 shrink-0 text-mint">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="grp-checkins" className="container-page flex flex-col gap-6 py-16 sm:py-20">
        <Head id="grp-checkins" eyebrow={c.checkins.eyebrow} title={c.checkins.title} />
        <p className="max-w-3xl text-[17px] leading-relaxed text-muted">{c.checkins.text}</p>
      </section>

      <section aria-labelledby="grp-privacy" className="container-page flex flex-col gap-8 pb-16 sm:pb-20">
        <Head id="grp-privacy" eyebrow={c.privacy.eyebrow} title={c.privacy.title} />
        <Ticks items={c.privacy.items} />
      </section>

      <section aria-labelledby="grp-honest" className="container-page flex flex-col gap-6 pb-16 sm:pb-20">
        <Head id="grp-honest" eyebrow={c.honest.eyebrow} title={c.honest.title} />
        <p className="max-w-3xl text-[17px] leading-relaxed text-muted">{c.honest.text}</p>
        <div className="max-w-3xl rounded-[22px] bg-warn-tint p-6">
          <p className="font-semibold">{c.honest.plannedLabel}</p>
          <ul className="mt-2 list-disc pl-5 text-[15px] leading-relaxed">
            {c.honest.planned.map((p) => <li key={p}>{p}</li>)}
          </ul>
        </div>
      </section>

      {c.showPartners ? (
        <section aria-labelledby="grp-partners" className="container-page flex flex-col gap-6 pb-16 sm:pb-20">
          <h2 id="grp-partners" className="font-display text-[24px] font-bold">{c.partners.title}</h2>
          <ul className="grid gap-4 sm:grid-cols-3">
            {c.partners.logos.map((l) => <li key={l.name} className={`${card} flex min-h-24 items-center justify-center p-6 text-muted`}>{l.name}</li>)}
          </ul>
        </section>
      ) : null}

      {c.showVoices ? (
        <section aria-labelledby="grp-voices" className="container-page flex flex-col gap-6 pb-16 sm:pb-20">
          <h2 id="grp-voices" className="font-display text-[24px] font-bold">{c.voices.title}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {c.voices.quotes.map((q, i) => (
              <figure key={i} className={`${card} p-6`}>
                <blockquote className="text-[17px] leading-relaxed">{q.text}</blockquote>
                <figcaption className="mt-3 text-[14px] text-muted">{q.who}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      ) : null}

      <section aria-labelledby="grp-pilot" className="container-page pb-16 sm:pb-20">
        <div className="flex flex-col gap-6 rounded-[28px] bg-mint p-8 sm:p-12">
          <Head id="grp-pilot" eyebrow={c.pilot.eyebrow} title={c.pilot.title} />
          <p className="max-w-3xl text-[17px] leading-relaxed">{c.pilot.text}</p>
          <div>
            <a href={groupsContact} className={btnDark}>{c.cta}</a>
          </div>
        </div>
      </section>

      <section aria-labelledby="grp-faq" className="container-page flex flex-col gap-6 pb-20">
        <h2 id="grp-faq" className="font-display text-[clamp(24px,3vw,32px)] font-bold">{c.faq.title}</h2>
        <Faq items={c.faq.items} locale="en" />
      </section>
    </div>
  );
}
