import { BUILDS } from "@/content/builds";
import Reveal from "./Reveal";

export default function AlsoBuilt() {
  return (
    <div className="mt-[100px]">
      <div className="mb-[30px] flex items-baseline justify-between font-mono text-[11px] tracking-[0.2em] text-faint">
        ALSO BUILT
        <span className="tracking-[0.1em] min-[640px]:hidden">SWIPE →</span>
      </div>
      <div className="rail grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-[18px]">
        {BUILDS.map((b, i) => (
          <Reveal key={b.t} delay={i * 0.08} className="rail-item h-full">
            <div className="h-full rounded-[4px] border border-line bg-surface px-7 py-[30px]">
              <div className="text-[18px] font-semibold tracking-[-0.02em]">
                {b.t}
              </div>
              <div className="mt-2 font-mono text-[10.5px] tracking-[0.08em] text-accent">
                {b.stack}
              </div>
              <p className="mt-3.5 mb-0 text-[14px] leading-[1.65] text-dim">
                {b.d}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
