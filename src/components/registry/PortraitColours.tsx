"use client";

import Image, { getImageProps } from "next/image";
import { useId, useRef, useState, useSyncExternalStore } from "react";

export type PortraitColourItem = { key: string; label: string; src: string; alt: string };

/** true in the browser, false in the static HTML (the selector stays hidden without JavaScript). */
const noop = () => () => {};
const useIsClient = () => useSyncExternalStore(noop, () => true, () => false);

/**
 * Breed portrait with its standard coat colours (M5-R11-08, David 2026-10-26). The static HTML shows the
 * default colour; with JavaScript a radio group of colour chips swaps the image. The previous image stays
 * until the chosen one has loaded (no blank frame), every image has the same box (no layout shift), and
 * hovering or focusing a chip preloads its image. Without JavaScript the chips keep their space but are
 * invisible, so there is no control that does nothing.
 */
export function PortraitColours({
  colours,
  defaultKey,
  legend,
  caption,
  width,
  height,
  sizes,
  className,
}: {
  colours: PortraitColourItem[];
  defaultKey: string;
  legend: string;
  caption: string;
  width: number;
  height: number;
  sizes: string;
  className: string;
}) {
  const isClient = useIsClient();
  const name = useId();
  const [selected, setSelected] = useState(defaultKey);
  const [shown, setShown] = useState(defaultKey);
  const preloaded = useRef(new Set<string>());
  const byKey = (k: string) => colours.find((c) => c.key === k) ?? colours[0];
  const current = byKey(shown);
  const next = selected === shown ? null : byKey(selected);

  function preload(c: PortraitColourItem) {
    if (preloaded.current.has(c.key) || c.key === shown) return;
    preloaded.current.add(c.key);
    const { props } = getImageProps({ src: c.src, width, height, alt: "", sizes });
    const img = new window.Image();
    if (props.sizes) img.sizes = props.sizes;
    if (props.srcSet) img.srcset = props.srcSet;
    img.src = props.src;
  }

  const imageClass = "col-start-1 row-start-1 h-auto w-full rounded-[22px] bg-white ring-1 ring-line";

  return (
    <figure className={className}>
      <div className="grid">
        {[current, ...(next ? [next] : [])].map((c) => (
          <Image
            key={c.key}
            src={c.src}
            width={width}
            height={height}
            alt={c === next ? "" : c.alt}
            aria-hidden={c === next ? true : undefined}
            preload={c.key === defaultKey && c === current}
            loading={c === next ? "eager" : undefined}
            sizes={sizes}
            onLoad={c === next ? () => setShown(c.key) : undefined}
            onError={c === next ? () => setShown(c.key) : undefined}
            className={`${imageClass} ${c === next ? "opacity-0" : ""}`}
          />
        ))}
      </div>
      <figcaption className="text-[13px] text-muted">{caption}</figcaption>
      <fieldset className={`mt-2 ${isClient ? "" : "invisible"}`}>
        <legend className="mb-2 text-[13px] font-semibold text-graphite">{legend}</legend>
        <div className="flex flex-wrap gap-2">
          {colours.map((c) => (
            <label key={c.key} className="cursor-pointer" onPointerEnter={() => preload(c)}>
              <input
                type="radio"
                name={name}
                value={c.key}
                checked={selected === c.key}
                onChange={() => setSelected(c.key)}
                onFocus={() => preload(c)}
                className="peer sr-only"
              />
              <span className="inline-flex min-h-10 items-center rounded-full bg-white px-3.5 py-1.5 text-sm font-medium ring-1 ring-line hover:ring-graphite peer-checked:bg-graphite peer-checked:text-white peer-checked:ring-graphite peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-graphite">
                {c.label}
              </span>
            </label>
          ))}
        </div>
      </fieldset>
    </figure>
  );
}
