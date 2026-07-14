import { CONFIG } from "@/content/config";
import LusakaClock from "./LusakaClock";
import Magnetic from "./Magnetic";
import Reveal from "./Reveal";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative z-[3] -mt-10 overflow-hidden rounded-t-[40px] bg-musgo px-page pt-[clamp(100px,16vh,180px)] pb-10"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-[40%] left-1/2 h-[60vh] w-[80vw] -translate-x-1/2 bg-[radial-gradient(ellipse,rgba(40,53,38,0.9),transparent_65%)]"
      />
      <Reveal>
      <div className="relative text-center">
        <div className="mb-7 flex items-center justify-center gap-2.5 font-mono text-[12px] tracking-[0.2em] text-dim">
          <span
            aria-hidden
            className="inline-block h-[7px] w-[7px] rounded-full bg-accent"
          />
          OPEN FOR SELECT ENGAGEMENTS
        </div>
        <h2 className="m-0 text-[clamp(44px,9vw,120px)] font-semibold leading-[0.98] tracking-[-0.045em]">
          Building something
          <br />
          that has to be{" "}
          <em className="font-serif font-normal italic text-accent">right?</em>
        </h2>
        <Magnetic
          href={`mailto:${CONFIG.email}`}
          data-cursor="SAY HI"
          className="mt-12 inline-block rounded-full bg-text px-11 py-5 text-[16px] font-semibold text-bg no-underline"
        >
          {CONFIG.email} →
        </Magnetic>
        <div className="mt-[22px] font-mono text-[12px] text-dim print:hidden">
          or press <kbd>⌘K</kbd> anywhere
        </div>
        {/* print-only contact line - the CTA button above is interactive-only */}
        <div className="hidden font-mono text-[13px] text-text print:block">
          {CONFIG.email} · github.com/Marcus-dot ·
          linkedin.com/in/madalitso-daka-52912b248
        </div>
      </div>
      </Reveal>
      <div className="relative mt-[60px] flex justify-center gap-6 font-mono text-[12px]">
        <a
          href={CONFIG.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-dim no-underline transition-colors hover:text-accent"
        >
          GitHub ↗
        </a>
        <a
          href={CONFIG.links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-dim no-underline transition-colors hover:text-accent"
        >
          LinkedIn ↗
        </a>
      </div>
      <div className="relative mt-[60px] flex flex-wrap items-center justify-between gap-3 text-[12.5px] text-dim">
        <span>© 2026 Madalitso Daka · Lusaka, Zambia</span>
        <span className="font-mono text-[11px]">
          NOW: engineering at Gralix Technologies · shipping event tech
        </span>
        <LusakaClock />
        <a
          href="#hero"
          aria-label="Back to top"
          data-cursor="TOP"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-[15px] text-dim no-underline"
        >
          ↑
        </a>
      </div>
    </footer>
  );
}
