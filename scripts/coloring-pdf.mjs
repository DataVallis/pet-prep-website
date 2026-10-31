#!/usr/bin/env node
/**
 * Printable PDFs of the colouring pages (David 2026-10-31): one A4 and one US Letter PDF per page,
 * plus one A4 / Letter book with every page. Source: public/coloring/<id>.png (1-bit line art).
 * Usage: node scripts/coloring-pdf.mjs  (needs google-chrome; writes public/coloring/*.pdf)
 */
import { execFileSync } from "node:child_process";
import { mkdtempSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

const dir = resolve("public/coloring");
// Book order = page order on petprep.si (src/content/coloring/coloring.ts); any other PNG goes last.
const order = ["curio-hello", "golden-retriever-ball", "golden-retriever-bed", "labrador-lake", "labrador-puppy-bowls", "border-collie-frisbee", "border-collie-puzzle", "mixed-puppy-sleeping", "mixed-dog-water", "kitten-yarn", "cat-box", "curio-park"];
const files = readdirSync(dir).filter((f) => f.endsWith(".png")).map((f) => f.slice(0, -4));
const ids = [...order.filter((id) => files.includes(id)), ...files.filter((id) => !order.includes(id)).sort()];
const tmp = mkdtempSync(join(tmpdir(), "coloring-"));
const sizes = { a4: "210mm 297mm", letter: "8.5in 11in" };

function html(pages, size) {
  const sheets = pages
    .map((id) => {
      const data = readFileSync(join(dir, `${id}.png`)).toString("base64");
      return `<section><img src="data:image/png;base64,${data}" alt=""><footer>petprep.si &nbsp;·&nbsp; #walkyourpet &nbsp;·&nbsp; @petprep.si</footer></section>`;
    })
    .join("");
  return `<!doctype html><html><head><meta charset="utf-8"><style>
@page { size: ${sizes[size]}; margin: 10mm; }
html, body { margin: 0; }
section { height: calc(${size === "a4" ? "297mm" : "11in"} - 20mm); display: flex; flex-direction: column; align-items: center; justify-content: center; page-break-after: always; break-after: page; }
section:last-child { page-break-after: auto; break-after: auto; }
img { max-width: 100%; max-height: calc(100% - 9mm); object-fit: contain; }
footer { font: 600 10pt/1 Helvetica, Arial, sans-serif; color: #5A635D; margin-top: 3mm; }
</style></head><body>${sheets}</body></html>`;
}

function pdf(pages, size, out) {
  const file = join(tmp, `${out}.html`);
  writeFileSync(file, html(pages, size));
  execFileSync("google-chrome", ["--headless=new", "--no-sandbox", "--disable-gpu", "--no-pdf-header-footer", `--print-to-pdf=${join(dir, `${out}.pdf`)}`, `file://${file}`], { stdio: "ignore" });
}

for (const size of Object.keys(sizes)) {
  for (const id of ids) pdf([id], size, `${id}.${size}`);
  pdf(ids, size, `petprep-coloring-pages.${size}`);
}
console.log(`${ids.length} pages → ${ids.length * 2 + 2} PDFs in public/coloring`);
