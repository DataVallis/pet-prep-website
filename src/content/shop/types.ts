/**
 * Website shop copy (M6-S09): what the buy buttons, the thank-you pages and the free kit sample form say, in all
 * 15 site languages. Original text. "{email}" and "{date}" are replaced at runtime (src/lib/shop.ts `fill`).
 * Never a word about the payment provider being Lemon Squeezy: payments go through Stripe (Link is the seller).
 */
export type ShopCopy = {
  checkout: {
    /** Button text while the checkout is being opened. */
    pending: string;
    unavailable: string;
    rateLimited: string;
    error: string;
    /** One line under the buy button: who handles the payment and what arrives from whom. */
    secure: string;
  };
  order: {
    loading: string;
    pending: string;
    slow: string;
    notFound: string;
    failed: string;
    refunded: string;
    error: string;
    /** Paid, but its contents are no longer shown (older than 30 days or files missing). */
    old: string;
    orderNumber: string;
    emailSent: string;
    codeHeading: string;
    copy: string;
    copied: string;
    validUntil: string;
    redeemed: string;
    printHint: string;
    downloadsHeading: string;
    downloadsLead: string;
    download: string;
    /** Heading of the manual "code from the e-mail" form when there is no order on the page. */
    manualHeading: string;
    manualLead: string;
    retry: string;
  };
  kitThanks: {
    metaTitle: string;
    metaDescription: string;
    eyebrow: string;
    title: string;
    lead: string;
    noOrder: string;
  };
  sample: {
    emailLabel: string;
    consent: string;
    button: string;
    pending: string;
    ready: string;
    download: string;
    notReady: string;
    invalidEmail: string;
    consentRequired: string;
    rateLimited: string;
    error: string;
  };
};
