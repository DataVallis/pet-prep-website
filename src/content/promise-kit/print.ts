import type { KitCopy } from "./types.ts";

/**
 * Print HTML of the Pet Promise Kit (A4, @page). Pure string rendering, no browser or file access:
 * scripts/build-promise-kit.mjs passes the font CSS and images in and prints the result to PDF with Chrome.
 * Colours and fonts are the brand's (CGP v2 "Grafit in meta"): graphite ink, mint accents, Bricolage
 * Grotesque headings, Instrument Sans text. Pages are mostly white to save the family's ink.
 */
export type PageId = "cover" | "talk" | "promise" | "week1" | "week2" | "week3" | "week4" | "cost" | "ready" | "award" | "next";
export const fullPages: PageId[] = ["cover", "talk", "promise", "week1", "week2", "week3", "week4", "cost", "ready", "award", "next"];
export const samplePages: PageId[] = ["promise"];

export type KitAssets = {
  /** @font-face rules (the script points them at src/fonts). */
  fontCss: string;
  /** data: URIs */
  mark: string;
  curio: string;
};

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const css = `
@page { size: A4; margin: 0; }
* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; }
body { font-family: "PetPrep Instrument", system-ui, sans-serif; color: #121614; font-size: 10pt; line-height: 1.4; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
h1, h2, h3 { font-family: "PetPrep Bricolage", system-ui, sans-serif; font-weight: 800; letter-spacing: -0.02em; margin: 0; line-height: 1.05; }
p { margin: 0; }
.page { position: relative; width: 210mm; height: 297mm; padding: 16mm 16mm 18mm; overflow: hidden; break-after: page; page-break-after: always; display: flex; flex-direction: column; }
.page:last-child { break-after: auto; page-break-after: auto; }
.top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 7mm; }
.top .brand { display: flex; align-items: center; gap: 2.5mm; font-family: "PetPrep Bricolage", sans-serif; font-weight: 800; font-size: 12pt; letter-spacing: -0.02em; }
.top img { height: 7mm; width: 7mm; }
.top .kit { font-size: 8.5pt; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: #1a7a55; }
.foot { position: absolute; left: 16mm; right: 16mm; bottom: 8mm; display: flex; justify-content: space-between; font-size: 8pt; color: #5a635d; border-top: 0.3mm solid #dde3de; padding-top: 2mm; }
h1.t { font-size: 27pt; margin-bottom: 2.5mm; }
.lead { font-size: 10.5pt; color: #2c3530; margin-bottom: 5mm; max-width: 165mm; }
.line { border-bottom: 0.3mm solid #121614; height: 7.5mm; }
.line.tall { height: 9mm; }
.field { display: flex; align-items: flex-end; gap: 2mm; font-size: 9.5pt; }
.field .fl { white-space: nowrap; font-weight: 600; }
.field .fv { flex: 1; border-bottom: 0.3mm solid #121614; height: 6.5mm; }
.box { display: inline-block; width: 5mm; height: 5mm; border: 0.45mm solid #121614; border-radius: 1.2mm; flex: none; background: #fff; }
.box.lg { width: 6.5mm; height: 6.5mm; }
.mint { background: #7fe0b4; }
.tint { background: #ddf6ea; }
.card { border-radius: 5mm; padding: 5mm 6mm; }
.small { font-size: 8.5pt; color: #5a635d; }

/* cover */
.cover { padding: 0; background: #fff; }
.cover .hero { background: #7fe0b4; padding: 16mm 16mm 0; height: 128mm; position: relative; overflow: hidden; }
.cover .hero .brand { display: flex; align-items: center; gap: 3mm; font-family: "PetPrep Bricolage", sans-serif; font-weight: 800; font-size: 15pt; }
.cover .hero .brand img { height: 10mm; width: 10mm; }
.cover .kicker { margin-top: 14mm; font-size: 9.5pt; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #121614; }
.cover h1 { font-size: 44pt; line-height: 0.98; margin: 3mm 0 4mm; max-width: 112mm; }
.cover .sub { font-size: 12.5pt; max-width: 104mm; line-height: 1.3; font-weight: 500; }
.cover .curio { position: absolute; right: 8mm; bottom: -6mm; height: 104mm; }
.cover .body { padding: 9mm 16mm 0; display: grid; grid-template-columns: 1.15fr 1fr; gap: 9mm; }
.cover h3 { font-size: 13pt; margin-bottom: 2.5mm; }
.cover .body p { margin-bottom: 2.5mm; }
.cover ul { margin: 0; padding-left: 4.5mm; }
.cover li { margin-bottom: 1.6mm; }
.contents { margin: 0; padding: 0; list-style: none; counter-reset: c; }
.contents li { display: flex; gap: 2mm; margin-bottom: 1.2mm; font-size: 9pt; padding-left: 0; }
.contents .n { width: 5mm; font-weight: 700; color: #1a7a55; }
.cover .licence { position: absolute; left: 16mm; right: 16mm; bottom: 9mm; font-size: 8pt; color: #5a635d; }

/* talk */
.q { display: flex; gap: 3.5mm; margin-bottom: 1.6mm; }
.q .num { flex: none; width: 7.5mm; height: 7.5mm; border-radius: 50%; background: #7fe0b4; font-family: "PetPrep Bricolage", sans-serif; font-weight: 800; font-size: 10pt; display: flex; align-items: center; justify-content: center; }
.q .txt { flex: 1; font-size: 9.5pt; font-weight: 600; line-height: 1.3; }
.q .line { height: 6mm; }
.outro { margin-top: 1mm; }

/* promise */
.pr-grid { display: grid; gap: 4mm; }
.task { display: flex; align-items: flex-end; gap: 3mm; margin-bottom: 1.8mm; }
.task .lbl { font-weight: 600; white-space: nowrap; font-size: 9.5pt; }
.task .fv { flex: 1; border-bottom: 0.3mm solid #121614; height: 5.6mm; font-size: 8pt; color: #5a635d; padding-left: 1mm; }
.sig { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 7mm; margin-top: auto; padding-top: 4mm; }
.sig .sl { border-bottom: 0.3mm solid #121614; height: 11mm; }
.sig .sc { font-size: 8pt; color: #5a635d; margin-top: 1mm; }
.sample-foot { position: absolute; left: 16mm; right: 16mm; bottom: 8mm; font-size: 8pt; color: #5a635d; border-top: 0.3mm solid #dde3de; padding-top: 2mm; }

/* weeks */
.wk { width: 100%; border-collapse: collapse; margin: 2mm 0 6mm; table-layout: fixed; }
.wk th { font-family: "PetPrep Bricolage", sans-serif; font-weight: 700; font-size: 9.5pt; text-align: center; padding-bottom: 2mm; }
.wk th:first-child { text-align: left; width: 46mm; }
.wk td { border-top: 0.3mm solid #c9d1cb; height: 22mm; text-align: center; vertical-align: middle; }
.wk td:first-child { text-align: left; font-weight: 700; font-size: 11pt; font-family: "PetPrep Bricolage", sans-serif; }
.wk tr:last-child td { border-bottom: 0.3mm solid #c9d1cb; }
.wk td .box { width: 8mm; height: 8mm; border-radius: 2mm; }
.wk td.own .own-line { display: block; border-bottom: 0.3mm solid #121614; height: 7mm; margin-right: 3mm; }
.weekno { display: inline-block; background: #7fe0b4; border-radius: 10mm; padding: 1.2mm 4mm; font-weight: 700; font-size: 9pt; margin-bottom: 3mm; }

/* cost */
.ct { width: 100%; border-collapse: collapse; margin: 1mm 0 5mm; table-layout: fixed; }
.ct th { text-align: left; font-size: 8.5pt; font-weight: 700; padding: 0 2mm 2mm; border-bottom: 0.5mm solid #121614; }
.ct td { border-bottom: 0.3mm solid #c9d1cb; height: 14.5mm; padding: 0 2mm; font-weight: 600; font-size: 9.5pt; vertical-align: middle; }
.ct td.e { border-left: 0.3mm solid #c9d1cb; }
.ct tr.total td { border-bottom: 0.5mm solid #121614; background: #ddf6ea; font-family: "PetPrep Bricolage", sans-serif; font-weight: 800; }

/* ready */
.rd { display: grid; grid-template-columns: 1fr auto; gap: 1.5mm 6mm; padding: 3mm 0; border-bottom: 0.3mm solid #dde3de; }
.rd .tx b { font-family: "PetPrep Bricolage", sans-serif; font-weight: 800; font-size: 10.5pt; display: block; }
.rd .tx { font-size: 9pt; }
.rd .ans { display: flex; gap: 3.5mm; align-items: center; font-size: 8pt; font-weight: 600; }
.rd .ans span { display: flex; flex-direction: column; align-items: center; gap: 1mm; }
.rd .notes { grid-column: 1 / 3; border-bottom: 0.3mm dotted #5a635d; height: 5mm; }
.read { margin-top: 5mm; }
.read ul { margin: 2mm 0 0; padding-left: 4.5mm; }
.read li { margin-bottom: 1.2mm; }

/* award */
.award { border: 1.6mm solid #7fe0b4; border-radius: 8mm; padding: 9mm 10mm 7mm; flex: 1; display: flex; flex-direction: column; }
.award .center { text-align: center; }
.award h1 { font-size: 30pt; }
.award .stars { margin-top: 3mm; }
.award .colour { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; margin: 3mm 0; }
.award .colour svg { width: 112mm; height: auto; }
.award .colour .small { margin-top: 2mm; font-weight: 600; }
.award .fields { display: grid; gap: 2mm; }
.parents-note { margin-top: 4mm; font-size: 8.5pt; color: #5a635d; }

/* next */
.steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 5mm; margin: 4mm 0 8mm; }
.steps .s { border: 0.4mm solid #121614; border-radius: 5mm; padding: 5mm; }
.steps .s .n { width: 8mm; height: 8mm; border-radius: 50%; background: #7fe0b4; display: flex; align-items: center; justify-content: center; font-family: "PetPrep Bricolage", sans-serif; font-weight: 800; margin-bottom: 3mm; }
.steps h3 { font-size: 12pt; margin-bottom: 2mm; }
.next-app { background: #121614; color: #f3f5f2; border-radius: 6mm; padding: 8mm 9mm; }
.next-app h2 { font-size: 19pt; color: #7fe0b4; margin-bottom: 3mm; }
.next-app p { margin-bottom: 4mm; font-size: 10.5pt; }
.next-app .cta { display: inline-block; background: #7fe0b4; color: #121614; font-weight: 700; padding: 3mm 6mm; border-radius: 3mm; font-size: 11pt; }
.next-foot { margin-top: auto; display: flex; align-items: flex-end; justify-content: space-between; gap: 8mm; }
.next-foot .slogan { font-family: "PetPrep Bricolage", sans-serif; font-weight: 800; font-size: 17pt; line-height: 1.1; max-width: 100mm; }
.next-foot img { height: 60mm; }
`;

const blanks = (n: number, cls = "") => Array.from({ length: n }, () => `<div class="line ${cls}"></div>`).join("");


function top(c: KitCopy, a: KitAssets): string {
  return `<div class="top"><div class="brand"><img src="${a.mark}" alt="">petprep</div><div class="kit">${esc(c.common.kitName)}</div></div>`;
}
function foot(c: KitCopy, n: number, total: number): string {
  return `<div class="foot"><span>${esc(c.common.brand)} · ${esc(c.common.site)}</span><span>${esc(c.common.pageOf.replace("{n}", String(n)).replace("{total}", String(total)))}</span></div>`;
}

const outlineMark = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="10" width="88" height="80" rx="30" fill="none" stroke="#121614" stroke-width="1.6"/><circle cx="35" cy="47" r="15" fill="none" stroke="#121614" stroke-width="1.6"/><circle cx="65" cy="47" r="15" fill="none" stroke="#121614" stroke-width="1.6"/><circle cx="40" cy="42" r="6.5" fill="#121614"/><circle cx="70" cy="42" r="6.5" fill="#121614"/><rect x="43" y="69" width="14" height="8" rx="4" fill="none" stroke="#121614" stroke-width="1.6"/></svg>`;

function pageHtml(id: PageId, c: KitCopy, a: KitAssets, n: number, total: number, sample: boolean): string {
  const f = sample ? `<div class="sample-foot">${esc(c.common.sampleFoot)}</div>` : foot(c, n, total);
  const t = top(c, a);
  switch (id) {
    case "cover": {
      return `<section class="page cover">
<div class="hero"><div class="brand"><img src="${a.mark}" alt="">petprep</div>
<div class="kicker">${esc(c.cover.kicker)}</div><h1>${esc(c.cover.title)}</h1><p class="sub">${esc(c.cover.subtitle)}</p>
<img class="curio" src="${a.curio}" alt="${esc(c.cover.mascot)}"></div>
<div class="body"><div><h3>${esc(c.cover.noteHeading)}</h3>${c.cover.note.map((p) => `<p>${esc(p)}</p>`).join("")}
<h3 style="margin-top:4mm">${esc(c.cover.notHeading)}</h3><ul>${c.cover.notItems.map((i) => `<li>${esc(i)}</li>`).join("")}</ul></div>
<div class="card tint"><h3>${esc(c.cover.insideHeading)}</h3><ol class="contents">${c.sections.filter((s) => s.id !== "cover").map((s, i) => `<li><span class="n">${i + 1}</span><span>${esc(s.title)}</span></li>`).join("")}</ol></div></div>
<p class="licence">${esc(c.common.licence)}</p></section>`;
    }
    case "talk":
      return `<section class="page">${t}<h1 class="t">${esc(c.talk.title)}</h1><p class="lead">${esc(c.talk.intro)}</p>
${c.talk.questions.map((q, i) => `<div class="q"><div class="num">${i + 1}</div><div class="txt">${esc(q)}${blanks(2)}</div></div>`).join("")}
<p class="small outro">${esc(c.talk.outro)}</p>${f}</section>`;
    case "promise": {
      const p = c.promise;
      const intro = esc(p.childIntro).replace("{name}", `<span style="display:inline-block;width:42mm;border-bottom:0.3mm solid #121614;height:4.5mm"></span>`);
      return `<section class="page">${t}<h1 class="t">${esc(p.title)}</h1><p class="lead" style="margin-bottom:3mm">${esc(p.lead)}</p>
<div class="field" style="margin-bottom:4mm"><span class="fl">${esc(p.petLabel)}:</span><span class="fv"></span><span class="fl">${esc(c.common.date)}:</span><span class="fv" style="max-width:34mm"></span></div>
<div class="card mint" style="padding:4.5mm 6mm 3.5mm"><h2 style="font-size:15pt;margin-bottom:2mm">${esc(p.childHeading)}</h2><p style="margin-bottom:3mm;font-weight:500">${intro}</p>
${p.tasks.map((x) => `<div class="task"><span class="box"></span><span class="lbl">${esc(x.label)}</span><span class="fv">${esc(x.blank)}</span></div>`).join("")}
<div class="task"><span class="box"></span><span class="lbl">${esc(p.ownTask)}</span><span class="fv"></span></div>
<p style="margin-top:2.5mm;font-weight:600">${esc(p.childOutro)}</p></div>
<div style="margin-top:4mm"><h2 style="font-size:15pt;margin-bottom:1.5mm">${esc(p.adultsHeading)}</h2><p style="margin-bottom:1mm">${esc(p.adultsText)}</p>${blanks(2)}</div>
<div style="margin-top:3mm"><h2 style="font-size:15pt">${esc(p.rulesHeading)}</h2>${blanks(5)}</div>
<div class="field" style="margin-top:3mm"><span class="fl">${esc(p.reviewLabel)}:</span><span class="fv"></span></div>
<div class="sig"><div><div class="sl"></div><div class="sc">${esc(p.signChild)}</div></div><div><div class="sl"></div><div class="sc">${esc(p.signAdult)}</div></div><div><div class="sl"></div><div class="sc">${esc(p.signAdult)}</div></div></div>${f}</section>`;
    }
    case "week1":
    case "week2":
    case "week3":
    case "week4": {
      const w = c.weeks;
      const k = Number(id.slice(4));
      const row = (label: string, own = false) => `<tr><td${own ? ' class="own"' : ""}>${own ? `${esc(label)}<span class="own-line"></span>` : esc(label)}</td>${w.days.map(() => `<td><span class="box"></span></td>`).join("")}</tr>`;
      return `<section class="page">${t}<span class="weekno">${esc(w.weekOf.replace("{n}", String(k)))}</span><h1 class="t">${esc(w.title)} · ${esc(w.weekTitle.replace("{n}", String(k)))}</h1>
<p class="lead">${esc(w.howTo)}</p>
<table class="wk"><thead><tr><th>${esc(w.taskHead)}</th>${w.days.map((d) => `<th>${esc(d)}</th>`).join("")}</tr></thead><tbody>${w.tasks.map((x) => row(x)).join("")}${row(w.ownTask, true)}</tbody></table>
<div class="card tint" style="margin-bottom:5mm"><p style="font-weight:600">${esc(w.notes[k - 1])}</p></div>
<p style="font-weight:700">${esc(w.wentWell)}</p>${blanks(2)}
<p style="font-weight:700;margin-top:4mm">${esc(w.change)}</p>${blanks(2)}
<div class="field" style="margin-top:8mm"><span class="fl">${esc(w.parentSigns)}:</span><span class="fv" style="height:11mm"></span><span class="fl">${esc(c.common.date)}:</span><span class="fv" style="max-width:32mm;height:11mm"></span></div>${f}</section>`;
    }
    case "cost": {
      const x = c.cost;
      return `<section class="page">${t}<h1 class="t">${esc(x.title)}</h1><p class="lead">${esc(x.intro)}</p>
<table class="ct"><thead><tr><th style="width:62mm">${esc(x.head[0])}</th><th>${esc(x.head[1])}</th><th>${esc(x.head[2])}</th><th style="width:48mm">${esc(x.head[3])}</th></tr></thead><tbody>
${x.rows.map((r) => `<tr><td>${esc(r)}</td><td class="e"></td><td class="e"></td><td class="e"></td></tr>`).join("")}
<tr><td>${esc(x.other)}: <span style="font-weight:400">______________</span></td><td class="e"></td><td class="e"></td><td class="e"></td></tr>
<tr><td>${esc(x.other)}: <span style="font-weight:400">______________</span></td><td class="e"></td><td class="e"></td><td class="e"></td></tr>
<tr class="total"><td>${esc(x.total)}</td><td class="e"></td><td class="e"></td><td class="e"></td></tr></tbody></table>
<div class="field" style="margin-bottom:5mm"><span class="fl">${esc(x.yearNote)}</span><span class="fv"></span></div>
${x.questions.map((q) => `<p style="font-weight:600">${esc(q)}</p>${blanks(1)}`).join("")}${f}</section>`;
    }
    case "ready": {
      const r = c.ready;
      return `<section class="page">${t}<h1 class="t">${esc(r.title)}</h1><p class="lead" style="margin-bottom:2mm">${esc(r.intro)}</p>
${r.items.map((i) => `<div class="rd"><div class="tx"><b>${esc(i.topic)}</b>${esc(i.text)}</div><div class="ans"><span><i class="box"></i>${esc(c.common.yes)}</span><span><i class="box"></i>${esc(c.common.notSure)}</span><span><i class="box"></i>${esc(c.common.no)}</span></div><div class="notes"></div></div>`).join("")}
<div class="read card tint"><h3 style="font-size:12pt">${esc(r.readHeading)}</h3><ul>${r.read.map((l) => `<li>${esc(l)}</li>`).join("")}</ul><p class="small" style="margin-top:2mm">${esc(r.pointer)}</p></div>${f}</section>`;
    }
    case "award": {
      const w = c.award;
      return `<section class="page">${t}<div class="award"><div class="center"><h1>${esc(w.title)}</h1><p class="lead" style="margin:3mm auto 0">${esc(w.lead)}</p></div>
<div class="field" style="margin-top:6mm"><span class="fl">${esc(w.forLabel)}:</span><span class="fv"></span></div>
<div class="colour">${outlineMark}<p class="small">${esc(w.colour)}</p></div>
<div class="fields"><div class="field"><span class="fl">${esc(w.better)}:</span><span class="fv"></span></div><div class="field"><span class="fl">${esc(w.moment)}:</span><span class="fv"></span></div>
<div class="field" style="margin-top:4mm"><span class="fl">${esc(w.signed)}:</span><span class="fv" style="height:10mm"></span><span class="fv" style="height:10mm"></span></div>
<div class="field"><span class="fl">${esc(c.common.date)}:</span><span class="fv" style="max-width:45mm"></span></div></div></div>
<p class="parents-note">${esc(w.parents)}</p>${f}</section>`;
    }
    case "next": {
      const x = c.next;
      return `<section class="page">${t}<h1 class="t">${esc(x.title)}</h1><p class="lead">${esc(x.lead)}</p>
<div class="steps">${x.steps.map((s, i) => `<div class="s"><div class="n">${i + 1}</div><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></div>`).join("")}</div>
<div class="next-app"><h2>${esc(x.appHeading)}</h2><p>${esc(x.appText)}</p><span class="cta">${esc(x.cta)}</span></div>
<div class="next-foot"><div><p class="slogan">${esc(x.slogan)}</p><p class="small" style="margin-top:3mm">${esc(x.mascotLine)}</p></div><img src="${a.curio}" alt=""></div>${f}</section>`;
    }
  }
}

export function renderKitHtml(c: KitCopy, opts: { pages: PageId[]; assets: KitAssets; sample?: boolean }): string {
  const total = opts.pages.length;
  const body = opts.pages.map((id, i) => pageHtml(id, c, opts.assets, i + 1, total, !!opts.sample)).join("\n");
  const title = opts.sample ? `${c.common.kitName} (${c.lang})` : c.common.kitName;
  return `<!doctype html><html lang="${c.htmlLang}"><head><meta charset="utf-8"><title>${esc(title)}</title><style>${opts.assets.fontCss}${css}</style></head><body>${body}</body></html>`;
}
