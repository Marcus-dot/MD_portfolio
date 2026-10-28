import Link from "next/link";
import { CONFIG } from "@/content/config";
import LusakaClock from "./LusakaClock";
import ArrowLink from "./ArrowLink";
import Reveal from "./Reveal";
import SectionStatue from "./statue/SectionStatue";
import { STATUES } from "@/content/statues";

export default function Footer() {
  return (
    <footer
      id="contact"
      data-anno="<footer #contact> · a sheet pulled 40px over the section above"
      className="relative z-[3] -mt-10 overflow-hidden bg-musgo px-page pt-[clamp(100px,16vh,180px)] pb-10"
    >
      {/* the athlete a breath before the throw, beside the ask */}
      <SectionStatue
        statue={STATUES.discobolus}
        className="!absolute bottom-[150px] left-[clamp(20px,4vw,70px)] h-[clamp(220px,25vw,380px)] w-[clamp(180px,19vw,290px)] max-[1199px]:opacity-40 max-[639px]:!top-10 max-[639px]:!bottom-auto max-[639px]:!opacity-25 max-[639px]:!left-[-10px] max-[639px]:!right-auto"
      />
      <Reveal>
      <div className="relative text-center">
        <div className="mb-7 font-mono text-[12px] tracking-[0.2em] text-dim">
          OPEN TO SELECT ENGAGEMENTS
        </div>
        <h2 className="m-0 text-[clamp(44px,9vw,120px)] font-semibold leading-[0.98] tracking-[-0.045em]">
          Building something
          <br />
          that has to be{" "}
          <em className="font-serif font-normal italic text-accent">right?</em>
        </h2>
        <ArrowLink
          href={`mailto:${CONFIG.email}`}
          data-cursor="SAY HI"
          className="mt-12 inline-block rounded-[3px] bg-text px-11 py-5 text-[16px] font-semibold text-bg no-underline"
        >
          {`${CONFIG.email} →`}
        </ArrowLink>
        <div className="mt-[22px] font-mono text-[12px] text-dim pointer-coarse:hidden print:hidden">
          or press <kbd>⌘K</kbd> anywhere
        </div>
        {/* print-only contact line - the CTA button above is interactive-only */}
        <div className="hidden font-mono text-[13px] text-text print:block">
          {CONFIG.email} · github.com/Marcus-dot ·
          linkedin.com/in/madalitso-daka-52912b248
        </div>
      </div>
      </Reveal>
      <div className="relative mt-[60px] flex flex-wrap justify-center gap-x-6 gap-y-1 font-mono text-[12px]">
        <a
          href={CONFIG.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-dim no-underline transition-colors hover:text-accent pointer-coarse:py-3"
        >
          GitHub ↗
        </a>
        <a
          href={CONFIG.links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-dim no-underline transition-colors hover:text-accent pointer-coarse:py-3"
        >
          LinkedIn ↗
        </a>
        <Link
          href="/cv"
          className="text-dim no-underline transition-colors hover:text-accent pointer-coarse:py-3"
        >
          CV →
        </Link>
        <Link
          href="/cast-room"
          className="text-dim no-underline transition-colors hover:text-accent pointer-coarse:py-3"
        >
          Cast Room →
        </Link>
        <Link
          href="/credits"
          className="text-dim no-underline transition-colors hover:text-accent pointer-coarse:py-3"
        >
          Credits →
        </Link>
        <Link
          href="/credits#privacy"
          className="text-dim no-underline transition-colors hover:text-accent pointer-coarse:py-3"
        >
          Privacy →
        </Link>
      </div>
      <div className="relative mt-[60px] flex flex-wrap items-center justify-between gap-3 text-[12.5px] text-dim">
        <span>© 2026 Madalitso Daka · Lusaka, Zambia</span>
        <span className="font-mono text-[11px]">
          NOW: engineering at Gralix Technologies · co-founder of Dashly
        </span>
        <LusakaClock />
        <a
          href="#hero"
          aria-label="Back to top"
          data-cursor="TOP"
          className="flex h-10 w-10 items-center justify-center rounded-[3px] border border-line text-[15px] text-dim no-underline"
        >
          ↑
        </a>
      </div>
    </footer>
  );
}
