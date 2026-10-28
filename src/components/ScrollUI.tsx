"use client";

import { useState } from "react";
import { motion, useMotionValue, useMotionValueEvent, useScroll, useSpring } from "framer-motion";

const SECTIONS = ["hero", "work", "skills", "method", "contact"];
const STEP = 36; // px between room numerals on the ruler
const TICKS = 5; // ticks per room, the first one long

/* Where you are, as a ruler: the rooms are numbered along it, fine ticks
   between, and a marker slides with the scroll, landing on a room's number
   as you enter it. Desktop with a mouse only; phones get a clean screen. */
export default function ScrollUI() {
  const { scrollY } = useScroll();
  const [active, setActive] = useState(0);
  const pos = useMotionValue(0); // continuous room index, 0..4
  const y = useSpring(pos, { stiffness: 220, damping: 32, mass: 0.6 });
  const marker = useMotionValue(0);
  useMotionValueEvent(y, "change", (v) => marker.set(v * STEP));

  useMotionValueEvent(scrollY, "change", () => {
    const line = window.innerHeight * 0.4;
    const tops = SECTIONS.map((id) => document.getElementById(id)?.getBoundingClientRect().top ?? Infinity);
    let i = 0;
    for (let k = 0; k < tops.length; k++) if (tops[k] < line) i = k;
    const next = tops[i + 1];
    const frac = next === undefined || next === Infinity ? 0 : Math.min(1, Math.max(0, (line - tops[i]) / (next - tops[i])));
    pos.set(Math.min(SECTIONS.length - 1, i + frac));
    setActive(i);
  });

  return (
    <nav
      aria-label="Sections"
      className="fixed top-1/2 right-[18px] z-30 hidden -translate-y-1/2 pointer-fine:block"
      style={{ height: (SECTIONS.length - 1) * STEP }}
    >
      {/* the ruler's ticks */}
      <div aria-hidden className="absolute top-0 right-[26px] h-full">
        {Array.from({ length: (SECTIONS.length - 1) * TICKS + 1 }, (_, t) => (
          <span
            key={t}
            className="absolute right-0 h-px bg-line-hover"
            style={{ top: (t * STEP) / TICKS, width: t % TICKS === 0 ? 9 : 4 }}
          />
        ))}
      </div>
      {/* the marker */}
      <motion.span
        aria-hidden
        className="absolute right-[26px] -mt-px block h-[2px] w-4 bg-accent"
        style={{ top: marker }}
      />
      {SECTIONS.map((id, i) => {
        const on = active === i;
        return (
          <a
            key={id}
            href={`#${id}`}
            aria-current={on ? "true" : undefined}
            className={`absolute right-0 -translate-y-1/2 font-mono text-[10px] leading-none tracking-[0.12em] no-underline transition-colors duration-300 ${
              on ? "text-text" : "text-faint hover:text-dim"
            }`}
            style={{ top: i * STEP }}
          >
            0{i}
            <span className="sr-only"> {id}</span>
          </a>
        );
      })}
    </nav>
  );
}
