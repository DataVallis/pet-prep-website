"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";

export type ShareStrings = {
  button: string;
  title: string;
  copy: string;
  copied: string;
  linkLabel: string;
  more: string;
  on: string;
};

/**
 * `appCaptured`: on phones the web share URL is a universal / app link — the network's app opens
 * on its home feed and drops the link (seen with Facebook on iOS, David 2026-10-14). There the
 * system share sheet is used instead, whose Facebook / LinkedIn entry opens the real composer.
 */
type Network = {
  name: string;
  href: (url: string, text: string, subject: string) => string;
  icon: React.ReactNode;
  appCaptured?: boolean;
};

/** Phone or tablet with a system share sheet (touch-first pointer; desktops keep the web dialogs). */
function prefersSystemShare(): boolean {
  if (typeof navigator === "undefined" || typeof navigator.share !== "function") return false;
  return typeof window.matchMedia === "function" && window.matchMedia("(pointer: coarse)").matches;
}

const svg = (d: string) => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="currentColor">
    <path d={d} />
  </svg>
);

const enc = encodeURIComponent;
const noSubscribe = () => () => {};

/** Brand marks from Simple Icons (CC0), mail drawn in the site's line style. */
const NETWORKS: Network[] = [
  {
    name: "X",
    href: (u, t) => `https://x.com/intent/post?url=${enc(u)}&text=${enc(t)}`,
    icon: svg("M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"),
  },
  {
    name: "Facebook",
    href: (u) => `https://www.facebook.com/sharer/sharer.php?u=${enc(u)}`,
    appCaptured: true,
    icon: svg(
      "M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z",
    ),
  },
  {
    name: "LinkedIn",
    href: (u) => `https://www.linkedin.com/sharing/share-offsite/?url=${enc(u)}`,
    appCaptured: true,
    icon: svg(
      "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
    ),
  },
  {
    name: "WhatsApp",
    href: (u, t) => `https://wa.me/?text=${enc(`${t} ${u}`)}`,
    icon: svg(
      "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z",
    ),
  },
  {
    name: "Telegram",
    href: (u, t) => `https://t.me/share/url?url=${enc(u)}&text=${enc(t)}`,
    icon: svg(
      "M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z",
    ),
  },
  {
    name: "E-mail",
    href: (u, t, s) => `mailto:?subject=${enc(s)}&body=${enc(`${t}\n\n${u}`)}`,
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="18" height="14" rx="2.5" />
        <path d="m4 7 8 6 8-6" />
      </svg>
    ),
  },
];

const tile =
  "flex h-12 w-12 items-center justify-center rounded-[12px] bg-white text-graphite ring-1 ring-line transition hover:bg-mint-tint hover:ring-mint focus-visible:outline-2";

/**
 * "Share" pill on a breed page: popover with the page link (copy) and share links for
 * X, Facebook, LinkedIn, WhatsApp, Telegram and e-mail, plus the system share sheet ("…")
 * where the browser has one. No third-party scripts — plain links opened in a new tab.
 */
export function ShareButton({ url, text, subject, strings }: { url: string; text: string; subject: string; strings: ShareStrings }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  // System share sheet ("…") only where the browser has one; false during SSR.
  const canNativeShare = useSyncExternalStore(
    noSubscribe,
    () => typeof navigator.share === "function",
    () => false,
  );
  const root = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const copyBtn = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (root.current && !root.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
    };
    // Focus moves into the panel (announced as a dialog) on open.
    copyBtn.current?.focus();
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  async function copy() {
    let ok = false;
    try {
      await navigator.clipboard.writeText(url);
      ok = true;
    } catch {
      // Older / insecure contexts: select the link and try the legacy command; if that fails
      // too, the selected link stays for a manual copy.
      input.current?.select();
      ok = typeof document.execCommand === "function" && document.execCommand("copy");
    }
    if (!ok) return;
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  /** `urlOnly`: Facebook's share extension ignores text and can drop the link when text is set. */
  async function nativeShare(urlOnly = false) {
    try {
      await navigator.share(urlOnly ? { url } : { title: subject, text, url });
    } catch {
      /* dismissed */
    }
  }

  return (
    <div ref={root} className="relative inline-flex">
      <button
        ref={trigger}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={panelId}
        className="inline-flex items-center gap-2.5 rounded-full bg-white px-5 py-2.5 text-[15px] font-medium text-graphite ring-1 ring-line transition hover:ring-graphite"
      >
        {strings.button}
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="currentColor" className="text-muted">
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4" stroke="currentColor" strokeWidth="2" />
        </svg>
      </button>

      {open ? (
        <div
          id={panelId}
          role="dialog"
          aria-label={strings.title}
          className="absolute left-0 top-full z-30 mt-3 w-[min(92vw,380px)] rounded-[22px] bg-white p-5 shadow-[0_18px_50px_-12px_rgba(18,22,20,0.28)] ring-1 ring-line"
        >
          <p className="mb-3 text-sm font-medium text-graphite">{strings.title}</p>
          <div className="flex overflow-hidden rounded-[12px] ring-1 ring-line">
            <input
              ref={input}
              readOnly
              value={url}
              aria-label={strings.linkLabel}
              onFocus={(e) => e.currentTarget.select()}
              className="min-w-0 flex-1 bg-fog/60 px-3 py-2.5 text-[14px] text-graphite outline-none"
            />
            <button ref={copyBtn} type="button" onClick={copy} className="shrink-0 bg-graphite px-4 text-[14px] font-semibold text-mint transition hover:bg-graphite-3">
              {copied ? strings.copied : strings.copy}
            </button>
          </div>
          <span role="status" className="sr-only">
            {copied ? strings.copied : ""}
          </span>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {NETWORKS.map((n) => (
              <a
                key={n.name}
                href={n.href(url, text, subject)}
                {...(n.name === "E-mail" ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                onClick={(e) => {
                  if (n.appCaptured && prefersSystemShare()) {
                    e.preventDefault();
                    void nativeShare(true);
                  }
                }}
                className={tile} aria-label={strings.on.replace("{network}", n.name)} title={n.name}>
                {n.icon}
              </a>
            ))}
            {canNativeShare ? (
              <button type="button" onClick={() => void nativeShare()} className={tile} aria-label={strings.more} title={strings.more}>
                <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="currentColor">
                  <circle cx="5" cy="12" r="2" />
                  <circle cx="12" cy="12" r="2" />
                  <circle cx="19" cy="12" r="2" />
                </svg>
              </button>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
