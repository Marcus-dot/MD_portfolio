"use client";

import { useEffect, useState, type ReactNode } from "react";

const KEY = "md-loader-seen";

function markLoaded() {
  document.documentElement.setAttribute("data-loaded", "");
}

/* The opening: Marcus drawn in pen, line by line, from his own scan
   (scripts/loader/draw.mjs), with a laurel branch growing across his head.
   The drawing is the progress: there is no counter. Once per visit; a tap
   or a key skips it; reduced motion never sees it. */
export default function Loader({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<"draw" | "exit" | "done">("draw");

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
    // keep in step with --loader-dur in globals.css (shorter on phones)
    const duration = window.matchMedia("(max-width: 760px)").matches ? 700 : 1900;
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      clearTimeout(doneTimer);
      sessionStorage.setItem(KEY, "1");
      markLoaded();
      setPhase("exit");
      exitTimer = setTimeout(() => setPhase("done"), 800);
    };
    // no counter: the drawing is the progress, and it ends when the last line lands
    // (on desktop the finished drawing holds a beat before the page lifts)
    const doneTimer = setTimeout(finish, duration < 1000 ? duration : duration + 450);
    window.addEventListener("pointerdown", finish, { once: true });
    window.addEventListener("keydown", finish, { once: true });
    return () => {
      clearTimeout(doneTimer);
      clearTimeout(exitTimer);
      window.removeEventListener("pointerdown", finish);
      window.removeEventListener("keydown", finish);
    };
  }, []);

  if (phase === "done") return null;
  return (
    <div
      id="loader"
      aria-hidden
      className="fixed inset-0 z-[100] flex flex-col bg-bg p-[clamp(24px,5vw,60px)] transition-[clip-path] duration-[800ms] ease-(--ease)"
      style={{ clipPath: phase === "exit" ? "inset(0 0 100% 0)" : "inset(0 0 0 0)" }}
    >
      <div className="relative flex min-h-0 flex-1 items-center justify-center">
        {children}
      </div>
      <div className="text-center">
        <span className="block font-mono text-[12px] tracking-[0.15em] text-dim">
          MADALITSO DAKA · PORTFOLIO
        </span>
        <span className="mt-2 block font-mono text-[11px] tracking-[0.15em] text-faint">
          MARCUS AURELIUS, IN PEN<span className="text-accent">.</span>
        </span>
      </div>
    </div>
  );
}
