"use client";

import { useEffect, useRef } from "react";
import {
  LEVELS,
  VARIANTS,
  buildAtlas,
  cropToContent,
  loadFrames,
  normalize,
  resample,
  shade,
  type Frame,
  type Light,
} from "./engine";

const CARVE_S = 1.9;

/*
 * A baked statue drawn as etched marble tiles and relit by a lamp.
 *
 * src         baked cell map in /public/statue (one frame, or a turntable)
 * turn        the head follows the pointer across the turntable frames
 * scope       "window": lamp follows the pointer anywhere (hero)
 *             "local":  lamp follows only while the pointer is near; drifts otherwise
 * waitLoader  hold the carve-in until the page loader has exited
 */
export default function StatueCanvas({
  src,
  label,
  turn = false,
  scope = "local",
  waitLoader = false,
  targetCell = 6.5,
  className = "absolute inset-0",
}: {
  src: string;
  label: string;
  turn?: boolean;
  scope?: "window" | "local";
  waitLoader?: boolean;
  targetCell?: number;
  className?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current!;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const font =
      getComputedStyle(document.documentElement).getPropertyValue("--font-jetbrains-mono") ||
      "monospace";

    let raw: Frame[] = [];
    let frames: Frame[] = [];
    let atlas: ReturnType<typeof buildAtlas> | null = null;
    let cols = 0, rows = 0, cell = 0, ox = 0, oy = 0, dpr = 1;
    let raf = 0;
    let inView = false;
    let pageShown = !document.hidden;
    let disposed = false;
    let carveAt = -1; // seconds; set when first visible (and loader gone)
    const t0 = performance.now();
    const clock = () => (performance.now() - t0) / 1000;

    // stable per-cell glyph choice, so texture doesn't shimmer
    const variantOf = (i: number) => ((i * 2654435761) >>> 0) % VARIANTS;

    const pointer = { x: 0.5, y: 0.35, near: false, last: -1e9 };
    let L: Light = normalize({ x: -0.5, y: 0.5, z: 0.8 });

    let offX = new Float32Array(0), offY = new Float32Array(0);
    let velX = new Float32Array(0), velY = new Float32Array(0);
    let reveal = new Float32Array(0);
    let dustLive = false;
    let yawIdx = 0;

    const layout = () => {
      const r = wrap.getBoundingClientRect();
      if (!r.width || !r.height) return;
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(r.width * dpr);
      canvas.height = Math.round(r.height * dpr);
      canvas.style.width = `${r.width}px`;
      canvas.style.height = `${r.height}px`;
      if (!raw.length) return;
      const { cols: sc, rows: sr } = raw[0];
      const fit = Math.min(r.width / sc, r.height / sr);
      // never upsample: below targetCell the source resolution is the limit
      const k = Math.min(1, fit / targetCell);
      frames = raw.map((f) => resample(f, Math.max(12, Math.floor(sc * k)), Math.max(12, Math.floor(sr * k))));
      cols = frames[0].cols;
      rows = frames[0].rows;
      cell = Math.min(r.width / cols, r.height / rows);
      ox = (r.width - cols * cell) / 2;
      oy = r.height - rows * cell; // sits on the bottom edge, like a bust on a plinth
      atlas = buildAtlas(cell, dpr, font);
      const n = cols * rows;
      offX = new Float32Array(n); offY = new Float32Array(n);
      velX = new Float32Array(n); velY = new Float32Array(n);
      reveal = new Float32Array(n);
      for (let i = 0; i < n; i++) {
        const row = Math.floor(i / cols);
        reveal[i] = reduce ? -1e9 : (row / rows) * CARVE_S * 0.8 + Math.random() * CARVE_S * 0.25;
      }
      if (turn) yawIdx = (frames.length - 1) / 2;
    };

    const draw = (ts: number) => {
      raf = requestAnimationFrame(draw);
      if (!inView || !pageShown || !atlas || !frames.length) return;
      const now = (ts - t0) / 1000;
      if (carveAt < 0) {
        if (waitLoader && !document.documentElement.hasAttribute("data-loaded")) return;
        carveAt = now;
      }
      const age0 = now - carveAt;
      const w = canvas.width / dpr, h = canvas.height / dpr;

      // lamp: follows the pointer; drifts in a slow orbit when idle
      const idle = !pointer.near || now - pointer.last > 2.5;
      let tl: Light;
      if (idle && !reduce) {
        const a = now * 0.35;
        tl = { x: Math.cos(a) * 0.75, y: 0.35 + Math.sin(a * 0.7) * 0.35, z: 0.75 };
      } else if (idle) {
        tl = { x: -0.5, y: 0.5, z: 0.8 };
      } else {
        tl = { x: (pointer.x - 0.5) * 2.2, y: (0.5 - pointer.y) * 2.2, z: 0.7 };
      }
      tl = normalize(tl);
      const k = reduce ? 1 : 0.08;
      L = normalize({ x: L.x + (tl.x - L.x) * k, y: L.y + (tl.y - L.y) * k, z: L.z + (tl.z - L.z) * k });

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const A = atlas.canvas, S = atlas.size;

      // a turntable shown still faces front (middle frame)
      let f = frames[Math.floor(frames.length / 2)];
      if (turn) {
        const target = idle
          ? (frames.length - 1) / 2 + (reduce ? 0 : Math.sin(now * 0.4) * 3)
          : Math.min(1, Math.max(0, pointer.x)) * (frames.length - 1);
        yawIdx += (target - yawIdx) * (reduce ? 1 : 0.07);
        f = frames[Math.round(yawIdx)];
      }

      // dust: damped springs back to rest
      if (dustLive) {
        let energy = 0;
        const dt = 1 / 60;
        for (let i = 0; i < offX.length; i++) {
          if (!offX[i] && !offY[i] && !velX[i] && !velY[i]) continue;
          velX[i] += (-34 * offX[i] - 6 * velX[i]) * dt;
          velY[i] += (-34 * offY[i] - 6 * velY[i] + 4) * dt; // a little gravity
          offX[i] += velX[i] * dt;
          offY[i] += velY[i] * dt;
          const e = Math.abs(offX[i]) + Math.abs(offY[i]) + Math.abs(velX[i]) + Math.abs(velY[i]);
          if (e < 0.02) { offX[i] = offY[i] = velX[i] = velY[i] = 0; } else energy += e;
        }
        dustLive = energy > 0;
      }

      for (let i = 0; i < cols * rows; i++) {
        const tone = f.tone[i];
        if (!tone) continue;
        const age = age0 - reveal[i];
        if (age < 0) continue;
        const c = i % cols, r = Math.floor(i / cols);
        const x = ox + (c + offX[i]) * cell;
        const y = oy + (r + offY[i]) * cell;
        if (age < 0.14) {
          // chisel spark: a random accent tile just as the cell is cut
          const lvl = 8 + Math.floor(Math.random() * (LEVELS - 8));
          const row = VARIANTS + Math.floor(Math.random() * VARIANTS);
          ctx.drawImage(A, lvl * S, row * S, S, S, x, y, cell, cell);
          continue;
        }
        const v = shade(f.nx[i], f.ny[i], f.nz[i], tone, L);
        const lvl = Math.round(v * (LEVELS - 1));
        if (lvl <= 0) continue;
        const airborne = Math.abs(offX[i]) + Math.abs(offY[i]) > 0.6;
        const row = variantOf(i) + (airborne ? VARIANTS : 0);
        ctx.drawImage(A, lvl * S, row * S, S, S, x, y, cell, cell);
      }
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      pointer.x = (e.clientX - r.left) / r.width;
      pointer.y = (e.clientY - r.top) / r.height;
      // "local" statues only take the lamp when the pointer is close by
      const pad = 0.35;
      pointer.near =
        scope === "window" ||
        (pointer.x > -pad && pointer.x < 1 + pad && pointer.y > -pad && pointer.y < 1 + pad);
      if (pointer.near) pointer.last = clock();
    };

    const onDown = (e: PointerEvent) => {
      onMove(e);
      if (reduce || !cols) return;
      // blow marble dust outward from the click
      const r = canvas.getBoundingClientRect();
      const gx = (e.clientX - r.left - ox) / cell;
      const gy = (e.clientY - r.top - oy) / cell;
      const R = Math.max(10, cols * 0.14);
      for (let i = 0; i < cols * rows; i++) {
        const dx = (i % cols) - gx, dy = Math.floor(i / cols) - gy;
        const d = Math.hypot(dx, dy);
        if (d > R) continue;
        const force = Math.pow(1 - d / R, 2) * 26;
        velX[i] += (dx / (d || 1)) * force + (Math.random() - 0.5) * 6;
        velY[i] += (dy / (d || 1)) * force - Math.random() * 8;
      }
      dustLive = true;
    };

    const ro = new ResizeObserver(layout);
    const io = new IntersectionObserver(([en]) => (inView = en.isIntersecting));
    const onVis = () => (pageShown = !document.hidden);

    loadFrames(src).then((fr) => {
      if (disposed) return;
      raw = cropToContent(fr);
      layout();
      raf = requestAnimationFrame(draw);
    });
    ro.observe(wrap);
    io.observe(wrap);
    window.addEventListener("pointermove", onMove, { passive: true });
    canvas.addEventListener("pointerdown", onDown);
    document.addEventListener("visibilitychange", onVis);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerdown", onDown);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [src, turn, scope, waitLoader, targetCell]);

  return (
    <div ref={wrapRef} className={className} data-cursor="CHIP">
      <canvas ref={canvasRef} role="img" aria-label={label} className="block touch-manipulation" />
    </div>
  );
}
