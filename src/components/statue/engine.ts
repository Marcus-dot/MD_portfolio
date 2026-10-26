/*
 * Statue renderer: baked cell maps (see scripts/statue/bake.mjs) drawn as a
 * grid of mono glyphs, relit every frame by a lamp that follows the pointer.
 * Plain 2D canvas, no dependencies.
 */

export const SRC_COLS = 150;
export const SRC_ROWS = 150;

export type Frame = {
  cols: number;
  rows: number;
  nx: Float32Array;
  ny: Float32Array;
  nz: Float32Array;
  tone: Float32Array; // 0 = empty cell
};

/* ---------- loading ---------- */

export async function loadFrames(url: string): Promise<Frame[]> {
  const res = await fetch(url);
  const bmp = await createImageBitmap(await res.blob(), {
    colorSpaceConversion: "none",
    premultiplyAlpha: "none",
  });
  const c = document.createElement("canvas");
  c.width = bmp.width;
  c.height = bmp.height;
  const ctx = c.getContext("2d", { willReadFrequently: true })!;
  ctx.drawImage(bmp, 0, 0);
  const px = ctx.getImageData(0, 0, bmp.width, bmp.height).data;
  const count = Math.round(bmp.height / SRC_ROWS);
  const frames: Frame[] = [];
  for (let f = 0; f < count; f++) {
    const n = SRC_COLS * SRC_ROWS;
    const fr: Frame = {
      cols: SRC_COLS,
      rows: SRC_ROWS,
      nx: new Float32Array(n),
      ny: new Float32Array(n),
      nz: new Float32Array(n),
      tone: new Float32Array(n),
    };
    for (let i = 0; i < n; i++) {
      const o = (f * n + i) * 4;
      if (px[o + 2] === 0) continue;
      const x = (px[o] - 128) / 127;
      const y = (px[o + 1] - 128) / 127;
      fr.nx[i] = x;
      fr.ny[i] = y;
      fr.nz[i] = Math.sqrt(Math.max(0, 1 - x * x - y * y));
      fr.tone[i] = px[o + 2] / 255;
    }
    frames.push(fr);
  }
  return frames;
}

/* Crop every frame to the union bounding box of their lit cells, so a tall
   figure fills a tall box instead of floating in a square grid. */
export function cropToContent(frames: Frame[]): Frame[] {
  const { cols } = frames[0];
  let x0 = Infinity, y0 = Infinity, x1 = -1, y1 = -1;
  for (const f of frames) {
    for (let i = 0; i < f.tone.length; i++) {
      if (!f.tone[i]) continue;
      const x = i % cols, y = Math.floor(i / cols);
      if (x < x0) x0 = x;
      if (x > x1) x1 = x;
      if (y < y0) y0 = y;
      if (y > y1) y1 = y;
    }
  }
  if (x1 < 0) return frames;
  const w = x1 - x0 + 1, h = y1 - y0 + 1;
  return frames.map((f) => {
    const out: Frame = {
      cols: w,
      rows: h,
      nx: new Float32Array(w * h),
      ny: new Float32Array(w * h),
      nz: new Float32Array(w * h),
      tone: new Float32Array(w * h),
    };
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const k = (y + y0) * cols + x + x0;
        const o = y * w + x;
        out.nx[o] = f.nx[k];
        out.ny[o] = f.ny[k];
        out.nz[o] = f.nz[k];
        out.tone[o] = f.tone[k];
      }
    }
    return out;
  });
}

/* Area-average the source grid down to cols x rows (any ratio). */
export function resample(src: Frame, cols: number, rows: number): Frame {
  if (cols >= src.cols && rows >= src.rows) return src;
  const n = cols * rows;
  const out: Frame = {
    cols,
    rows,
    nx: new Float32Array(n),
    ny: new Float32Array(n),
    nz: new Float32Array(n),
    tone: new Float32Array(n),
  };
  const sx = src.cols / cols, sy = src.rows / rows;
  for (let r = 0; r < rows; r++) {
    const y0 = Math.floor(r * sy), y1 = Math.max(y0 + 1, Math.floor((r + 1) * sy));
    for (let c = 0; c < cols; c++) {
      const x0 = Math.floor(c * sx), x1 = Math.max(x0 + 1, Math.floor((c + 1) * sx));
      let hits = 0, all = 0, x = 0, y = 0, z = 0, t = 0;
      for (let j = y0; j < y1; j++) {
        for (let i = x0; i < x1; i++) {
          all++;
          const k = j * src.cols + i;
          if (!src.tone[k]) continue;
          hits++;
          x += src.nx[k]; y += src.ny[k]; z += src.nz[k]; t += src.tone[k];
        }
      }
      if (hits * 2 < all) continue;
      const l = Math.hypot(x, y, z) || 1;
      const k = r * cols + c;
      out.nx[k] = x / l;
      out.ny[k] = y / l;
      out.nz[k] = z / l;
      out.tone[k] = t / hits;
    }
  }
  return out;
}

/* ---------- glyph atlas ---------- */

export const LEVELS = 24;
const GLYPHS = "+:=*#%o.";
export const VARIANTS = GLYPHS.length;

const hex = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const DARK = hex("#141a13");
const MID = hex("#6f7b65");
const BONE = hex("#eef0e6");
const ACCENT = hex("#9bc97e");

const lerp = (a: number[], b: number[], t: number) => a.map((v, i) => v + (b[i] - v) * t);
const rgb = (c: number[]) => `rgb(${c.map((v) => Math.round(v)).join(",")})`;

/* Each tile is a shaded square with a glyph etched into it - the tile
   carries the tone, the glyph carries texture. Rows 0..V-1 are marble,
   rows V..2V-1 are accent (chisel sparks, airborne dust). */
export function buildAtlas(cell: number, dpr: number, font: string) {
  const s = Math.max(2, Math.round(cell * dpr));
  const c = document.createElement("canvas");
  c.width = s * LEVELS;
  c.height = s * VARIANTS * 2;
  const ctx = c.getContext("2d")!;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `600 ${Math.round(s * 0.92)}px ${font}`;
  const gap = Math.max(1, Math.round(s * 0.1));
  for (let l = 0; l < LEVELS; l++) {
    const t = l / (LEVELS - 1);
    const base = t < 0.45 ? lerp(DARK, MID, t / 0.45) : lerp(MID, BONE, (t - 0.45) / 0.55);
    for (let v = 0; v < VARIANTS; v++) {
      for (const accent of [false, true]) {
        const tile = accent ? lerp(DARK, ACCENT, 0.3 + t * 0.7) : base;
        const ink = t > 0.55 ? lerp(tile, DARK, 0.42) : lerp(tile, BONE, 0.22);
        const x = l * s, y = (v + (accent ? VARIANTS : 0)) * s;
        ctx.fillStyle = rgb(tile);
        ctx.fillRect(x + gap / 2, y + gap / 2, s - gap, s - gap);
        ctx.fillStyle = rgb(ink);
        ctx.fillText(GLYPHS[v], x + s / 2, y + s / 2 + s * 0.04);
      }
    }
  }
  return { canvas: c, size: s };
}

/* ---------- lighting ---------- */

export type Light = { x: number; y: number; z: number };

export function normalize(l: Light): Light {
  const m = Math.hypot(l.x, l.y, l.z) || 1;
  return { x: l.x / m, y: l.y / m, z: l.z / m };
}

/* Lambert + a tight specular, scaled by the baked tone. Returns 0..1. */
export function shade(nx: number, ny: number, nz: number, tone: number, L: Light) {
  const d = nx * L.x + ny * L.y + nz * L.z;
  const diff = d > 0 ? d : 0;
  // half vector with the viewer straight on (0,0,1)
  let hx = L.x, hy = L.y, hz = L.z + 1;
  const hm = Math.hypot(hx, hy, hz) || 1;
  hx /= hm; hy /= hm; hz /= hm;
  const sd = nx * hx + ny * hy + nz * hz;
  const spec = sd > 0 ? Math.pow(sd, 28) * 0.55 : 0;
  const v = tone * (0.14 + 0.86 * diff) + spec * tone;
  return v > 1 ? 1 : v;
}
