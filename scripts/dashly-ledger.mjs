/*
 * Counts verifiable facts from the Dashly codebase (a private repo) and writes a
 * dated snapshot the portfolio renders on /dashly. Only counts leave the repo -
 * no code, no file contents.
 *
 *   node scripts/dashly-ledger.mjs ../project-dashboard
 *
 * Re-run whenever the numbers should move; the page shows the snapshot date.
 */
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const repo = path.resolve(process.argv[2] ?? "../project-dashboard");
const git = (...args) => execFileSync("git", ["-C", repo, ...args], { encoding: "utf8" }).trim();

function walk(dir, exts, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name === "node_modules" || e.name.startsWith(".")) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, exts, out);
    else if (exts.some((x) => e.name.endsWith(x))) out.push(p);
  }
  return out;
}
const lines = (files) => files.reduce((n, f) => n + fs.readFileSync(f, "utf8").split("\n").length, 0);

// commits on main, by month
const dates = git("log", "main", "--format=%ad", "--date=format:%Y-%m").split("\n").filter(Boolean);
const byMonth = {};
for (const d of dates) byMonth[d] = (byMonth[d] ?? 0) + 1;
const first = git("log", "main", "--reverse", "--format=%ad", "--date=short").split("\n")[0];
const months = [];
for (let d = new Date(`${first.slice(0, 7)}-01T00:00:00Z`); ; d.setUTCMonth(d.getUTCMonth() + 1)) {
  const key = d.toISOString().slice(0, 7);
  months.push({ month: key, commits: byMonth[key] ?? 0 });
  if (key >= dates[0]) break;
}

// authors: everyone but automated bots
const authors = git("log", "main", "--format=%an").split("\n").filter(Boolean);
const humans = [...new Set(authors.filter((a) => !/\[bot\]$/.test(a)))];

// source: app code only (tests counted separately)
const src = ["app", "components", "lib"].flatMap((d) => walk(path.join(repo, d), [".ts", ".tsx"]));
const testFiles = walk(path.join(repo, "__tests__"), [".test.ts", ".test.tsx"]);
const testCases = testFiles.reduce(
  (n, f) => n + (fs.readFileSync(f, "utf8").match(/^\s*(it|test)(\.each\([^)]*\))?\(/gm) ?? []).length,
  0,
);
const migrations = fs.readdirSync(path.join(repo, "supabase/migrations")).filter((f) => f.endsWith(".sql")).length;
const calculators = fs.readdirSync(path.join(repo, "lib/calculators")).filter((f) => f.endsWith(".ts")).length;

const ledger = {
  countedOn: new Date().toISOString().slice(0, 10),
  firstCommit: first,
  commits: dates.length,
  humanAuthors: humans.length,
  sourceLines: lines(src),
  sourceFiles: src.length,
  migrations,
  testFiles: testFiles.length,
  testCases,
  calculators,
  months,
};

const out = path.join(path.dirname(new URL(import.meta.url).pathname), "../src/content/dashly-ledger.json");
fs.writeFileSync(out, JSON.stringify(ledger, null, 2) + "\n");
console.log(JSON.stringify({ ...ledger, months: `${months.length} months` }, null, 1));
