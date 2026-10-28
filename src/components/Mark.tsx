import TILES from "./mark-tiles.json";

const DARK = [20, 26, 19], BONE = [238, 240, 230];
const col = (v: number) =>
  `rgb(${DARK.map((d, i) => Math.round(d + (BONE[i] - d) * (0.38 + 0.62 * v))).join(",")})`;

/* The site's mark: Marcus in etched tiles, the same bust as the favicon
   (scripts/favicon.mjs). The green tile is the chip; inside a hover group
   it knocks loose a little, like the statues. */
export default function Mark({ size = 22, className = "" }: { size?: number; className?: string }) {
  const c = 16 / TILES.n;
  return (
    <svg
      aria-hidden
      width={size}
      height={size}
      viewBox="0 0 16 16"
      className={`block shrink-0 ${className}`}
      shapeRendering="crispEdges"
    >
      {TILES.tiles.map(([x, y, v]) =>
        v === -1 ? (
          <rect
            key={`${x}-${y}`}
            x={x * c + 0.08}
            y={y * c + 0.08}
            width={c - 0.16}
            height={c - 0.16}
            fill="var(--accent)"
            className="transition-transform duration-500 ease-(--ease) group-hover:translate-x-[1.4px] group-hover:-translate-y-[1.6px] motion-reduce:transition-none"
          />
        ) : (
          <rect key={`${x}-${y}`} x={x * c + 0.08} y={y * c + 0.08} width={c - 0.16} height={c - 0.16} fill={col(v)} />
        ),
      )}
    </svg>
  );
}
