import { CLAIMS } from "@/content/claims";
import FlipCard from "./FlipCard";
import Reveal from "./Reveal";
import SectionStatue from "./statue/SectionStatue";
import { STATUES } from "@/content/statues";
import Note from "./marginalia/Note";

export default function Claims() {
  return (
    <section
      id="skills"
      data-anno="<section #skills> · FlipCard x 4, CSS 3D"
      className="relative z-[3] -mt-10 bg-surface px-page py-[clamp(90px,14vh,160px)]"
    >
      <div className="relative flex min-h-[200px] items-end max-[899px]:flex-wrap max-[639px]:pt-10 justify-between gap-10">
      <Reveal className="relative z-[1]">
        <div className="mb-4 font-mono text-[11px] tracking-[0.2em] text-faint">ROOM 02 · SKILLS</div>
        <h2 className="m-0 text-[clamp(36px,5.5vw,68px)] font-semibold leading-[1.03] tracking-[-0.035em]">
          What I&apos;m good at.
        </h2>
        <p className="mt-4 font-mono text-[14px] text-faint">
          {"// flip a card for where each claim came from"}
        </p>
      </Reveal>
        <Note
          className="bottom-[10px] left-[clamp(300px,40vw,620px)]"
          rotate={-1}
          lines={["Each card is CSS 3D: preserve-3d and", "rotateY(180deg). Hover, click or press Enter."]}
        />
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
