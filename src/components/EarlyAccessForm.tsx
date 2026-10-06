"use client";

import Link from "next/link";
import { useId, useState, type FormEvent } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/content/types";

type Copy = Dictionary["earlyAccess"];
type Tone = "light" | "dark" | "mint";
type State = "idle" | "sending" | "done" | "invalid" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Email sign-up for early access. Posts to /api/subscribe, which stores the address in Klaviyo. */
export function EarlyAccessForm({
  locale,
  copy,
  privacyHref,
  tone = "light",
  size = "md",
  showConsent = true,
}: {
  locale: Locale;
  copy: Copy;
  privacyHref: string;
  tone?: Tone;
  size?: "md" | "lg";
  showConsent?: boolean;
}) {
  const id = useId();
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [state, setState] = useState<State>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setState("invalid");
      return;
    }
    setState("sending");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: email.trim(), locale, page: window.location.pathname, company }),
      });
      if (res.ok) setState("done");
      else setState(res.status === 400 ? "invalid" : "error");
    } catch {
      setState("error");
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
