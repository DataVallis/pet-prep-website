"use client";

import { useState, useSyncExternalStore } from "react";
import type { Locale } from "@/i18n/config";
import { shopCopy } from "@/content/shop";
import { checkoutBody, checkoutOutcome, checkoutUrlOf, type CheckoutError, type ShopProduct } from "@/lib/shop";


/** Hydration flag without an effect: false on the server, true in the browser. */
const subscribeNever = () => () => {};
/**
 * Buy button of the gift voucher and the Pet Promise Kit (M6-S09). Asks our API for a Stripe Checkout Session
 * (POST /api/shop/checkout with the product, the page language and this language's own thank-you and return
 * paths) and goes there in the same tab. Nothing is stored in the browser. Disabled until hydrated, so a click
 * before the script runs does nothing instead of a dead link.
 */
export function BuyButton({ product, locale, label, className = "" }: { product: ShopProduct; locale: Locale; label: string; className?: string }) {
  const c = shopCopy[locale].checkout;
  const mounted = useSyncExternalStore(subscribeNever, () => true, () => false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<CheckoutError | null>(null);

  async function buy() {
    setPending(true);
    setError(null);
    try {
      const res = await fetch(checkoutUrlOf(), {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: checkoutBody(product, locale),
      });
      let body: unknown = null;
      try {
        body = await res.json();
      } catch {
        body = null;
      }
      const result = checkoutOutcome(res.status, body);
      if ("url" in result) {
        window.location.assign(result.url);
        return; // keep the pending state while the browser leaves
      }
      setError(result.error);
    } catch {
      setError("error");
    }
    setPending(false);
  }

  const message = error === "unavailable" ? c.unavailable : error === "rate_limited" ? c.rateLimited : error ? c.error : null;
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <button type="button" onClick={buy} disabled={pending || !mounted} aria-busy={pending} className="btn btn-primary disabled:cursor-not-allowed disabled:opacity-60">
        {pending ? c.pending : label}
      </button>
      <p role="status" aria-live="polite" className={message ? "text-sm text-danger" : "sr-only"}>
        {message ?? ""}
      </p>
    </div>
  );
}
