// Fails if components.css uses a raw hex colour or a var() that tokens.css doesn't define.
import { readFileSync } from "node:fs";

const tokens = readFileSync(new URL("../src/tokens.css", import.meta.url), "utf8");
const comp = readFileSync(new URL("../src/components.css", import.meta.url), "utf8");
const defined = new Set([...tokens.matchAll(/(--dw-[\w-]+)\s*:/g)].map((m) => m[1]));
const local = new Set(["--ic", "--mx", "--my"]); // component-local custom properties

const problems = [];
for (const m of comp.matchAll(/var\((--[\w-]+)/g)) if (!defined.has(m[1]) && !local.has(m[1])) problems.push(`undefined token ${m[1]}`);
for (const m of comp.replace(/url\("data:[^"]+"\)/g, "").matchAll(/#[0-9a-fA-F]{3,8}\b/g)) problems.push(`raw colour ${m[0]}`);

if (problems.length) { console.error([...new Set(problems)].join("\n")); process.exit(1); }
console.log(`components.css uses only tokens (${defined.size} defined).`);
