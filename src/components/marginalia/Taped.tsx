import Image from "next/image";
import type { CSSProperties } from "react";

/* A process photo taped into the margin: square-cornered print, two strips
   of tape, a handwritten caption. Hidden unless Marginalia is on. */
export default function Taped({
  src,
  w,
  h,
  alt,
  caption,
  rotate = 2,
  className = "",
  style,
}: {
  src: string;
  w: number;
  h: number;
  alt: string;
  caption: string[];
  rotate?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <figure
      className={`mg mg-float relative z-[6] m-0 ${className}`}
      style={{ transform: `rotate(${rotate}deg)`, ...style }}
    >
      <div className="relative bg-text p-2 pb-2">
        <Image src={src} width={w} height={h} alt={alt} className="block h-auto w-full" />
        {/* tape */}
        <span aria-hidden className="absolute -top-3 left-6 h-6 w-16 -rotate-6 bg-[rgba(242,244,236,0.28)]" />
        <span aria-hidden className="absolute -top-3 right-6 h-6 w-16 rotate-3 bg-[rgba(242,244,236,0.28)]" />
      </div>
      <figcaption className="mg-note mt-3" style={{ fontSize: 19 }}>
        {caption.map((c, i) => (
          <span key={i} className="mg-line" style={{ "--d": `${0.3 + i * 0.7}s`, "--t": "0.7s" } as CSSProperties}>
            {c}
          </span>
        ))}
      </figcaption>
    </figure>
  );
}
