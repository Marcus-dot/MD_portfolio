"use client";

import { useRef, useState } from "react";
import {
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";

/* Characters reveal as you scroll down and un-reveal scrolling back up —
   progress is bound to scroll position, so it's fully reversible, with a
   live caret at the write-head. */
export default function ScrollType({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  // starts when the block enters the lower third, completes near the upper third
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "start 20%"],
  });
  const [head, setHead] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (p) =>
    setHead(Math.floor(p * text.length)),
  );

  const shown = reduce ? text.length : head;
  const prog = shown / text.length;
  return (
    <p
      ref={ref}
      aria-label={text}
      className="m-0 max-w-[22em] text-[clamp(28px,4.6vw,58px)] font-semibold leading-[1.25] tracking-[-0.03em]"
    >
      {text.split("").map((ch, i) => (
        <span
          key={i}
          aria-hidden
          style={{
            color: i < shown ? "var(--text)" : "rgba(237,240,228,0.14)",
            transition: "color .18s linear",
          }}
        >
          {ch}
        </span>
      ))}
      <span
        aria-hidden
        className="ml-0.5 inline-block h-[0.95em] w-[0.08em] bg-accent align-[-0.12em] transition-opacity duration-200"
        style={{ opacity: !reduce && prog > 0.02 && prog < 0.99 ? 1 : 0 }}
      />
    </p>
  );
}
