"use client";

import { useEffect } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

/* Blueprint grid revealed in a radial mask around the cursor. Desktop only. */
export default function Spotlight() {
  const mx = useMotionValue(-500);
  const my = useMotionValue(-500);
  const mask = useMotionTemplate`radial-gradient(240px at ${mx}px ${my}px, black, transparent 70%)`;

  useEffect(() => {
    if (
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const on = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };
    window.addEventListener("mousemove", on);
    return () => window.removeEventListener("mousemove", on);
  }, [mx, my]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1] hidden bg-[linear-gradient(rgba(155,201,126,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(155,201,126,0.14)_1px,transparent_1px)] bg-[size:48px_48px] pointer-fine:block motion-reduce:pointer-fine:hidden"
      style={{ WebkitMaskImage: mask, maskImage: mask }}
    />
  );
}
