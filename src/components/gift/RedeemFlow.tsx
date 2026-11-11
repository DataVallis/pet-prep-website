"use client";

import { useCallback, useEffect, useId, useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import { apiBase, giftPath, isPlausibleCode, isPlausibleEmail, isSuccess, normalizeCode, redeemOutcome, type GiftLocale, type MessageKey } from "@/lib/gift";
import { appleServicesId, availableProviders, beginSignIn, closeWebSession, googleClientId, readHandoff, requestWebSession, returnUrl, type SignInProvider } from "@/lib/webSignin";
import { site } from "@/lib/site";
import { giftCopy } from "@/content/gift";

const subscribeNever = () => () => {};

type Session = { token: string; expiresAt: number };

/**
 * Redeem flow (M6-S01b, CONTRACT_WEB_SIGNIN §5.2): step 1 signs the parent in (Google, Apple or e-mail + password),
 * step 2 takes the voucher code. The browser posts straight to the PetPrep API so the per-IP rate limits see the real
 * client address. The web session token lives in this component's state only (memory): never in a URL, a cookie,
 * local storage or an analytics event. A reload, a closed tab, a sign-out or the 15 minute expiry ends the session.
 * The one exception is the read-once handoff from /auth/return (src/lib/webSignin.ts). The code is never read from
 * the URL and never stored. No Google or Apple script is loaded: the provider buttons are full-page redirects.
 */
export function RedeemFlow({ locale }: { locale: GiftLocale }) {
  const c = giftCopy[locale];
  const codeId = useId();
  const emailId = useId();
  const passwordId = useId();
  const [session, setSession] = useState<Session | null>(null);
  const [notice, setNotice] = useState<MessageKey | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signingIn, setSigningIn] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [code, setCode] = useState("");
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<MessageKey | null>(null);
  const busy = useRef(false);
  const handoffRead = useRef(false);
  // Disabled until hydrated: a submit before the script runs must not do a native form submission.
  const mounted = useSyncExternalStore(subscribeNever, () => true, () => false);
  const providers = availableProviders();

  // First effect: take over the session /auth/return left (read once, ignored when older than 60 s or expired).
  useEffect(() => {
    if (handoffRead.current) return;
    handoffRead.current = true;
    try {
      const h = readHandoff(window.sessionStorage);
      // Storage can only be read after hydration, and the read is destructive (once): hand the state over asynchronously.
      if (h) queueMicrotask(() => setSession(h));
    } catch {
      // Storage blocked: the parent signs in again.
    }
  }, []);

  const endSession = useCallback((key: MessageKey | null) => {
    setSession(null);
    setCode("");
    setResult(null);
    setPassword("");
    setNotice(key);
  }, []);

  // The token ends at `expiresAt`: back to step 1.
  useEffect(() => {
    if (!session) return;
    const wait = Math.max(0, Math.min(session.expiresAt - Date.now(), 2 ** 31 - 1));
    const timer = window.setTimeout(() => endSession("session_expired"), wait);
    return () => window.clearTimeout(timer);
  }, [session, endSession]);

  // Closing the tab or navigating away: best-effort sign-out (the token expires in at most 15 minutes anyway).
  useEffect(() => {
    if (!session) return;
    const token = session.token;
    const onHide = () => void closeWebSession(token, { keepalive: true });
    window.addEventListener("pagehide", onHide);
    return () => window.removeEventListener("pagehide", onHide);
  }, [session]);

  async function signInWithPassword(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy.current) return;
    if (!isPlausibleEmail(email) || password === "") {
      setNotice("signin_invalid_credentials");
      return;
    }
    busy.current = true;
    setSigningIn(true);
    setNotice(null);
    const r = await requestWebSession({ method: "password", email: email.trim(), password, locale });
    busy.current = false;
    setSigningIn(false);
    setPassword("");
    if (r.ok) {
      setEmail("");
      setSession({ token: r.token, expiresAt: r.expiresAt });
    } else {
      setNotice(r.key);
    }
  }

  async function signInWithProvider(provider: SignInProvider) {
    if (busy.current) return;
    busy.current = true;
    setNotice(null);
    setRedirecting(true);
    try {
      const url = await beginSignIn({ provider, locale, redirectUri: returnUrl(site.url), storage: window.sessionStorage });
      if (!url) throw new Error("provider not configured");
      window.location.assign(url);
    } catch {
      busy.current = false;
      setRedirecting(false);
      setNotice("signin_failed");
    }
  }

  async function signOut() {
    const token = session?.token;
    endSession(null);
    if (token) await closeWebSession(token);
  }

  async function redeem(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy.current || !session) return;
    if (!isPlausibleCode(code)) {
      setResult("invalid_request");
      return;
    }
    busy.current = true;
    setPending(true);
    setResult(null);
    let key: MessageKey;
    try {
      const controller = new AbortController();
      const timer = window.setTimeout(() => controller.abort(), 20000);
      let res: Response;
      try {
        res = await fetch(`${apiBase()}/api/gift/redeem`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json", Authorization: `Bearer ${session.token}` },
          body: JSON.stringify({ code: normalizeCode(code), locale }),
          signal: controller.signal,
        });
      } finally {
        window.clearTimeout(timer);
      }
      let body: unknown = null;
      try {
        body = await res.json();
      } catch {
        body = null;
      }
      key = redeemOutcome(res.status, body);
    } catch (err) {
      // A request that ran into our own timeout may still have been processed: say so, instead of "nothing was used".
      key = err instanceof DOMException && err.name === "AbortError" ? "timeout" : "upstream_error";
    }
    busy.current = false;
    setPending(false);
    // 401 / 403 end the session (sign in again); every other answer keeps it, so another code can be redeemed.
    if (key === "session_expired" || key === "signin_not_parent") {
      endSession(key);
      return;
    }
    setResult(key);
    if (isSuccess(key)) setCode("");
  }

  const ok = result !== null && isSuccess(result);
  const giftLink = (
    <p>
      {/* A plain link (hard navigation): no third-party tag script that loaded on an earlier page ever sees this DOM. */}
      <a href={giftPath(locale, "gift")} className="rich-link">{c.redeem.giftLink}</a>
    </p>
  );

  if (!session) {
    const hasProviders = providers.length > 0;
    return (
      <div className="mx-auto flex w-full max-w-xl flex-col gap-6">
        <div className="flex flex-col gap-6 rounded-[22px] border border-line bg-white p-6 sm:p-8">
          <div className="flex flex-col gap-2">
            <h2 className="font-display text-[24px] font-extrabold leading-tight tracking-[-0.02em]">{c.redeem.signInHeading}</h2>
            <p className="leading-relaxed text-muted">{c.redeem.signInLead}</p>
          </div>
          {hasProviders ? (
            <div className="flex flex-col gap-3">
              {googleClientId() ? (
                <button
                  type="button"
                  onClick={() => void signInWithProvider("google")}
                  disabled={!mounted || redirecting || signingIn}
                  className="flex min-h-12 items-center justify-center gap-3 rounded-[12px] border border-[#747775] bg-white px-4 text-[16px] font-medium text-[#1f1f1f] disabled:cursor-wait disabled:opacity-60"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/brand-3p/google.svg" alt="" width={20} height={20} />
                  <span>{c.redeem.continueWithGoogle}</span>
                </button>
              ) : null}
              {appleServicesId() ? (
                <button
                  type="button"
                  onClick={() => void signInWithProvider("apple")}
                  disabled={!mounted || redirecting || signingIn}
                  className="flex min-h-12 items-center justify-center gap-3 rounded-[12px] border border-black bg-black px-4 text-[16px] font-medium text-white disabled:cursor-wait disabled:opacity-60"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/brand-3p/apple-white.svg" alt="" width={20} height={20} />
                  <span>{c.redeem.continueWithApple}</span>
                </button>
              ) : null}
              <p className="text-center text-sm text-muted">{c.redeem.signInOr}</p>
            </div>
          ) : null}
          <form method="post" onSubmit={signInWithPassword} noValidate className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor={emailId} className="font-semibold">{c.redeem.emailLabel}</label>
              <input
                id={emailId}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="username"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
                required
                className="min-h-12 rounded-[12px] border border-line bg-fog px-4 text-[16px] outline-none focus:border-graphite"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor={passwordId} className="font-semibold">{c.redeem.passwordLabel}</label>
              <input
                id={passwordId}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                className="min-h-12 rounded-[12px] border border-line bg-fog px-4 text-[16px] outline-none focus:border-graphite"
              />
            </div>
            <button type="submit" disabled={signingIn || redirecting || !mounted} className="btn btn-primary disabled:cursor-wait disabled:opacity-60">
              {signingIn ? c.redeem.signInPending : c.redeem.signInButton}
            </button>
          </form>
          <div aria-live="polite" className="min-h-0">
            {redirecting ? (
              <p className="rounded-[14px] bg-mint-tint px-4 py-3 leading-relaxed" role="status">{c.redeem.redirecting}</p>
            ) : notice ? (
              <p className="rounded-[14px] bg-danger-tint px-4 py-3 leading-relaxed" role="alert">{c.messages[notice]}</p>
            ) : null}
          </div>
        </div>
        <div className="flex flex-col gap-2 text-sm text-muted">
          <p>{c.redeem.signInNoAccount}</p>
          {giftLink}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-[14px] bg-mint-tint px-4 py-3">
        <p className="leading-relaxed" role="status">{c.redeem.signedIn}</p>
        <button type="button" onClick={() => void signOut()} className="rich-link">{c.redeem.signOut}</button>
      </div>
      <form method="post" onSubmit={redeem} noValidate className="flex flex-col gap-6 rounded-[22px] border border-line bg-white p-6 sm:p-8">
        <h2 className="font-display text-[24px] font-extrabold leading-tight tracking-[-0.02em]">{c.redeem.codeHeading}</h2>
        <div className="flex flex-col gap-2">
          <label htmlFor={codeId} className="font-semibold">{c.redeem.codeLabel}</label>
          <input
            id={codeId}
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            required
            aria-describedby={`${codeId}-hint`}
            className="min-h-12 rounded-[12px] border border-line bg-fog px-4 text-[16px] outline-none focus:border-graphite"
          />
          <p id={`${codeId}-hint`} className="text-sm text-muted">{c.redeem.codeHint}</p>
        </div>
        <button type="submit" disabled={pending || !mounted} className="btn btn-primary disabled:cursor-wait disabled:opacity-60">
          {pending ? c.redeem.pending : c.redeem.button}
        </button>
        <div aria-live="polite" className="min-h-0">
          {result ? (
            <p className={`rounded-[14px] px-4 py-3 leading-relaxed ${ok ? "bg-mint-tint" : "bg-danger-tint"}`} role={ok ? "status" : "alert"}>
              {c.messages[result]}
            </p>
          ) : null}
        </div>
      </form>
      <div className="text-sm text-muted">{giftLink}</div>
    </div>
  );
}
