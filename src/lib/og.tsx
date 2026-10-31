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

/**
 * Brand share image: title on fog, mint slab with the mark on the right — or, with `picture`
 * (base64 PNG, e.g. a colouring page), that picture on a white card on the mint slab.
 */
export async function ogImage({ eyebrow, title, footer, picture }: { eyebrow: string; title: string; footer: string; picture?: { png: string; width: number; height: number } }) {
  const [display, text, mark] = await fontsPromise;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#F3F5F2", fontFamily: "Instrument" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 0 56px 72px", width: picture ? 740 : 800 }}>
          <div style={{ display: "flex", fontSize: 24, letterSpacing: 3, textTransform: "uppercase", color: "#1A7A55" }}>{eyebrow}</div>
          <div style={{ display: "flex", fontFamily: "Bricolage", fontSize: title.length > 60 ? 58 : 70, lineHeight: 1.02, letterSpacing: -2, color: "#121614" }}>
            {title}
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "#5A635D" }}>{footer}</div>
        </div>
        <div style={{ display: "flex", flex: 1, margin: "40px 40px 40px 0", borderRadius: 40, background: "#7FE0B4", alignItems: "center", justifyContent: "center" }}>
          {picture ? (
            <div style={{ display: "flex", background: "#FFFFFF", borderRadius: 22, padding: 10 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`data:image/png;base64,${picture.png}`} height={510} width={Math.round((510 * picture.width) / picture.height)} alt="" />
            </div>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={`data:image/png;base64,${mark}`} width={250} height={250} alt="" />
          )}
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

/**
 * Share card of a breed page: name, a one-line promise and 2–3 facts on fog; the breed's AI
 * portrait on a graphite slab with the availability badge and an "AI photo" label.
 * `photo` is a PNG (Satori can't read WebP — the route converts the portrait with sharp).
 */
export async function breedOgImage({
  eyebrow,
  title,
  lead,
  chips,
  badge,
  photo,
  photoLabel,
  footer,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  chips: string[];
  badge: string;
  photo: string | null;
  photoLabel: string;
  footer: string;
}) {
  const [display, text, mark] = await fontsPromise;
  const titleSize = title.length > 24 ? 54 : title.length > 16 ? 64 : 78;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#F3F5F2", fontFamily: "Instrument" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "56px 40px 52px 68px", width: 660 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`data:image/png;base64,${mark}`} width={44} height={44} alt="" style={{ borderRadius: 12, background: "#7FE0B4" }} />
            <div style={{ display: "flex", fontSize: 21, letterSpacing: 3, textTransform: "uppercase", color: "#1A7A55" }}>{eyebrow}</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ display: "flex", fontFamily: "Bricolage", fontSize: titleSize, lineHeight: 1.0, letterSpacing: -2, color: "#121614" }}>{title}</div>
            <div style={{ display: "flex", fontSize: 28, lineHeight: 1.3, color: "#2C3530" }}>{lead}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 6 }}>
              {chips.map((chip) => (
                <div key={chip} style={{ display: "flex", padding: "9px 18px", borderRadius: 999, background: "#DDF6EA", color: "#121614", fontSize: 22 }}>
                  {chip}
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 21, color: "#5A635D" }}>
            <div style={{ display: "flex", fontFamily: "Bricolage", fontSize: 26, color: "#121614" }}>petprep.si</div>
            <div style={{ display: "flex" }}>{footer}</div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flex: 1,
            margin: "36px 36px 36px 0",
            borderRadius: 40,
            background: photo ? "#121614" : "#7FE0B4",
            alignItems: "flex-end",
            justifyContent: "center",
            paddingBottom: 30,
            position: "relative",
          }}
        >
          {photo ? (
            <div style={{ display: "flex", position: "relative", width: 440, height: 440 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`data:image/png;base64,${photo}`} width={440} height={440} alt="" style={{ borderRadius: 28, objectFit: "cover" }} />
              <div
                style={{
                  display: "flex",
                  position: "absolute",
                  bottom: 16,
                  left: 16,
                  padding: "6px 14px",
                  borderRadius: 999,
                  background: "rgba(18,22,20,0.72)",
                  color: "#F3F5F2",
                  fontSize: 17,
                }}
              >
                {photoLabel}
              </div>
            </div>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={`data:image/png;base64,${mark}`} width={220} height={220} alt="" />
          )}
          <div
            style={{
              display: "flex",
              position: "absolute",
              top: 22,
              right: 22,
              padding: "8px 16px",
              borderRadius: 999,
              background: "#7FE0B4",
              color: "#121614",
              fontSize: 19,
              letterSpacing: 1,
              textTransform: "uppercase",
            }}
          >
            {badge}
          </div>
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
