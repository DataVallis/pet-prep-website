"use client";

import Link from "next/link";
import { useId, useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import { apiBase, giftPaths, isPlausibleCode, isPlausibleEmail, isSuccess, normalizeCode, redeemOutcome, type GiftLocale, type MessageKey } from "@/lib/gift";
import { giftCopy } from "@/content/gift";

const subscribeNever = () => () => {};

/**
 * Redeem form (M6-S01, contract §8.3–§8.4). The browser posts straight to the PetPrep API so the per-IP rate
 * limits see the real client address. The code is never read from the URL and never stored. One request at a
 * time; the result is shown inline in a polite live region.
 */
export function RedeemForm({ locale }: { locale: GiftLocale }) {
  const c = giftCopy[locale];
  const codeId = useId();
  const emailId = useId();
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<MessageKey | null>(null);
  const busy = useRef(false);
  // Disabled until hydrated: a submit before the script runs must not do a native form submission.
  const mounted = useSyncExternalStore(subscribeNever, () => true, () => false);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy.current) return;
    if (!isPlausibleCode(code) || !isPlausibleEmail(email)) {
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
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ code: normalizeCode(code), email: email.trim(), locale }),
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
    setResult(key);
    if (isSuccess(key)) setCode("");
  }

  const ok = result !== null && isSuccess(result);
  return (
    <div className="mx-auto flex w-full max-w-xl flex-col gap-6">
      <form method="post" onSubmit={submit} noValidate className="flex flex-col gap-6 rounded-[22px] border border-line bg-white p-6 sm:p-8">
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
        <div className="flex flex-col gap-2">
          <label htmlFor={emailId} className="font-semibold">{c.redeem.emailLabel}</label>
          <input
            id={emailId}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
            aria-describedby={`${emailId}-hint`}
            className="min-h-12 rounded-[12px] border border-line bg-fog px-4 text-[16px] outline-none focus:border-graphite"
          />
          <p id={`${emailId}-hint`} className="text-sm text-muted">{c.redeem.emailHint}</p>
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
      <div className="flex flex-col gap-2 text-sm text-muted">
        <p>{c.redeem.noAccountHelp}</p>
        <p>
          <Link href={giftPaths.gift[locale]} className="rich-link">{c.redeem.giftLink}</Link>
        </p>
      </div>
    </div>
  );
}
