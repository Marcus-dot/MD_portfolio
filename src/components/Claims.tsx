import { CLAIMS } from "@/content/claims";
import Reveal from "./Reveal";

export default function Claims() {
  return (
    <section
      id="skills"
      className="relative z-[3] -mt-10 rounded-t-[40px] bg-surface px-page py-[clamp(90px,14vh,160px)]"
    >
      <Reveal>
        <h2 className="m-0 text-[clamp(36px,5.5vw,68px)] font-semibold leading-[1.03] tracking-[-0.035em]">
          Hover a claim.
          <br />
          <em className="font-serif font-normal italic text-accent">
            See the evidence.
          </em>
        </h2>
        <p className="mt-4 font-mono text-[14px] text-faint">
          {"// every card flips — front is the claim, back is why you should believe it"}
        </p>
      </Reveal>
      <div className="mt-[50px] grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[18px]">
        {CLAIMS.map((c, i) => (
          <Reveal key={c.t} delay={i * 0.08}>
          <div className="flip h-[340px] cursor-pointer">
            <div className="flip-inner">
              <div className="flip-face bg-bg">
                <div className="mb-3.5 text-[12px] tracking-[0.12em] text-faint uppercase">
                  {c.sub}
                </div>
                <h3 className="mb-3.5 text-[26px] font-semibold tracking-[-0.025em]">
                  {c.t}
                </h3>
                <p className="text-[15px] leading-[1.7] text-dim">{c.front}</p>
                <div className="absolute bottom-[26px] left-[30px] font-mono text-[11px] text-accent">
                  FLIP FOR EVIDENCE ⟲
                </div>
              </div>
              <div className="flip-face rotate-y-180 bg-musgo">
                <div className="mb-5 font-mono text-[11px] tracking-[0.15em] text-accent">
                  EVIDENCE TRAIL
                </div>
                {c.back.map((b) => (
                  <div key={b} className="mb-4 flex items-start gap-3">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      aria-hidden
                      className="mt-[3px] shrink-0"
                    >
                      <circle
                        cx="8"
                        cy="8"
                        r="7"
                        fill="none"
                        stroke="var(--accent)"
                        strokeWidth="1.2"
                      />
                      <path
                        d="M5 8.3l2.2 2.2 3.8-4.4"
                        fill="none"
                        stroke="var(--accent)"
                        strokeWidth="1.4"
                      />
                    </svg>
                    <span className="text-[14px] leading-[1.55] text-text">
                      {b}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
