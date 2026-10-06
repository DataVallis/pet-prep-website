import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const ogSize = { width: 1200, height: 630 };

const dir = join(process.cwd(), "src/og");
const fontsPromise = Promise.all([
  readFile(join(dir, "BricolageGrotesque-800.ttf")),
  readFile(join(dir, "InstrumentSans-500.ttf")),
  readFile(join(dir, "mark.png"), "base64"),
]);

/** Brand share image: title on fog, mint slab with the mark on the right. */
export async function ogImage({ eyebrow, title, footer }: { eyebrow: string; title: string; footer: string }) {
  const [display, text, mark] = await fontsPromise;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#F3F5F2", fontFamily: "Instrument" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 0 56px 72px", width: 800 }}>
          <div style={{ display: "flex", fontSize: 24, letterSpacing: 3, textTransform: "uppercase", color: "#1A7A55" }}>{eyebrow}</div>
          <div style={{ display: "flex", fontFamily: "Bricolage", fontSize: title.length > 60 ? 58 : 70, lineHeight: 1.02, letterSpacing: -2, color: "#121614" }}>
            {title}
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "#5A635D" }}>{footer}</div>
        </div>
        <div style={{ display: "flex", flex: 1, margin: "40px 40px 40px 0", borderRadius: 40, background: "#7FE0B4", alignItems: "center", justifyContent: "center" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`data:image/png;base64,${mark}`} width={250} height={250} alt="" />
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Bricolage", data: display, weight: 800, style: "normal" },
        { name: "Instrument", data: text, weight: 500, style: "normal" },
      ],
    },
  );
}
