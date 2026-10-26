import ScrollType from "./ScrollType";
import SectionStatue from "./statue/SectionStatue";
import { STATUES } from "@/content/statues";

export const MANIFESTO_TEXT =
  "I care how engineering decisions compound: architecture, data flows, and the trade-offs that decide whether a system holds up under growth or breaks under complexity. I build for the former. Two products are public. Scroll on.";

export default function Manifesto() {
  return (
    <section id="manifesto" className="relative border-t border-line px-page py-[clamp(110px,18vh,200px)]">
      <div className="mb-[34px] font-mono text-[11px] tracking-[0.2em] text-faint">
        THE SHORT VERSION
      </div>
      <div className="flex items-end gap-[clamp(32px,5vw,80px)]">
        <div className="relative z-[1] min-w-0 flex-1">
          <ScrollType text={MANIFESTO_TEXT} />
        </div>
        {/* the one work Michelangelo signed, beside the statement signed here */}
        <SectionStatue
          statue={STATUES.pieta}
          className="mb-6 h-[clamp(220px,24vw,340px)] w-[clamp(240px,26vw,380px)] max-[1023px]:opacity-50 max-[639px]:!top-auto max-[639px]:!bottom-6 max-[639px]:!w-[220px] max-[639px]:!h-[180px] max-[639px]:opacity-30"
        />
      </div>
    </section>
  );
}
