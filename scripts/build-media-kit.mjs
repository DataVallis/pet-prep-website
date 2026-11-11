#!/usr/bin/env node
/**
 * Media kit PDFs (M6-S03): public/media/petprep-media-kit-{sl,en}.pdf, built from HTML with the system
 * Chrome (google-chrome / chromium; override with CHROME=/path). Numbers are counted from
 * src/content/registry/registry.json at build time and carry the build date. Self-contained: loads the
 * copy from src/content/partners.ts and the brand fonts from src/fonts (Node 22 runs .ts natively).
 * Usage: node scripts/build-media-kit.mjs [--png <dir>]   (--png also writes one PNG per page for checking)
 */
import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const root = resolve(import.meta.dirname, "..");
const { kitCopy, partnerContactEmail } = await import(pathToFileURL(join(root, "src/content/partners.ts")).href);
const { computePartnerStats, formatAsOf, fill } = await import(pathToFileURL(join(root, "src/lib/partnerStats.ts")).href);
const registry = JSON.parse(readFileSync(join(root, "src/content/registry/registry.json"), "utf8"));
const stats = computePartnerStats(registry, ["x"], new Date());
const chrome = process.env.CHROME || "google-chrome";
const pngDir = process.argv.includes("--png") ? resolve(process.argv[process.argv.indexOf("--png") + 1]) : null;

const font = (file) => `data:font/woff2;base64,${readFileSync(join(root, "src/fonts", file)).toString("base64")}`;
const logo = `data:image/svg+xml;base64,${readFileSync(join(root, "public/brand/petprep-logo-horizontal-inverse.svg")).toString("base64")}`;
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const css = `
@font-face{font-family:"Bricolage";font-weight:800;src:url(${font("BricolageGrotesque-800.woff2")}) format("woff2")}
@font-face{font-family:"Bricolage";font-weight:700;src:url(${font("BricolageGrotesque-700.woff2")}) format("woff2")}
@font-face{font-family:"Instrument";font-weight:400;src:url(${font("InstrumentSans-400.woff2")}) format("woff2")}
@font-face{font-family:"Instrument";font-weight:600;src:url(${font("InstrumentSans-600.woff2")}) format("woff2")}
@page{size:A4;margin:0}
*{box-sizing:border-box}
html,body{margin:0}
body{font-family:Instrument,sans-serif;color:#121614;font-size:11.5pt;line-height:1.5;-webkit-print-color-adjust:exact;print-color-adjust:exact}
.page{width:210mm;height:297mm;padding:18mm 18mm 16mm;position:relative;overflow:hidden;page-break-after:always;background:#F3F5F2;display:flex;flex-direction:column;gap:7mm}
.page:last-child{page-break-after:auto}
.cover{background:#121614;color:#F3F5F2;justify-content:space-between}
.cover img.logo{width:62mm}
.cover h1{font-family:Bricolage;font-weight:800;font-size:44pt;line-height:1.05;letter-spacing:-0.02em;margin:0}
.cover .tag{font-size:16pt;color:#7FE0B4;margin:6mm 0 0}
.cover .co{font-size:11pt;color:#A3ADA6}
.band{height:10mm;background:#7FE0B4;border-radius:5mm;width:60mm}
h2{font-family:Bricolage;font-weight:800;font-size:22pt;letter-spacing:-0.015em;line-height:1.1;margin:0 0 3mm}
p{margin:0 0 3mm}
.card{background:#fff;border-radius:6mm;padding:5mm 6mm;margin-bottom:3.5mm}
.card h3{font-family:Bricolage;font-weight:700;font-size:13pt;margin:0 0 1mm}
.card p{margin:0;color:#3b443f;font-size:10.5pt}
.mint{background:#7FE0B4}
.foot{margin-top:auto;font-size:9pt;color:#5A635D;display:flex;justify-content:space-between}
.contact{font-size:15pt;font-family:Bricolage;font-weight:700}
`;

function html(lang) {
  const k = kitCopy[lang];
  const date = formatAsOf(stats.asOf, lang);
  const vars = { breeds: stats.breeds.total, dogs: stats.breeds.dogs, cats: stats.breeds.cats, date };
  const card = ([t, d]) => `<div class="card"><h3>${esc(fill(t, vars))}</h3><p>${esc(fill(d, vars))}</p></div>`;
  const paras = (a) => a.map((p) => `<p>${esc(p)}</p>`).join("");
  const foot = `<div class="foot"><span>${esc(k.company)}</span><span>${partnerContactEmail}</span></div>`;
  const url = "petprep.si/" + (lang === "sl" ? "sl/partnerji" : "partners");
  return `<!doctype html><html lang="${k.htmlLang}"><head><meta charset="utf-8"><title>PetPrep – ${esc(k.title)}</title><style>${css}</style></head><body>
<section class="page cover"><img class="logo" src="${logo}" alt="PetPrep"><div><div class="band"></div><h1 style="margin-top:8mm">${esc(k.title)}</h1><p class="tag">${esc(k.tagline)}</p></div><div class="co">${esc(k.company)}<br>${partnerContactEmail} · petprep.si</div></section>
<section class="page"><div><h2>${esc(k.what.heading)}</h2>${paras(k.what.paragraphs)}</div>
<div><h2>${esc(k.audience.heading)}</h2>${paras(k.audience.paragraphs)}</div>
<div><h2>${esc(k.examples.heading)}</h2>${k.examples.items.map(card).join("")}</div>${foot}</section>
<section class="page"><div><h2>${esc(k.coop.heading)}</h2>${k.coop.items.map(card).join("")}</div>
<div class="card mint"><h3>${esc(k.never.heading)}</h3><p style="color:#121614">${esc(k.never.text)}</p></div>
<div><h2>${esc(k.contact.heading)}</h2><p class="contact">${partnerContactEmail}</p><p>${esc(fill(k.contact.text, { email: partnerContactEmail, url }))}</p></div>${foot}</section>
</body></html>`;
}

const tmp = mkdtempSync(join(tmpdir(), "mediakit-"));
mkdirSync(join(root, "public/media"), { recursive: true });
for (const lang of ["sl", "en"]) {
  const file = join(tmp, `kit-${lang}.html`);
  writeFileSync(file, html(lang));
  const out = join(root, `public/media/petprep-media-kit-${lang}.pdf`);
  execFileSync(chrome, ["--headless=new", "--no-sandbox", "--disable-gpu", "--no-pdf-header-footer", `--print-to-pdf=${out}`, `file://${file}`], { stdio: "ignore" });
  console.log("wrote", out);
  if (pngDir) {
    mkdirSync(pngDir, { recursive: true });
    execFileSync("pdftoppm", ["-png", "-r", "70", out, join(pngDir, `kit-${lang}`)]);
  }
}
