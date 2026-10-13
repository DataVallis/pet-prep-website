"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";

/**
 * Mobile menu built on <details> so it still opens without JavaScript.
 * With JS it also closes when a new page loads, when a link inside it is
 * tapped, on Escape, and on a tap outside the menu.
 */
export function MobileMenu({ summary, children }: { summary: ReactNode; children: ReactNode }) {
  const ref = useRef<HTMLDetailsElement>(null);
  const pathname = usePathname();

  // Close after navigation (the header lives in the layout and is not remounted).
  useEffect(() => {
    if (ref.current) ref.current.open = false;
  }, [pathname]);

  useEffect(() => {
    const close = () => {
      if (ref.current) ref.current.open = false;
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && ref.current?.open) {
        close();
        ref.current?.querySelector("summary")?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (ref.current?.open && !ref.current.contains(e.target as Node)) close();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, []);

  return (
    <details ref={ref} className="group relative ml-auto lg:hidden">
      {summary}
      <div
        onClick={(e) => {
          // Also covers links to the current page or a #hash, where the path doesn't change.
          if ((e.target as HTMLElement).closest("a") && ref.current) ref.current.open = false;
        }}
        className="absolute right-0 top-14 w-[min(88vw,340px)] rounded-[22px] border border-line bg-white p-5 shadow-xl"
      >
        {children}
      </div>
    </details>
  );
}
