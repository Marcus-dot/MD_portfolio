"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/* Wheel and trackpad scrolling eased slightly, so the scroll-linked pieces
   (typing, signature, ledger, ruler) move as one. Mouse users only: touch
   keeps the phone's own scrolling, and reduced motion keeps the browser's. */
export default function SmoothScroll() {
  useEffect(() => {
    if (!matchMedia("(pointer: fine)").matches) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.12, anchors: { offset: -20 }, smoothWheel: true });
    let raf = requestAnimationFrame(function loop(t) {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    });
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);
  return null;
}
