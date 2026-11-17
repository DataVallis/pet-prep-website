/**
 * Links that lead to the early-access form from a breed context carry the breed: `/sl?breed=french_bulldog#early-access`.
 * The form (components/EarlyAccessForm.tsx) reads `?breed=`, names the breed and sends it with the sign-up
 * (our /api/email-signups and Klaviyo profile property). Only valid registry-style ids are ever carried.
 */
export const BREED_ID_RE = /^[a-z0-9_]{1,64}$/;

/** `href` (path with an optional #hash) plus `?breed=<id>` before the hash; unchanged for external links, when the id is invalid, or when a query already exists. */
export function withBreed(href: string, breedId: string | null | undefined): string {
  if (!breedId || !BREED_ID_RE.test(breedId) || !href.startsWith("/") || href.includes("?")) return href;
  const hash = href.indexOf("#");
  return hash === -1 ? `${href}?breed=${breedId}` : `${href.slice(0, hash)}?breed=${breedId}${href.slice(hash)}`;
}

/** The breed id of a page URL query (`?breed=`), or null. */
export function breedFromSearch(search: string): string | null {
  const v = new URLSearchParams(search).get("breed");
  return v && BREED_ID_RE.test(v) ? v : null;
}
