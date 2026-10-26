import { CLAIMS } from "@/content/claims";
import FlipCard from "./FlipCard";
import Reveal from "./Reveal";
import SectionStatue from "./statue/SectionStatue";
import { STATUES } from "@/content/statues";

export default function Claims() {
  return (
    <section
      id="skills"
      className="relative z-[3] -mt-10 rounded-t-[40px] bg-surface px-page py-[clamp(90px,14vh,160px)]"
    >
      <div className="relative flex min-h-[200px] items-end max-[639px]:pt-10 justify-between gap-10">
      <Reveal className="relative z-[1]">
        <h2 className="m-0 text-[clamp(36px,5.5vw,68px)] font-semibold leading-[1.03] tracking-[-0.035em]">
          Hover a claim.
          <br />
          <em className="font-serif font-normal italic text-accent">
            See the evidence.
          </em>
        </h2>
        <p className="mt-4 font-mono text-[14px] text-faint">
          {"// every card flips: front is the claim, back is the evidence"}
        </p>
      </Reveal>
        <SectionStatue statue={STATUES.apollo} className="mb-6 h-[clamp(280px,34vw,440px)] w-[clamp(170px,20vw,260px)]" />
      </div>
      <div className="mt-[50px] mb-4 font-mono text-[11px] tracking-[0.1em] text-faint min-[640px]:hidden">
        SWIPE → · TAP A CARD TO FLIP
      </div>
      <div className="rail mt-[50px] grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[18px] max-[639px]:mt-0">
        {CLAIMS.map((c, i) => (
          <Reveal key={c.t} delay={i * 0.08} className="rail-item">
            <FlipCard claim={c} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
