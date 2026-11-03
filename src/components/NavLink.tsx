"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";

export type NavMatch = "exact" | "section" | false;

const trim = (p: string) => (p.length > 1 ? p.replace(/\/+$/, "") : p);

/**
 * How `pathname` relates to a menu item: "exact" when it is the item's own page, "section" when it is
 * below it (/sl/zivali/psi/labradorec is inside /sl/zivali). A home href ("/" or a bare locale prefix
 * such as "/sl") only ever matches exactly, so Home never marks everything.
 */
export function matchPath(pathname: string | null, href: string): NavMatch {
  if (!pathname) return false;
  const p = trim(pathname);
  const h = trim(href.split("#")[0]);
  if (p === h) return "exact";
  if (h === "/" || h.split("/").filter(Boolean).length <= 1 && /^\/[a-z]{2}$/.test(h)) return false;
  return p.startsWith(`${h}/`) ? "section" : false;
}

export function bestMatch(pathname: string | null, hrefs: string[]): NavMatch {
  const all = hrefs.map((h) => matchPath(pathname, h));
  return all.includes("exact") ? "exact" : all.includes("section") ? "section" : false;
}

/** Menu link that marks itself active (aria-current="page" on the exact page) from the current path. */
export function NavLink({
  href,
  className = "",
  activeClassName = "",
  alsoActiveFor = [],
  children,
  ...rest
}: ComponentProps<typeof Link> & { href: string; activeClassName?: string; alsoActiveFor?: string[] }) {
  const pathname = usePathname();
  const m = bestMatch(pathname, [href, ...alsoActiveFor]);
  return (
    <Link
      href={href}
      aria-current={matchPath(pathname, href) === "exact" ? "page" : undefined}
      data-active={m ? "" : undefined}
      className={`${className} ${m ? activeClassName : ""}`}
      {...rest}
    >
      {children}
    </Link>
  );
}

/** Desktop top-level item: semibold + mint bar under the label when active. */
export const DESKTOP_ITEM = "relative py-1 hover:text-mint-text after:absolute after:inset-x-0 after:-bottom-1 after:h-[3px] after:rounded-full after:bg-mint after:opacity-0 after:transition-opacity";
export const DESKTOP_ACTIVE = "font-semibold text-graphite after:opacity-100";
