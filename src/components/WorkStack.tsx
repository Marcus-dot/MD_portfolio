"use client";

import { useState } from "react";
import { STORIES, type Story } from "@/content/stories";

function HoverPreview({
  item,
  pos,
}: {
  item: Story | null;
  pos: { x: number; y: number };
}) {
  if (!item) return null;
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed z-30 w-[250px] overflow-hidden rounded-[18px] border border-line-hover bg-[linear-gradient(150deg,var(--musgo),var(--bg))] shadow-[0_30px_70px_-20px_rgba(0,0,0,0.85)] [animation:fadeUp_.3s_var(--ease)_both]"
      style={{ left: pos.x + 24, top: pos.y - 90 }}
    >
      <div className="p-[18px_18px_14px]">
        <div className="font-mono text-[10px] tracking-[0.16em] text-accent">
          {item.badge.toUpperCase()}
        </div>
        <div className="mt-2 font-serif text-[30px] leading-[1.05] italic">
          {item.s}
        </div>
        <div className="mt-1.5 text-[11.5px] text-dim">{item.scale}</div>
      </div>
      <div className="h-[5px] bg-[linear-gradient(90deg,var(--musgo),var(--accent))]" />
    </div>
  );
}

export default function WorkStack() {
  const [preview, setPreview] = useState<Story | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const desktop = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: fine)").matches;

  return (
    <div className="mt-[100px]">
      <HoverPreview item={preview} pos={pos} />
      <div className="mb-[30px] flex flex-wrap items-baseline justify-between gap-3">
        <h3 className="m-0 text-[clamp(28px,4vw,48px)] font-semibold tracking-[-0.03em]">
          Client work,{" "}
          <em className="font-serif font-normal italic text-dim">
            credible outlines.
          </em>
        </h3>
        <span className="font-mono text-[11px] text-faint">
          {"// scroll — cards stack"}
        </span>
      </div>
      {STORIES.map((s, i) => (
        <article
          key={s.n}
          data-cursor={s.badge === "Under NDA" ? "NDA" : "VIEW"}
          onMouseEnter={() => desktop() && setPreview(s)}
          onMouseLeave={() => setPreview(null)}
          onMouseMove={(e) => setPos({ x: e.clientX, y: e.clientY })}
          className="sticky mb-[26px] flex flex-wrap items-baseline gap-7 rounded-[26px] border border-line bg-[linear-gradient(150deg,#131713,var(--bg))] p-[clamp(28px,4vw,48px)] shadow-[0_-20px_50px_-30px_rgba(0,0,0,0.9)]"
          style={{ top: `calc(90px + ${i * 26}px)` }}
        >
          <span
            aria-hidden
            className="w-[100px] font-serif text-[clamp(48px,7vw,92px)] leading-none italic text-[rgba(155,201,126,0.28)]"
          >
            {s.n}
          </span>
          <div className="flex-[1_1_220px]">
            <div className="text-[clamp(24px,3vw,34px)] font-semibold tracking-[-0.025em]">
              {s.s}
            </div>
            <div className="mt-2 font-mono text-[11px] tracking-[0.1em] text-faint uppercase">
              {s.scale}
            </div>
          </div>
          <p className="m-0 flex-[2_1_340px] text-[15.5px] leading-[1.75] text-dim">
            {s.d}
          </p>
          <span
            className={`self-start rounded-full border border-line px-3.5 py-1.5 font-mono text-[11px] ${
              s.badge === "Under NDA" ? "text-dim" : "text-accent"
            }`}
          >
            {s.badge}
          </span>
          <a
            href={`/work/${s.slug}`}
            className="w-full pt-1 text-right font-mono text-[11px] tracking-[0.08em] text-accent no-underline"
          >
            CASE OUTLINE →
          </a>
        </article>
      ))}
    </div>
  );
}
