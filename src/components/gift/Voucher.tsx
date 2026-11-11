import { redeemDisplayUrl, type GiftLocale } from "@/lib/gift";
import { giftCopy } from "@/content/gift";
import "./voucher.css";

/** Font size of the code in container-width units: the long Lemon Squeezy keys (36 characters) wrap at their hyphens. */
function codeSize(code: string): number {
  if (code.length <= 20) return 4.6;
  if (code.length <= 40) return 3.4;
  return 2.6;
}

/** The code with a line-break opportunity after each hyphen. */
function CodeText({ code }: { code: string }) {
  const parts = code.split("-");
  return (
    <>
      {parts.map((p, i) => (
        <span key={i}>
          {p}
          {i < parts.length - 1 ? (
            <>
              -<wbr />
            </>
          ) : null}
        </span>
      ))}
    </>
  );
}

function OneVoucher({ locale, code }: { locale: GiftLocale; code: string }) {
  const v = giftCopy[locale].thanks.voucher;
  return (
    <div className="voucher-slot">
      <div className="voucher-wrap">
        <div className="voucher">
          <div className="voucher-art">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/curio/curio-waving.webp" alt="" width={720} height={948} />
          </div>
          <div className="voucher-body">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/petprep-logo-horizontal.svg" alt="PetPrep" width={128} height={32} className="voucher-logo" />
            <p className="voucher-kind">{v.kind}</p>
            <p className="voucher-title">{v.title}</p>
            <p className="voucher-line">{v.line}</p>
            <div className="voucher-code-box">
              <p className="voucher-code-label">{v.code}</p>
              <p className="voucher-code" style={{ fontSize: `${codeSize(code)}cqw` }}>
                <CodeText code={code} />
              </p>
            </div>
            <p className="voucher-meta">
              <span>
                {v.redeemAt} <strong>{redeemDisplayUrl[locale]}</strong>
              </span>
              <span>
                <strong>{v.validity}</strong>
              </span>
            </p>
            <p className="voucher-note">{v.parentNote}</p>
            <div className="voucher-fields">
              <p>
                <span>{v.forLabel}</span>
                <i />
              </p>
              <p>
                <span>{v.fromLabel}</span>
                <i />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * The printable voucher: A4 portrait, two identical vouchers (top and bottom half, 210 × 148.5 mm) with a
 * dashed fold line between them. On screen only one is shown. Drawn entirely in the browser from the code
 * the buyer typed; nothing is stored or sent.
 */
export function Voucher({ locale, code }: { locale: GiftLocale; code: string }) {
  return (
    <div className="voucher-sheet print-sheet">
      <OneVoucher locale={locale} code={code} />
      <OneVoucher locale={locale} code={code} />
    </div>
  );
}
