"use client";

import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";

const SECTIONS = ["hero", "work", "skills", "method", "contact"];

export default function ScrollUI() {
  const { scrollY, scrollYProgress } = useScroll();
  const [active, setActive] = useState("hero");

  useMotionValueEvent(scrollY, "change", () => {
    for (const id of [...SECTIONS].reverse()) {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) {
        setActive(id);
        break;
      }
    }
  });

  return (
    <>
      {/* scroll progress: a single hairline along the top edge */}
      <div className="fixed top-0 right-0 left-0 z-40 h-px">
        <motion.div className="h-full origin-left bg-accent" style={{ scaleX: scrollYProgress }} />
      </div>

      {/* section index - numerals, not dots; desktop only */}
      <nav
        aria-label="Sections"
        className="fixed top-1/2 right-[18px] z-30 hidden -translate-y-1/2 flex-col items-end gap-2.5 pointer-fine:flex"
      >
        {SECTIONS.map((id, i) => {
          const on = active === id;
          return (
            <a
              key={id}
              href={`#${id}`}
              aria-label={`Go to ${id} section`}
              aria-current={on ? "true" : undefined}
              className={`flex items-center gap-2 font-mono text-[10px] tracking-[0.12em] no-underline transition-colors duration-300 ${
                on ? "text-text" : "text-faint hover:text-dim"
              }`}
            >
              <span
                aria-hidden
                className={`block h-px transition-all duration-500 ease-(--ease) ${on ? "w-4 bg-accent" : "w-0"}`}
              />
              0{i}
            </a>
          );
        })}
      </nav>
    </>
  );
}
