import LEDGER from "@/content/dashly-ledger.json";

const PER_TILE = 5; // commits per tile

const label = (m: string) =>
  new Date(`${m}-01T00:00:00Z`).toLocaleDateString("en-GB", { month: "short", year: "2-digit", timeZone: "UTC" });

/* Commits per month on main, stacked as tiles - the same etched-tile language
   as the statues. One tile is five commits; an empty month keeps a hairline. */
export default function CommitStrip() {
  const tallest = Math.max(...LEDGER.months.map((m) => Math.ceil(m.commits / PER_TILE)));
  return (
    <figure className="m-0">
      <div className="flex items-end gap-[clamp(4px,1vw,10px)] overflow-x-auto pb-2" style={{ minHeight: tallest * 10 + 4 }}>
        {LEDGER.months.map((m) => {
          const tiles = Math.ceil(m.commits / PER_TILE);
          return (
            <div key={m.month} className="flex min-w-[18px] flex-1 flex-col items-center gap-2">
              <span className="font-mono text-[10px] max-[639px]:text-[11px] text-faint tabular-nums">{m.commits || ""}</span>
              <div className="flex w-full flex-col-reverse gap-[2px]" title={`${m.commits} commits, ${label(m.month)}`}>
                {tiles === 0 ? (
                  <span className="block h-px w-full bg-line" />
                ) : (
                  Array.from({ length: tiles }, (_, i) => (
                    <span key={i} className="block h-[8px] w-full bg-[#6E3482]" />
                  ))
                )}
              </div>
              <span className="font-mono text-[9px] tracking-[0.08em] whitespace-nowrap text-faint uppercase">
                {label(m.month)}
              </span>
            </div>
          );
        })}
      </div>
      <figcaption className="mt-4 font-mono text-[10px] max-[639px]:text-[11px] tracking-[0.12em] text-faint">
        COMMITS PER MONTH ON MAIN · ONE TILE = {PER_TILE} COMMITS
      </figcaption>
    </figure>
  );
}
