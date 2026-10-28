/*
 * The favicon: Marcus Aurelius in etched marble tiles, from the same cell
 * map the hero statue uses. Shades the full-resolution scan first (normals
 * lit from the upper left, like the hero's resting lamp), then averages the
 * light down into a few tiles.
 *
 *   node scripts/favicon.mjs        writes src/app/icon.svg and src/app/apple-icon.png
 *
 * Needs ImageMagick (`magick`).
 */
import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";

const SRC = "public/statue/marcus.png";
const N = 150;
const BG = "#0e100e";
const DARK = [20, 26, 19], BONE = [238, 240, 230], ACCENT = "#9bc97e";

const px = execFileSync("magick", [SRC, "-depth", "8", "rgb:-"]);
const L = (() => { const v = [-0.5, 0.55, 0.67]; const m = Math.hypot(...v); return v.map((x) => x / m); })();
const light = new Float32Array(N * N), mask = new Float32Array(N * N);
for (let i = 0; i < N * N; i++) {
  const r = px[i * 3], g = px[i * 3 + 1], b = px[i * 3 + 2];
  if (b === 0) continue;
  const nx = (r - 128) / 127, ny = (g - 128) / 127;
  const nz = Math.sqrt(Math.max(0, 1 - nx * nx - ny * ny));
  const d = Math.max(0, nx * L[0] + ny * L[1] + nz * L[2]);
  // half vector for a little specular, as in engine.ts
  const h = [L[0], L[1], L[2] + 1], hm = Math.hypot(...h);
  const s = Math.max(0, (nx * h[0] + ny * h[1] + nz * h[2]) / hm) ** 28 * 0.5;
  light[i] = (b / 255) * (0.12 + 0.88 * d) + s;
  mask[i] = 1;
}

// crop to the bust, square, then average into n x n tiles
let x0 = N, x1 = 0, y0 = N, y1 = 0;
for (let i = 0; i < N * N; i++) if (mask[i]) { const x = i % N, y = (i / N) | 0; x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); }
const side = Math.max(x1 - x0, y1 - y0) + 1;
const cx = (x0 + x1) / 2;

function tiles(n, pad) {
  const out = [];
  const size = side / (n - pad * 2);
  for (let ty = 0; ty < n; ty++)
    for (let tx = 0; tx < n; tx++) {
      // bottom-aligned, like a bust on a plinth; centred left to right
      const sx = cx - side / 2 + (tx - pad) * size, sy = y1 + 1 - (n - pad - ty) * size;
      let sum = 0, cov = 0, k = 0;
      for (let y = sy; y < sy + size; y += size / 4)
        for (let x = sx; x < sx + size; x += size / 4) {
          k++;
          const ix = Math.floor(x), iy = Math.floor(y);
          if (ix < 0 || iy < 0 || ix >= N || iy >= N) continue;
          const i = iy * N + ix;
          if (!mask[i]) continue;
          cov++; sum += light[i];
        }
      if (cov / k < 0.45) continue;
      out.push({ tx, ty, v: Math.min(1, sum / cov) });
    }
  return out;
}

const col = (v) => {
  const t = 0.16 + 0.84 * v;
  return `rgb(${DARK.map((d, i) => Math.round(d + (BONE[i] - d) * t)).join(",")})`;
};

function svg(n, pad, { size = 64, accent = true } = {}) {
  const c = size / n, g = Math.max(0.5, c * 0.12);
  const ts = tiles(n, pad);
  // one chipped tile in accent green, as if just knocked loose
  const chip = accent ? ts.reduce((a, b) => (b.v > a.v ? b : a)) : null;
  let body = "";
  for (const t of ts) {
    const fill = t === chip ? ACCENT : col(t.v);
    body += `<rect x="${(t.tx * c + g / 2).toFixed(2)}" y="${(t.ty * c + g / 2).toFixed(2)}" width="${(c - g).toFixed(2)}" height="${(c - g).toFixed(2)}" fill="${fill}"/>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"><rect width="${size}" height="${size}" fill="${BG}"/>${body}</svg>\n`;
}

writeFileSync("src/app/icon.svg", svg(16, 1));
writeFileSync("/tmp/md-apple-icon.svg", svg(30, 2, { size: 180 }));
execFileSync("magick", ["-background", "none", "-density", "300", "/tmp/md-apple-icon.svg", "-resize", "180x180", "-strip", "src/app/apple-icon.png"]);
console.log("wrote src/app/icon.svg and src/app/apple-icon.png");
