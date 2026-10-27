import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Syne } from "next/font/google";
import Grain from "@/components/Grain";
import Reveal from "@/components/Reveal";
import TypedLine from "@/components/TypedLine";
import SectionStatue from "@/components/statue/SectionStatue";
import HonestScore from "@/components/dashly/HonestScore";
import CommitStrip from "@/components/dashly/CommitStrip";
import { CONFIG } from "@/content/config";
import { MEDITATIONS } from "@/content/meditations";
import { STATUES } from "@/content/statues";
import { STORIES } from "@/content/stories";
import { DASHLY_SCREENS } from "@/content/dashly-screens";
import LEDGER from "@/content/dashly-ledger.json";

// Dashly's own display face, loaded only in its room
const syne = Syne({ variable: "--font-syne", subsets: ["latin"], weight: ["600", "700"] });

export const metadata: Metadata = {
  title: "Dashly - Madalitso Daka",
  description:
    "Dashly: project-portfolio management for emerging markets, built around one auditable health score per project. In production at dashlyhq.com.",
  alternates: { canonical: "/dashly" },
};

const n = (v: number) => v.toLocaleString("en-GB");
const day = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

const story = STORIES.find((s) => s.slug === "dashly")!;

function Room({ n: num, title, aside, children }: { n: string; title: React.ReactNode; aside?: string; children: React.ReactNode }) {
  return (
    <section className="scroll-mt-24 border-t border-line pt-10">
      <div className="mb-[clamp(36px,6vh,60px)] flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
        <h2 className="m-0 flex items-baseline gap-4 font-[family-name:var(--font-syne)] text-[clamp(30px,4.2vw,54px)] leading-[1.02] font-bold tracking-[-0.02em]">
          <span className="font-mono text-[12px] font-normal tracking-[0.16em] text-[#A56ABD]">{num}</span>
          <span>{title}</span>
        </h2>
        {aside && <span className="font-mono text-[10.5px] tracking-[0.14em] text-faint uppercase">{aside}</span>}
      </div>
      {children}
    </section>
  );
}

export default function DashlyRoom() {
  const stats: [string, string][] = [
    [n(LEDGER.commits), "commits on main"],
    [n(LEDGER.sourceLines), "lines of TypeScript"],
    [n(LEDGER.testCases), "automated tests"],
    [String(LEDGER.migrations), "database migrations"],
    [String(LEDGER.calculators), "industry calculators"],
  ];

  const colophon: [string, string][] = [
    ["ROLE", "Co-founder, engineering"],
    ["COMPANY", "Dashly Software, Zambia"],
    ["FIRST COMMIT", day(LEDGER.firstCommit)],
    ["STATUS", "In production"],
    ["STACK", "Next.js · Supabase · Claude"],
  ];

  return (
    <div className={`${syne.variable} min-h-dvh`}>
      <Grain />
      <header className="flex items-center justify-between px-page pt-8">
        <Link href="/" className="text-[14px] font-bold tracking-[-0.02em] text-text no-underline">
          MD<span className="text-accent">.</span>
        </Link>
        <Link
          href="/#work"
          className="font-mono text-[11px] tracking-[0.12em] text-dim no-underline transition-colors hover:text-accent pointer-coarse:py-3"
        >
          ← ALL WORK
        </Link>
      </header>

      <main className="px-page pt-[clamp(60px,11vh,130px)] pb-[clamp(80px,12vh,140px)]">
        {/* entrance */}
        <div className="relative">
          <SectionStatue
            statue={STATUES.zeus}
            className="!absolute right-0 bottom-0 h-[clamp(280px,30vw,440px)] w-[clamp(220px,24vw,340px)] max-[1023px]:opacity-40 max-[639px]:!top-[190px] max-[639px]:!bottom-auto max-[639px]:opacity-30"
          />
          <TypedLine line={MEDITATIONS.dashly} className="relative z-[1] mb-12 max-w-[460px]" />
          <div className="relative z-[1] font-mono text-[11px] tracking-[0.2em] text-faint">
            THE DASHLY ROOM · IN PRODUCTION
          </div>
          <h1 className="relative z-[1] mt-5 mb-0 font-[family-name:var(--font-syne)] text-[clamp(64px,13vw,190px)] leading-[0.88] font-bold tracking-[-0.03em]">
            Dashly<span className="text-[#A56ABD]">.</span>
          </h1>
          <p className="relative z-[1] mt-8 mb-0 font-[family-name:var(--font-syne)] text-[clamp(22px,3vw,36px)] leading-[1.15] font-semibold">
            Every project. One honest <span className="text-[#A56ABD]">score.</span>
          </p>
          <div className="relative z-[1] mt-3 font-mono text-[10px] tracking-[0.16em] text-faint">DASHLY&apos;S TAGLINE</div>
          <p className="relative z-[1] mt-10 mb-0 max-w-[640px] text-[clamp(16px,1.6vw,18.5px)] leading-[1.75] text-dim">
            {story.case.intro}
          </p>
          <a
            href={CONFIG.links.dashly}
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-[1] mt-8 inline-block border-b border-[#A56ABD] pb-0.5 font-mono text-[12px] tracking-[0.12em] text-text no-underline transition-colors hover:text-[#A56ABD] pointer-coarse:py-3"
          >
            DASHLYHQ.COM ↗
          </a>
        </div>

        {/* colophon: the facts, stated once, like a label beside the work */}
        <Reveal>
          <dl className="m-0 mt-[clamp(70px,12vh,130px)] grid grid-cols-2 border-t border-line min-[760px]:grid-cols-5">
            {colophon.map(([k, v]) => (
              <div key={k} className="border-b border-line py-5 pr-4 min-[760px]:border-b-0">
                <dt className="font-mono text-[10px] tracking-[0.16em] text-faint">{k}</dt>
                <dd className="m-0 mt-2 text-[14.5px] leading-[1.5] text-text">{v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <div className="mt-[clamp(90px,14vh,150px)] flex flex-col gap-[clamp(90px,14vh,150px)]">
          <Room n="01" title={<>One honest score<span className="text-[#A56ABD]">.</span></>} aside="Try it: move the sliders">
            <p className="mt-0 mb-12 max-w-[680px] text-[16px] leading-[1.75] text-dim">
              Dashly Sense grades every project across five dimensions with fixed weights, and
              recomputes the score each time it is read. The score is arithmetic, so it can be
              audited. The AI never grades: Claude reads the score and writes three recommendations,
              forced through a single tool and validated before anything is shown.
            </p>
            <HonestScore />
          </Room>

          <Room n="02" title={<>The ledger<span className="text-[#A56ABD]">.</span></>} aside={`The codebase, counted ${day(LEDGER.countedOn)}`}>
            <dl className="m-0 grid grid-cols-2 gap-x-6 gap-y-10 min-[760px]:grid-cols-3 min-[1100px]:grid-cols-5">
              {stats.map(([v, l]) => (
                <div key={l} className="border-t border-line pt-4">
                  <dt className="sr-only">{l}</dt>
                  <dd className="m-0 font-[family-name:var(--font-syne)] text-[clamp(30px,3.4vw,46px)] leading-none font-bold tabular-nums">{v}</dd>
                  <dd className="m-0 mt-2 font-mono text-[10.5px] tracking-[0.1em] text-dim uppercase">{l}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-16">
              <CommitStrip />
            </div>
            <p className="mt-8 mb-0 max-w-[620px] font-mono text-[10.5px] leading-[1.8] tracking-[0.04em] text-faint">
              The repository is private; a script counts these figures from it, and only the
              figures are published.
            </p>
          </Room>

          <Room n="03" title={<>Inside the build<span className="text-[#A56ABD]">.</span></>}>
            <ul className="m-0 grid list-none gap-x-[clamp(32px,5vw,80px)] gap-y-6 p-0 min-[900px]:grid-cols-2">
              {story.case.did.map((d) => (
                <li key={d} className="flex gap-4 border-t border-line pt-5 text-[15px] leading-[1.7] text-dim">
                  <span aria-hidden className="mt-[12px] h-px w-4 shrink-0 bg-[#A56ABD]" />
                  {d}
                </li>
              ))}
            </ul>
            {story.case.tech && (
              <div className="mt-10 font-mono text-[12px] tracking-[0.06em] text-[#A56ABD]">{story.case.tech}</div>
            )}
          </Room>

          {DASHLY_SCREENS.length > 0 && (
            <Room n="04" title={<>In production<span className="text-[#A56ABD]">.</span></>} aside="Inside the app, and on dashlyhq.com">
              <div className="grid gap-x-8 gap-y-14 min-[900px]:grid-cols-2">
                {DASHLY_SCREENS.map((s, i) => (
                  <figure key={s.src} className={`m-0 ${i === 0 ? "min-[900px]:col-span-2" : ""}`}>
                    <div className="overflow-hidden rounded-[10px] border border-line">
                      <Image src={s.src} width={s.w} height={s.h} alt={s.alt} sizes="(max-width: 900px) 100vw, 60vw" className="block h-auto w-full" />
                    </div>
                    <figcaption className="mt-3 font-mono text-[10.5px] tracking-[0.1em] text-faint uppercase">{s.caption}</figcaption>
                  </figure>
                ))}
              </div>
            </Room>
          )}
        </div>

        <div className="mt-[clamp(90px,14vh,150px)] flex flex-wrap items-center justify-between gap-6 border-t border-line pt-10">
          <a
            href={`mailto:${CONFIG.email}`}
            className="inline-block rounded-full bg-text px-7 py-3.5 text-[14px] font-semibold text-bg no-underline"
          >
            Talk about Dashly →
          </a>
          <Link href="/#work" className="font-mono text-[12px] text-dim no-underline transition-colors hover:text-accent">
            More work
          </Link>
        </div>
      </main>
    </div>
  );
}
