import { PRINCIPLES } from "@/content/principles";
import Reveal from "./Reveal";
import SectionStatue from "./statue/SectionStatue";
import { STATUES } from "@/content/statues";
import Note from "./marginalia/Note";

export default function Method() {
  return (
    <section id="method" data-anno="<section #method> · four principles" className="relative px-page py-[clamp(90px,14vh,160px)]">
      <div className="relative mb-[50px] flex min-h-[200px] items-end max-[639px]:pt-10 justify-between gap-10">
        <Reveal className="relative z-[1]">
          <div className="mb-4 font-mono text-[11px] tracking-[0.2em] text-faint">ROOM 03 · METHOD</div>
          <h2 className="m-0 text-[clamp(36px,5.5vw,68px)] font-semibold leading-[1.03] tracking-[-0.035em]">
            How I work.
          </h2>
        </Reveal>
        <Note
          className="bottom-[14px] left-[clamp(330px,30vw,440px)] max-w-[380px] max-[899px]:!hidden"
          rotate={1}
          lines={["Rule 1 for real: the NexVenue capacity race", "was reproduced before anyone touched the fix."]}
        />
        <SectionStatue statue={STATUES.athena} className="mb-6 h-[clamp(240px,30vw,380px)] w-[clamp(170px,21vw,270px)]" />
      </div>
      {/* phones: the same note, inline under the heading */}
      <Note
        className="mt-[-24px] mb-8 min-[900px]:!hidden"
        rotate={1}
        size={19}
        lines={["Rule 1 for real: the NexVenue capacity race", "was reproduced before anyone touched the fix."]}
      />
      {/* an engraved list, not cards: rules between, numerals cut large */}
      <ol className="m-0 grid list-none border-t border-line-hover p-0 min-[640px]:grid-cols-2 min-[1100px]:grid-cols-4">
        {PRINCIPLES.map((p, i) => (
          <li key={p.t} className="border-b border-line py-8 min-[640px]:px-7 min-[640px]:max-[1099px]:odd:border-r min-[1100px]:border-r min-[1100px]:last:border-r-0 min-[1100px]:first:pl-0">
            <Reveal delay={i * 0.08}>
              <div className="mb-6 font-serif text-[clamp(56px,6vw,84px)] leading-[0.8] text-accent tabular-nums">
                {["I", "II", "III", "IV"][i]}
              </div>
              <div className="mb-2.5 text-[19px] font-semibold tracking-[-0.02em]">{p.t}</div>
              <p className="m-0 max-w-[300px] text-[14.5px] leading-[1.65] text-dim">{p.d}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
