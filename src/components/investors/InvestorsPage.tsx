import Link from "next/link";
import { pathFor } from "@/i18n/config";
import { getDictionary } from "@/content";
import { investorEmail, investorsCopy as c, webSummitUntil, youtube, type Status } from "@/content/investors";
import type { InvestorStats } from "@/lib/investorStatsCore";
import { ContactCards } from "@/components/ContactCards";
import { ClickToPlay } from "./ClickToPlay";

const fmt = new Intl.NumberFormat("en-GB");
const n = (x: number) => fmt.format(x);

const chip: Record<Status, string> = {
  live: "bg-mint-tint text-mint-text",
  building: "bg-warn-tint text-warn",
  planned: "bg-white text-muted ring-1 ring-line",
};

function Chip({ status, label }: { status: Status; label: string }) {
  return <span className={`inline-flex w-fit shrink-0 rounded-full px-2.5 py-0.5 text-[12px] font-semibold leading-5 ${chip[status]}`}>{label}</span>;
}

function Head({ id, eyebrow, title, lead, dark = false }: { id: string; eyebrow: string; title: string; lead?: string; dark?: boolean }) {
  return (
    <div className="flex max-w-3xl flex-col gap-3">
      <p className={`eyebrow ${dark ? "!text-mint" : ""}`}>{eyebrow}</p>
      <h2 id={id} className="font-display text-[clamp(28px,3.4vw,40px)] font-bold leading-[1.1] tracking-[-0.6px]">{title}</h2>
      {lead ? <p className={dark ? "text-muted-dark" : "text-muted"}>{lead}</p> : null}
    </div>
  );
}

const btnDark = "inline-flex min-h-12 items-center rounded-xl bg-graphite px-5 text-[15px] font-semibold text-white hover:opacity-90";
const btnLine = "inline-flex min-h-12 items-center rounded-xl border-[1.5px] border-graphite px-5 text-[15px] font-semibold text-graphite hover:bg-white";
const card = "rounded-[22px] bg-white shadow-[0_1px_2px_rgba(18,22,20,0.04),0_10px_30px_rgba(18,22,20,0.06)]";

export function InvestorsPage({ stats, now = new Date() }: { stats: InvestorStats; now?: Date }) {
  const dict = getDictionary("en");
  const showWebSummit = now.getTime() <= new Date(webSummitUntil).getTime();

  const hero = [
    stats.breeds ? { value: n(stats.breeds.total), label: c.heroStats.breeds, mint: false } : null,
    stats.sources ? { value: n(stats.sources), label: c.heroStats.sources, mint: false } : null,
    stats.episodes ? { value: n(stats.episodes), label: c.heroStats.episodes, mint: true } : null,
  ].filter((x): x is { value: string; label: string; mint: boolean } => !!x);

  const k = c.engine.cards;
  const counters = [
    stats.breeds ? { status: "live" as Status, value: n(stats.breeds.total), label: k.breeds.label, note: k.breeds.note(stats.breeds.perSpecies.dog ?? 0, stats.breeds.perSpecies.cat ?? 0) } : null,
    stats.sources ? { status: "live" as Status, value: n(stats.sources), label: k.sources.label, note: k.sources.note } : null,
    stats.episodes ? { status: "live" as Status, value: n(stats.episodes), label: k.episodes.label, note: k.episodes.note(stats.views ? n(stats.views) : null) } : null,
    stats.coloringPages ? { status: "live" as Status, value: n(stats.coloringPages), label: k.coloring.label, note: k.coloring.note } : null,
    { status: "live" as Status, value: k.curio.value, label: k.curio.label, note: k.curio.note },
    stats.foods ? { status: "building" as Status, value: n(stats.foods), label: k.foods.label, note: k.foods.note } : null,
    stats.languages ? { status: "live" as Status, value: n(stats.languages), label: k.languages.label, note: k.languages.note } : null,
    stats.vetCountries ? { status: "building" as Status, value: n(stats.vetCountries), label: k.vets.label, note: k.vets.note } : null,
  ].filter((x): x is { status: Status; value: string; label: string; note: string } => !!x);

  const m = c.engine.media;
  return (
    <div className="bg-fog text-graphite">
      {/* 1. Hero */}
      <section aria-labelledby="inv-hero" className="container-page flex flex-col gap-8 pb-16 pt-12 sm:pb-20 sm:pt-20">
        <div className="flex items-center gap-3">
          <svg width="40" height="40" viewBox="0 0 100 100" aria-hidden="true"><rect x="6" y="10" width="88" height="80" rx="30" fill="#121614" /><circle cx="35" cy="47" r="15" fill="#FFFFFF" /><circle cx="65" cy="47" r="15" fill="#FFFFFF" /><circle cx="40" cy="42" r="6.5" fill="#121614" /><circle cx="70" cy="42" r="6.5" fill="#121614" /><rect x="43" y="69" width="14" height="8" rx="4" fill="#FF6B8B" /></svg>
          <p className="eyebrow">{c.eyebrow}</p>
        </div>
        <h1 id="inv-hero" className="h-display max-w-[920px] text-[clamp(36px,5vw,64px)] leading-[1.04]">{c.title}</h1>
        <p className="max-w-[720px] text-[18px] leading-7 text-muted">{c.lead}</p>
        <div className="flex flex-wrap gap-3">
          <a href={youtube.channel} target="_blank" rel="noopener noreferrer" className={btnDark}>{c.watch}</a>
          <a href={investorEmail} className={btnLine}>{c.brief}</a>
        </div>
        {hero.length ? (
          <div className="mt-2 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {hero.map((h) => (
              <div key={h.label} className={h.mint ? "rounded-[22px] bg-mint p-6" : `${card} p-6`}>
                <p className="font-display text-[56px] font-bold leading-[56px] tracking-[-2px]">{h.value}</p>
                <p className={`mt-2 ${h.mint ? "text-graphite" : "text-muted"}`}>{h.label}</p>
              </div>
            ))}
          </div>
        ) : null}
      </section>

      {/* 2. Opportunity */}
      <section aria-labelledby="inv-opp" className="container-page flex flex-col gap-8 pb-20 pt-4">
        <Head id="inv-opp" eyebrow={c.opportunity.eyebrow} title={c.opportunity.title} />
        <div className="grid gap-4 lg:grid-cols-3">
          {c.opportunity.items.map((it, i) => (
            <div key={it.tag} className={`flex flex-col gap-2.5 rounded-[22px] p-7 ${i === 2 ? "bg-mint-tint" : "border border-line bg-white"}`}>
              <p className={`text-[12px] font-semibold uppercase tracking-[1.4px] ${i === 2 ? "text-mint-text" : "text-muted"}`}>{it.tag}</p>
              <p>{it.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Flywheel */}
      <section aria-labelledby="inv-loop" className="bg-graphite text-fog">
        <div className="container-page flex flex-col gap-10 py-20">
          <Head id="inv-loop" eyebrow={c.flywheel.eyebrow} title={c.flywheel.title} lead={c.flywheel.lead} dark />
          <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {c.flywheel.steps.map((s, i) => (
              <li key={s.title} className={`flex gap-4 rounded-[22px] p-6 ${s.highlight ? "bg-mint text-graphite" : "bg-graphite-2"}`}>
                <span aria-hidden="true" className={`flex h-9 w-9 flex-none items-center justify-center rounded-full font-bold ${s.highlight ? "bg-graphite text-mint" : "bg-graphite-3 text-mint"}`}>{i + 1}</span>
                <div>
                  <p className="font-display text-[20px] font-bold leading-6">{s.title}</p>
                  <p className={`mt-1.5 ${s.highlight ? "" : "text-muted-dark"}`}>{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 4. Content engine · live numbers */}
      <section aria-labelledby="inv-engine" className="container-page flex flex-col gap-8 py-20">
        <Head id="inv-engine" eyebrow={c.engine.eyebrow} title={c.engine.title} lead={c.engine.lead} />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {counters.map((x) => (
            <li key={x.label} className={`${card} flex flex-col gap-2.5 p-6`}>
              <Chip status={x.status} label={c.engine.status[x.status]} />
              <p className="font-display text-[40px] font-bold leading-[44px] tracking-[-1px]">{x.value}</p>
              <p className="font-semibold">{x.label}</p>
              <p className="text-[13px] leading-[18px] text-muted">{x.note}</p>
            </li>
          ))}
        </ul>
        <p className="-mt-3 text-[13px] text-muted">{c.engine.updated}</p>

        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
            <h3 className="font-display text-[22px] font-bold">{m.playlist}</h3>
            <a href={youtube.channel} target="_blank" rel="noopener noreferrer" className="rich-link text-[15px] font-semibold">{m.channel}</a>
          </div>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
            <li>
              <ClickToPlay
                src={`https://www.youtube-nocookie.com/embed/videoseries?list=${encodeURIComponent(youtube.playlistId)}`} poster={`/api/yt-thumb/${encodeURIComponent(youtube.episodes[0])}`}
                title={m.playlist}
                label={`${m.play}: ${m.all}`}
                className="aspect-[9/16] w-full overflow-hidden rounded-[22px] bg-graphite p-4 text-fog"
              >
                <span className="font-semibold">{m.all}</span>
              </ClickToPlay>
            </li>
            {youtube.episodes.map((id, i) => (
              <li key={id}>
                <ClickToPlay
                  src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}`} poster={`/api/yt-thumb/${encodeURIComponent(id)}`}
                  title={`“12 Weeks” — ${m.episode(i + 1)}`}
                  label={`${m.play}: ${m.episode(i + 1)}`}
                  className="aspect-[9/16] w-full overflow-hidden rounded-[22px] bg-mint-tint p-4"
                >
                  <span className="font-semibold">{m.episode(i + 1)}</span>
                </ClickToPlay>
              </li>
            ))}
          </ul>
          <p className="text-[13px] text-muted">{m.consent}</p>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-display text-[22px] font-bold">{m.more}</h3>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
            <li>
              <ClickToPlay
                src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(youtube.curio.pilot)}`} poster={`/api/yt-thumb/${encodeURIComponent(youtube.curio.pilot)}`}
                title={m.curioPilot.title}
                label={`${m.play}: ${m.curioPilot.title}`}
                className="aspect-[9/16] w-full overflow-hidden rounded-[22px] bg-graphite p-4 text-fog"
              >
                <span className="font-semibold">{m.curioPilot.title}</span>
                <span className="text-[13px] leading-[18px] text-muted-dark">{m.curioPilot.text}</span>
              </ClickToPlay>
            </li>
            <li>
              <ClickToPlay
                src={`https://www.youtube-nocookie.com/embed/videoseries?list=${encodeURIComponent(youtube.curio.playlistId)}`} poster={`/api/yt-thumb/${encodeURIComponent(youtube.curio.pilot)}`}
                title={m.curioAll}
                label={`${m.play}: ${m.curioAll}`}
                className="aspect-[9/16] w-full overflow-hidden rounded-[22px] bg-graphite-2 p-4 text-fog"
              >
                <span className="font-semibold">{m.curioAll}</span>
              </ClickToPlay>
            </li>
            <li>
              <ClickToPlay
                src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(youtube.promo)}`} poster={`/api/yt-thumb/${encodeURIComponent(youtube.promo)}`}
                title={m.promo.title}
                label={`${m.play}: ${m.promo.title}`}
                className="aspect-[9/16] w-full overflow-hidden rounded-[22px] bg-mint p-4 text-graphite"
              >
                <span className="font-semibold">{m.promo.title}</span>
                <span className="text-[13px] leading-[18px]">{m.promo.text}</span>
              </ClickToPlay>
            </li>
            <li>
              <ClickToPlay
                src={`https://www.youtube-nocookie.com/embed/videoseries?list=${encodeURIComponent(youtube.reels.playlistId)}`} poster={`/api/yt-thumb/${encodeURIComponent(youtube.reels.first)}`}
                title={m.reels.title}
                label={`${m.play}: ${m.reels.title}`}
                className="aspect-[9/16] w-full overflow-hidden rounded-[22px] bg-graphite p-4 text-fog"
              >
                <span className="font-semibold">{m.reels.title}</span>
                <span className="text-[13px] leading-[18px] text-muted-dark">{m.reels.text}</span>
              </ClickToPlay>
            </li>
          </ul>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Link href={pathFor("en", "curio")} className="group flex min-h-40 flex-col justify-end gap-1 rounded-[22px] bg-graphite p-5 text-fog hover:opacity-95">
            <span className="font-display text-[20px] font-bold group-hover:underline">{m.curio.title}</span>
            <span className="text-muted-dark">{m.curio.text}</span>
          </Link>
          <Link href={pathFor("en", "coloring")} className="group flex min-h-40 items-end gap-4 rounded-[22px] border border-line bg-white p-5 hover:border-graphite">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/coloring/curio-hello.png" alt="" width={1792} height={2620} loading="lazy" className="h-28 w-auto rounded-[10px] border border-line" />
            <span className="flex flex-col gap-1">
              <span className="font-display text-[20px] font-bold group-hover:underline">{m.coloring.title}</span>
              <span className="text-muted">{m.coloring.text}</span>
            </span>
          </Link>
          <Link href={pathFor("en", "howItWorks")} className="group flex min-h-40 flex-col justify-end gap-1 rounded-[22px] border border-line bg-white p-5 hover:border-graphite">
            <span className="font-display text-[20px] font-bold group-hover:underline">{m.walkthrough.title}</span>
            <span className="text-muted">{m.walkthrough.text}</span>
          </Link>
        </div>
        <p className="text-[18px] leading-7">{c.engine.closing}</p>
      </section>

      {/* 5. Built so far + 6. Revenue map */}
      <div className="bg-white">
        <section aria-labelledby="inv-built" className="container-page flex flex-col gap-8 pt-20">
          <Head id="inv-built" eyebrow={c.built.eyebrow} title={c.built.title} />
          <ul className="grid gap-x-8 gap-y-4 md:grid-cols-2">
            {c.built.items.map((t) => (
              <li key={t} className="flex gap-3 border-t border-line pt-4">
                <span aria-hidden="true" className="font-bold text-mint-text">✓</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="inv-revenue" className="container-page flex flex-col gap-8 py-20">
          <Head id="inv-revenue" eyebrow={c.revenue.eyebrow} title={c.revenue.title} />
          <div className="grid gap-4 lg:grid-cols-3">
            {c.revenue.phases.map((p) => (
              <div key={p.tag} className="flex flex-col gap-4 rounded-[22px] bg-fog p-6">
                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-[1.4px] text-muted">{p.tag}</p>
                  <h3 className="mt-1.5 font-display text-[24px] font-bold leading-7">{p.name}</h3>
                </div>
                <ul className="flex flex-col gap-3">
                  {p.items.map((it) => (
                    <li key={it.name} className="flex items-start justify-between gap-3 border-t border-line pt-3">
                      <span>
                        <span className="block font-semibold">{it.name}</span>
                        <span className="block text-[13px] leading-[18px] text-muted">{it.price}</span>
                      </span>
                      <Chip status={it.status} label={it.label} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="text-muted">{c.revenue.retention}</p>
          <div className="flex flex-col gap-2 rounded-[22px] bg-fog p-7">
            <p className="text-[12px] font-semibold uppercase tracking-[1.4px] text-muted">{c.revenue.stageTag}</p>
            <p className="font-display text-[22px] font-bold leading-7">{c.revenue.stage}</p>
          </div>
        </section>
      </div>

      {/* 7. Team + Web Summit */}
      <section aria-labelledby="inv-team" className="container-page grid items-start gap-6 py-20 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <p className="eyebrow">{c.team.eyebrow}</p>
          <h2 id="inv-team" className="font-display text-[clamp(28px,3.4vw,40px)] font-bold leading-[1.1] tracking-[-0.6px]">{c.team.title}</h2>
          <p className="text-muted"><strong className="text-graphite">{c.team.founderName}</strong> {c.team.founder}</p>
          <ul className="flex flex-col gap-2.5">
            {c.team.points.map((t) => (
              <li key={t} className="flex gap-2.5"><span aria-hidden="true" className="font-bold text-mint-text">✓</span>{t}</li>
            ))}
          </ul>
        </div>
        {showWebSummit ? (
          <div className="flex flex-col gap-5 rounded-[30px] bg-graphite p-8 text-fog sm:p-10">
            <p className="font-display text-[28px] font-bold leading-8">{c.webSummit.title}</p>
            <p className="text-muted-dark">{c.webSummit.text}</p>
            <div className="flex flex-wrap gap-3">
              <a href={investorEmail} className="inline-flex min-h-12 items-center rounded-xl bg-mint px-5 text-[15px] font-semibold text-graphite hover:opacity-90">{c.brief}</a>
              <a href={youtube.channel} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center rounded-xl border-[1.5px] border-fog px-5 text-[15px] font-semibold text-fog hover:bg-graphite-2">{c.webSummit.watch}</a>
            </div>
          </div>
        ) : null}
      </section>

      {/* Kept from the old page: contact inboxes */}
      <section aria-labelledby="inv-contact" className="container-page flex flex-col gap-6 pb-24">
        <h2 id="inv-contact" className="font-display text-[28px] font-bold">{c.contactTitle}</h2>
        <ContactCards dict={dict} />
      </section>
    </div>
  );
}
