"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import type { CvProject } from "@/content/cv";
import type { StackGroup } from "@/content/stack";
import Reveal from "../Reveal";

const EASE = [0.16, 1, 0.3, 1] as const;

/* Skills and projects share one piece of state: pick a skill and the project
   list shows where it was actually used. The claim, then the evidence. */
export default function CvTrace({
  stack,
  projects,
}: {
  stack: StackGroup[];
  projects: CvProject[];
}) {
  const [skill, setSkill] = useState<string | null>(null);
  const used = new Set(projects.flatMap((p) => p.stack));
  const hits = skill ? projects.filter((p) => p.stack.includes(skill)) : projects;

  useEffect(() => {
    if (!skill) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSkill(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [skill]);

  const pick = (s: string) => setSkill((cur) => (cur === s ? null : s));

  return (
    <>
      <section id="skills" className="scroll-mt-10">
        <SectionHead n="03" title="Skills" aside="Pick one to trace it through the work" />
        <div className="flex flex-col gap-5 print:block print:[&>div]:mb-2">
          {stack.map((g) => (
            <div key={g.label} className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
              <span className="w-[130px] shrink-0 font-mono text-[10.5px] tracking-[0.12em] text-faint uppercase">
                {g.label}
              </span>
              <span className="flex flex-1 flex-wrap gap-1.5">
                {g.items.map((item) => {
                  const traceable = used.has(item);
                  const on = skill === item;
                  return traceable ? (
                    <button
                      key={item}
                      type="button"
                      aria-pressed={on}
                      onClick={() => pick(item)}
                      data-cursor="VIEW"
                      className={`cursor-pointer rounded-full border px-3 py-1 text-[12.5px] transition-colors duration-300 ${
                        on
                          ? "border-accent bg-accent text-bg"
                          : "border-line bg-transparent text-text hover:border-line-hover"
                      }`}
                    >
                      {item}
                    </button>
                  ) : (
                    <span
                      key={item}
                      className="rounded-full border border-line px-3 py-1 text-[12.5px] text-dim"
                    >
                      {item}
                    </span>
                  );
                })}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section id="projects" className="scroll-mt-10 print:mt-8">
        <SectionHead
          n="04"
          title="Selected projects"
          aside={skill ? `${hits.length} of ${projects.length} built with ${skill}` : `${projects.length} builds`}
        />
        <ul className="m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(min(100%,320px),1fr))] gap-[18px] p-0 print:block print:columns-2 print:gap-3">
          {projects.map((p) => {
            const lit = !skill || p.stack.includes(skill);
            return (
              <li
                key={p.t}
                className={`flex flex-col rounded-3xl border bg-surface px-7 py-[28px] break-inside-avoid print:mb-3 print:rounded-xl print:px-4 print:py-3 transition-[opacity,border-color,transform] duration-500 ease-(--ease) ${
                  skill && lit ? "border-line-hover" : "border-line"
                } ${lit ? "opacity-100" : "opacity-25 print:opacity-100"}`}
              >
                <h3 className="m-0 text-[18px] font-semibold tracking-[-0.02em]">{p.t}</h3>
                <p className="mt-3 mb-0 flex-1 text-[14px] leading-[1.65] text-dim">{p.d}</p>
                <div className="mt-5 flex flex-wrap gap-x-2.5 gap-y-1 font-mono text-[10.5px] tracking-[0.06em]">
                  {p.stack.map((s) => (
                    <span key={s} className={s === skill ? "text-accent" : "text-faint"}>
                      {s}
                    </span>
                  ))}
                </div>
                {p.slug && (
                  <Link
                    href={`/work/${p.slug}`}
                    className="mt-5 font-mono text-[11px] tracking-[0.08em] text-accent no-underline print:hidden"
                  >
                    CASE OUTLINE →
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      {/* floating trace status - visible wherever you are on the page */}
      <AnimatePresence>
        {skill && (
          <motion.div
            role="status"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="fixed bottom-6 left-1/2 z-40 flex -translate-x-1/2 items-center gap-4 rounded-full border border-line-hover bg-[rgba(16,18,16,0.85)] py-2 pr-2 pl-5 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9)] backdrop-blur-[20px] print:hidden"
          >
            <span className="font-mono text-[11px] tracking-[0.1em] whitespace-nowrap text-dim">
              TRACING <span className="text-accent">{skill}</span> · {hits.length}
            </span>
            <a
              href="#projects"
              className="rounded-full px-3 py-1.5 font-mono text-[11px] text-text no-underline hover:bg-white/[0.06]"
            >
              View
            </a>
            <button
              type="button"
              onClick={() => setSkill(null)}
              aria-label="Clear skill trace"
              className="cursor-pointer rounded-full border-none bg-text px-3 py-1.5 font-mono text-[11px] text-bg"
            >
              Clear
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function SectionHead({ n, title, aside }: { n: string; title: string; aside?: string }) {
  return (
    <Reveal className="mb-9 print:mb-3 break-after-avoid flex flex-wrap items-end justify-between gap-x-6 gap-y-2 border-b border-line pb-4">
      <h2 className="m-0 flex items-baseline gap-4 text-[clamp(28px,3.6vw,42px)] font-semibold tracking-[-0.03em]">
        <span className="font-serif text-[0.8em] font-normal italic text-accent">{n}</span>
        {title}
      </h2>
      {aside && (
        <span aria-live="polite" className="font-mono text-[11px] tracking-[0.1em] text-faint uppercase print:hidden">
          {aside}
        </span>
      )}
    </Reveal>
  );
}
