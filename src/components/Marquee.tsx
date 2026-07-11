const PHRASES = [
  "Product delivery",
  "Scalable systems",
  "Full-stack engineering",
  "Mobile apps",
  "System design",
  "API development",
];

export default function Marquee() {
  return (
    <div className="overflow-hidden border-y border-line bg-surface py-5">
      {/* Two copies for the seamless loop — animation lands in Phase 2 */}
      <div className="marquee-track flex w-max [animation:marquee_30s_linear_infinite]">
        {[false, true].map((dup) => (
          <div key={String(dup)} aria-hidden={dup} className="flex">
            {PHRASES.map((s) => (
              <span
                key={s}
                className="flex items-center gap-6 px-6 whitespace-nowrap"
              >
                <span className="font-serif text-[22px] italic text-dim">
                  {s}
                </span>
                <span
                  aria-hidden
                  className="inline-block h-[7px] w-[7px] rotate-45 bg-accent"
                />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
