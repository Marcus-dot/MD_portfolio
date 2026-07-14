import { CLAIMS } from "@/content/claims";
import FlipCard from "./FlipCard";
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
          {"// every card flips: front is the claim, back is the evidence"}
        </p>
      </Reveal>
      <div className="mt-[50px] grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[18px]">
        {CLAIMS.map((c, i) => (
          <Reveal key={c.t} delay={i * 0.08}>
            <FlipCard claim={c} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
