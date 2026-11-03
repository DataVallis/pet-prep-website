"use client";

import { useState } from "react";

/**
 * YouTube embed behind a click (youtube-nocookie.com): no request to YouTube and no cookies before the
 * visitor presses play — fast and consent-clean. `src` is the embed URL without autoplay.
 */
export function ClickToPlay({ src, title, label, className, children }: { src: string; title: string; label: string; className: string; children: React.ReactNode }) {
  const [on, setOn] = useState(false);
  if (on) {
    return (
      <div className={className}>
        <iframe
          src={`${src}${src.includes("?") ? "&" : "?"}autoplay=1&rel=0`}
          title={title}
          className="h-full w-full rounded-[inherit] border-0"
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      </div>
    );
  }
  return (
    <button type="button" onClick={() => setOn(true)} aria-label={label} className={`${className} group relative flex cursor-pointer flex-col items-start justify-end text-left`}>
      {children}
      <span aria-hidden="true" className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-graphite text-mint ring-2 ring-mint transition-transform group-hover:scale-110">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
      </span>
    </button>
  );
}
