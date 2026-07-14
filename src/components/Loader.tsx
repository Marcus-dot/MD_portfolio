"use client";

import { useEffect, useState } from "react";

const KEY = "md-loader-seen";

function markLoaded() {
  document.documentElement.setAttribute("data-loaded", "");
}

export default function Loader() {
  const [n, setN] = useState(0);
  const [phase, setPhase] = useState<"count" | "exit" | "done">("count");

  useEffect(() => {
    const skip =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      sessionStorage.getItem(KEY) !== null;
    let raf: number;
    let exitTimer: ReturnType<typeof setTimeout>;
    if (skip) {
      markLoaded();
      // the loader is already hidden via CSS; unmount on the next frame
      raf = requestAnimationFrame(() => setPhase("done"));
      return () => cancelAnimationFrame(raf);
    }
    const start = performance.now();
    // Shorter ceremony on small screens - keeps mobile LCP inside budget
    const duration = window.matchMedia("(max-width: 760px)").matches ? 900 : 1600;
    const tick = (t: number) => {
      const p = Math.min(100, Math.round(((t - start) / duration) * 100));
      setN(p);
      if (p < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        sessionStorage.setItem(KEY, "1");
        markLoaded();
        setPhase("exit");
        exitTimer = setTimeout(() => setPhase("done"), 700);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(exitTimer);
    };
  }, []);

  if (phase === "done") return null;
  return (
    <div
      id="loader"
      aria-hidden
      className="fixed inset-0 z-[100] flex items-end justify-between bg-bg p-[clamp(24px,5vw,60px)] transition-transform duration-700 ease-(--ease)"
      style={{ transform: phase === "exit" ? "translateY(-100%)" : "none" }}
    >
      <div>
        <span className="block font-mono text-[12px] tracking-[0.15em] text-dim">
          MADALITSO DAKA · PORTFOLIO
        </span>
        <span className="mt-2 block font-mono text-[11px] tracking-[0.15em] text-faint">
          VERIFYING CLAIMS<span className="text-accent">…</span>
        </span>
      </div>
      <span className="font-serif text-[clamp(80px,16vw,200px)] leading-[0.8] italic text-text">
        {n}
      </span>
    </div>
  );
}
