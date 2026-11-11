#!/usr/bin/env node
/**
 * Pet Promise Kit (M6-S02): builds the sold PDFs from src/content/promise-kit/{en,sl}.ts.
 *   out/promise-kit/petprep-promise-kit-{sl,en}.pdf     the full kit (11 A4 pages)
 *   out/promise-kit/petprep-promise-sample-{sl,en}.pdf  the free sample (the Promise page only)
 * The PDFs are NOT committed and NOT served from public/ (they are sold; /out is git-ignored).
 * `--previews` also renders page PNGs (out/promise-kit/png/) and refreshes the sales-page previews in
 * public/promise-kit/ (WebP, safe to commit: one page each, shown on the sales page).
 * Usage: npm run kit:build [-- --previews]    Needs google-chrome (or CHROME_BIN) and, for previews, pdftoppm.
 */
import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import sharp from "sharp";

const root = resolve(import.meta.dirname, "..");
const { en } = await import(pathToFileURL(join(root, "src/content/promise-kit/en.ts")).href);
const { sl } = await import(pathToFileURL(join(root, "src/content/promise-kit/sl.ts")).href);
const { renderKitHtml, fullPages, samplePages } = await import(pathToFileURL(join(root, "src/content/promise-kit/print.ts")).href);

const outDir = join(root, "out/promise-kit");
const pngDir = join(outDir, "png");
const previewDir = join(root, "public/promise-kit");
const chromeBin = process.env.CHROME_BIN || "google-chrome";
const wantPreviews = process.argv.includes("--previews");
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

const built = [];
for (const [lang, copy] of [["sl", sl], ["en", en]]) {
  built.push(toPdf(renderKitHtml(copy, { pages: fullPages, assets }), `petprep-promise-kit-${lang}`));
  built.push(toPdf(renderKitHtml(copy, { pages: samplePages, assets, sample: true }), `petprep-promise-sample-${lang}`));
}
for (const f of built) {
  const pages = /Pages:\s+(\d+)/.exec(execFileSync("pdfinfo", [f]).toString())?.[1];
  console.log(`${f.replace(root + "/", "")}  ${pages} pages`);
}

if (wantPreviews) {
  mkdirSync(pngDir, { recursive: true });
  mkdirSync(previewDir, { recursive: true });
  for (const lang of ["sl", "en"]) {
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
