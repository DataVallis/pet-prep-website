"use client";

import { useId, useState, useSyncExternalStore } from "react";
import type { Locale } from "@/i18n/config";
import { shopCopy } from "@/content/shop";
import { isPlausibleEmail } from "@/lib/gift";
import { sampleBody, sampleOutcome, sampleUrlOf, type SampleResult } from "@/lib/shop";


/** Hydration flag without an effect: false on the server, true in the browser. */
const subscribeNever = () => () => {};
/**
 * Free sample page of the Pet Promise Kit (M6-S09): e-mail + newsletter consent → POST /api/summary-leads
 * (`source: promise_kit_sample`, consent version 2026-11) → a signed 24-h download link to the sample PDF in this
 * language. Nothing is stored in the browser; the e-mail is sent once, only after the box is ticked.
 */
export function SampleForm({ locale, buttonLabel }: { locale: Locale; buttonLabel: string }) {
  const c = shopCopy[locale].sample;
  const emailId = useId();
  const consentId = useId();
  const mounted = useSyncExternalStore(subscribeNever, () => true, () => false);
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [pending, setPending] = useState(false);
  const [problem, setProblem] = useState<string | null>(null);
  const [result, setResult] = useState<SampleResult | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!isPlausibleEmail(email)) return setProblem(c.invalidEmail);
    if (!consent) return setProblem(c.consentRequired);
    setProblem(null);
    setPending(true);
    try {
      const res = await fetch(sampleUrlOf(), {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: sampleBody(email, locale, honeypot),
      });
      let body: unknown = null;
      try {
        body = await res.json();
      } catch {
        body = null;
      }
      const r = sampleOutcome(res.status, body);
      if ("url" in r || r.error === "not_ready") setResult(r);
      else setProblem(r.error === "email" ? c.invalidEmail : r.error === "rate_limited" ? c.rateLimited : c.error);
    } catch {
      setProblem(c.error);
    }
    setPending(false);
  }

  if (result && "url" in result) {
    return (
      <div role="status" className="flex flex-col items-start gap-3">
        <p className="text-[17px] font-semibold">{c.ready}</p>
        <a href={result.url} rel="noreferrer" download className="btn btn-primary">{c.download}</a>
      </div>
    );
  }
  if (result) {
    return <p role="status" className="text-[17px]">{c.notReady}</p>;
  }
  return (
    <form method="post" onSubmit={submit} noValidate className="flex max-w-xl flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label htmlFor={emailId} className="font-semibold">{c.emailLabel}</label>
        <input
          id={emailId}
          type="email"
          autoComplete="email"
          inputMode="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="min-h-12 rounded-[12px] border border-line bg-white px-4 text-[16px] outline-none focus:border-graphite"
        />
      </div>
      {/* Honeypot: hidden from people and screen readers; a bot that fills it gets no file. */}
      <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} className="absolute -left-[9999px] h-px w-px opacity-0" />
      <label htmlFor={consentId} className="flex items-start gap-3 text-[15px] leading-relaxed">
        <input id={consentId} type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1 h-5 w-5 shrink-0 accent-graphite" />
        <span>{c.consent}</span>
      </label>
      <p role="alert" className={problem ? "text-sm text-danger" : "sr-only"}>{problem ?? ""}</p>
      <div>
        <button type="submit" disabled={pending || !mounted} aria-busy={pending} className="btn btn-primary disabled:cursor-not-allowed disabled:opacity-60">
          {pending ? c.pending : buttonLabel}
        </button>
      </div>
    </form>
  );
}
