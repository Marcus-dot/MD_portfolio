"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll } from "framer-motion";
import type { Role } from "@/content/cv";
import Reveal from "../Reveal";

/* Experience as a timeline whose spine draws itself as you read down it. */
export default function CvTimeline({ roles }: { roles: Role[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 60%"],
  });

  return (
    <ol ref={ref} className="relative m-0 list-none p-0 pl-8">
      {/* spine: faint track + accent fill scrubbed to scroll */}
      <span aria-hidden className="absolute top-2 bottom-2 left-[5px] w-px bg-line" />
      <motion.span
        aria-hidden
        className="absolute top-2 bottom-2 left-[5px] w-px origin-top bg-[linear-gradient(var(--accent),var(--musgo))] print:hidden"
        style={{ scaleY: reduce ? 1 : scrollYProgress }}
      />
      {roles.map((r, i) => (
        <li key={r.title + r.when} className="relative pb-14 break-inside-avoid last:pb-0 print:pb-5">
          <span
            aria-hidden
            className="absolute top-[7px] -left-8 h-[11px] w-[11px] rounded-full border border-line-hover bg-bg"
          >
            <span className="absolute inset-[2px] rounded-full bg-accent" />
          </span>
          <Reveal delay={i * 0.04}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <h3 className="m-0 text-[clamp(20px,2.4vw,26px)] font-semibold tracking-[-0.025em]">
                {r.title}
              </h3>
              <span className="font-mono text-[11px] tracking-[0.1em] text-accent uppercase">
                {r.when}
              </span>
            </div>
            <div className="mt-1.5 font-serif text-[17px] italic text-dim">
              {r.org}
              <span className="text-faint"> · {r.place}</span>
            </div>
            <ul className="mt-5 flex list-none flex-col gap-2.5 p-0">
              {r.points.map((p) => (
                <li key={p} className="flex gap-3 text-[14.5px] leading-[1.7] text-dim">
                  <span aria-hidden className="mt-[11px] h-px w-3 shrink-0 bg-faint" />
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
