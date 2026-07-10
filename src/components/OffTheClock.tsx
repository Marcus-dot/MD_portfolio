import Reveal from "./Reveal";

const CARDS: [string, string][] = [
  [
    "Short film",
    "Producing independent short film work in Zambia — the same discipline as shipping software: pre-production is diagnosis, the edit is the fix.",
  ],
  [
    "Personal-finance writing",
    "Long-form writing on money for Zambian readers. Same rule as my reports: no number I can't defend.",
  ],
];

export default function OffTheClock() {
  return (
    <section className="border-t border-line px-page py-[clamp(80px,12vh,140px)]">
      <div className="flex flex-wrap items-start justify-between gap-10">
        <Reveal>
          <h2 className="m-0 max-w-[11em] text-[clamp(30px,4.5vw,54px)] font-semibold leading-[1.05] tracking-[-0.03em]">
            Off the clock, still{" "}
            <em className="font-serif font-normal italic text-accent">
              telling stories.
            </em>
          </h2>
        </Reveal>
        <div className="grid max-w-[620px] flex-[1_1_440px] gap-4">
          {CARDS.map(([t, d], i) => (
            <Reveal key={t} delay={i * 0.09}>
            <div
              className="flex flex-wrap items-baseline gap-5 rounded-[20px] border border-line bg-[rgba(237,240,228,0.015)] px-[26px] py-6"
            >
              <span className="min-w-[150px] font-mono text-[11px] tracking-[0.14em] text-accent uppercase">
                {t}
              </span>
              <p className="m-0 min-w-[220px] flex-1 text-[14.5px] leading-[1.7] text-dim">
                {d}
              </p>
            </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
