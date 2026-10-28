"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import ArrowLink from "./ArrowLink";
import Mark from "./Mark";
import PaletteTrigger from "./PaletteTrigger";
import MarginaliaToggle from "./marginalia/MarginaliaToggle";

const LINKS = ["Work", "Skills", "Method", "Contact"];
// the other rooms, for the phone directory
const PAGES = [
  { href: "/cv", label: "CV" },
  { href: "/dashly", label: "The Dashly room" },
  { href: "/cast-room", label: "The Cast Room" },
  { href: "/credits", label: "Credits & privacy" },
];

const item =
  "relative py-2 font-mono text-[11px] tracking-[0.12em] whitespace-nowrap uppercase no-underline transition-colors duration-300";

/* The floating glass pill, made ours: registration marks at its corners like
   a printer's proof, rooms numbered like a museum, and a hairline that slides
   under whichever room you're standing in. */
export default function Nav() {
  const [active, setActive] = useState<string | null>(null);
  const [bar, setBar] = useState<{ x: number; w: number } | null>(null);
  const rowRef = useRef<HTMLSpanElement>(null);
  // phones: the mark opens a floor plan of every room
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null); // the header: pill + floor plan

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onDown = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

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
    <header ref={navRef}>
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

        <a href="#hero" aria-label="Madalitso Daka, back to the top" className="group px-2.5 py-0.5 max-[860px]:hidden">
          <Mark size={27} />
        </a>
        <button
          type="button"
          aria-expanded={open}
          aria-controls="floor-plan"
          onClick={() => setOpen((o) => !o)}
          className="group flex items-center gap-2 rounded-full border-0 bg-transparent px-2.5 py-1.5 text-text min-[861px]:hidden"
        >
          <Mark size={27} />
          <span className="sr-only">Madalitso Daka, room list</span>
          <span
            aria-hidden
            className="font-mono text-[13px] font-normal text-dim transition-transform duration-300 ease-(--ease)"
            style={{ transform: open ? "rotate(45deg)" : "none" }}
          >
            +
          </span>
        </button>

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
    {/* phones: the floor plan, folded down under the pill (outside it, so
        it never sits inside the pill's backdrop blur) */}
      <div
        id="floor-plan"
        inert={!open}
        className="fixed top-[86px] left-1/2 z-20 w-[min(320px,calc(100vw-32px))] -translate-x-1/2 rounded-[14px] border border-line bg-[rgb(16,18,16)] p-5 transition-[clip-path,opacity] duration-500 ease-(--ease) min-[861px]:hidden"
        style={{ clipPath: open ? "inset(0 0 0 0 round 14px)" : "inset(0 0 100% 0 round 14px)", opacity: open ? 1 : 0 }}
      >
        <div className="mb-3 font-mono text-[10.5px] tracking-[0.2em] text-faint">FLOOR PLAN</div>
        <ul className="m-0 list-none p-0">
          {LINKS.map((n, i) => {
            const id = n.toLowerCase();
            const on = active === id;
            return (
              <li
                key={n}
                className="transition-[opacity,transform] duration-500 ease-(--ease)"
                style={{ opacity: open ? 1 : 0, transform: open ? "none" : "translateY(-6px)", transitionDelay: open ? `${80 + i * 40}ms` : "0ms" }}
              >
                <a
                  href={`#${id}`}
                  onClick={() => setOpen(false)}
                  aria-current={on ? "location" : undefined}
                  className={`flex items-baseline gap-3 border-b border-line py-3 text-[17px] font-semibold tracking-[-0.02em] no-underline ${on ? "text-text" : "text-dim"}`}
                >
                  <span className={`font-mono text-[11px] font-normal ${on ? "text-accent" : "text-faint"}`}>0{i + 1}</span>
                  {n}
                  {on && <span className="ml-auto font-mono text-[10px] font-normal tracking-[0.14em] text-accent">YOU ARE HERE</span>}
                </a>
              </li>
            );
          })}
        </ul>
        <ul className="m-0 mt-4 list-none p-0">
          {PAGES.map((pg, i) => (
            <li
              key={pg.href}
              className="transition-[opacity,transform] duration-500 ease-(--ease)"
              style={{ opacity: open ? 1 : 0, transform: open ? "none" : "translateY(-6px)", transitionDelay: open ? `${260 + i * 40}ms` : "0ms" }}
            >
              <Link
                href={pg.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between py-2.5 font-mono text-[12px] tracking-[0.1em] text-dim uppercase no-underline"
              >
                {pg.label}
                <span aria-hidden className="text-faint">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

    </header>
  );
}
