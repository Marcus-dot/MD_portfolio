import { PRINCIPLES } from "@/content/principles";
import Reveal from "./Reveal";
import SectionStatue from "./statue/SectionStatue";
import { STATUES } from "@/content/statues";

export default function Method() {
  return (
    <section id="method" data-anno="<section #method> · four principles" className="relative px-page py-[clamp(90px,14vh,160px)]">
      <div className="relative mb-[50px] flex min-h-[200px] items-end max-[639px]:pt-10 justify-between gap-10">
        <Reveal className="relative z-[1]">
          <h2 className="m-0 text-[clamp(36px,5.5vw,68px)] font-semibold leading-[1.03] tracking-[-0.035em]">
            Four rules,{" "}
            <em className="font-serif font-normal italic text-dim">
              zero exceptions.
            </em>
          </h2>
        </Reveal>
        <SectionStatue statue={STATUES.athena} className="mb-6 h-[clamp(240px,30vw,380px)] w-[clamp(170px,21vw,270px)]" />
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-[18px]">
        {PRINCIPLES.map((p, i) => (
          <Reveal key={p.t} delay={i * 0.08} className="h-full">
          <div
            className="h-full rounded-[4px] border border-line bg-surface px-7 py-[30px]"
          >
            <div className="mb-5 font-serif text-[40px] leading-none italic text-accent">
              0{i + 1}
            </div>
            <div className="mb-2.5 text-[19px] font-semibold tracking-[-0.02em]">
              {p.t}
            </div>
            <p className="m-0 text-[14px] leading-[1.65] text-dim">{p.d}</p>
          </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
