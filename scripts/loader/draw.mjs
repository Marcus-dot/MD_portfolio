/*
 * The loader drawing: Marcus Aurelius as pen strokes, from the same baked
 * cell map as the hero statue (public/statue/marcus.png). The scan is lit
 * like the hero's lamp, upscaled smoothly, and Canny edge detection finds
 * where the light breaks: brow, eyes, beard, the folds of the toga. Each
 * edge is walked into one stroke, simplified and smoothed into SVG curves.
 *
 *   node scripts/loader/draw.mjs   writes src/components/loader-bust.json
 *
 * Needs ImageMagick (`magick`).
 */
import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";

const N = 600; // working resolution (150 -> 600)
const src = execFileSync("magick", ["public/statue/marcus.png", "-depth", "8", "rgb:-"]);
const Lv = [-0.45, 0.6, 0.66], Lm = Math.hypot(...Lv);
const shade = Buffer.alloc(150 * 150), mask = Buffer.alloc(150 * 150);
for (let i = 0; i < 150 * 150; i++) {
  const r = src[i * 3], g = src[i * 3 + 1], b = src[i * 3 + 2];
  if (!b) continue;
  const nx = (r - 128) / 127, ny = (g - 128) / 127, nz = Math.sqrt(Math.max(0, 1 - nx * nx - ny * ny));
  shade[i] = Math.round(255 * Math.max(0, (nx * Lv[0] + ny * Lv[1] + nz * Lv[2]) / Lm));
  mask[i] = 255;
}
const edges = (buf, args) =>
  execFileSync("magick", ["-size", "150x150", "-depth", "8", "gray:-", "-filter", "Lanczos", "-resize", `${N}x${N}!`, ...args, "-depth", "8", "gray:-"], { input: buf });
// interior strokes from the lit image; the outline from the silhouette
const inner = edges(shade, ["-blur", "0x2", "-canny", "0x2.2+12%+30%"]);
const outer = edges(mask, ["-blur", "0x3", "-threshold", "50%", "-canny", "0x1+10%+30%"]);
const inside = edges(mask, ["-blur", "0x3", "-threshold", "50%", "-morphology", "Erode", "Disk:6"]);

// walk 1px edges into polylines (8-connected), endpoints first, then loops
function strokes(buf, keep = () => true) {
  const on = new Uint8Array(N * N);
  for (let i = 0; i < N * N; i++) on[i] = buf[i] > 127 && keep(i) ? 1 : 0;
  const nb = (i) => {
    const x = i % N, y = (i / N) | 0, out = [];
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
      if (!dx && !dy) continue;
      const xx = x + dx, yy = y + dy;
      if (xx >= 0 && yy >= 0 && xx < N && yy < N && on[yy * N + xx]) out.push(yy * N + xx);
    }
    return out;
  };
  const lines = [];
  const walk = (start) => {
    const line = [start]; on[start] = 0;
    for (let cur = start; ; ) {
      const n = nb(cur);
      if (!n.length) break;
      cur = n[0]; on[cur] = 0; line.push(cur);
    }
    return line.map((i) => [i % N, (i / N) | 0]);
  };
  for (let i = 0; i < N * N; i++) if (on[i] && nb(i).length === 1) lines.push(walk(i));
  for (let i = 0; i < N * N; i++) if (on[i]) lines.push(walk(i));
  return lines;
}

function simplify(pts, eps) {
  if (pts.length < 3) return pts;
  const [a, b] = [pts[0], pts[pts.length - 1]];
  let idx = 0, max = 0;
  for (let i = 1; i < pts.length - 1; i++) {
    const p = pts[i], dx = b[0] - a[0], dy = b[1] - a[1];
    const d = Math.abs(dy * p[0] - dx * p[1] + b[0] * a[1] - b[1] * a[0]) / (Math.hypot(dx, dy) || 1);
    if (d > max) { max = d; idx = i; }
  }
  if (max <= eps) return [a, b];
  return [...simplify(pts.slice(0, idx + 1), eps).slice(0, -1), ...simplify(pts.slice(idx), eps)];
}
const S = 1000 / N;
function toPath(pts) {
  const p = pts.map(([x, y]) => [x * S, y * S]);
  let d = `M${p[0][0].toFixed(0)} ${p[0][1].toFixed(0)}`;
  for (let i = 0; i < p.length - 1; i++) {
    const p0 = p[i - 1] || p[i], p1 = p[i], p2 = p[i + 1], p3 = p[i + 2] || p2;
    d += `C${(p1[0] + (p2[0] - p0[0]) / 6).toFixed(0)} ${(p1[1] + (p2[1] - p0[1]) / 6).toFixed(0)} ${(p2[0] - (p3[0] - p1[0]) / 6).toFixed(0)} ${(p2[1] - (p3[1] - p1[1]) / 6).toFixed(0)} ${p2[0].toFixed(0)} ${p2[1].toFixed(0)}`;
  }
  return d;
}
const len = (pts) => pts.reduce((s, p, i) => (i ? s + Math.hypot(p[0] - pts[i - 1][0], p[1] - pts[i - 1][1]) : 0), 0);

const out = [];
for (const line of strokes(outer)) if (len(line) > 60) out.push({ d: toPath(simplify(line, 1.2)), w: 1.5, len: Math.round(len(line) * S) });
for (const line of strokes(inner, (i) => inside[i] > 127)) {
  const L = len(line);
  if (L < 22) continue;
  out.push({ d: toPath(simplify(line, 1.0)), w: L > 80 ? 0.95 : 0.7, len: Math.round(L * S) });
}
// sketch order: outline first, then top to bottom
out.sort((a, b) => b.w - a.w > 0.4 ? 1 : a.w - b.w > 0.4 ? -1 : parseFloat(a.d.split(" ")[1]) - parseFloat(b.d.split(" ")[1]));

/* The laurel: an emperor's wreath, as one branch sweeping up across the
   head. A cubic stem; leaves alternate sides, each an almond with a midrib,
   longest mid-branch and smaller toward the tip. */
const bez = (P, t) => {
  const u = 1 - t;
  return [0, 1].map((k) => u * u * u * P[0][k] + 3 * u * u * t * P[1][k] + 3 * u * t * t * P[2][k] + t * t * t * P[3][k]);
};
const f = (v) => v.toFixed(0);
function branch(P, count, size, side0 = 1) {
  const paths = [];
  paths.push({ d: `M${f(P[0][0])} ${f(P[0][1])}C${P.slice(1).map((p) => `${f(p[0])} ${f(p[1])}`).join(" ")}`, kind: "stem" });
  for (let i = 0; i < count; i++) {
    const t = 0.1 + (i / (count - 1)) * 0.86;
    const [x, y] = bez(P, t);
    const [x2, y2] = bez(P, Math.min(1, t + 0.01));
    const ang = Math.atan2(y2 - y, x2 - x);
    const side = (i % 2 ? -1 : 1) * side0;
    const a = ang + side * 0.72; // leaves lean toward the tip
    const L = size * (0.7 + 0.5 * Math.sin(Math.PI * (0.25 + 0.75 * (1 - t))));
    const W = L * 0.32;
    const tip = [x + Math.cos(a) * L, y + Math.sin(a) * L];
    const n = [-Math.sin(a), Math.cos(a)];
    const c1 = [x + Math.cos(a) * L * 0.45 + n[0] * W, y + Math.sin(a) * L * 0.45 + n[1] * W];
    const c2 = [x + Math.cos(a) * L * 0.45 - n[0] * W, y + Math.sin(a) * L * 0.45 - n[1] * W];
    paths.push({ d: `M${f(x)} ${f(y)}Q${f(c1[0])} ${f(c1[1])} ${f(tip[0])} ${f(tip[1])}Q${f(c2[0])} ${f(c2[1])} ${f(x)} ${f(y)}`, kind: "leaf" });
    paths.push({ d: `M${f(x)} ${f(y)}L${f(x + Math.cos(a) * L * 0.8)} ${f(y + Math.sin(a) * L * 0.8)}`, kind: "rib" });
  }
  return paths;
}
const laurel = [
  // the main branch: from above the left ear, over the crown, out past the right
  ...branch([[318, 300], [360, 150], [520, 40], [760, 18]], 13, 92),
  // a short sprig off it, back over the brow
  ...branch([[470, 92], [500, 150], [560, 190], [640, 205]], 5, 60, -1),
];
writeFileSync("src/components/loader-bust.json", JSON.stringify({ bust: out, laurel }) + "\n");
console.log(out.length, "strokes,", laurel.length, "laurel paths,", JSON.stringify({ bust: out, laurel }).length, "bytes");
