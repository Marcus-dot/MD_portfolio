"use client";

import { useEffect, useRef, useState } from "react";

/* A small dot that follows the mouse; over elements with [data-cursor]
   it expands into a labelled chip. Fine pointers only. */
export default function ContextCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    let x = -100,
      y = -100,
      cx = -100,
      cy = -100,
      raf: number;
    const move = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      const t = (e.target as HTMLElement).closest("[data-cursor]");
      setLabel(t ? (t.getAttribute("data-cursor") ?? "") : "");
    };
    const loop = () => {
      cx += (x - cx) * 0.18;
      cy += (y - cy) * 0.18;
      if (dotRef.current)
        dotRef.current.style.transform = `translate(${cx}px,${cy}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", move);
    loop();
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[80] hidden items-center justify-center rounded-full pointer-fine:flex motion-reduce:pointer-fine:hidden"
      style={{
        width: label ? 64 : 10,
        height: label ? 64 : 10,
        background: label ? "rgba(155,201,126,0.95)" : "var(--accent)",
        transition:
          "width .35s cubic-bezier(.2,.9,.2,1), height .35s cubic-bezier(.2,.9,.2,1), background .35s",
        mixBlendMode: label ? "normal" : "difference",
      }}
    >
      {label && (
        <span className="font-mono text-[10px] font-bold tracking-[0.1em] text-bg">
          {label}
        </span>
      )}
    </div>
  );
}
