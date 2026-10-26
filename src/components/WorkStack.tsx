"use client";

import { useState } from "react";
import { STORIES, type Story } from "@/content/stories";
import { CASE_STATUE, CAST_ROOM } from "@/content/statues";

/* A catalogue slip: bone paper, square corners, held slightly askew,
   ruled fields like a museum index card. Names the statue that keeps
   the case outline's page (see the Cast Room). */
function HoverPreview({
  item,
  pos,
}: {
  item: Story | null;
  pos: { x: number; y: number };
}) {
  if (!item) return null;
  const keeper = CAST_ROOM.find((e) => e.key === CASE_STATUE[item.slug]);
  const rows: [string, string][] = [
    ["SCALE", item.scale],
    ["STATUS", item.badge],
    ...(keeper ? ([["KEEPER", keeper.title]] as [string, string][]) : []),
  ];
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed z-30 w-[264px] origin-top-left -rotate-[1.5deg] rounded-[2px] bg-text px-5 pt-4 pb-3 text-bg [animation:fadeUp_.3s_var(--ease)_both]"
      style={{ left: pos.x + 26, top: pos.y - 70 }}
    >
      <div className="flex items-baseline justify-between font-mono text-[9.5px] tracking-[0.16em]">
        <span>CAT. No. {item.n}</span>
        <span className="opacity-60">CASE OUTLINE</span>
      </div>
      <div className="mt-3 border-b border-bg/80 pb-3 font-serif text-[30px] leading-[1.02] italic">
        {item.s}
      </div>
      <dl className="m-0">
        {rows.map(([k, v]) => (
          <div key={k} className="flex gap-3 border-b border-bg/25 py-[7px] last:border-b-0">
            <dt className="w-[52px] shrink-0 font-mono text-[9px] leading-[1.6] tracking-[0.14em] opacity-60">{k}</dt>
            <dd className="m-0 text-[12px] leading-[1.4]">{v}</dd>
          </div>
        ))}
      </dl>
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
          Selected work,{" "}
          <em className="font-serif font-normal italic text-dim">
            credible outlines.
          </em>
        </h3>
        <span className="font-mono text-[11px] text-faint">
          {"// scroll: cards stack"}
        </span>
      </div>
      {STORIES.map((s, i) => (
        <article
          key={s.n}
          data-cursor={s.badge === "Confidential" ? "PRIVATE" : "VIEW"}
          onMouseEnter={() => desktop() && setPreview(s)}
          onMouseLeave={() => setPreview(null)}
          onMouseMove={(e) => setPos({ x: e.clientX, y: e.clientY })}
          className="sticky mb-[26px] flex [--stack-step:26px] [--stack-top:90px] max-[639px]:[--stack-step:10px] max-[639px]:[--stack-top:72px] flex-wrap items-baseline gap-7 rounded-[26px] border border-line bg-surface p-[clamp(28px,4vw,48px)]"
          style={{ top: `calc(var(--stack-top) + ${i} * var(--stack-step))` }}
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
            className={`flex items-center gap-2.5 self-start font-mono text-[11px] tracking-[0.14em] uppercase ${
              s.badge === "Confidential" ? "text-dim" : "text-accent"
            }`}
          >
            <span aria-hidden className="h-px w-4 bg-current" />
            {s.badge}
          </span>
          <a
            href={`/work/${s.slug}`}
            className="w-full pt-1 text-right font-mono pointer-coarse:py-3 text-[11px] tracking-[0.08em] text-accent no-underline"
          >
            CASE OUTLINE →
          </a>
        </article>
      ))}
    </div>
  );
}
