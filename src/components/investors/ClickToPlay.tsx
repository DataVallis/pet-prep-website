"use client";

import { useState } from "react";

/**
 * YouTube embed behind a click (youtube-nocookie.com): no request to YouTube and no cookies before the
 * visitor presses play — fast and consent-clean. `src` is the embed URL without autoplay. `poster` is a
 * thumbnail from our own server (/api/yt-thumb/<id>); if it fails the tile falls back to its colour.
 */
export function ClickToPlay({ src, title, label, className, children, poster }: { src: string; title: string; label: string; className: string; children: React.ReactNode; poster?: string }) {
  const [on, setOn] = useState(false);
  const [posterOk, setPosterOk] = useState(true);
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
      {poster && posterOk ? (
        <>
          {/* Served by our own server (/api/yt-thumb), not by YouTube. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={poster} alt="" loading="lazy" decoding="async" onError={() => setPosterOk(false)} className="absolute inset-0 h-full w-full rounded-[inherit] object-cover" />
          <span aria-hidden="true" className="absolute inset-0 rounded-[inherit] bg-gradient-to-t from-graphite/85 via-graphite/10 to-transparent" />
          <span className="relative flex flex-col gap-0.5 text-fog [&_*]:!text-fog">{children}</span>
        </>
      ) : (
        children
      )}
      <span aria-hidden="true" className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-graphite text-mint ring-2 ring-mint transition-transform group-hover:scale-110">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
      </span>
    </button>
  );
}
