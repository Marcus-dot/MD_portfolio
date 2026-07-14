import { EDUCATION, STACK } from "@/content/stack";
import Reveal from "./Reveal";

export default function Background() {
  return (
    <section className="border-t border-line px-page py-[clamp(80px,12vh,140px)]">
      <div className="flex flex-wrap items-start gap-x-16 gap-y-12">
        {/* Education */}
        <Reveal className="min-w-[280px] flex-[1_1_320px]">
          <div className="mb-7 font-mono text-[11px] tracking-[0.2em] text-faint">
            EDUCATION —
          </div>
          {EDUCATION.map((e) => (
            <div key={e.degree} className="mb-7">
              <div className="text-[19px] font-semibold tracking-[-0.02em]">
                {e.degree}
              </div>
              <div className="mt-1.5 font-serif text-[17px] italic text-dim">
                {e.school}
              </div>
              <div className="mt-1.5 font-mono text-[11px] tracking-[0.08em] text-faint uppercase">
                {e.detail}
              </div>
            </div>
          ))}
        </Reveal>

        {/* Stack */}
        <Reveal delay={0.1} className="flex-[2_1_460px]">
          <div className="mb-7 font-mono text-[11px] tracking-[0.2em] text-faint">
            STACK —
          </div>
          <div className="flex flex-col gap-4">
            {STACK.map((g) => (
              <div key={g.label} className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                <span className="w-[130px] shrink-0 font-mono text-[10.5px] tracking-[0.12em] text-faint uppercase">
                  {g.label}
                </span>
                <span className="flex flex-1 flex-wrap gap-1.5">
                  {g.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-line px-3 py-1 text-[12.5px] text-dim"
                    >
                      {item}
                    </span>
                  ))}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
