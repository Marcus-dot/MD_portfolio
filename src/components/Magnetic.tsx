"use client";

import { useRef } from "react";
import type { ComponentPropsWithoutRef } from "react";

export default function Magnetic({
  children,
  strength = 0.35,
  className = "",
  ...rest
}: ComponentPropsWithoutRef<"a"> & { strength?: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const onMove = (e: React.MouseEvent) => {
    if (
      !ref.current ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * strength;
    const y = (e.clientY - r.top - r.height / 2) * strength;
    ref.current.style.transform = `translate(${x}px,${y}px)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0,0)";
  };
  return (
    <a
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`btn ${className}`}
      {...rest}
    >
      {children}
    </a>
  );
}
