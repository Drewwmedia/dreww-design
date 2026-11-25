// Holds every text/background pair the system uses to WCAG contrast.
// Add a pair here before using a new combination in a component.
import { readFileSync } from "node:fs";

const css = readFileSync(new URL("../src/tokens.css", import.meta.url), "utf8");
const tok = Object.fromEntries([...css.matchAll(/--(dw-[\w-]+):\s*(#[0-9a-fA-F]{6})/g)].map((m) => [m[1], m[2]]));

const lum = (hex) => {
  const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05); };

// [text, background, minimum, why]
const PAIRS = [
  ["dw-ink", "dw-white", 4.5, "body text"],
  ["dw-ink", "dw-mist", 4.5, "body text on the app background"],
  ["dw-grey-600", "dw-white", 4.5, "secondary text"],
  ["dw-grey-600", "dw-mist", 4.5, "secondary text on mist"],
  ["dw-grey-500", "dw-white", 4.5, "column headers, on white only"],
  ["dw-burgundy", "dw-white", 4.5, "links, selected text"],
  ["dw-burgundy", "dw-mist", 4.5, "selected row name"],
  ["dw-white", "dw-burgundy", 4.5, "sidebar, verdict card, selected segment"],
  ["dw-on-burgundy-muted", "dw-burgundy", 4.5, "muted text on burgundy"],
  ["dw-on-burgundy-subtle", "dw-burgundy", 3, "sidebar group labels, 10-11px uppercase"],
  ["dw-teal", "dw-white", 4.5, "good deltas"],
  ["dw-teal", "dw-mist", 4.5, "good deltas on mist"],
  ["dw-red", "dw-white", 4.5, "bad deltas and form errors"],
  ["dw-white", "dw-ink", 4.5, "toasts and tooltips"],
  ["dw-on-ink-muted", "dw-ink", 4.5, "tooltip headers"],
  ["dw-coral", "dw-ink", 4.5, "toast action"],
  ["dw-red-on-ink", "dw-ink", 3, "error icon in a toast"],
];
// Accepted exception, agreed on the website: coral buttons keep white text (2.9:1).
const EXCEPTIONS = [["dw-white", "dw-coral", "primary button label, brand recognition"]];

let fail = 0;
for (const [fg, bg, min, why] of PAIRS) {
  const r = ratio(tok[fg], tok[bg]);
  const ok = r >= min;
  if (!ok) fail++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${r.toFixed(2)}:1  ${fg} on ${bg}  (needs ${min}, ${why})`);
}
for (const [fg, bg, why] of EXCEPTIONS) console.log(`NOTE  ${ratio(tok[fg], tok[bg]).toFixed(2)}:1  ${fg} on ${bg}  (accepted exception: ${why})`);
if (fail) { console.error(`\n${fail} pair(s) below the minimum.`); process.exit(1); }
console.log("\nAll pairs pass.");
