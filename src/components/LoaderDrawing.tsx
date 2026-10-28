import type { CSSProperties } from "react";
import DRAWING from "./loader-bust.json";

/* Marcus in pen, from his own scan (scripts/loader/draw.mjs), with a laurel
   branch across his head. A server component, so the line data ships as
   HTML and not in the page's JavaScript. Each stroke's start is a share of
   the loader's sitting (--at); globals.css turns it into a delay. */
const at = (v: number) => ({ "--at": v.toFixed(3) }) as CSSProperties;

export default function LoaderDrawing() {
  const bust = DRAWING.bust;
  const laurel = DRAWING.laurel;
  return (
    <svg
      viewBox="-40 -90 1080 1100"
      className="loader-drawing h-auto w-[min(340px,62vw)] max-h-[44vh]"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* the outline first, then the face and toga top to bottom */}
      <g stroke="var(--text)">
        {bust.map((s, i) => (
          <path key={i} d={s.d} pathLength={1} strokeWidth={s.w} vectorEffect="non-scaling-stroke" style={at(s.w > 1.2 ? 0 : 0.08 + (i / bust.length) * 0.55)} />
        ))}
      </g>
      {/* the laurel last, along its stem */}
      <g stroke="var(--accent)">
        {laurel.map((s, i) => (
          <path
            key={i}
            d={s.d}
            pathLength={1}
            strokeWidth={s.kind === "rib" ? 0.8 : 1.3}
            vectorEffect="non-scaling-stroke"
            className={s.kind === "leaf" ? "leaf" : undefined}
            style={at(0.62 + (i / laurel.length) * 0.3)}
          />
        ))}
      </g>
    </svg>
  );
}
