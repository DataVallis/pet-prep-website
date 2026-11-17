"use client";

import Link from "next/link";
import { useEffect, useId, useState, type FormEvent } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/content/types";
import { breedFromSearch } from "@/lib/earlyAccess";
import { midName } from "@/lib/breedName";
import { browserContext, EARLY_ACCESS_CONSENT_VERSION, postEmailSignup } from "@/lib/emailSignup";

type Copy = Dictionary["earlyAccess"];
type Tone = "light" | "dark" | "mint";
type State = "idle" | "sending" | "done" | "invalid" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Email sign-up for early access. The browser posts to PetPrep's own database (/api/email-signups, segmented:
 * source early_access_form, section, page, breed, UTM, referrer host) and, in parallel for now, to /api/subscribe,
 * which stores the address in Klaviyo (until the planned sync job exists). It is a success when either one accepts it
 * (a failure of one is only logged). When the page URL carries `?breed=<id>` (the quiz result button, breed CTAs) the
 * form names the breed and sends it to both.
 */
export function EarlyAccessForm({
  locale,
  copy,
  privacyHref,
  tone = "light",
  size = "md",
  showConsent = true,
  section = "hero",
  breed,
  breedNames,
}: {
  locale: Locale;
  copy: Copy;
  privacyHref: string;
  tone?: Tone;
  size?: "md" | "lg";
  showConsent?: boolean;
  /** Which form instance this is on the page (hero, home_cta, breed_cta …), sent as `section`. */
  section?: string;
  /** A breed fixed by the page itself (a breed page); otherwise `?breed=` of the URL is used. */
  breed?: string;
  /** id → name of every breed in the page language; a breed id that is not in it is ignored. */
  breedNames?: Record<string, string>;
}) {
  const id = useId();
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [state, setState] = useState<State>("idle");
  const [urlBreed, setUrlBreed] = useState<string | null>(null);

  // ?breed=<id> is read in the browser (the pages are static).
  useEffect(() => {
    const t = window.setTimeout(() => setUrlBreed(breedFromSearch(window.location.search)), 0);
    return () => window.clearTimeout(t);
  }, []);
  const chosen = [breed, urlBreed].find((b): b is string => Boolean(b && breedNames?.[b])) ?? null;
  const chosenName = chosen && breedNames ? midName(breedNames[chosen], locale) : null;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setState("invalid");
      return;
    }
    setState("sending");
    const addr = email.trim();
    const ours = postEmailSignup(
      { email: addr, purpose: "early_access", source: "early_access_form", section, locale, breed: chosen ?? undefined, consentVersion: EARLY_ACCESS_CONSENT_VERSION, honeypot: company },
      browserContext(),
    ).catch(() => "error" as const);
    const klaviyo = fetch("/api/subscribe", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: addr, locale, page: window.location.pathname, company, breed: chosen ?? undefined }),
    }).then((res) => ({ ok: res.ok, status: res.status })).catch(() => ({ ok: false, status: 0 }));
    const [a, k] = await Promise.all([ours, klaviyo]);
    if (a === "ok" || k.ok) {
      if (a !== "ok" && a !== "proto") console.error("[early-access] our database did not accept the sign-up:", a);
      if (!k.ok) console.error("[early-access] Klaviyo did not accept the sign-up:", k.status);
      setState("done");
    } else {
      console.error("[early-access] sign-up failed:", a, k.status);
      setState(a === "email" || k.status === 400 ? "invalid" : "error");
    }
  }

  const dark = tone === "dark";
  const muted = dark ? "text-muted-dark" : tone === "mint" ? "text-graphite/80" : "text-muted";

  if (state === "done") {
    return (
      <div role="status" className={`flex items-start gap-3 rounded-[16px] p-4 ${dark ? "bg-graphite-2" : "bg-white"}`}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={`mt-0.5 shrink-0 ${dark ? "text-mint" : "text-mint-text"}`}>
          <path d="M20 6 9 17l-5-5" />
        </svg>
        <div>
          <p className="font-semibold">{copy.successTitle}</p>
          <p className={`mt-1 text-sm leading-relaxed ${dark ? "text-muted-dark" : "text-muted"}`}>{copy.successText}</p>
        </div>
      </div>
    );
  }

  const inputH = size === "lg" ? "min-h-14 text-[17px]" : "min-h-12 text-base";
  const message = state === "invalid" ? copy.invalid : state === "error" ? copy.error : "";

  return (
    <form onSubmit={onSubmit} noValidate className="flex w-full max-w-[560px] flex-col gap-2.5">
      {chosenName ? <p className={`text-[15px] font-semibold ${dark ? "text-mint" : "text-mint-text"}`}>{copy.forBreed.replace("{mid}", chosenName)}</p> : null}
      <label htmlFor={`${id}-email`} className="sr-only">{copy.label}</label>
      <div className="flex flex-col gap-2.5 sm:flex-row">
        <input
          id={`${id}-email`}
          type="email"
          name="email"
          inputMode="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (state === "invalid" || state === "error") setState("idle");
          }}
          placeholder={copy.placeholder}
          aria-invalid={state === "invalid" ? true : undefined}
          aria-describedby={message ? `${id}-msg` : undefined}
          className={`${inputH} w-full min-w-0 flex-1 rounded-[12px] border-[1.5px] px-4 outline-none transition-colors ${
            dark
              ? "border-graphite-3 bg-graphite-2 text-fog placeholder:text-muted-dark focus:border-mint"
              : "border-graphite/25 bg-white text-graphite placeholder:text-muted focus:border-graphite"
          } ${state === "invalid" ? "!border-danger" : ""}`}
        />
        {/* Honeypot — hidden from people and assistive tech */}
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          aria-hidden="true"
          className="absolute -left-[9999px] h-px w-px opacity-0"
        />
        <button
          type="submit"
          disabled={state === "sending"}
          className={`btn ${dark ? "btn-mint" : "btn-primary"} ${size === "lg" ? "!min-h-14 !px-6 !text-[17px]" : ""} disabled:opacity-70`}
        >
          {state === "sending" ? copy.sending : copy.button}
        </button>
      </div>
      <p id={`${id}-msg`} role="alert" className={`min-h-[1.25rem] text-sm font-medium ${dark ? "text-[#ff9c90]" : "text-danger"}`}>
        {message}
      </p>
      {showConsent ? (
        <p className={`-mt-1 text-[13px] leading-relaxed ${muted}`}>
          {copy.consent}{" "}
          <Link href={privacyHref} className="underline underline-offset-2">
            {copy.privacyLink}
          </Link>
        </p>
      ) : null}
    </form>
  );
}
