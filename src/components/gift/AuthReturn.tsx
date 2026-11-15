"use client";

import { useEffect, useRef, useState } from "react";
import { giftPath, type MessageKey } from "@/lib/gift";
import { checkState, parseReturnFragment, requestWebSession, takeSignInEntry, writeHandoff } from "@/lib/webSignin";
import { giftCopy } from "@/content/gift";
import { localeMeta, type Locale } from "@/i18n/config";

/**
 * /auth/return (M6-S01b, CONTRACT_WEB_SIGNIN §5.2): where Google and Apple send the browser back after the full-page
 * sign-in redirect. One URL for all languages. The very first statement moves the fragment (which holds the ID token)
 * out of the address bar and the history; then the stored state is checked, the ID token is exchanged for a web
 * session token, and the parent goes on to the redeem page with a full page load (so it starts without any GA/GTM).
 * Nothing is logged and nothing but the read-once handoff is stored.
 */
export function AuthReturn() {
  const [failure, setFailure] = useState<{ key: MessageKey; locale: Locale } | null>(null);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    // 1. First statement: take the fragment and remove it from the URL and the history.
    const hash = window.location.hash;
    window.history.replaceState(null, "", "/auth/return");

    void (async () => {
      let locale: Locale = "en";
      const fail = (key: MessageKey) => setFailure({ key, locale });
      try {
        // 2. Read and delete the stored entry, then check state and age.
        const entry = takeSignInEntry(window.sessionStorage);
        if (entry) locale = entry.locale;
        document.documentElement.lang = localeMeta[locale].htmlLang;
        const frag = parseReturnFragment(hash);
        if (frag.kind === "error") return fail(checkState(entry, frag.state) ? "signin_cancelled" : "signin_failed");
        if (frag.kind !== "ok" || !checkState(entry, frag.state)) return fail("signin_failed");
        // 3. Exchange the ID token for a web session token.
        const r = await requestWebSession({ method: entry.provider, id_token: frag.idToken, nonce: entry.rawNonce, locale: entry.locale });
        if (!r.ok) return fail(r.key);
        // 4. Success: handoff, then a full load of the redeem page.
        writeHandoff(window.sessionStorage, { token: r.token, expiresAt: r.expiresAt });
        window.location.replace(giftPath(entry.locale, "redeem"));
      } catch {
        fail("signin_failed");
      }
    })();
  }, []);

  if (!failure) {
    return <div className="container-page py-24" role="status" aria-live="polite"><p className="text-muted">{giftCopy.en.redeem.redirecting}</p></div>;
  }
  const c = giftCopy[failure.locale];
  return (
    <div className="container-page flex max-w-xl flex-col gap-6 py-24">
      <p className="rounded-[14px] bg-danger-tint px-4 py-3 leading-relaxed" role="alert">{c.messages[failure.key]}</p>
      <p>
        <a href={giftPath(failure.locale, "redeem")} className="btn btn-primary">{c.redeem.returnBack}</a>
      </p>
    </div>
  );
}
