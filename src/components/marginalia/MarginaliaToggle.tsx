"use client";

import { useEffect, useState } from "react";

export const MARGINALIA_EVENT = "md:marginalia";
const KEY = "md-marginalia";

export function setMarginalia(on: boolean) {
  document.documentElement.toggleAttribute("data-marginalia", on);
  try {
    localStorage.setItem(KEY, on ? "1" : "0");
  } catch {}
  window.dispatchEvent(new CustomEvent(MARGINALIA_EVENT, { detail: on }));
}

/* The switch where a light/dark toggle would usually sit. Instead of
   recolouring the site it opens the working drawings: notes, outlines,
   process photos and references. */
export default function MarginaliaToggle({ className = "" }: { className?: string }) {
  const [on, setOn] = useState(false);

  useEffect(() => {
    const sync = () => setOn(document.documentElement.hasAttribute("data-marginalia"));
    const raf = requestAnimationFrame(sync);
    window.addEventListener(MARGINALIA_EVENT, sync);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener(MARGINALIA_EVENT, sync);
    };
  }, []);

  return (
    <button
      type="button"
      aria-pressed={on}
      title={on ? "Hide the working" : "Show the working: notes, outlines and references"}
      onClick={() => setMarginalia(!on)}
      className={`cursor-pointer border-none bg-transparent px-2 py-2 font-mono text-[11px] tracking-[0.12em] whitespace-nowrap uppercase transition-colors pointer-coarse:py-3 ${
        on ? "text-[var(--pen)]" : "text-dim hover:text-text"
      } ${className}`}
    >
      <span aria-hidden className="mr-1">¶</span>
      <span className="max-[860px]:sr-only">Marginalia</span>
    </button>
  );
}
