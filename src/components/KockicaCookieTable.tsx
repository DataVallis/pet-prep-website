"use client";

import { useSyncExternalStore } from "react";

const noop = () => () => {};

/**
 * Kockica's cookie table (privacy page, "Cookies" section). Mounted only after hydration: Kockica fills the
 * element as soon as it exists, and a table filled before React hydrates is a hydration mismatch that makes
 * React re-render the whole document (which also removed the banner). Kockica watches the page and fills
 * the element when it appears.
 */
export function KockicaCookieTable({ className }: { className?: string }) {
  // false while server-rendering and hydrating, true right after.
  const mounted = useSyncExternalStore(noop, () => true, () => false);
  return mounted ? <div data-kockica-cookie-table className={className} /> : null;
}
