import type { CSSProperties } from "react";

/*
 * A handwritten margin note. Lines are written one after another (see
 * .mg-line in globals.css), then the arrow draws toward what the note is
 * about. Hidden unless Marginalia is on; inline and arrowless on phones.
 *
 * lines   each string is one written line
 * refs    footnote numbers into the references sheet (#ref-n)
 * arrow   an SVG path in a w x h box, positioned with arrowClass
 * size    font size in px (Caveat runs small)
 */
export default function Note({
  lines,
  refs = [],
  arrow,
  className = "",
  style,
  size = 21,
  rotate = -1.5,
  delay = 0.15,
}: {
  lines: string[];
  refs?: number[];
  arrow?: { d: string; w: number; h: number; className: string };
  className?: string;
  style?: CSSProperties;
  size?: number;
  rotate?: number;
  delay?: number;
}) {
  // each line starts when the previous one finishes writing
  const timed = lines.reduce<{ text: string; d: number; dur: number }[]>((acc, text) => {
    const prev = acc[acc.length - 1];
    const d = prev ? prev.d + prev.dur + 0.08 : delay;
    return [...acc, { text, d, dur: Math.max(0.45, text.length * 0.032) }];
  }, []);
  const last = timed[timed.length - 1];
  const t = last ? last.d + last.dur + 0.08 : delay;

  return (
    <div
      aria-hidden
      className={`mg mg-note mg-float pointer-events-none absolute z-[6] ${className}`}
      style={{ fontSize: size, transform: `rotate(${rotate}deg)`, ...style }}
    >
      {timed.map((l, i) => (
        <span
          key={i}
          className="mg-line"
          style={{ "--d": `${l.d}s`, "--t": `${l.dur}s` } as CSSProperties}
        >
          {l.text}
          {i === timed.length - 1 &&
            refs.map((r) => (
              <a key={r} href={`#ref-${r}`} className="mg-ref pointer-events-auto ml-1">
                [{r}]
              </a>
            ))}
        </span>
      ))}
      {arrow && (
        <svg
          className={`mg-arrow absolute ${arrow.className}`}
          width={arrow.w}
          height={arrow.h}
          viewBox={`0 0 ${arrow.w} ${arrow.h}`}
          style={{ "--d": `${t}s` } as CSSProperties}
        >
          <path d={arrow.d} pathLength={1} />
        </svg>
      )}
    </div>
  );
}
