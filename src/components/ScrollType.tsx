"use client";

import { useRef, useState } from "react";
import {
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import SignatureTiles from "./SignatureTiles";

/* Characters reveal as you scroll down and un-reveal scrolling back up -
   progress is bound to scroll position, so it's fully reversible, with a
   live caret at the write-head. With `signed`, the signature writes itself
   underneath, scroll-linked too, so scrolling back up un-signs it. */
export default function ScrollType({ text, signed = false }: { text: string; signed?: boolean }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  // starts when the block enters the lower third, completes near the upper third
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "start 20%"],
  });
  // the pen writes as the signature rises up the screen; by then the
  // typing above it has always finished, on any screen height
  const sigRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: signP } = useScroll({
    target: sigRef,
    offset: ["start 72%", "start 40%"],
  });
  const [head, setHead] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (p) =>
    setHead(Math.floor(p * text.length)),
  );

  const shown = reduce ? text.length : head;
  const prog = shown / text.length;
  return (
    <>
    {/* role="img" + aria-label: assistive tech announces the sentence once;
       the per-char spans are pure presentation, so text extraction (reader
       mode, copy, search) doesn't see the sentence twice. */}
    <p
      ref={ref}
      role="img"
      aria-label={text}
      className="scroll-type m-0 max-w-[22em] text-[clamp(28px,4.6vw,58px)] font-semibold leading-[1.25] tracking-[-0.03em]"
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
    {signed && (
      <div
        ref={sigRef}
        aria-hidden
        className="mt-[clamp(18px,3vw,34px)] ml-[clamp(0px,8vw,140px)] w-[clamp(210px,28vw,420px)] -rotate-2"
      >
        <SignatureTiles progress={signP} reduce={reduce} />
      </div>
    )}
    </>
  );
}
