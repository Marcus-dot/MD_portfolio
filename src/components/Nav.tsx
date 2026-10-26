import Link from "next/link";
import PaletteTrigger from "./PaletteTrigger";

const LINKS = ["Work", "Skills", "Method", "Contact"];

const link =
  "font-mono text-[11px] tracking-[0.14em] whitespace-nowrap text-dim uppercase no-underline transition-colors duration-300 hover:text-text";

/* Wayfinding, not a widget: a flat bar with numbered mono links, the way a
   museum signs its rooms. Solid ground and a hairline, no glass. */
export default function Nav() {
  return (
    <header>
      <nav
        aria-label="Primary"
        className="fixed inset-x-0 top-0 z-20 flex h-[60px] items-center justify-between gap-6 border-b border-line bg-bg/92 px-page"
      >
        <span className="text-[15px] font-bold tracking-[-0.02em] whitespace-nowrap">
          MD<span className="text-accent">.</span>
        </span>
        <span className="hidden items-center gap-7 min-[861px]:flex">
          {LINKS.map((n, i) => (
            <a key={n} href={`#${n.toLowerCase()}`} className={link}>
              <span className="mr-1.5 text-faint">0{i + 1}</span>
              {n}
            </a>
          ))}
          <span aria-hidden className="h-3 w-px bg-line" />
          <Link href="/cv" className={link}>
            CV
          </Link>
          <Link href="/cast-room" className={link}>
            Casts
          </Link>
        </span>
        <span className="flex items-center gap-5">
          <PaletteTrigger />
          <a
            href="#contact"
            className="border-b border-accent pb-0.5 font-mono text-[11px] tracking-[0.14em] whitespace-nowrap text-text uppercase no-underline transition-colors hover:text-accent pointer-coarse:py-3"
          >
            Let&apos;s talk →
          </a>
        </span>
      </nav>
    </header>
  );
}
