"use client";

import { useEffect, useState } from "react";
import { CONFIG } from "@/content/config";
import { toast } from "../Toast";

export const CV_SECTIONS = [
  ["profile", "Profile"],
  ["experience", "Experience"],
  ["skills", "Skills"],
  ["projects", "Projects"],
  ["education", "Education"],
] as const;

/* The rail is desktop-only, so small screens get the PDF action in the masthead. */
export function SavePdfButton({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className={`cursor-pointer rounded-[3px] bg-text px-4 py-2 font-mono text-[11.5px] text-bg ${className}`}
    >
      Save as PDF
    </button>
  );
}

/* Sticky index for the CV page: scroll-spy on the five sections, plus the
   two things people actually come to a CV for - a copy and a way to reach me. */
export default function CvRail() {
  const [active, setActive] = useState<string>("profile");

  useEffect(() => {
    const els = CV_SECTIONS.map(([id]) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-35% 0px -60% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const copyEmail = () => {
    navigator.clipboard?.writeText(CONFIG.email);
    toast("EMAIL COPIED");
  };

  return (
    <nav
      aria-label="CV sections"
      className="sticky top-10 hidden flex-col gap-10 min-[1024px]:flex print:hidden"
    >
      <ol className="m-0 flex list-none flex-col gap-1 p-0">
        {CV_SECTIONS.map(([id, label], i) => {
          const on = active === id;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={on ? "true" : undefined}
                className={`group flex items-center gap-3 py-1.5 font-mono text-[11px] tracking-[0.14em] uppercase no-underline transition-colors duration-300 ${
                  on ? "text-text" : "text-faint hover:text-dim"
                }`}
              >
                <span
                  aria-hidden
                  className={`block h-px transition-all duration-500 ease-(--ease) ${
                    on ? "w-8 bg-accent" : "w-3 bg-faint group-hover:w-5"
                  }`}
                />
                <span className={on ? "text-accent" : ""}>0{i + 1}</span>
                {label}
              </a>
            </li>
          );
        })}
      </ol>

      <div className="flex flex-col items-start gap-3">
        <button
          type="button"
          onClick={() => window.print()}
          data-cursor="GO"
          className="cursor-pointer rounded-[3px] bg-text px-5 py-2.5 text-[13px] font-semibold text-bg"
        >
          Save as PDF
        </button>
        <button
          type="button"
          onClick={copyEmail}
          className="cursor-pointer border-none bg-transparent p-0 font-mono text-[11px] tracking-[0.08em] text-dim transition-colors hover:text-accent"
        >
          Copy email
        </button>
      </div>
    </nav>
  );
}
