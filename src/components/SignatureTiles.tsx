"use client";

import { useEffect, useRef } from "react";
import { useMotionValueEvent, type MotionValue } from "framer-motion";

const CELL = 3; // px per tile: coarse on purpose, the signature as a bitmap

/* The signature rebuilt from square tiles, like the statues, and set down
   left to right as `progress` goes 0 to 1. The write-head is accent green,
   the same colour as the chisel sparks. */
export default function SignatureTiles({
  progress,
  reduce,
}: {
  progress: MotionValue<number>;
  reduce: boolean | null;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawRef = useRef<((p: number) => void) | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const wrap = canvas.parentElement!;
    const ctx = canvas.getContext("2d")!;
    const css = getComputedStyle(document.documentElement);
    const ink = css.getPropertyValue("--text").trim() || "#edf0e4";
    const accent = css.getPropertyValue("--accent").trim() || "#9bc97e";
    const img = new Image();
    img.src = "/signature.png";
    let disposed = false;
    let cols = 0, cell = 0, w = 0, h = 0;
    // per tile: column, row, ink level, and when along the stroke it lands
    let tiles: { c: number; r: number; a: number; t: number }[] = [];

    const build = () => {
      w = wrap.clientWidth;
      if (!w || !img.naturalWidth) return;
      h = (w * img.naturalHeight) / img.naturalWidth;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.max(40, Math.round(w / CELL));
      cell = w / cols;
      const rows = Math.round(h / cell);
      const off = document.createElement("canvas");
      off.width = cols;
      off.height = rows;
      const o = off.getContext("2d", { willReadFrequently: true })!;
      o.drawImage(img, 0, 0, cols, rows);
      const d = o.getImageData(0, 0, cols, rows).data;
      tiles = [];
      for (let r = 0; r < rows; r++)
        for (let c = 0; c < cols; c++) {
          const a = d[(r * cols + c) * 4 + 3] / 255;
          if (a < 0.32) continue;
          // three ink levels, like a cheap printer
          const lvl = a < 0.4 ? 0.45 : a < 0.7 ? 0.72 : 1;
          tiles.push({ c, r, a: lvl, t: c / cols + (Math.random() - 0.5) * 0.04 });
        }
    };

    const draw = (p: number) => {
      if (!tiles.length) return;
      ctx.clearRect(0, 0, w, h);
      const at = p * 1.06; // run slightly past the end so the last tiles land
      const gap = Math.max(0.6, cell * 0.16);
      for (const tl of tiles) {
        if (tl.t > at) continue;
        const head = p < 1 && at - tl.t < 0.045;
        ctx.globalAlpha = head ? 1 : tl.a * 0.92;
        ctx.fillStyle = head ? accent : ink;
        ctx.fillRect(tl.c * cell + gap / 2, tl.r * cell + gap / 2, cell - gap, cell - gap);
      }
      ctx.globalAlpha = 1;
    };
    drawRef.current = draw;

    const redraw = () => {
      build();
      draw(reduce ? 1 : progress.get());
    };
    img.onload = () => !disposed && redraw();
    const ro = new ResizeObserver(redraw);
    ro.observe(wrap);
    // print always shows the whole signature
    const onPrint = () => draw(1);
    const onPrinted = () => draw(reduce ? 1 : progress.get());
    window.addEventListener("beforeprint", onPrint);
    window.addEventListener("afterprint", onPrinted);
    return () => {
      disposed = true;
      ro.disconnect();
      window.removeEventListener("beforeprint", onPrint);
      window.removeEventListener("afterprint", onPrinted);
    };
  }, [progress, reduce]);

  useMotionValueEvent(progress, "change", (p) => drawRef.current?.(reduce ? 1 : p));

  return <canvas ref={canvasRef} className="block" />;
}
