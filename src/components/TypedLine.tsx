"use client";

import { useEffect, useRef, useState } from "react";
import type { Meditation } from "@/content/meditations";

/* A line typed out once when it scrolls into view, with a block caret that
   keeps blinking at the end; the citation fades in after. Screen readers and
   reduced-motion users get the whole line at once. */
export default function TypedLine({
  line,
  className = "",
  speed = 32,
}: {
  line: Meditation;
  className?: string;
  speed?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const [n, setN] = useState(0);
  const done = n >= line.text.length;

  useEffect(() => {
    const el = ref.current!;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let timer: ReturnType<typeof setInterval> | undefined;
    const io = new IntersectionObserver(([en]) => {
      if (!en.isIntersecting || timer) return;
      if (reduce) {
        setN(line.text.length);
        io.disconnect();
        return;
      }
      timer = setInterval(() => {
        setN((v) => {
          if (v + 1 >= line.text.length && timer) clearInterval(timer);
          return v + 1;
        });
      }, speed);
      io.disconnect();
    });
    io.observe(el);
    return () => {
      io.disconnect();
      if (timer) clearInterval(timer);
    };
  }, [line.text, speed]);

  return (
    <figure ref={ref} className={`m-0 ${className}`}>
      <blockquote className="m-0 font-mono text-[12.5px] leading-[1.7] tracking-[0.02em] text-dim">
        <span className="sr-only">{line.text}</span>
        {/* typed part, caret at the write head, untyped part held invisible
            so the line never reflows while it types */}
        <span aria-hidden>
          {line.text.slice(0, n)}
          <span className="ml-0.5 inline-block h-[1.05em] w-[0.55em] translate-y-[0.18em] bg-accent [animation:ticker_1.1s_steps(1)_infinite] print:hidden" />
          <span className="invisible">{line.text.slice(n)}</span>
        </span>
      </blockquote>
      <figcaption
        className={`mt-2 font-mono text-[9.5px] tracking-[0.16em] text-faint transition-opacity duration-700 ${
          done ? "opacity-100" : "opacity-0"
        }`}
      >
        {line.ref}
      </figcaption>
    </figure>
  );
}
