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
      {/* scroll progress */}
      <div className="fixed top-0 right-0 left-0 z-40 h-[2px]">
        <motion.div
          className="h-full origin-left bg-[linear-gradient(90deg,var(--musgo),var(--accent))]"
          style={{ scaleX: scrollYProgress }}
        />
      </div>

      {/* section dots */}
      <div className="fixed top-1/2 right-[22px] z-30 flex -translate-y-1/2 flex-col gap-3.5">
        {SECTIONS.map((id) => (
          <a
            key={id}
            href={`#${id}`}
            title={id}
            className="block h-[7px] rounded-full transition-all duration-400 ease-(--ease)"
            style={{
              width: active === id ? 22 : 7,
              background:
                active === id ? "var(--accent)" : "rgba(237,240,228,0.2)",
            }}
          />
        ))}
      </div>
    </>
  );
}
