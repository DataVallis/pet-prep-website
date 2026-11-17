"use client";

import type { Locale } from "@/i18n/config";
import { shopCopy } from "@/content/shop";
import { promiseKitHref } from "@/lib/gift";
import { Downloads, OrderMessage, OrderMeta, useOrder } from "../shop/OrderStatus";

/** Kit thank-you body (M6-S09): the order behind `?session_id=…` with its signed PDF links, in every language. */
export function KitThanksClient({ locale }: { locale: Locale }) {
  const c = shopCopy[locale];
  const view = useOrder();
  if (view.kind === "none") {
    return <p className="rounded-[22px] border border-line bg-white p-6 text-[17px] leading-relaxed sm:p-8">{c.kitThanks.noOrder}</p>;
  }
  if (view.kind !== "paid") {
    return <OrderMessage view={view} locale={locale} backHref={promiseKitHref(locale)} />;
  }
  return (
    <div className="flex flex-col gap-6">
      <OrderMeta locale={locale} orderNumber={view.orderNumber} emailMasked={view.emailMasked} />
      {view.downloads.length > 0 ? (
        <Downloads locale={locale} downloads={view.downloads} />
      ) : (
        <p className="rounded-[22px] border border-line bg-white p-6 text-[17px] leading-relaxed sm:p-8">{c.order.old}</p>
      )}
    </div>
  );
}
