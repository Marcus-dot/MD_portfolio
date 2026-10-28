const PHRASES = [
  "Insurance systems",
  "Event apps",
  "WhatsApp + USSD",
  "Data audits",
  "Mobile money",
  "Django and Next.js",
];

export default function Marquee() {
  return (
    <div className="overflow-hidden border-y border-line bg-surface py-5">
      {/* Two copies for the seamless loop - animation lands in Phase 2 */}
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
                {/* interpunct, as Roman inscriptions divide words */}
                <span aria-hidden className="font-serif text-[22px] text-accent">
                  ·
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
