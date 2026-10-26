"use client";

import { useEffect, useRef, useState } from "react";

/* An inspector's crosshair that trails the mouse; over elements with
   [data-cursor] the arms open and the label is set beside it in mono, like
   a note in the margin. Fine pointers only. */
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
        dotRef.current.style.transform = `translate(${cx}px,${cy}px)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", move);
    loop();
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  const arm = label ? 9 : 6; // half-length of each arm; opens over targets
  const gap = label ? 4 : 0;
  return (
    <div
      ref={dotRef}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[80] hidden h-0 w-0 mix-blend-difference pointer-fine:block motion-reduce:pointer-fine:hidden"
    >
      {/* four arms around an open centre */}
      {[
        { w: arm, h: 1, x: -arm - gap, y: 0 },
        { w: arm, h: 1, x: gap, y: 0 },
        { w: 1, h: arm, x: 0, y: -arm - gap },
        { w: 1, h: arm, x: 0, y: gap },
      ].map((a, i) => (
        <span
          key={i}
          className="absolute bg-text transition-all duration-300 ease-(--ease)"
          style={{ width: a.w, height: a.h, transform: `translate(${a.x}px,${a.y}px)` }}
        />
      ))}
      <span
        className={`absolute top-[10px] left-[14px] font-mono text-[10px] tracking-[0.16em] whitespace-nowrap text-text transition-opacity duration-200 ${
          label ? "opacity-100" : "opacity-0"
        }`}
      >
        {label}
      </span>
    </div>
  );
}
