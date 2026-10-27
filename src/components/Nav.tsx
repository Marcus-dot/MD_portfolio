"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import ArrowLink from "./ArrowLink";
import PaletteTrigger from "./PaletteTrigger";
import MarginaliaToggle from "./marginalia/MarginaliaToggle";

const LINKS = ["Work", "Skills", "Method", "Contact"];

const item =
  "relative py-2 font-mono text-[11px] tracking-[0.12em] whitespace-nowrap uppercase no-underline transition-colors duration-300";

/* The floating glass pill, made ours: registration marks at its corners like
   a printer's proof, rooms numbered like a museum, and a hairline that slides
   under whichever room you're standing in. */
export default function Nav() {
  const [active, setActive] = useState<string | null>(null);
  const [bar, setBar] = useState<{ x: number; w: number } | null>(null);
  const rowRef = useRef<HTMLSpanElement>(null);

  // scroll spy: the room whose top has passed 40% of the viewport
  useEffect(() => {
    const ids = LINKS.map((l) => l.toLowerCase());
    let raf = 0;
    const check = () => {
      raf = 0;
      let cur: string | null = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) cur = id;
      }
      setActive(cur);
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(check);
    };
    check();
    window.addEventListener("scroll", on, { passive: true });
    return () => {
      window.removeEventListener("scroll", on);
      cancelAnimationFrame(raf);
    };
  }, []);

  // measure the active link so the hairline can slide to it
  useEffect(() => {
    const row = rowRef.current;
    const el = active ? row?.querySelector<HTMLElement>(`[data-room="${active}"]`) : null;
    setBar(el ? { x: el.offsetLeft, w: el.offsetWidth } : null);
  }, [active]);

  return (
    <header>
      <nav
        aria-label="Primary"
        className="fixed top-5 left-1/2 z-20 flex w-max max-w-[calc(100vw-32px)] -translate-x-1/2 items-center gap-1 rounded-full border border-line bg-[rgba(16,18,16,0.72)] py-[6px] pr-[6px] pl-2 backdrop-blur-[18px]"
      >
        {/* registration marks */}
        {[
          "-top-[7px] -left-[7px] border-t border-l",
          "-top-[7px] -right-[7px] border-t border-r",
          "-bottom-[7px] -left-[7px] border-b border-l",
          "-bottom-[7px] -right-[7px] border-b border-r",
        ].map((c) => (
          <span key={c} aria-hidden className={`pointer-events-none absolute h-[9px] w-[9px] border-faint ${c}`} />
        ))}

        <span className="px-3 text-[14px] font-bold tracking-[-0.02em] whitespace-nowrap">
          MD<span className="text-accent">.</span>
        </span>

        <span ref={rowRef} className="relative mx-2 hidden items-center gap-5 min-[861px]:flex">
          {LINKS.map((n, i) => {
            const id = n.toLowerCase();
            const on = active === id;
            return (
              <a
                key={n}
                href={`#${id}`}
                data-room={id}
                aria-current={on ? "location" : undefined}
                className={`${item} ${on ? "text-text" : "text-dim hover:text-text"}`}
              >
                <span className={`mr-1.5 ${on ? "text-accent" : "text-faint"}`}>0{i + 1}</span>
                {n}
              </a>
            );
          })}
          <span aria-hidden className="h-3 w-px bg-line" />
          <Link href="/cv" className={`${item} text-dim hover:text-text`}>
            CV
          </Link>
          <Link href="/cast-room" className={`${item} text-dim hover:text-text`}>
            Casts
          </Link>
          {/* you-are-here hairline */}
          <span
            aria-hidden
            className="pointer-events-none absolute bottom-[3px] left-0 h-px bg-accent transition-[transform,width,opacity] duration-500 ease-(--ease)"
            style={{
              width: bar?.w ?? 0,
              transform: `translateX(${bar?.x ?? 0}px)`,
              opacity: bar ? 1 : 0,
            }}
          />
        </span>

        <MarginaliaToggle />
        <PaletteTrigger />
        <ArrowLink
          href="#contact"
          className="ml-1 inline-flex shrink-0 items-center rounded-full bg-text px-5 py-2.5 pointer-coarse:py-3.5 text-[13px] leading-none font-semibold whitespace-nowrap text-bg no-underline"
        >
          Let&apos;s&nbsp;talk
        </ArrowLink>
      </nav>
    </header>
  );
}
