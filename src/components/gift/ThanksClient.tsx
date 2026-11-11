"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useState, useSyncExternalStore } from "react";
import { GIFT_LANG_KEY, formatGiftDate, giftPaths, isPlausibleCode, normalizeCode, todayIso, validUntil, type GiftLocale } from "@/lib/gift";
import { giftCopy } from "@/content/gift";
import { Voucher } from "./Voucher";

const subscribeNever = () => () => {};

/**
 * Thank-you page body (M6-S01, contract §8.2): paste the code from the Lemon Squeezy e-mail, get a printable
 * voucher. Client only, and nothing leaves the browser: no request, no storage of the code, no URL parameter,
 * no analytics event. The only storage access is reading and removing the language marker the gift page set.
 */
export function ThanksClient({ locale, promiseKitHref }: { locale: GiftLocale; promiseKitHref: string | null }) {
  const c = giftCopy[locale];
  const router = useRouter();
  const codeId = useId();
  const dateId = useId();
  const [code, setCode] = useState("");
  const [pickedDate, setPickedDate] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);

  // Default purchase date = today, read on the client only so the prerendered HTML does not depend on the clock.
  const today = useSyncExternalStore(subscribeNever, () => todayIso(), () => "");
  const date = pickedDate ?? today;

  // Lemon Squeezy redirects every buyer to the English URL: a buyer who started on the Slovenian page goes on in Slovenian.
  useEffect(() => {
    if (locale !== "en") return;
    try {
      if (window.localStorage.getItem(GIFT_LANG_KEY) === "sl") {
        window.localStorage.removeItem(GIFT_LANG_KEY);
        router.replace(giftPaths.thanks.sl);
      }
    } catch {
      // Storage blocked: stay on the English page, which has a language link.
    }
  }, [locale, router]);

  const plausible = isPlausibleCode(code);
  const until = validUntil(date);
  const ready = plausible && until !== null;
  const showError = touched && code.trim() !== "" && !plausible;
  const other: GiftLocale = locale === "sl" ? "en" : "sl";

  return (
    <div className="flex flex-col gap-12">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] lg:gap-14">
        <form className="flex flex-col gap-6 rounded-[22px] border border-line bg-white p-6 sm:p-8" onSubmit={(e) => e.preventDefault()} autoComplete="off">
          <div className="flex flex-col gap-2">
            <label htmlFor={codeId} className="font-semibold">{c.thanks.codeLabel}</label>
            <input
              id={codeId}
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onBlur={() => setTouched(true)}
              autoComplete="off"
              autoCapitalize="off"
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
          <div className="flex flex-col gap-2">
            <label htmlFor={dateId} className="font-semibold">{c.thanks.dateLabel}</label>
            <input
              id={dateId}
              type="date"
              value={date}
              onChange={(e) => setPickedDate(e.target.value)}
              className="min-h-12 rounded-[12px] border border-line bg-fog px-4 text-[16px] outline-none focus:border-graphite"
              aria-describedby={`${dateId}-hint`}
            />
            <p id={`${dateId}-hint`} className="text-sm text-muted">{c.thanks.dateHint}</p>
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
              <Voucher locale={locale} code={normalizeCode(code)} validUntilIso={until} />
              <p className="mt-3 text-sm text-muted" aria-live="polite">
                {c.thanks.voucher.validUntil}: {formatGiftDate(until, locale)}
              </p>
            </div>
          ) : (
            <div className="flex min-h-48 items-center justify-center rounded-[22px] border border-dashed border-line bg-white p-8 text-center text-muted">{c.thanks.previewEmpty}</div>
          )}
          <p className="text-sm text-muted">{c.thanks.notChecked}</p>
        </div>
      </div>

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
          <Link href={giftPaths.redeem[locale]} className="btn btn-secondary">{giftCopy[locale].redeemLink.button}</Link>
          {promiseKitHref ? <Link href={promiseKitHref} className="rich-link">{giftCopy[locale].kit.button}</Link> : null}
          {/* TODO(David): link the promise kit PDF here once M6-S02 ships (the kit page link above shows while its switch is on). */}
        </div>
      </section>

      <p className="text-sm text-muted">
        <Link href={giftPaths.thanks[other]} hrefLang={other} lang={other} className="rich-link">{giftCopy[locale].langName}</Link>
      </p>
    </div>
  );
}
