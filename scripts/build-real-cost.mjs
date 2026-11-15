#!/usr/bin/env node
/**
 * Builds the interactive 3D "How much work is a dog?" experience (M6-S04) into one self-contained
 * file, public/real-cost/app.html, which the page embeds in an <iframe>
 * (src/components/real-cost/RealCostPage.tsx).
 *
 * Source: tools/real-cost/ (index.html + src/main.js + src/strings.js; three.js and cannon-es are
 * bundled in, so the site makes no third-party request). Fonts: public/real-cost/fonts/ (copies of
 * src/fonts/).
 *
 * Run `npm run real-cost:build` after ANY change under tools/real-cost/ and commit the result —
 * src/lib/realCost.test.ts fails when the committed file is stale.
 */
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { build } from "esbuild";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const src = path.join(root, "tools/real-cost");
export const outFile = path.join(root, "public/real-cost/app.html");
const TAG = '<script type="module" src="./app.js"></script>';

export async function buildHtml() {
  const result = await build({
    entryPoints: [path.join(src, "src/main.js")],
    bundle: true,
    minify: true,
    format: "esm",
    target: "es2020",
    write: false,
    legalComments: "none",
    logLevel: "silent",
  });
  const js = result.outputFiles[0].text.replaceAll("</script>", "<\\/script>");
  const html = await readFile(path.join(src, "index.html"), "utf8");
  if (!html.includes(TAG)) throw new Error(`tools/real-cost/index.html: ${TAG} not found`);
  return html.replace(TAG, () => `<script type="module">${js}</script>`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const html = await buildHtml();
  await writeFile(outFile, html);
  console.log(`public/real-cost/app.html ${(html.length / 1024).toFixed(0)} kB`);
}
