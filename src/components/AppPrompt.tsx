"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/content/types";
import { midName } from "@/lib/breedName";
import { BAR_SCROLL_PX, barAllowed, copyKey, isPromptVariant, POPUP_MIN_MS, popupAllowed, PROMPT_SOURCE, promptSection, readMemory, scrolledEnough, SIGNED_UP_EVENT, writeMemory, type PromptVariant } from "@/lib/appPrompt";
import { EarlyAccessForm } from "./EarlyAccessForm";

type Breed = { id: string; name: string; species: "dog" | "cat"; image: string };
type PageHint = { variant: PromptVariant; breed?: Breed };
type Opened = PageHint & { from: "popup" | "bar" };
type Stores = { ios: string; android: string; iosLabel: string; androidLabel: string; barLabel: string } | null;

function storage(): Storage | null {
  try { return window.localStorage; } catch { return null; }
}

/** The page's own marker (AppPromptHint); a page without one gets the default prompt. */
function readHint(): PageHint {
  const el = document.querySelector<HTMLElement>("[data-app-prompt]");
  const v = el?.dataset.appPrompt;
  const variant = isPromptVariant(v) ? v : "default";
  const { breedId, breedName, breedSpecies, breedImage } = el?.dataset ?? {};
  // A breed is only named when its own portrait can be shown next to the name.
  const breed = breedId && breedName && breedImage?.startsWith("/") && (breedSpecies === "dog" || breedSpecies === "cat") ? { id: breedId, name: breedName, species: breedSpecies, image: breedImage } as Breed : undefined;
  return { variant, breed };
}

/** The cookie banner or its settings window is open (classes the banner sets on <html>): one question at a time. */
const cookieBannerOpen = () => /(^|\s)show--(consent|preferences)(\s|$)/.test(document.documentElement.className);
const typing = () => /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName ?? "");
/** One of the page's own e-mail forms is on screen: the bar would only repeat it. */
function ownFormVisible(): boolean {
  for (const el of document.querySelectorAll("[data-early-access]:not([data-app-prompt-form] *)")) {
    const r = el.getBoundingClientRect();
    if (r.height > 0 && r.bottom > 0 && r.top < window.innerHeight) return true;
  }
  return false;
}

function track(event: string, params: Record<string, string>) {
  try { (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag?.("event", event, params); } catch { /* analytics is optional */ }
}

/**
 * Bar at the bottom of the screen + one pop-up, on every page that allows it (lib/appPrompt.ts, docs/APP_SIGNUP_PROMPT.md).
 * Both ask for the same thing as the page's own call to action: an e-mail for early access to the app — or, once the app
 * is live, a tap on a store button. The pop-up opens once per visit, after the visitor has spent 8 s on the page and seen
 * half of it (or moves the pointer out of the top of the window), never over the cookie banner, another dialog or while
 * they are typing; it is a bottom sheet on a phone, not a full-screen wall. Sign-ups go through EarlyAccessForm
 * (source `app_prompt`, section `popup_<wording>` / `bar_<wording>`).
 */
export function AppPrompt({
  locale,
  copy,
  formCopy,
  privacyHref,
  screenSrc,
  stores,
}: {
  locale: Locale;
  copy: Dictionary["appPrompt"];
  formCopy: Dictionary["earlyAccess"];
  privacyHref: string;
  screenSrc: string;
  /** Store links once the app is live; null before launch (the e-mail form is shown). */
  stores: Stores;
}) {
  const pathname = usePathname();
  const dialog = useRef<HTMLDialogElement>(null);
  const [bar, setBar] = useState(false);
  const [opened, setOpened] = useState<Opened | null>(null);
  const [done, setDone] = useState(false);
  const popupShown = useRef(false);
  const arrivedAt = useRef(0);

  const open = useCallback((from: Opened["from"]) => {
    const hint = readHint();
    if (hint.variant === "none") return;
    popupShown.current = true;
    setOpened({ ...hint, from });
    track("app_prompt_view", { prompt: from, wording: copyKey(hint.variant, !!hint.breed) });
  }, []);

  useEffect(() => {
    arrivedAt.current = Date.now();
    let frame = 0;
    const check = () => {
      frame = 0;
      const { variant } = readHint();
      const now = Date.now();
      const memory = readMemory(storage());
      const quiet = cookieBannerOpen() || !!document.querySelector("dialog[open]");
      setBar(!quiet && barAllowed(variant, memory, now) && window.scrollY >= BAR_SCROLL_PX && !ownFormVisible());
      if (quiet || popupShown.current || typing() || ownFormVisible() || now - arrivedAt.current < POPUP_MIN_MS || !popupAllowed(variant, memory, now)) return;
      if (scrolledEnough(window.scrollY, window.innerHeight, document.documentElement.scrollHeight)) open("popup");
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(check); };
    // Leaving through the top of the window (address bar, tabs) on a desktop: the last moment to ask.
    const onLeave = (e: globalThis.MouseEvent) => {
      if (e.relatedTarget || e.clientY > 0 || popupShown.current || typing() || ownFormVisible() || cookieBannerOpen() || document.querySelector("dialog[open]")) return;
      const now = Date.now();
      if (now - arrivedAt.current >= POPUP_MIN_MS && popupAllowed(readHint().variant, readMemory(storage()), now)) open("popup");
    };
    const onSignedUp = () => setBar(false);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    document.addEventListener("mouseout", onLeave);
    window.addEventListener(SIGNED_UP_EVENT, onSignedUp);
    const first = window.setTimeout(schedule, 0);
    const later = window.setTimeout(schedule, POPUP_MIN_MS + 50);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      document.removeEventListener("mouseout", onLeave);
      window.removeEventListener(SIGNED_UP_EVENT, onSignedUp);
      window.clearTimeout(first);
      window.clearTimeout(later);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [pathname, open]);

  // The page keeps room for the bar, and the cookie-settings button moves above it (globals.css).
  useEffect(() => {
    document.body.classList.toggle("has-app-bar", bar);
    return () => document.body.classList.remove("has-app-bar");
  }, [bar]);

  useEffect(() => {
    const el = dialog.current;
    if (!opened || !el || el.open) return;
    el.showModal();
    // Asked for from the bar: straight to the field. Opened by itself: no keyboard popping up, no focus ring on a button.
    (opened.from === "bar" ? el.querySelector<HTMLElement>('input[type="email"]') : el.querySelector<HTMLElement>("[data-app-prompt-form]"))?.focus({ preventScroll: true });
  }, [opened]);

  function onClosed() {
    if (!done) writeMemory(storage(), { popupClosedAt: Date.now() });
    if (opened) track("app_prompt_close", { prompt: opened.from, signed_up: done ? "yes" : "no" });
    setOpened(null);
  }
  function onBackdrop(e: MouseEvent<HTMLDialogElement>) {
    if (e.target === e.currentTarget) e.currentTarget.close();
  }
  function closeBar() {
    writeMemory(storage(), { barClosedAt: Date.now() });
    setBar(false);
  }

  const wording = opened ? copyKey(opened.variant, !!opened.breed) : "default";
  const text = copy[wording];
  const breedShown = opened && wording === "breed" ? opened.breed : undefined;

  return (
    <>
      {bar && !opened ? (
        <div role="region" aria-label={copy.barLabel} className="app-bar fixed inset-x-0 bottom-0 z-40 border-t border-graphite-3 bg-graphite text-fog shadow-[0_-8px_30px_rgba(18,22,20,0.18)]">
          <div className="container-page flex items-center gap-2 py-2 sm:gap-3 sm:py-2.5">
            <div className="flex min-w-0 flex-1 items-center gap-3 sm:justify-center sm:gap-5 sm:pl-11">
              <p className="min-w-0 flex-1 text-[14px] font-medium leading-tight sm:flex-none sm:text-base">{copy.barText}</p>
              <button type="button" onClick={() => open("bar")} className="btn btn-mint !min-h-11 shrink-0 !px-3.5 !text-[14px] sm:!px-5 sm:!text-[15px]">
                {stores ? stores.barLabel : <><span className="sm:hidden">{copy.barButton}</span><span className="hidden sm:inline">{copy.button}</span></>}
              </button>
            </div>
            <button type="button" onClick={closeBar} aria-label={copy.close} className="-mr-1 grid size-11 shrink-0 place-items-center rounded-full border border-graphite-3 text-muted-dark hover:text-fog">
              <CloseIcon />
            </button>
          </div>
        </div>
      ) : null}

      <dialog
        ref={dialog}
        onClose={onClosed}
        onClick={onBackdrop}
        aria-labelledby="app-prompt-title"
        className="app-prompt fixed inset-0 m-auto mb-0 max-h-[92dvh] w-full max-w-none overflow-y-auto rounded-t-[30px] bg-fog p-0 text-graphite shadow-[0_-12px_60px_rgba(18,22,20,0.35)] backdrop:bg-graphite/60 sm:mb-auto sm:h-fit sm:max-w-[720px] sm:rounded-[30px]"
      >
        {opened ? (
          <div data-app-prompt-form tabIndex={-1} className="relative grid gap-x-8 p-5 pt-6 outline-none sm:grid-cols-[200px_1fr] sm:items-center sm:p-8">
            <button type="button" onClick={() => dialog.current?.close()} aria-label={copy.close} className="absolute right-3 top-3 z-10 grid size-11 place-items-center rounded-full border border-line bg-white text-graphite hover:border-graphite">
              <CloseIcon />
            </button>
            {/* Desktop: the whole app screen in a phone — or, on a breed page, that breed's own portrait. */}
            {breedShown ? (
              <Image src={breedShown.image} alt={breedShown.name} width={400} height={400} sizes="200px" unoptimized className="hidden aspect-[4/5] w-full rounded-[22px] bg-white object-cover sm:block" />
            ) : (
              <div className="hidden rounded-[30px] bg-[#0b0d0c] p-[7px] sm:block">
                <Image src={screenSrc} alt={copy.screenAlt} width={600} height={1298} sizes="186px" unoptimized className="h-auto w-full rounded-[24px]" />
              </div>
            )}
            <div className="flex min-w-0 flex-col">
              <div className="flex flex-col gap-2 pr-14">
                {breedShown ? <p className="text-[15px] font-semibold text-mint-text">{breedShown.name}</p> : null}
                <h2 id="app-prompt-title" className="text-balance font-display text-[26px] font-extrabold leading-[1.08] tracking-[-0.02em] sm:text-[32px]">{text.title}</h2>
              </div>
              <p className="mt-3 text-[16px] leading-relaxed text-muted sm:text-[17px]">{text.text}</p>
              {/* Phone: a readable band instead of a shrunken screen — the app's task line and care buttons (or the breed's portrait). */}
              {breedShown ? (
                <Image src={breedShown.image} alt={breedShown.name} width={700} height={340} sizes="100vw" unoptimized className="mt-4 h-[130px] w-full rounded-[18px] bg-white object-cover object-[70%_22%] sm:hidden" />
              ) : (
                <Image src={screenSrc} alt={copy.screenAlt} width={600} height={1298} sizes="100vw" unoptimized className="mt-4 h-[170px] w-full rounded-[18px] object-cover object-bottom sm:hidden" />
              )}
              <div className="mt-5 sm:mt-6">
              {stores ? (
                <div className="flex flex-wrap gap-3">
                  <a href={stores.ios} target="_blank" rel="noopener noreferrer" className="btn btn-primary" onClick={() => track("app_prompt_store", { store: "ios", prompt: opened.from })}>{stores.iosLabel}</a>
                  <a href={stores.android} target="_blank" rel="noopener noreferrer" className="btn btn-primary" onClick={() => track("app_prompt_store", { store: "android", prompt: opened.from })}>{stores.androidLabel}</a>
                </div>
              ) : (
                <EarlyAccessForm
                  locale={locale}
                  copy={{ ...formCopy, button: copy.button }}
                  privacyHref={privacyHref}
                  source={PROMPT_SOURCE}
                  section={promptSection(opened.from, opened.variant, !!opened.breed)}
                  breed={breedShown ? { id: breedShown.id, species: breedShown.species, name: midName(breedShown.name, locale) } : undefined}
                  showBreedLine={false}
                  stacked
                  onDone={() => {
                    setDone(true);
                    track("app_prompt_signup", { prompt: opened.from, wording });
                  }}
                />
              )}
              </div>
            </div>
          </div>
        ) : null}
      </dialog>
    </>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}
