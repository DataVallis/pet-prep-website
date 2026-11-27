"use client";

import Link from "next/link";
import { useEffect, useId, useState, type FormEvent } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/content/types";
import { breedFromSearch } from "@/lib/earlyAccess";
import { midName } from "@/lib/breedName";
import { browserContext, EARLY_ACCESS_CONSENT_VERSION, postEmailSignup } from "@/lib/emailSignup";
import { SIGNED_UP_EVENT, writeMemory } from "@/lib/appPrompt";

type Copy = Dictionary["earlyAccess"];
type Tone = "light" | "dark" | "mint";
type ChosenBreed = { id: string; name: string; species: "dog" | "cat" };
type State = "idle" | "sending" | "done" | "invalid" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Email sign-up for early access. The browser posts to PetPrep's own database (/api/email-signups, segmented:
 * source early_access_form, section, page, breed, UTM, referrer host) and, in parallel for now, to /api/subscribe,
 * which stores the address in Klaviyo (until the planned sync job exists). It is a success when either one accepts it
 * (a failure of one is only logged). When the page URL carries `?breed=<id>` (the quiz result button, breed CTAs) the
 * form names the breed and sends it to both. Once an address is accepted the browser remembers it (localStorage
 * `petprep.prompt`, no address stored) and tells the app sign-up prompt (components/AppPrompt.tsx) to stay away.
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
  source = "early_access_form",
  showBreedLine = true,
  stacked = false,
  onDone,
}: {
  locale: Locale;
  copy: Copy;
  privacyHref: string;
  tone?: Tone;
  size?: "md" | "lg";
  showConsent?: boolean;
  /** Which form instance this is on the page (hero, home_cta, breed_cta …), sent as `section`. */
  section?: string;
  /** A breed fixed by the page itself (a breed page); otherwise `?breed=` of the URL is used (resolved against the register's index). */
  breed?: ChosenBreed;
  /** `source` in our e-mail database: early_access_form (the page's own forms) or app_prompt (bar / pop-up). */
  source?: string;
  /** Show the »Early access for the breed: …« line above the field (the pop-up names the breed itself). */
  showBreedLine?: boolean;
  /** Field above a full-width button at every width (the pop-up: long button labels must not squeeze the field). */
  stacked?: boolean;
  /** Called once the address was accepted. */
  onDone?: () => void;
}) {
  const id = useId();
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [state, setState] = useState<State>("idle");
  const [urlBreed, setUrlBreed] = useState<ChosenBreed | null>(null);

  // ?breed=<id> is read in the browser (the pages are static). The id is resolved to the name in the page language (and
  // its species) from the register's slim index, fetched only when the URL has a breed; an unknown id is ignored.
  useEffect(() => {
    const wanted = breedFromSearch(window.location.search);
    if (!wanted) return;
    let alive = true;
    (async () => {
      for (const species of ["dog", "cat"] as const) {
        try {
          const res = await fetch(`/registry/${species}/index.${locale}.json`);
          if (!res.ok) continue;
          const found = ((await res.json()) as { id: string; n: string }[]).find((b) => b.id === wanted);
          if (found && alive) { setUrlBreed({ id: found.id, name: found.n, species }); return; }
        } catch { /* no breed line: the form still works */ }
      }
    })();
    return () => { alive = false; };
  }, [locale]);
  const chosen = breed ?? urlBreed;
  const chosenName = chosen ? midName(chosen.name, locale) : null;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setState("invalid");
      return;
    }
    setState("sending");
    const addr = email.trim();
    // Our database only gets a sign-up when the consent sentence was shown to the visitor (showConsent); Klaviyo is unchanged.
    const ours = showConsent
      ? postEmailSignup(
          { email: addr, purpose: "early_access", source, section, locale, species: chosen?.species, breed: chosen?.id, consentVersion: EARLY_ACCESS_CONSENT_VERSION, honeypot: company },
          browserContext(),
        ).catch(() => "error" as const)
      : Promise.resolve("proto" as const);
    const klaviyo = fetch("/api/subscribe", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: addr, locale, page: window.location.pathname, company, breed: chosen?.id }),
    }).then((res) => ({ ok: res.ok, status: res.status })).catch(() => ({ ok: false, status: 0 }));
    const [a, k] = await Promise.all([ours, klaviyo]);
    if (a === "ok" || k.ok) {
      if (a !== "ok" && a !== "proto") console.error("[early-access] our database did not accept the sign-up:", a);
      if (!k.ok) console.error("[early-access] Klaviyo did not accept the sign-up:", k.status);
      setState("done");
      let store: Storage | null = null;
      try { store = window.localStorage; } catch { /* blocked */ }
      writeMemory(store, { signedUp: true });
      window.dispatchEvent(new Event(SIGNED_UP_EVENT));
      onDone?.();
    } else {
      console.error("[early-access] sign-up failed:", a, k.status);
      setState(a === "email" || k.status === 400 ? "invalid" : "error");
    }
  }

  const dark = tone === "dark";
  const muted = dark ? "text-muted-dark" : tone === "mint" ? "text-graphite/80" : "text-muted";

  if (state === "done") {
    return (
      <div role="status" data-early-access className={`flex items-start gap-3 rounded-[16px] p-4 ${dark ? "bg-graphite-2" : "bg-white"}`}>
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
    <form onSubmit={onSubmit} noValidate data-early-access className="flex w-full max-w-[560px] flex-col gap-2.5">
      {chosenName && showBreedLine ? <p className={`text-[15px] font-semibold ${dark ? "text-mint" : "text-mint-text"}`}>{copy.forBreed.replace("{mid}", () => chosenName)}</p> : null}
      <label htmlFor={`${id}-email`} className="sr-only">{copy.label}</label>
      <div className={`flex flex-col gap-2.5 ${stacked ? "" : "sm:flex-row"}`}>
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
          className={`${inputH} w-full min-w-0 flex-1 rounded-[12px] border-[1.5px] px-4 outline-none transition-[border-color,box-shadow] focus-visible:shadow-[0_0_0_3px_var(--color-mint)] ${
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
      <p id={`${id}-msg`} role="alert" className={`${stacked && !message ? "hidden" : "min-h-[1.25rem]"} text-sm font-medium ${dark ? "text-[#ff9c90]" : "text-danger"}`}>
        {message}
      </p>
      {showConsent ? (
        <p className={`${stacked ? "mt-1" : "-mt-1"} text-[13px] leading-relaxed ${muted}`}>
          {copy.consent}{" "}
          <Link href={privacyHref} className="underline underline-offset-2">
            {copy.privacyLink}
          </Link>
        </p>
      ) : null}
    </form>
  );
}
