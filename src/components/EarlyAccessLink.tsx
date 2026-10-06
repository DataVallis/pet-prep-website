"use client";

import Link from "next/link";
import type { MouseEvent, ReactNode } from "react";

/**
 * Link to the early-access form. When the form is on the current page it scrolls there
 * on every click (a plain hash link does nothing once the hash is already in the URL)
 * and focuses the email field; otherwise it navigates normally.
 */
export function EarlyAccessLink({
  href,
  targetId,
  className,
  children,
}: {
  href: string;
  targetId: string;
  className?: string;
  children: ReactNode;
}) {
  function onClick(e: MouseEvent<HTMLAnchorElement>) {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    const target = document.getElementById(targetId);
    if (!target) return;
    e.preventDefault();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    window.history.replaceState(window.history.state, "", `#${targetId}`);
    target.querySelector<HTMLInputElement>('input[type="email"]')?.focus({ preventScroll: true });
  }

  return (
    <Link href={href} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}
