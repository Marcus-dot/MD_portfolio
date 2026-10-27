import type { Metadata } from "next";
import Link from "next/link";
import { CONFIG } from "@/content/config";
import { CV_UPDATED, EXPERIENCE, FIGURES, PROJECTS, SUMMARY } from "@/content/cv";
import { EDUCATION, STACK } from "@/content/stack";
import CvRail, { SavePdfButton } from "@/components/cv/CvRail";
import CvTimeline from "@/components/cv/CvTimeline";
import CvTrace, { SectionHead } from "@/components/cv/CvTrace";
import Grain from "@/components/Grain";
import LusakaClock from "@/components/LusakaClock";
import Reveal from "@/components/Reveal";
import Toast from "@/components/Toast";
import TypedLine from "@/components/TypedLine";
import { MEDITATIONS } from "@/content/meditations";
import SectionStatue from "@/components/statue/SectionStatue";
import { STATUES } from "@/content/statues";

export const metadata: Metadata = {
  title: "CV - Madalitso Daka",
  description: SUMMARY,
  alternates: { canonical: "/cv" },
};

const LINKS: [string, string][] = [
  [CONFIG.email, `mailto:${CONFIG.email}`],
  ["GitHub ↗", CONFIG.links.github],
  ["LinkedIn ↗", CONFIG.links.linkedin],
];

export default function CvPage() {
  return (
    <div className="min-h-dvh">
      <Grain />
      <Toast />

      <header className="flex items-center justify-between px-page pt-8 print:hidden">
        <Link
          href="/"
          className="text-[14px] font-bold tracking-[-0.02em] text-text no-underline"
        >
          MD<span className="text-accent">.</span>
        </Link>
        <Link
          href="/"
          className="font-mono text-[11px] tracking-[0.12em] text-dim no-underline transition-colors hover:text-accent pointer-coarse:py-3"
        >
          ← PORTFOLIO
        </Link>
      </header>

      <div className="px-page pt-[clamp(60px,12vh,140px)] pb-[clamp(80px,12vh,140px)] print:p-0">
        {/* masthead */}
        <div className="relative">
        <SectionStatue
          statue={STATUES.homer}
          className="!absolute right-0 bottom-[70px] h-[clamp(260px,28vw,400px)] w-[clamp(220px,24vw,340px)] max-[1023px]:opacity-40 max-[639px]:!top-[110px] max-[639px]:!bottom-auto"
        />
        <TypedLine line={MEDITATIONS.cv} className="relative z-[1] mb-12 max-w-[440px] print:hidden" />
        <Reveal>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] tracking-[0.2em] text-faint">
            <span>CURRICULUM VITAE · UPDATED {CV_UPDATED.toUpperCase()}</span>
            <span className="print:hidden">
              <LusakaClock />
            </span>
          </div>
          <h1 className="mt-6 mb-0 text-[clamp(52px,10vw,148px)] font-semibold leading-[0.92] tracking-[-0.05em] uppercase">
            Madalitso
            <br />
            Daka<span className="text-accent">.</span>
          </h1>
          <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
            <p className="m-0 font-serif text-[clamp(22px,2.8vw,32px)] italic text-dim">
              Software Engineer, Lusaka.
            </p>
            <div className="flex flex-wrap gap-2.5">
              {LINKS.map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  {...(href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="rounded-[3px] border border-line px-4 py-2 font-mono text-[11.5px] text-text no-underline transition-colors hover:border-line-hover"
                >
                  {label}
                </a>
              ))}
              <SavePdfButton className="min-[1024px]:hidden print:hidden" />
            </div>
          </div>
        </Reveal>
        </div>

        <div className="mt-[clamp(70px,12vh,130px)] grid print:mt-6 print:block gap-x-16 min-[1024px]:grid-cols-[200px_minmax(0,1fr)]">
          <aside>
            <CvRail />
          </aside>

          <main className="flex min-w-0 flex-col gap-[clamp(90px,14vh,150px)] print:block print:[&>section]:mt-8">
            <section id="profile" className="scroll-mt-10">
              <SectionHead n="01" title="Profile" />
              <Reveal>
                <p className="m-0 max-w-[820px] text-[clamp(17px,1.9vw,21px)] leading-[1.7] text-text">
                  {SUMMARY}
                </p>
              </Reveal>
              <div className="mt-14 grid grid-cols-[repeat(auto-fit,minmax(170px,1fr))] gap-[18px] print:mt-5 print:grid-cols-4">
                {FIGURES.map((f, i) => (
                  <Reveal key={f.l} delay={i * 0.08}>
                    <div className="border-t border-line pt-5">
                      <div className="font-serif text-[clamp(48px,6vw,72px)] leading-none italic">
                        {f.n}
                      </div>
                      <div className="mt-3 text-[12.5px] tracking-[0.08em] text-dim uppercase">
                        {f.l}
                      </div>
                      <div className="mt-1 font-mono text-[10.5px] text-faint">{f.src}</div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </section>

            <section id="experience" className="scroll-mt-10">
              <SectionHead n="02" title="Experience" />
              <CvTimeline roles={EXPERIENCE} />
            </section>

            <CvTrace stack={STACK} projects={PROJECTS} />

            <section id="education" className="scroll-mt-10">
              <SectionHead n="05" title="Education" />
              <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-[18px]">
                {EDUCATION.map((e, i) => (
                  <Reveal key={e.degree} delay={i * 0.08} className="h-full">
                    <div className="h-full rounded-[4px] border border-line bg-surface px-7 py-[30px]">
                      <div className="font-mono text-[11px] tracking-[0.1em] text-accent uppercase">
                        {e.detail}
                      </div>
                      <div className="mt-4 text-[20px] font-semibold tracking-[-0.02em]">
                        {e.degree}
                      </div>
                      <div className="mt-1.5 font-serif text-[17px] italic text-dim">
                        {e.school}
                      </div>
                      {e.thesis && (
                        <p className="mt-4 mb-0 text-[14px] leading-[1.65] text-dim">{e.thesis}</p>
                      )}
                    </div>
                  </Reveal>
                ))}
              </div>
              <p className="mt-10 mb-0 font-mono text-[11px] tracking-[0.1em] text-faint">
                LANGUAGES · ENGLISH, FLUENT (WRITTEN AND SPOKEN)
              </p>
            </section>
          </main>
        </div>

        <div className="mt-[clamp(90px,14vh,150px)] flex flex-wrap items-center justify-between gap-6 border-t border-line pt-10 print:hidden">
          <a
            href={`mailto:${CONFIG.email}`}
            className="inline-block rounded-[3px] bg-text px-7 py-3.5 text-[14px] font-semibold text-bg no-underline"
          >
            Building something that has to be right? →
          </a>
          <Link
            href="/#work"
            className="font-mono text-[12px] text-dim no-underline transition-colors hover:text-accent"
          >
            See the work in depth
          </Link>
        </div>
      </div>
    </div>
  );
}
