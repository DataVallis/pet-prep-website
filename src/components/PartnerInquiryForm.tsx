"use client";

import Link from "next/link";
import { useId, useState, type FormEvent } from "react";
import { partnerContactEmail, partnerCopy, type PartnerLang } from "@/content/partners";
import { buildPayload, classify, endpoint, partnerTypes, validate, type FieldError, type PartnerForm } from "@/lib/partnerInquiry";

type State = "idle" | "sending" | "done" | "invalid" | "rate_limited" | "fallback";

const empty: PartnerForm = { company: "", contact_name: "", email: "", type: "", message: "", website: "", consent: false };
const field = "min-h-12 w-full rounded-[12px] border-[1.5px] border-graphite/25 bg-white px-4 text-base text-graphite outline-none transition-colors focus:border-graphite";

/** Partner inquiry form (M6-S03). Posts JSON to the PetPrep API; on 404 / 503 / network error it shows an e-mail fallback. Never logs form data. */
export function PartnerInquiryForm({ lang, privacyHref }: { lang: PartnerLang; privacyHref: string }) {
  const c = partnerCopy[lang].form;
  const id = useId();
  const [form, setForm] = useState<PartnerForm>(empty);
  const [errors, setErrors] = useState<FieldError[]>([]);
  const [state, setState] = useState<State>("idle");

  const set = <K extends keyof PartnerForm>(k: K, v: PartnerForm[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (state === "invalid" || state === "rate_limited") setState("idle");
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "sending") return;
    const local = validate(form);
    setErrors(local);
    if (local.length) {
      setState("invalid");
      return;
    }
    setState("sending");
    let status = 0;
    let body: unknown = null;
    try {
      const res = await fetch(endpoint(process.env.NEXT_PUBLIC_PETPREP_API_URL), {
        method: "POST",
        headers: { "content-type": "application/json", accept: "application/json" },
        body: JSON.stringify(buildPayload(form, lang)),
      });
      status = res.status;
      body = await res.json().catch(() => null);
    } catch {
      status = 0;
    }
    const outcome = classify(status, body);
    if (outcome.kind === "done") setState("done");
    else if (outcome.kind === "invalid") {
      setErrors(outcome.fields);
      setState("invalid");
    } else setState(outcome.kind);
  }

  if (state === "done") {
    return (
      <div role="status" className="flex max-w-2xl items-start gap-3 rounded-[22px] bg-mint-tint p-6">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="mt-0.5 shrink-0 text-mint-text">
          <path d="M20 6 9 17l-5-5" />
        </svg>
        <div>
          <p className="font-semibold">{c.successTitle}</p>
          <p className="mt-1 text-[15px] text-muted">{c.successText}</p>
        </div>
      </div>
    );
  }

  const has = (f: FieldError) => errors.includes(f);
  const err = (f: FieldError) => (has(f) ? <p id={`${id}-${f}-e`} className="text-sm font-medium text-danger">{c.errors[f]}</p> : null);
  const aria = (f: FieldError) => ({ "aria-invalid": has(f) ? true : undefined, "aria-describedby": has(f) ? `${id}-${f}-e` : undefined });
  const bad = (f: FieldError) => (has(f) ? "!border-danger" : "");

  return (
    <form onSubmit={onSubmit} noValidate className="flex max-w-2xl flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <label htmlFor={`${id}-company`} className="text-[15px] font-semibold">{c.company}</label>
        <input id={`${id}-company`} name="company" autoComplete="organization" maxLength={190} value={form.company} onChange={(e) => set("company", e.target.value)} className={`${field} ${bad("company")}`} {...aria("company")} />
        {err("company")}
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor={`${id}-name`} className="text-[15px] font-semibold">{c.contactName}</label>
        <input id={`${id}-name`} name="contact_name" autoComplete="name" maxLength={120} value={form.contact_name} onChange={(e) => set("contact_name", e.target.value)} className={`${field} ${bad("contact_name")}`} {...aria("contact_name")} />
        {err("contact_name")}
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor={`${id}-email`} className="text-[15px] font-semibold">{c.email}</label>
        <input id={`${id}-email`} name="email" type="email" inputMode="email" autoComplete="email" maxLength={254} value={form.email} onChange={(e) => set("email", e.target.value)} className={`${field} ${bad("email")}`} {...aria("email")} />
        {err("email")}
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor={`${id}-type`} className="text-[15px] font-semibold">{c.type}</label>
        <select id={`${id}-type`} name="type" value={form.type} onChange={(e) => set("type", e.target.value)} className={`${field} ${bad("type")}`} {...aria("type")}>
          <option value="">{c.typePlaceholder}</option>
          {partnerTypes.map((t) => <option key={t} value={t}>{c.types[t]}</option>)}
        </select>
        {err("type")}
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor={`${id}-message`} className="text-[15px] font-semibold">{c.message}</label>
        <textarea id={`${id}-message`} name="message" rows={6} maxLength={4000} value={form.message} onChange={(e) => set("message", e.target.value)} className={`${field} py-3 ${bad("message")}`} {...aria("message")} />
        <p className="text-[13px] text-muted">{c.messageHint}</p>
        {err("message")}
      </div>
      {/* Honeypot: hidden from people and assistive tech; bots fill it. */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" value={form.website} onChange={(e) => set("website", e.target.value)} className="absolute -left-[9999px] h-px w-px opacity-0" />
      <div className="flex flex-col gap-1.5">
        <label className="flex items-start gap-3 text-[15px] leading-relaxed">
          <input type="checkbox" name="consent" checked={form.consent} onChange={(e) => set("consent", e.target.checked)} className="mt-1 h-5 w-5 shrink-0 accent-graphite" {...aria("consent")} />
          <span>
            {c.consentBefore}
            <Link href={privacyHref} className="underline underline-offset-2" target="_blank" rel="noopener noreferrer">{c.consentLink}</Link>
            {c.consentAfter}
          </span>
        </label>
        {err("consent")}
      </div>
      <div className="flex flex-col gap-3" aria-live="polite">
        <div>
          <button type="submit" disabled={state === "sending"} className="btn btn-primary disabled:opacity-70">{state === "sending" ? c.sending : c.submit}</button>
        </div>
        {state === "invalid" ? <p role="alert" className="text-sm font-medium text-danger">{c.invalid}</p> : null}
        {state === "rate_limited" ? <p role="alert" className="text-sm font-medium text-danger">{c.rateLimited}</p> : null}
        {state === "fallback" ? (
          <p role="alert" className="rounded-[14px] bg-warn-tint px-4 py-3 text-sm leading-relaxed">
            {c.fallbackBefore}
            <a href={`mailto:${partnerContactEmail}`} className="font-semibold underline underline-offset-2">{partnerContactEmail}</a>
            {c.fallbackAfter}
          </p>
        ) : null}
      </div>
    </form>
  );
}
