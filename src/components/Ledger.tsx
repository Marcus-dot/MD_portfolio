"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { LEDGER_ENTRIES } from "@/content/ledger";

const wrap = (min: number, max: number, v: number) => {
  const r = max - min;
  return ((((v - min) % r) + r) % r) + min;
};

/* The ledger: a frieze of figures, every one sourced and linked to the page
   that backs it. It drifts on its own and runs with your scroll, faster as
   you scroll faster and backwards when you scroll up. Hover holds it still. */
export default function Ledger() {
  const reduce = useReducedMotion();
  const x = useMotionValue(0); // percent of one copy's width
  const { scrollY } = useScroll();
  const v = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const dir = useRef(-1);
  const held = useRef(false);

  useAnimationFrame((_, delta) => {
    if (reduce || held.current) return;
    const vel = v.get();
    if (vel < -5) dir.current = 1;
    else if (vel > 5) dir.current = -1;
    const speed = 1.1 + Math.min(9, Math.abs(vel) / 160); // % per second
    x.set(wrap(-50, 0, x.get() + dir.current * speed * (delta / 1000)));
  });
  const tx = useTransform(x, (p) => `${p}%`);

  return (
    <div
      aria-labelledby="ledger-title"
      role="region"
      data-anno="<Ledger> · scroll velocity drives x; content/ledger.ts"
      className="relative border-y border-line bg-surface"
      onPointerEnter={(e) => e.pointerType === "mouse" && (held.current = true)}
      onPointerLeave={() => (held.current = false)}
    >
      {/* the band's inner rules, like a carved frieze */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-[5px] h-px bg-line" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-[5px] h-px bg-line" />
      <div
        id="ledger-title"
        className="pointer-events-none absolute top-[6px] bottom-[6px] left-0 z-[1] flex items-center bg-surface pr-6 pl-[clamp(20px,6vw,100px)] font-mono text-[10px] tracking-[0.2em] text-faint max-[639px]:hidden"
      >
        THE LEDGER
        {/* the figures fade in from under the label */}
        <span aria-hidden className="absolute top-0 left-full h-full w-16 bg-[linear-gradient(90deg,var(--surface),transparent)]" />
      </div>
      <div className={reduce ? "overflow-x-auto" : "overflow-hidden"}>
        <motion.div style={reduce ? undefined : { x: tx }} className="marquee-track flex w-max">
          {[false, true].map((dup) => (
            <ul key={String(dup)} aria-hidden={dup || undefined} className="m-0 flex list-none p-0">
              {LEDGER_ENTRIES.map((e) => (
                <li key={e.figure + e.what} className="flex items-center">
                  <Link
                    href={e.href}
                    tabIndex={dup ? -1 : undefined}
                    className="group flex items-baseline gap-3 px-7 py-6 no-underline"
                  >
                    <span className="font-serif text-[34px] leading-none text-text tabular-nums">{e.figure}</span>
                    <span className="flex flex-col gap-1">
                      <span className="text-[13.5px] leading-tight text-dim">{e.what}</span>
                      <span className="font-mono text-[9.5px] tracking-[0.14em] text-faint uppercase transition-colors group-hover:text-accent">
                        {e.source} ↗
                      </span>
                    </span>
                  </Link>
                  {/* a registration mark between entries */}
                  <span aria-hidden className="relative block h-3 w-3 shrink-0 text-faint">
                    <span className="absolute top-1/2 left-0 h-px w-full bg-current" />
                    <span className="absolute top-0 left-1/2 h-full w-px bg-current" />
                  </span>
                </li>
              ))}
            </ul>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
