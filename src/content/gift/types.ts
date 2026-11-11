import type { MessageKey } from "../../lib/gift.ts";

/**
 * Gift voucher copy (M6-S01), one file per site language (David 2026-11-11: all 15). Original text in the PetPrep voice,
 * in the register the language's site pages already use (src/content/<lang>.ts): no ages, no promise of a real pet, no
 * invented numbers. The price and the validity are not written into the sentences where a number would have to be
 * formatted: the price comes from src/lib/gift.ts, the validity (12 months) is spelled in the text.
 */
export type GiftCopy = {
  meta: { title: string; description: string };
  breadcrumb: string;
  eyebrow: string;
  title: string;
  lead: string;
  buy: { button: string; soon: string; priceNote: string; validity: string; refund: string; newTab: string };
  what: { heading: string; paragraphs: string[] };
  how: { heading: string; steps: { title: string; text: string }[] };
  included: { heading: string; items: string[] };
  audience: { heading: string; forTitle: string; forItems: string[]; notTitle: string; notItems: string[] };
  faq: { heading: string; items: { q: string; a: string }[] };
  redeemLink: { heading: string; text: string; button: string };
  kit: { text: string; button: string };
  thanks: {
    meta: { title: string; description: string };
    eyebrow: string;
    title: string;
    lead: string;
    codeLabel: string;
    codeHint: string;
    codeInvalid: string;
    print: string;
    privacy: string;
    previewHeading: string;
    previewEmpty: string;
    stepsHeading: string;
    steps: string[];
    notChecked: string;
    voucher: { kind: string; title: string; line: string; code: string; redeemAt: string; validity: string; forLabel: string; fromLabel: string; parentNote: string };
  };
  redeem: {
    meta: { title: string; description: string };
    eyebrow: string;
    title: string;
    lead: string;
    codeLabel: string;
    codeHint: string;
    /** Sign-in e-mail field (M6-S01b: the parent signs in, the page no longer asks for an e-mail to look up). */
    emailLabel: string;
    button: string;
    pending: string;
    giftLink: string;
    signInHeading: string;
    signInLead: string;
    continueWithGoogle: string;
    continueWithApple: string;
    signInOr: string;
    passwordLabel: string;
    signInButton: string;
    signInPending: string;
    redirecting: string;
    signInNoAccount: string;
    signedIn: string;
    signOut: string;
    codeHeading: string;
    returnBack: string;
  };
  messages: Record<MessageKey, string>;
};
