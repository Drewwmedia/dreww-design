// Web system checks:
// 1. web/components.css uses only tokens that web/tokens.css defines, and no raw hex.
// 2. Brand values shared with the app (src/tokens.css) are identical.
// 3. Every web text/background pair meets WCAG contrast, or is a listed exception.
import { readFileSync } from "node:fs";

const read = (p) => readFileSync(new URL(p, import.meta.url), "utf8");
const web = read("../web/tokens.css");
const app = read("../src/tokens.css");
const comp = read("../web/components.css");
let problems = [];

// 1. Tokens only
const defined = new Set([...web.matchAll(/(--dw-[\w-]+)\s*:/g)].map((m) => m[1]));
const local = new Set(["--mx", "--my", "--d", "--focus"]); // set per element by motion.js or inline (--focus: an image's focal point)
for (const m of comp.matchAll(/var\((--[\w-]+)/g)) if (!defined.has(m[1]) && !local.has(m[1])) problems.push(`components.css: undefined token ${m[1]}`);
for (const m of comp.matchAll(/#[0-9a-fA-F]{3,8}\b/g)) problems.push(`components.css: raw colour ${m[0]}`);

// 2. Shared values match the app
const vals = (css) => Object.fromEntries([...css.matchAll(/(--dw-[\w-]+)\s*:\s*([^;]+);/g)].map((m) => [m[1], m[2].trim()]));
const w = vals(web), a = vals(app);
let shared = 0;
for (const k of Object.keys(w)) if (k in a) { shared++; if (w[k].toLowerCase() !== a[k].toLowerCase()) problems.push(`${k} is ${w[k]} on the web but ${a[k]} in the app`); }

// 3. Contrast
const tok = Object.fromEntries([...web.matchAll(/--(dw-[\w-]+):\s*(#[0-9a-fA-F]{6})/g)].map((m) => [m[1], m[2]]));
const lum = (hex) => {
  const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
const ratio = (x, y) => { const [p, q] = [lum(x), lum(y)].sort((m, n) => n - m); return (p + 0.05) / (q + 0.05); };
const PAIRS = [
  ["dw-ink", "dw-white", 4.5, "body text"],
  ["dw-ink", "dw-mist", 4.5, "body text on mist sections and cards"],
  ["dw-grey-600", "dw-white", 4.5, "ledes and help text"],
  ["dw-grey-600", "dw-mist", 4.5, "card text on mist"],
  ["dw-grey-500", "dw-white", 4.5, "meta and placeholders, on white only"],
  ["dw-burgundy", "dw-white", 4.5, "ghost buttons, required marks"],
  ["dw-white", "dw-burgundy", 4.5, "headings on burgundy"],
  ["dw-on-burgundy-muted", "dw-burgundy", 4.5, "ledes on burgundy"],
  ["dw-white", "dw-ink", 4.5, "headings on ink"],
  ["dw-on-ink-muted", "dw-ink", 4.5, "ledes on ink"],
  ["dw-coral", "dw-ink", 4.5, "eyebrows on ink"],
  ["dw-grey-200", "dw-burgundy", 4.5, "FAQ answers on the open card"],
  ["dw-red", "dw-white", 4.5, "form errors"],
  ["dw-teal", "dw-white", 4.5, "positive states"],
  ["dw-burgundy", "dw-burgundy-wash", 4.5, "service tags"],
  ["dw-ink", "dw-mist", 4.5, "tags and chips on mist"],
  ["dw-grey-600", "dw-mist", 4.5, "example labels"],
  ["dw-burgundy", "dw-white", 3, "selected text highlight"],
];
const EXCEPTIONS = [
  ["dw-white", "dw-coral", "primary button label, kept for the brand"],
  ["dw-coral", "dw-burgundy", "eyebrows and the highlight phrase on burgundy, kept for the brand"],
];
let fail = 0;
for (const [fg, bg, min, why] of PAIRS) {
  const r = ratio(tok[fg], tok[bg]); const ok = r >= min; if (!ok) fail++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${r.toFixed(2)}:1  ${fg} on ${bg}  (needs ${min}, ${why})`);
}
for (const [fg, bg, why] of EXCEPTIONS) console.log(`NOTE  ${ratio(tok[fg], tok[bg]).toFixed(2)}:1  ${fg} on ${bg}  (accepted exception: ${why})`);
if (fail) problems.push(`${fail} web contrast pair(s) below the minimum`);

// 4. Icon sprite: every agreed icon is there, line icons follow the Lucide rules
const sprite = read("../web/icons.svg");
const REQUIRED = ["arrow-right","arrow-left","arrow-down","arrow-up-right","chevron-down","chevron-left","chevron-right","plus","minus","x","search","check","circle-alert","menu","download","refresh-cw","link","copy","calculator","trending-up","user","shield-check","square-play","volume-2","volume-x","eye","heart","message-circle","send","star","play","brand-google","brand-linkedin","brand-instagram","brand-tiktok","brand-youtube","brand-facebook","brand-x"];
const ids = new Set([...sprite.matchAll(/<symbol id="([^"]+)"/g)].map((m) => m[1]));
for (const id of REQUIRED) if (!ids.has(id)) problems.push(`icons.svg: missing ${id}`);
for (const m of sprite.matchAll(/<symbol id="([^"]+)" viewBox="0 0 24 24" fill="none"([^>]*)>/g)) {
  if (m[1].startsWith("brand-")) continue; // brand marks follow the brand, not Lucide
  if (!/stroke-width="2"/.test(m[2]) || !/stroke-linecap="round"/.test(m[2])) problems.push(`icons.svg: ${m[1]} is not 2px with round ends`);
}

// 7. French: the typography helper and the glossary
const { frTypo } = await import("../web/fr.js");
const FR_CASES = [["Pourquoi Dreww?", "Pourquoi Dreww\u202f?"], ["Note : 4.8 sur 5", "Note\u00a0: 4,8 sur 5"], ["40%", "40\u202f%"], ["$310K", "310\u202fk$"], ["1,500 abonnés", "1\u202f500 abonnés"], ["“Ils livrent plus que promis.”", "«\u202fIls livrent plus que promis.\u202f»"], ["Visitez https://dreww.ca/fr", "Visitez https://dreww.ca/fr"], ["À 14:30 !", "À 14:30\u202f!"]];
for (const [i, o] of FR_CASES) if (frTypo(i) !== o) problems.push(`fr.js: frTypo(${JSON.stringify(i)}) gave ${JSON.stringify(frTypo(i))}`);
const gloss = JSON.parse(read("../web/glossary.json"));
const seenFr = new Map();
for (const t of gloss.terms) { if (!t.en || !t.fr) problems.push(`glossary.json: incomplete term ${JSON.stringify(t)}`); if (seenFr.has(t.fr) && seenFr.get(t.fr) !== t.en && t.fr !== t.en) problems.push(`glossary.json: "${t.fr}" used for two terms`); seenFr.set(t.fr, t.en); }

// 6. Imagery: never stretch
if (/object-fit\s*:\s*fill/.test(comp)) problems.push("components.css: object-fit: fill stretches images; use cover");

// 5. Motion and focus: agreed speeds and curves only, focus never switched off
for (const m of comp.matchAll(/transition:([^;}]+)/g)) {
  if (/(^|[\s,])\d*\.?\d+m?s\b/.test(m[1].replace(/var\([^)]*\)/g, ""))) problems.push(`components.css: raw duration in "transition:${m[1]}"; use --dw-dur-*`);
}
for (const m of comp.matchAll(/cubic-bezier\(([^)]*)\)/g)) { const y = m[1].split(",").map(Number); if (y[1] > 1 || y[1] < 0 || y[3] > 1 || y[3] < 0) problems.push(`components.css: bounce curve cubic-bezier(${m[1]})`); }
for (const m of comp.matchAll(/([^{}]*:focus[^{}]*)\{([^}]*)\}/g)) if (/outline\s*:\s*(none|0)\b/.test(m[2])) problems.push(`components.css: focus switched off in ${m[1].trim()}`);

if (problems.length) { console.error("\n" + [...new Set(problems)].join("\n")); process.exit(1); }
console.log(`\nWeb: components use only tokens (${defined.size} defined), ${shared} shared values match the app, all pairs pass, ${ids.size} icons in the sprite.`);
