"use client";

import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

export default function HeroPortrait() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  // image is 115% tall; slides up at most ~8% of one viewport of scroll
  const y = useTransform(scrollY, (v) => {
    if (reduce || typeof window === "undefined") return 0;
    return Math.min(v, window.innerHeight) * -0.08;
  });

  return (
    <motion.div style={{ y }} className="relative h-[115%] w-full will-change-transform">
      <Image
        src="/portrait.jpg"
        alt="Fragmented bronze portrait of Marcus Aurelius"
        fill
        preload
        sizes="(max-width: 760px) 100vw, 46vw"
        className="object-cover object-[50%_45%] grayscale-[0.3] contrast-[1.05]"
      />
    </motion.div>
  );
}
