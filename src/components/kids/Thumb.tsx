import type { KidsItem } from "@/content/kids";

/** Picture of a kids item: its image, or the mint "#" tile for #walkyourpet. */
export function Thumb({ item, size }: { item: KidsItem; size: "xs" | "sm" | "lg" }) {
  const box = size === "xs" ? "h-9 w-9 rounded-[10px]" : size === "sm" ? "h-14 w-14 rounded-[14px]" : "h-48 w-full rounded-[16px]";
  if (!item.image) {
    return <span aria-hidden="true" className={`${box} flex shrink-0 items-center justify-center bg-graphite font-display font-extrabold text-mint ${size === "lg" ? "px-4 text-center text-[clamp(22px,2.6vw,34px)] leading-tight [overflow-wrap:anywhere]" : "text-[20px]"}`}>{size === "lg" ? item.title : "#"}</span>;
  }
  const isPage = item.image.src.startsWith("/coloring/");
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={item.image.src}
      alt=""
      width={item.image.width}
      height={item.image.height}
      loading="lazy"
      className={`${box} shrink-0 ${isPage ? `border border-line bg-white ${size === "lg" ? "object-contain py-2" : "object-cover object-[center_45%]"}` : "bg-mint object-contain p-1"}`}
    />
  );
}
