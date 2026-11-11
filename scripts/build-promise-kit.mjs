#!/usr/bin/env node
/**
 * Pet Promise Kit (M6-S02): builds the sold PDFs from src/content/promise-kit/<lang>.ts, for all 15 site languages
 * (David 2026-11-11: en, sl, de, fr, es, it, pt, nl, pl, cs, hr, sv, da, fi, nb).
 *   out/promise-kit/petprep-promise-kit-<lang>.pdf     the full kit (11 A4 pages)
 *   out/promise-kit/petprep-promise-sample-<lang>.pdf  the free sample (the Promise page only)
 * The PDFs are NOT committed and NOT served from public/ (they are sold; /out is git-ignored).
 * `--previews` also renders page PNGs (out/promise-kit/png/) and refreshes the sales-page previews in
 * public/promise-kit/ (WebP, safe to commit: one page each, shown on the sales page).
 * Usage: npm run kit:build [-- --previews] [--lang=de,pl]    (default: every language) Needs google-chrome (or CHROME_BIN) and, for previews, pdftoppm.
 */
import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import sharp from "sharp";

const root = resolve(import.meta.dirname, "..");
const { kitCopy, kitLangs } = await import(pathToFileURL(join(root, "src/content/promise-kit/index.ts")).href);
const { renderKitHtml, fullPages, samplePages } = await import(pathToFileURL(join(root, "src/content/promise-kit/print.ts")).href);

const outDir = join(root, "out/promise-kit");
const pngDir = join(outDir, "png");
const previewDir = join(root, "public/promise-kit");
const chromeBin = process.env.CHROME_BIN || "google-chrome";
const wantPreviews = process.argv.includes("--previews");
const only = process.argv.find((a) => a.startsWith("--lang="))?.slice(7).split(",");
const langs = kitLangs.filter((l) => !only || only.includes(l));
mkdirSync(outDir, { recursive: true });

const dataUri = (file, type) => `data:${type};base64,${readFileSync(join(root, file)).toString("base64")}`;
const font = (family, weight, file) => `@font-face{font-family:"${family}";font-weight:${weight};font-style:normal;src:url("${pathToFileURL(join(root, "src/fonts", file)).href}") format("woff2");}`;
const assets = {
  fontCss: [
    font("PetPrep Bricolage", 700, "BricolageGrotesque-700.woff2"),
    font("PetPrep Bricolage", 800, "BricolageGrotesque-800.woff2"),
    font("PetPrep Instrument", 400, "InstrumentSans-400.woff2"),
    font("PetPrep Instrument", 500, "InstrumentSans-500.woff2"),
    font("PetPrep Instrument", 600, "InstrumentSans-600.woff2"),
    font("PetPrep Instrument", 700, "InstrumentSans-700.woff2"),
  ].join(""),
  mark: dataUri("public/brand/petprep-mark.svg", "image/svg+xml"),
  curio: dataUri("public/curio/kit/curio-transparent.png", "image/png"),
};

const tmp = mkdtempSync(join(tmpdir(), "promise-kit-"));
function toPdf(html, name) {
  const htmlFile = join(tmp, `${name}.html`);
  writeFileSync(htmlFile, html);
  const pdf = join(outDir, `${name}.pdf`);
  execFileSync(chromeBin, ["--headless=new", "--no-sandbox", "--disable-gpu", "--no-pdf-header-footer", "--virtual-time-budget=5000", `--print-to-pdf=${pdf}`, pathToFileURL(htmlFile).href], { stdio: "ignore" });
  return pdf;
}

// Overflow guard: pages are fixed A4 with overflow hidden, so a long translation would be clipped silently.
// Chrome renders a copy of the HTML with a script that writes any clipped page into <body data-overflow>.
const overflowScript = `<script>window.addEventListener("load",()=>{const bad=[];document.querySelectorAll(".page").forEach((pg,i)=>{const r=pg.getBoundingClientRect();const limit=r.bottom-parseFloat(getComputedStyle(pg).paddingBottom)+2;let max=0;pg.querySelectorAll("*").forEach((el)=>{const b=el.getBoundingClientRect();if(b.height>0&&!el.closest(".hero,.foot,.sample-foot")&&b.bottom>max)max=b.bottom;if(b.right>r.right+1)bad.push((i+1)+":x");});if(pg.scrollHeight>pg.clientHeight+1||max>limit)bad.push((i+1)+":y"+Math.round(max-limit));});document.body.setAttribute("data-overflow",bad.join(","));});</script>`;
function overflowOf(html, name) {
  const f = join(tmp, `${name}-check.html`);
  writeFileSync(f, html.replace("</body>", `${overflowScript}</body>`));
  const dom = execFileSync(chromeBin, ["--headless=new", "--no-sandbox", "--disable-gpu", "--virtual-time-budget=5000", "--dump-dom", pathToFileURL(f).href], { maxBuffer: 64 * 1024 * 1024 }).toString();
  return /data-overflow="([^"]*)"/.exec(dom)?.[1] ?? "";
}
const clipped = [];

const built = [];
for (const lang of langs) {
  const copy = kitCopy[lang];
  const fullHtml = renderKitHtml(copy, { pages: fullPages, assets });
  const sampleHtml = renderKitHtml(copy, { pages: samplePages, assets, sample: true });
  for (const [html, name] of [[fullHtml, `petprep-promise-kit-${lang}`], [sampleHtml, `petprep-promise-sample-${lang}`]]) {
    built.push(toPdf(html, name));
    const bad = overflowOf(html, name);
    if (bad) clipped.push(`${name}: page:axis+px ${bad}`);
  }
}
for (const f of built) {
  const pages = /Pages:\s+(\d+)/.exec(execFileSync("pdfinfo", [f]).toString())?.[1];
  console.log(`${f.replace(root + "/", "")}  ${pages} pages`);
}

if (clipped.length) {
  console.error(`OVERFLOW (text runs past the page or is clipped):\n  ${clipped.join("\n  ")}`);
  process.exitCode = 1;
} else console.log("overflow check: no page is clipped");

if (wantPreviews) {
  mkdirSync(pngDir, { recursive: true });
  mkdirSync(previewDir, { recursive: true });
  for (const lang of langs) {
    execFileSync("pdftoppm", ["-r", "110", "-png", join(outDir, `petprep-promise-kit-${lang}.pdf`), join(pngDir, `kit-${lang}`)]);
    execFileSync("pdftoppm", ["-r", "110", "-png", join(outDir, `petprep-promise-sample-${lang}.pdf`), join(pngDir, `sample-${lang}`)]);
    // Sales-page previews: cover (1), the Promise (3) and the cost sheet (8).
    for (const [name, page] of [["cover", 1], ["promise", 3], ["cost", 8]]) {
      const src = readdirSync(pngDir).find((f) => f.startsWith(`kit-${lang}-`) && Number(f.match(/-(\d+)\.png$/)[1]) === page);
      await sharp(join(pngDir, src)).resize({ width: 900 }).webp({ quality: 82 }).toFile(join(previewDir, `preview-${lang}-${name}.webp`));
    }
  }
  console.log("previews: out/promise-kit/png/ and public/promise-kit/preview-*.webp");
}
