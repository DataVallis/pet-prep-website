"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { giftPath, isPlausibleCode, normalizeCode, type GiftLocale } from "@/lib/gift";
import { fill, formatOrderDate, type PaidOrder } from "@/lib/shop";
import { giftCopy } from "@/content/gift";
import { shopCopy } from "@/content/shop";
import { Downloads, OrderMessage, OrderMeta, useOrder } from "../shop/OrderStatus";
import { Voucher } from "./Voucher";

/**
 * Thank-you page body of the gift voucher (M6-S01, M6-S09). After a Stripe checkout the address carries
 * `?session_id=…`; the page loads the order from our API and shows the code (with a copy button), the printable
 * voucher and the kit downloads. Opened without a session (later, from a bookmark) it offers the manual form:
 * paste the code from our e-mail and print the voucher. The code is never put in a URL, storage or an analytics
 * event; the page carries no third-party script (PrivatePageGate) and sends no referrer.
 */
export function ThanksClient({ locale, promiseKitHref }: { locale: GiftLocale; promiseKitHref: string | null }) {
  const c = giftCopy[locale];
  const view = useOrder();

  return (
    <div className="flex flex-col gap-12">
      {view.kind === "paid" && view.voucher ? (
        <PaidVoucher locale={locale} order={view} code={view.voucher.code} />
      ) : view.kind === "paid" || view.kind === "none" ? (
        <div className="flex flex-col gap-6">
          {view.kind === "paid" ? (
            <>
              <OrderMeta locale={locale} orderNumber={view.orderNumber} emailMasked={view.emailMasked} />
              <p className="rounded-[22px] border border-line bg-white p-6 text-[17px] leading-relaxed sm:p-8">{shopCopy[locale].order.old}</p>
            </>
          ) : null}
          <ManualVoucher locale={locale} />
        </div>
      ) : (
        <OrderMessage view={view} locale={locale} backHref={giftPath(locale, "gift")} />
      )}

      {view.kind === "paid" ? <Downloads locale={locale} downloads={view.downloads} /> : null}

      <section aria-labelledby="thanks-steps" className="flex flex-col gap-4">
        <h2 id="thanks-steps" className="h-section !text-[28px] sm:!text-[34px]">{c.thanks.stepsHeading}</h2>
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {c.thanks.steps.map((s, i) => (
            <li key={s} className="flex flex-col gap-3 rounded-[22px] border border-line bg-white p-5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-mint font-display text-[17px] font-extrabold">{i + 1}</span>
              <span className="leading-relaxed">{s}</span>
            </li>
          ))}
        </ol>
        <div className="flex flex-wrap items-center gap-4">
          <a href={giftPath(locale, "redeem")} className="btn btn-secondary">{c.redeemLink.button}</a>
          {promiseKitHref ? <Link href={promiseKitHref} className="rich-link">{c.kit.button}</Link> : null}
        </div>
      </section>
    </div>
  );
}

/** A paid order: the code from our API, ready to copy and print. */
function PaidVoucher({ locale, order, code }: { locale: GiftLocale; order: PaidOrder; code: string }) {
  const s = shopCopy[locale].order;
  const g = giftCopy[locale];
  const [copied, setCopied] = useState(false);
  const voucher = order.voucher!;
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Clipboard blocked: the code stays selectable on the page.
    }
  };
  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] lg:gap-14">
      <div className="flex flex-col gap-6 rounded-[22px] border border-line bg-white p-6 sm:p-8">
        <div className="flex flex-col gap-2">
          <h2 className="h-card text-[22px]">{s.codeHeading}</h2>
          <p className="select-all break-all font-display text-[30px] font-extrabold tracking-[0.02em]">{code}</p>
          <p className="text-sm text-muted">{fill(s.validUntil, { date: formatOrderDate(voucher.expiresAt, locale) })}</p>
          {voucher.status === "redeemed" ? <p className="text-sm font-semibold">{s.redeemed}</p> : null}
        </div>
        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={copy} className="btn btn-secondary">
            {copied ? s.copied : s.copy}
          </button>
          <button type="button" onClick={() => window.print()} className="btn btn-primary">{g.thanks.print}</button>
        </div>
        <p role="status" aria-live="polite" className="sr-only">{copied ? s.copied : ""}</p>
        <p className="text-sm leading-relaxed text-muted">{s.printHint}</p>
        <OrderMeta locale={locale} orderNumber={order.orderNumber} emailMasked={order.emailMasked} />
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="h-card text-[22px]">{g.thanks.previewHeading}</h2>
        <div className="rounded-[22px] bg-fog p-0">
          <Voucher locale={locale} code={code} />
        </div>
      </div>
    </div>
  );
}

/** No order on the page: paste the code from our e-mail and print the voucher (nothing leaves the browser). */
function ManualVoucher({ locale }: { locale: GiftLocale }) {
  const c = giftCopy[locale];
  const s = shopCopy[locale].order;
  const codeId = useId();
  const [code, setCode] = useState("");
  const [touched, setTouched] = useState(false);
  const ready = isPlausibleCode(code);
  const showError = touched && code.trim() !== "" && !ready;
  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] lg:gap-14">
      <form className="flex flex-col gap-6 rounded-[22px] border border-line bg-white p-6 sm:p-8" onSubmit={(e) => e.preventDefault()} autoComplete="off">
        <div className="flex flex-col gap-1">
          <h2 className="h-card text-[22px]">{s.manualHeading}</h2>
          <p className="text-sm leading-relaxed text-muted">{s.manualLead}</p>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor={codeId} className="font-semibold">{c.thanks.codeLabel}</label>
          <input
            id={codeId}
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onBlur={() => setTouched(true)}
            autoComplete="off"
            autoCapitalize="characters"
            autoCorrect="off"
            spellCheck={false}
            inputMode="text"
            aria-invalid={showError}
            aria-describedby={`${codeId}-hint`}
            className="min-h-12 rounded-[12px] border border-line bg-fog px-4 text-[16px] outline-none focus:border-graphite"
          />
          <p id={`${codeId}-hint`} className={`text-sm ${showError ? "text-danger" : "text-muted"}`}>
            {showError ? c.thanks.codeInvalid : c.thanks.codeHint}
          </p>
        </div>
        <button type="button" onClick={() => window.print()} disabled={!ready} className="btn btn-primary disabled:cursor-not-allowed disabled:opacity-50">
          {c.thanks.print}
        </button>
        <p className="text-sm leading-relaxed text-muted">{c.thanks.privacy}</p>
      </form>
      <div className="flex flex-col gap-4">
        <h2 className="h-card text-[22px]">{c.thanks.previewHeading}</h2>
        {ready ? (
          <div className="rounded-[22px] bg-fog p-0">
            <Voucher locale={locale} code={normalizeCode(code).toUpperCase()} />
          </div>
        ) : (
          <div className="flex min-h-48 items-center justify-center rounded-[22px] border border-dashed border-line bg-white p-8 text-center text-muted">{c.thanks.previewEmpty}</div>
        )}
        <p className="text-sm text-muted">{c.thanks.notChecked}</p>
      </div>
    </div>
  );
}
