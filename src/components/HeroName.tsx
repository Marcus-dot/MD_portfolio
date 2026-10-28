"use client";

import { useRef, useState } from "react";

/* The hero name. Hover (or tap) the first name and its letters lift one by
   one while what it means writes in underneath. */
export default function HeroName() {
  const [open, setOpen] = useState(false);
  const viaMouse = useRef(false);

  return (
    <>
      <h1 className="m-0 text-[clamp(56px,11.5vw,164px)] font-bold uppercase leading-[0.92] tracking-[-0.045em]">
        <span className="line-wrap">
          <span className="line-in" style={{ animationDelay: "0.1s" }}>
            <button
              type="button"
              aria-expanded={open}
              aria-controls="name-gloss"
              data-cursor="MEANING"
              onPointerEnter={(e) => {
                viaMouse.current = e.pointerType === "mouse";
                if (viaMouse.current) setOpen(true);
              }}
              onPointerLeave={(e) => e.pointerType === "mouse" && setOpen(false)}
              onClick={() => setOpen((o) => (viaMouse.current ? true : !o))}
              onFocus={() => setOpen(true)}
              onBlur={() => setOpen(false)}
              className="relative cursor-help border-0 bg-transparent p-0 text-left uppercase text-inherit [font:inherit] [letter-spacing:inherit]"
            >
              {"Madalitso".split("").map((ch, i) => (
                <span
                  key={i}
                  className="inline-block transition-[transform,color] duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)] motion-reduce:transition-none"
                  style={{
                    transform: open ? "translateY(-0.05em)" : "none",
                    color: open ? "var(--color-accent)" : undefined,
                    transitionDelay: `${(open ? i : 8 - i) * 35}ms`,
                  }}
                >
                  {ch}
                </span>
              ))}
              <span
                aria-hidden
                className="absolute bottom-[0.02em] left-0 h-[2px] bg-accent transition-[width] duration-700 ease-out motion-reduce:transition-none"
                style={{ width: open ? "100%" : "0%" }}
              />
            </button>
          </span>
        </span>
        <span className="line-wrap">
          <span className="line-in" style={{ animationDelay: "0.24s" }}>
            Daka
            <em className="font-serif font-normal italic normal-case tracking-[-0.02em] text-accent">
              .
            </em>
          </span>
        </span>
      </h1>
      {/* height is reserved so the gloss never pushes the page around */}
      <p
        id="name-gloss"
        className="m-0 mt-4 flex min-h-[38px] flex-wrap items-baseline gap-x-4 gap-y-1 max-[639px]:gap-x-3 transition-[clip-path] duration-700 ease-out motion-reduce:transition-none print:hidden"
        style={{ clipPath: open ? "inset(0 0 0 0)" : "inset(0 100% 0 0)" }}
      >
        <span className="font-mono text-[11px] tracking-[0.2em] text-faint max-[639px]:tracking-[0.14em]">
          <span className="max-[639px]:hidden">MADALITSO · </span>NYANJA
        </span>
        <em className="font-serif text-[clamp(26px,3vw,38px)] italic text-text">blessings</em>
        <span className="font-mono text-[11px] tracking-[0.2em] text-faint max-[639px]:tracking-[0.14em]">· GOES BY MARCUS</span>
      </p>
    </>
  );
}
