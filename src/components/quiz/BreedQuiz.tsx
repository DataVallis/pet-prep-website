"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { QUESTION_COUNT, decodeAnswers, encodeAnswers, rankBreeds, type QuizOutcome, type QuizPick } from "@/lib/breedQuiz";
import { sendQuizEvent, sendQuizLead, type LeadResult } from "@/lib/breedQuizEvents";
import type { QuizCopy } from "@/content/quiz/types";
import type { EmailStrings, SponsorStrings } from "@/content/quiz";
import type { QuizBreedView } from "@/lib/breedQuizData";

const card = "rounded-[22px] bg-white shadow-[0_1px_2px_rgba(18,22,20,0.04),0_10px_30px_rgba(18,22,20,0.06)]";
const fill = (t: string, v: Record<string, string | number>) => t.replace(/\{(\w+)\}/g, (_, k: string) => String(v[k] ?? ""));

export type QuizLabels = { suitsTitle: string; considerTitle: string; tags: Record<string, string> };

type Props = {
  locale: string;
  copy: QuizCopy;
  breeds: QuizBreedView[];
  labels: QuizLabels;
  appHref: string;
  partnersHref: string;
  /** Path of this page without a query (the result link adds ?a=…). */
  path: string;
  email: EmailStrings;
  sponsor: SponsorStrings;
  thanks: string;
};

export function BreedQuiz(props: Props) {
  const { locale, copy, breeds, path } = props;
  const [step, setStep] = useState(-1); // -1 intro, 0..8 questions, 9 result
  const [answers, setAnswers] = useState<number[]>([]);
  const heading = useRef<HTMLHeadingElement>(null);
  const moved = useRef(false);

  // A shared result link: ?a=<nine digits>. Read once in the browser (the page itself is static).
  useEffect(() => {
    const a = decodeAnswers(new URLSearchParams(window.location.search).get("a"));
    if (!a) return;
    const t = window.setTimeout(() => { setAnswers(a); setStep(QUESTION_COUNT); }, 0);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (moved.current) heading.current?.focus();
    moved.current = true;
  }, [step]);

  const outcome: QuizOutcome | null = useMemo(() => (step === QUESTION_COUNT && answers.length === QUESTION_COUNT ? rankBreeds(answers, breeds) : null), [step, answers, breeds]);

  const byId = useMemo(() => new Map(breeds.map((b) => [b.id, b])), [breeds]);

  function choose(i: number) {
    const next = [...answers.slice(0, step), i];
    setAnswers(next);
    if (step < QUESTION_COUNT - 1) { setStep(step + 1); return; }
    window.history.replaceState(null, "", `${path}?a=${encodeAnswers(next)}`);
    const r = rankBreeds(next, breeds);
    if (r.kind === "breeds") sendQuizEvent("completed", locale, r.picks.map((p) => p.id));
    setStep(QUESTION_COUNT);
  }

  function restart() {
    window.history.replaceState(null, "", path);
    setAnswers([]);
    setStep(-1);
  }

  const total = QUESTION_COUNT;

  if (step === -1) {
    return (
      <div className={`${card} mx-auto flex max-w-2xl flex-col items-start gap-5 p-6 sm:p-10`}>
        <h2 ref={heading} tabIndex={-1} className="font-display text-[clamp(24px,3vw,32px)] font-bold leading-tight outline-none">{copy.quizTitle}</h2>
        <p className="text-[18px] leading-relaxed text-muted">{copy.quizIntro}</p>
        <button type="button" onClick={() => setStep(0)} className="btn btn-primary min-h-14 px-8 text-[17px]">{copy.start}</button>
      </div>
    );
  }

  if (step < QUESTION_COUNT) {
    const q = copy.questions[step];
    const current = answers[step];
    return (
      <div className={`${card} mx-auto flex max-w-2xl flex-col gap-6 p-5 sm:p-10`}>
        <div className="flex flex-col gap-2">
          <p className="text-[15px] font-semibold text-muted" aria-live="polite">{fill(copy.stepOf, { n: step + 1, total })}</p>
          <div role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={step + 1} aria-label={fill(copy.stepOf, { n: step + 1, total })} className="h-2 overflow-hidden rounded-full bg-fog">
            <div className="h-full rounded-full bg-mint transition-[width] duration-300 motion-reduce:transition-none" style={{ width: `${((step + 1) / total) * 100}%` }} />
          </div>
        </div>
        <h2 ref={heading} tabIndex={-1} className="font-display text-[clamp(24px,3.2vw,34px)] font-bold leading-tight outline-none">{q.q}</h2>
        <ul className="flex flex-col gap-3">
          {q.options.map((o, i) => (
            <li key={o}>
              <button
                type="button"
                onClick={() => choose(i)}
                aria-pressed={current === i}
                className={`flex min-h-14 w-full items-center rounded-2xl border-2 px-5 py-3 text-left text-[17px] font-semibold transition-colors motion-reduce:transition-none ${current === i ? "border-graphite bg-mint-tint" : "border-line bg-white hover:border-graphite"}`}
              >
                {o}
              </button>
            </li>
          ))}
        </ul>
        <div>
          <button type="button" onClick={() => setStep(step - 1)} className="btn btn-secondary min-h-12">{copy.back}</button>
        </div>
      </div>
    );
  }

  if (!outcome) return null;

  if (outcome.kind === "notNow") {
    return (
      <div className="mx-auto flex max-w-2xl flex-col gap-5">
        <div className="flex flex-col gap-4 rounded-[30px] bg-mint p-6 sm:p-10">
          <h2 ref={heading} tabIndex={-1} className="font-display text-[clamp(26px,3.4vw,36px)] font-extrabold leading-tight outline-none">{copy.notNowTitle}</h2>
          <p className="text-[18px] leading-relaxed">{copy.notNowText}</p>
          <div className="flex flex-wrap gap-3">
            <Link href={props.appHref} className="btn btn-primary">{copy.notNowCta}</Link>
            <button type="button" onClick={restart} className="btn btn-secondary">{copy.restart}</button>
          </div>
        </div>
        <p className="text-[15px] text-muted">{copy.disclaimer}</p>
      </div>
    );
  }

  const first = outcome.picks[0]?.id ?? "";
  return (
    <div className="flex flex-col gap-8">
      <header className="flex max-w-3xl flex-col gap-3">
        <h2 ref={heading} tabIndex={-1} className="font-display text-[clamp(28px,3.6vw,40px)] font-bold leading-tight outline-none">{copy.resultTitle}</h2>
        <p className="text-[18px] leading-relaxed text-muted">{copy.resultLead}</p>
        <p className="text-[15px] text-muted">{fill(copy.pool, { n: outcome.pool })}</p>
      </header>

      <ol className="grid gap-5 lg:grid-cols-3">
        {outcome.picks.map((p, i) => {
          const b = byId.get(p.id);
          return b ? <li key={p.id} className="flex"><PickCard pick={p} breed={b} rank={i + 1} {...props} /></li> : null;
        })}
      </ol>

      <section className={`${card} flex max-w-3xl flex-col gap-2 p-6`} aria-labelledby="quiz-adopt">
        <h3 id="quiz-adopt" className="font-display text-[22px] font-bold">{copy.adoptionTitle}</h3>
        <p className="text-[16px] leading-relaxed text-muted">{copy.adoptionText}</p>
      </section>

      <div className="flex flex-wrap items-center gap-3">
        <ShareButton copy={copy} path={path} answers={answers} />
        <button type="button" onClick={restart} className="btn btn-secondary">{copy.restart}</button>
      </div>

      <EmailForm {...props} breed={first} />

      <aside className="flex max-w-3xl flex-col gap-2 rounded-[22px] border border-dashed border-line p-6">
        <p className="eyebrow">{props.sponsor.sponsor_k}</p>
        <p className="font-display text-[20px] font-bold">{props.sponsor.sponsor_h}</p>
        <p className="text-[16px] text-muted">{props.sponsor.sponsor_p}</p>
        <Link href={props.partnersHref} className="rich-link w-fit">{props.sponsor.sponsor_cta}</Link>
      </aside>

      <p className="max-w-3xl text-[15px] leading-relaxed text-muted">{copy.disclaimer}</p>
    </div>
  );
}

function PickCard({ pick, breed, rank, copy, labels, appHref, locale }: { pick: QuizPick; breed: QuizBreedView; rank: number } & Props) {
  const lab = (t: string) => labels.tags[t] ?? t;
  const suits = [...pick.fits.map((f) => (f === "size" ? copy.fitSize : copy.fitExercise)), ...pick.matched.map(lab)];
  const consider = [...pick.clashes.filter((t) => t === "size" || t === "exercise").map((t) => (t === "size" ? copy.clashSize : copy.clashExercise)), ...pick.consider.map(lab)];
  return (
    <article className={`${card} flex w-full flex-col overflow-hidden`}>
      <div className="relative aspect-[4/3] w-full bg-fog">
        <Image src={breed.img} alt="" fill sizes="(min-width:1024px) 380px, 100vw" className="object-cover" priority={rank === 1} />
        <span className="absolute left-4 top-4 rounded-full bg-graphite px-3 py-1 text-[14px] font-semibold text-mint">{fill(copy.rank, { n: rank })}</span>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-5">
        <h3 className="font-display text-[26px] font-bold leading-tight">{breed.name}</h3>
        {suits.length ? (
          <div className="flex flex-col gap-2">
            <p className="text-[14px] font-semibold text-muted">{labels.suitsTitle}</p>
            <ul className="flex flex-wrap gap-2">{suits.map((s) => <li key={s} className="rounded-full bg-mint-tint px-3 py-1 text-[14px] leading-snug">{s}</li>)}</ul>
          </div>
        ) : null}
        {consider.length ? (
          <div className="flex flex-col gap-2">
            <p className="text-[14px] font-semibold text-muted">{labels.considerTitle}</p>
            <ul className="flex flex-wrap gap-2">{consider.map((s) => <li key={s} className="rounded-full bg-fog px-3 py-1 text-[14px] leading-snug ring-1 ring-line">{s}</li>)}</ul>
            <p className="text-[13px] leading-snug text-muted">{copy.considerNote}</p>
          </div>
        ) : null}
        <div className="mt-auto flex flex-col gap-2 pt-2">
          <Link href={appHref} onClick={() => sendQuizEvent("app_click", locale, [breed.id])} className="btn btn-primary !whitespace-normal text-center">{fill(copy.tryCta, { name: breed.name })}</Link>
          {breed.calc ? <Link href={breed.calc} onClick={() => sendQuizEvent("calculator_click", locale, [breed.id])} className="btn btn-secondary !whitespace-normal text-center">{copy.calcLink}</Link> : null}
          <Link href={breed.reg} className="rich-link flex min-h-11 items-center justify-center">{copy.seeBreed}</Link>
        </div>
      </div>
    </article>
  );
}

function ShareButton({ copy, path, answers }: { copy: QuizCopy; path: string; answers: number[] }) {
  const [done, setDone] = useState(false);
  async function copyLink() {
    const url = `${window.location.origin}${path}?a=${encodeAnswers(answers)}`;
    try { await navigator.clipboard.writeText(url); setDone(true); window.setTimeout(() => setDone(false), 3000); } catch { window.prompt(copy.shareButton, url); }
  }
  return (
    <>
      <button type="button" onClick={copyLink} className="btn btn-mint">{copy.shareButton}</button>
      <span role="status" className="text-[15px] font-semibold text-mint-text">{done ? copy.shareCopied : ""}</span>
    </>
  );
}

function EmailForm({ locale, email, thanks, breed }: Props & { breed: string }) {
  const [value, setValue] = useState("");
  const [consent, setConsent] = useState(false);
  const [hp, setHp] = useState("");
  const [msg, setMsg] = useState("");
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  async function submit(e: FormEvent) {
    e.preventDefault();
    const addr = value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(addr)) return setMsg(email.news_err_email);
    if (!consent) return setMsg(email.news_err_consent);
    setMsg(""); setBusy(true);
    const r: LeadResult = await sendQuizLead(addr, locale, breed, hp);
    setBusy(false);
    if (r === "ok") setDone(true);
    else setMsg(r === "email" ? email.news_err_email : r === "proto" ? email.news_err_proto : email.news_err);
  }
  if (done) return <p role="status" className="max-w-3xl rounded-[22px] bg-mint-tint p-6 text-[17px] font-semibold">{thanks}</p>;
  return (
    <form onSubmit={submit} noValidate className={`${card} flex max-w-3xl flex-col gap-4 p-6`}>
      <h3 className="font-display text-[22px] font-bold">{email.news_h}</h3>
      <label className="flex flex-col gap-1.5 text-[15px] font-semibold">
        {email.news_l}
        <input type="email" inputMode="email" autoComplete="email" value={value} onChange={(e) => setValue(e.target.value)} placeholder={email.news_ph} className="min-h-12 rounded-xl border border-line bg-white px-4 text-[16px] font-normal" />
      </label>
      {/* Honeypot: no person fills it. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>Website<input type="text" name="website" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} /></label>
      </div>
      <label className="flex items-start gap-3 text-[15px] leading-snug">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 h-5 w-5 shrink-0" />
        <span>{email.news_consent}</span>
      </label>
      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" disabled={busy} className="btn btn-primary disabled:opacity-60">{email.news_b}</button>
        <p role="status" className="text-[15px] font-semibold text-danger">{msg}</p>
      </div>
    </form>
  );
}
