"use client";

import { useEffect, useState } from "react";
import { CHIP_EVENT } from "./StatueCanvas";

const KEY = "md-chips";

/* Counts the marble tiles this visitor has knocked loose, on any statue.
   Kept in their own browser only; it reports what they did, nothing else. */
export default function ChipCounter({ className = "" }: { className?: string }) {
  const [n, setN] = useState(0);

  useEffect(() => {
    let total = 0;
    try {
      total = Number(localStorage.getItem(KEY)) || 0;
    } catch {}
    // read once on mount, then follow chip events
    const sync = () => setN(total);
    const raf = requestAnimationFrame(sync);
    const on = (e: Event) => {
      total += (e as CustomEvent<number>).detail;
      setN(total);
      try {
        localStorage.setItem(KEY, String(total));
      } catch {}
    };
    window.addEventListener(CHIP_EVENT, on);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener(CHIP_EVENT, on);
    };
  }, []);

  return (
    <span aria-live="polite" className={`font-mono tracking-[0.14em] ${className}`}>
      {n === 0 ? (
        <>CLICK THE MARBLE</>
      ) : (
        <>
          TILES CHIPPED · <span className="text-accent tabular-nums">{n.toLocaleString("en-GB")}</span>
        </>
      )}
    </span>
  );
}
