#!/usr/bin/env node
/**
 * Colouring pages (David 2026-10-31). Sources: assets/coloring/<id>.png (line art, no logo) and
 * assets/coloring/petprep-logo-outline.svg (PetPrep logo as transparent outline, vector — brand/logo).
 * Writes public/coloring/<id>.png (1792×2620, drawing + logo bottom right, antialiased), one A4 and one
 * US Letter PDF per page (logo stays vector) and the book PDFs with every page.
 * Usage: node scripts/coloring-pdf.mjs  (needs google-chrome)
 */
import { execFileSync } from "node:child_process";
import { mkdtempSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

const src = resolve("assets/coloring");
const out = resolve("public/coloring");
// Book order = page order on petprep.si (src/content/coloring/coloring.ts); any other PNG goes last.
const order = ["curio-hello", "golden-retriever-ball", "golden-retriever-bed", "labrador-lake", "labrador-puppy-bowls", "border-collie-frisbee", "border-collie-puzzle", "mixed-puppy-sleeping", "mixed-dog-water", "kitten-yarn", "cat-box", "curio-park"];
const files = readdirSync(src).filter((f) => f.endsWith(".png")).map((f) => f.slice(0, -4));
const ids = [...order.filter((id) => files.includes(id)), ...files.filter((id) => !order.includes(id)).sort()];
const tmp = mkdtempSync(join(tmpdir(), "coloring-"));
const logo = `data:image/svg+xml;base64,${readFileSync(join(src, "petprep-logo-outline.svg")).toString("base64")}`;
const art = (id) => `data:image/png;base64,${readFileSync(join(src, `${id}.png`)).toString("base64")}`;
const W = 1792, H = 2400, BAND = 220, LOGO = 760;

/** One sheet: drawing on top, white band below with the logo at the bottom right (same geometry everywhere). */
const sheet = (id) => `<div class="sheet"><img class="art" src="${art(id)}" alt=""><img class="logo" src="${logo}" alt=""></div>`;
const sheetCss = `.sheet { position: relative; width: ${W}px; height: ${H + BAND}px; background: #fff; }
.art { position: absolute; left: 0; top: 0; width: ${W}px; height: ${H}px; }
.logo { position: absolute; right: 100px; top: ${H + 20}px; width: ${LOGO}px; }`;

function chrome(args, html, name) {
  const file = join(tmp, `${name}.html`);
  writeFileSync(file, html);
  execFileSync("google-chrome", ["--headless=new", "--no-sandbox", "--disable-gpu", "--hide-scrollbars", ...args, `file://${file}`], { stdio: "ignore" });
}

// 1. PNG per page (download / web), 1:1 pixels.
for (const id of ids) {
  chrome([`--window-size=${W},${H + BAND}`, `--screenshot=${join(out, `${id}.png`)}`], `<!doctype html><html><head><style>html,body{margin:0;background:#fff}${sheetCss}</style></head><body>${sheet(id)}</body></html>`, `png-${id}`);
}

// 2. PDFs: the same sheet as one SVG scaled to the paper, so the logo stays vector.
const sizes = { a4: ["210mm", "297mm"], letter: ["8.5in", "11in"] };
const svgSheet = (id) =>
  `<svg viewBox="0 0 ${W} ${H + BAND}" xmlns="http://www.w3.org/2000/svg"><rect width="${W}" height="${H + BAND}" fill="#fff"/><image href="${art(id)}" x="0" y="0" width="${W}" height="${H}"/><image href="${logo}" x="${W - 100 - LOGO}" y="${H + 20}" width="${LOGO}" height="${(LOGO * 158) / 522}"/></svg>`;
function pdf(pages, size, name) {
  const [pw, ph] = sizes[size];
  const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@page { size: ${pw} ${ph}; margin: 10mm; }
html, body { margin: 0; }
.page { height: calc(${ph} - 20mm); display: flex; flex-direction: column; align-items: center; justify-content: center; break-after: page; }
.page:last-child { break-after: auto; }
.page svg { height: calc(100% - 8mm); width: auto; max-width: 100%; }
footer { font: 600 10pt/1 Helvetica, Arial, sans-serif; color: #5A635D; margin-top: 3mm; }
</style></head><body>${pages.map((id) => `<section class="page">${svgSheet(id)}<footer>petprep.si &nbsp;·&nbsp; #walkyourpet &nbsp;·&nbsp; @petprep.si</footer></section>`).join("")}</body></html>`;
  chrome(["--no-pdf-header-footer", `--print-to-pdf=${join(out, `${name}.pdf`)}`], html, name);
}
for (const size of Object.keys(sizes)) {
  for (const id of ids) pdf([id], size, `${id}.${size}`);
  pdf(ids, size, `petprep-coloring-pages.${size}`);
}
console.log(`${ids.length} pages → ${ids.length} PNG + ${ids.length * 2 + 2} PDFs in public/coloring`);
