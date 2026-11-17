"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { localeMeta, type Locale } from "@/i18n/config";
import { shopCopy } from "@/content/shop";
import { fill, ORDER_POLL_MS, orderOutcome, orderUrlOf, sessionIdFrom, shouldPollAgain, type Download, type OrderState } from "@/lib/shop";

const subscribeNever = () => () => {};

export type OrderView = OrderState | { kind: "none" } | { kind: "loading" } | { kind: "slow" };

/**
 * Loads the order behind the Stripe `session_id` of the thank-you address (M6-S09): GET /api/shop/orders/{id},
 * every 3 s while the payment is being confirmed, for at most 2 minutes. The session id is the only thing read
 * from the address; nothing is stored. `none` = the page was opened without a session (e.g. later, from a link).
 */
export function useOrder(): OrderView {
  const [view, setView] = useState<OrderView>({ kind: "loading" });
  // The session id is fixed for the page's life: read once in the browser (null on the server).
  const sid = useSyncExternalStore(subscribeNever, () => sessionIdFrom(window.location.search), () => undefined);
  useEffect(() => {
    if (!sid) return;
    let stopped = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const started = Date.now();
    const load = async () => {
      let state: OrderState;
      try {
        const res = await fetch(orderUrlOf(sid), { headers: { Accept: "application/json" }, cache: "no-store" });
        let body: unknown = null;
        try {
          body = await res.json();
        } catch {
          body = null;
        }
        state = orderOutcome(res.status, body);
      } catch {
        state = { kind: "error" };
      }
      if (stopped) return;
      if (state.kind === "pending") {
        if (shouldPollAgain(state, Date.now() - started)) {
          setView(state);
          timer = setTimeout(load, ORDER_POLL_MS);
        } else {
          setView({ kind: "slow" });
        }
        return;
      }
      setView(state);
    };
    void load();
    return () => {
      stopped = true;
      if (timer) clearTimeout(timer);
    };
  }, [sid]);
  if (sid === null) return { kind: "none" };
  return view;
}

/** One line for every state that is not a paid order. */
export function OrderMessage({ view, locale, backHref }: { view: OrderView; locale: Locale; backHref: string }) {
  const c = shopCopy[locale].order;
  const text =
    view.kind === "loading" ? c.loading
    : view.kind === "pending" ? c.pending
    : view.kind === "slow" ? c.slow
    : view.kind === "not_found" ? c.notFound
    : view.kind === "failed" ? c.failed
    : view.kind === "refunded" ? c.refunded
    : view.kind === "error" ? c.error
    : null;
  if (!text) return null;
  const busy = view.kind === "loading" || view.kind === "pending";
  return (
    <div role="status" aria-live="polite" aria-busy={busy} className="flex flex-col items-start gap-4 rounded-[22px] border border-line bg-white p-6 sm:p-8">
      <p className="text-[17px] leading-relaxed">{text}</p>
      {view.kind === "failed" || view.kind === "not_found" ? (
        <a href={backHref} className="btn btn-secondary">{c.retry}</a>
      ) : null}
    </div>
  );
}

/** Order number and where the e-mail went. */
export function OrderMeta({ locale, orderNumber, emailMasked }: { locale: Locale; orderNumber: string; emailMasked: string | null }) {
  const c = shopCopy[locale].order;
  return (
    <p className="text-sm leading-relaxed text-muted">
      {c.orderNumber} {orderNumber}
      {emailMasked ? <> · {fill(c.emailSent, { email: emailMasked })}</> : null}
    </p>
  );
}

/** Signed download links (PDF), the buyer's language first; labelled with each language's own name. */
export function Downloads({ locale, downloads }: { locale: Locale; downloads: Download[] }) {
  const c = shopCopy[locale].order;
  if (downloads.length === 0) return null;
  return (
    <section aria-labelledby="shop-downloads" className="flex flex-col gap-4 rounded-[22px] border border-line bg-white p-6 sm:p-8">
      <h2 id="shop-downloads" className="h-card text-[22px]">{c.downloadsHeading}</h2>
      <p className="text-sm text-muted">{c.downloadsLead}</p>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {downloads.map((d, i) => (
          <li key={d.locale}>
            {/* A signed API link: no referrer, and the browser downloads instead of navigating away. */}
            <a href={d.url} rel="noreferrer" download className={`${i === 0 ? "btn btn-primary" : "btn btn-secondary"} w-full`} lang={localeMeta[d.locale].htmlLang}>
              {c.download} · {localeMeta[d.locale].label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
