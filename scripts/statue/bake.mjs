/*
 * Bakes statue scans into small PNG "cell maps" the canvas relights at runtime.
 *
 *   node scripts/statue/bake.mjs <srcDir> <outDir>          bake everything
 *   PREVIEW=1 node scripts/statue/bake.mjs <srcDir> <outDir>  4 quarter-turns each
 *   ONLY=hercules,athena ...                                 limit to some statues
 *
 * Sources stay out of the repo (see STATUES for files and licences); only the
 * baked PNGs in public/statue/ are committed.
 *
 * Cell encoding (per pixel of the output PNG = one cell on screen):
 *   R, G  surface normal x / y, mapped -1..1 -> 1..255 (camera space, +y up)
 *   B     nearness 1..255 (0 = empty cell)
 * nz is recovered at runtime as sqrt(1 - nx^2 - ny^2). Multi-frame files
 * stack frames vertically. Needs ImageMagick (`magick`) for PNG encode.
 */
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const [srcDir, outDir] = process.argv.slice(2);
if (!srcDir || !outDir) {
  console.error("usage: node scripts/statue/bake.mjs <srcDir> <outDir>");
  process.exit(1);
}
fs.mkdirSync(outDir, { recursive: true });

const COLS = 150;
const ROWS = 150;
const SS = 3; // supersample factor per cell axis

/*
 * file      source scan in srcDir
 * yaw       degrees about the vertical axis that puts the face to camera
 * z         [from, to] fraction of the scan's height to frame (crops plinths)
 * turn      also bake a -60..+60 turntable
 * up        "y" / "-y" when a scan was exported lying down (y-up); stood upright on load
 *
 * marcus    MAH Geneva inv. 19050, 3D scan by Rama, Wikimedia Commons, CC BY-SA 3.0 FR
 * others    SMK Royal Cast Collection (api.smk.dk), public domain
 */
const STATUES = [
  { name: "marcus", file: "marcus.stl", yaw: 0, z: [0.27, 1], turn: true },
  { name: "hercules", file: "hercules.stl", yaw: 0, z: [0.25, 1] },
  { name: "athena", file: "athena.stl", yaw: 0, z: [0.22, 1] },
  { name: "apollo", file: "apollo.stl", yaw: 0, z: [0.02, 1] },
  { name: "torso", file: "torso.stl", yaw: 0, z: [0.08, 1] },
  { name: "homer", file: "homer.stl", yaw: 0, z: [0.25, 1] },
  { name: "discobolus", file: "discobolus.stl", yaw: 0, z: [0.02, 1] },
  { name: "alexander", file: "alexander.stl", yaw: 90, z: [0.25, 1] },
  { name: "zeus", file: "zeus.stl", yaw: 0, z: [0.25, 1] },
  { name: "laocoon", file: "laocoon.stl", yaw: 0, z: [0.02, 1] },
  { name: "moses", file: "moses.stl", yaw: 0, z: [0.02, 1] },
  { name: "gladiator", file: "gladiator.stl", yaw: 0, z: [0.02, 1] },
  { name: "david", file: "david.stl", yaw: 30, z: [0.1, 1] },
  { name: "faun", file: "faun.stl", yaw: 0, z: [0.02, 1] },
  { name: "prisoner", file: "prisoner.stl", yaw: 0, z: [0.02, 1] },
  { name: "pieta", file: "pieta.stl", yaw: 0, z: [0.02, 1], up: "y" },
];

/* ---------- mesh ---------- */

function loadStl(file, up) {
  const b = fs.readFileSync(file);
  const n = b.readUInt32LE(80);
  const pos = new Float32Array(n * 9);
  const min = [Infinity, Infinity, Infinity];
  const max = [-Infinity, -Infinity, -Infinity];
  for (let i = 0; i < n; i++) {
    const o = 84 + i * 50 + 12;
    for (let k = 0; k < 9; k++) {
      pos[i * 9 + k] = b.readFloatLE(o + k * 4);
    }
  }
  // stand y-up scans upright: (x, y, z) -> (x, -z, y), or (x, z, -y) for -y
  if (up === "y" || up === "-y") {
    const sgn = up === "y" ? 1 : -1;
    for (let k = 0; k < pos.length; k += 3) {
      const y = pos[k + 1], z = pos[k + 2];
      pos[k + 1] = -z * sgn;
      pos[k + 2] = y * sgn;
    }
  }
  for (let k = 0; k < pos.length; k++) {
    const v = pos[k], a = k % 3;
    if (v < min[a]) min[a] = v;
    if (v > max[a]) max[a] = v;
  }
  return { n, pos, min, max };
}

/* Frame the [z0, z1] slice of the scan so it fills the grid height (or width,
   whichever binds first), centred on the scan's horizontal middle. */
function frameFor(mesh, [f0, f1]) {
  const h = mesh.max[2] - mesh.min[2];
  const z0 = mesh.min[2] + h * f0;
  const z1 = mesh.min[2] + h * f1;
  const span = z1 - z0;
  const wide = Math.hypot(mesh.max[0] - mesh.min[0], mesh.max[1] - mesh.min[1]);
  const scale = Math.min((ROWS * SS) / (span * 1.02), (COLS * SS) / (wide * 0.98));
  return {
    cx: (mesh.min[0] + mesh.max[0]) / 2,
    cy: (mesh.min[1] + mesh.max[1]) / 2,
    // bottom of the slice sits on the bottom edge
    cz: z0 + (ROWS * SS) / scale / 2,
    scale,
    depthRange: Math.max(mesh.max[0] - mesh.min[0], mesh.max[1] - mesh.min[1]) / 2,
  };
}

/* Render one view. yaw rotates about the vertical (z) axis; the camera
   looks along +y in model space (front = -y side), z up. */
function renderMesh({ n, pos }, yaw, frame) {
  const W = COLS * SS;
  const H = ROWS * SS;
  const zbuf = new Float32Array(W * H).fill(-Infinity);
  const nxb = new Float32Array(W * H);
  const nyb = new Float32Array(W * H);
  const c = Math.cos(yaw);
  const s = Math.sin(yaw);
  const { cx, cy, cz, scale } = frame;

  const P = new Float32Array(9);
  for (let i = 0; i < n; i++) {
    for (let v = 0; v < 3; v++) {
      const x = pos[i * 9 + v * 3] - cx;
      const y = pos[i * 9 + v * 3 + 1] - cy;
      const z = pos[i * 9 + v * 3 + 2] - cz;
      const rx = x * c - y * s;
      const ry = x * s + y * c;
      // screen: u right, w down; depth d toward camera (camera at -y)
      P[v * 3] = W / 2 + rx * scale;
      P[v * 3 + 1] = H / 2 - z * scale;
      P[v * 3 + 2] = -ry * scale;
    }
    // edges in camera space (screen y flipped so +y is up)
    const ax = P[3] - P[0], ay = P[1] - P[4], az = P[5] - P[2];
    const bx = P[6] - P[0], by = P[1] - P[7], bz = P[8] - P[2];
    let fx = ay * bz - az * by;
    let fy = az * bx - ax * bz;
    let fz = ax * by - ay * bx;
    const fl = Math.hypot(fx, fy, fz) || 1;
    fx /= fl; fy /= fl; fz /= fl;
    if (fz < 0) { fx = -fx; fy = -fy; fz = -fz; } // STL winding is not trusted

    const minX = Math.max(0, Math.floor(Math.min(P[0], P[3], P[6])));
    const maxX = Math.min(W - 1, Math.ceil(Math.max(P[0], P[3], P[6])));
    const minY = Math.max(0, Math.floor(Math.min(P[1], P[4], P[7])));
    const maxY = Math.min(H - 1, Math.ceil(Math.max(P[1], P[4], P[7])));
    if (minX > maxX || minY > maxY) continue;
    const den = (P[4] - P[7]) * (P[0] - P[6]) + (P[6] - P[3]) * (P[1] - P[7]);
    if (Math.abs(den) < 1e-12) continue;
    for (let py = minY; py <= maxY; py++) {
      for (let px = minX; px <= maxX; px++) {
        const qx = px + 0.5, qy = py + 0.5;
        const w0 = ((P[4] - P[7]) * (qx - P[6]) + (P[6] - P[3]) * (qy - P[7])) / den;
        const w1 = ((P[7] - P[1]) * (qx - P[6]) + (P[0] - P[6]) * (qy - P[7])) / den;
        const w2 = 1 - w0 - w1;
        if (w0 < -1e-4 || w1 < -1e-4 || w2 < -1e-4) continue;
        const d = w0 * P[2] + w1 * P[5] + w2 * P[8];
        const k = py * W + px;
        if (d > zbuf[k]) {
          zbuf[k] = d;
          nxb[k] = fx;
          nyb[k] = fy;
        }
      }
    }
  }

  // downsample SSxSS -> one cell; a cell needs half coverage to exist
  const out = Buffer.alloc(COLS * ROWS * 3);
  const dRange = frame.depthRange;
  for (let r = 0; r < ROWS; r++) {
    for (let col = 0; col < COLS; col++) {
      let hits = 0, sx = 0, sy = 0, sd = 0;
      for (let j = 0; j < SS; j++) {
        for (let i = 0; i < SS; i++) {
          const k = (r * SS + j) * W + col * SS + i;
          if (zbuf[k] === -Infinity) continue;
          hits++; sx += nxb[k]; sy += nyb[k]; sd += zbuf[k];
        }
      }
      const o = (r * COLS + col) * 3;
      if (hits * 2 < SS * SS) continue;
      let nx = sx / hits, ny = sy / hits;
      const l = Math.hypot(nx, ny);
      if (l > 1) { nx /= l; ny /= l; }
      const near = Math.min(1, Math.max(0, (sd / hits / scale + dRange) / (2 * dRange)));
      out[o] = Math.round(nx * 127 + 128);
      out[o + 1] = Math.round(ny * 127 + 128);
      out[o + 2] = Math.max(1, Math.round(40 + near * 215));
    }
  }
  return out;
}

/* ---------- output ---------- */

function writePng(file, frames) {
  const buf = Buffer.concat(frames);
  execFileSync("magick", [
    "-size", `${COLS}x${ROWS * frames.length}`, "-depth", "8", "rgb:-",
    "-strip", "-define", "png:compression-level=9", file,
  ], { input: buf });
  console.log(`${path.basename(file).padEnd(22)} ${String(frames.length).padStart(2)} frame(s)  ${(fs.statSync(file).size / 1024).toFixed(0)} KB`);
}

const only = process.env.ONLY?.split(",");
const rad = (d) => (d * Math.PI) / 180;

for (const st of STATUES) {
  if (only && !only.includes(st.name)) continue;
  const mesh = loadStl(path.join(srcDir, st.file), st.up);
  const frame = frameFor(mesh, st.z);
  if (process.env.PREVIEW) {
    writePng(
      path.join(outDir, `${st.name}-preview.png`),
      [0, 90, 180, 270].map((a) => renderMesh(mesh, rad(st.yaw + a), frame)),
    );
    continue;
  }
  writePng(path.join(outDir, `${st.name}.png`), [renderMesh(mesh, rad(st.yaw), frame)]);
  if (st.turn) {
    const turn = [];
    for (let a = -60; a <= 60; a += 5) turn.push(renderMesh(mesh, rad(st.yaw + a), frame));
    writePng(path.join(outDir, `${st.name}-turn.png`), turn);
  }
}
