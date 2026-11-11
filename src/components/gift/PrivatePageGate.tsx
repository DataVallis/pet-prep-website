"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { isGiftPrivatePath } from "@/lib/gift";

/**
 * Renders its children (the Google Analytics and Tag Manager loaders) everywhere except on the gift thanks and
 * redeem pages and on /auth/return, where the voucher code, the sign-in e-mail and password or the sign-in token are in the DOM or the URL and no third-party script may run.
 * A visitor who arrives there by a full page load (the Lemon Squeezy redirect, a typed address) never gets the
 * scripts; one who navigates inside the site after they loaded elsewhere is covered by the GTM exclusion
 * (README → Gift voucher, TODO(David)). Every internal link to these pages is a plain `<a href>` (hard navigation), so
 * a container loaded on an earlier page never sees their DOM.
 */
export function PrivatePageGate({ children }: { children: ReactNode }) {
  return isGiftPrivatePath(usePathname()) ? null : <>{children}</>;
}
