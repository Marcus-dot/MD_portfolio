import ScrollType from "./ScrollType";
import SectionStatue from "./statue/SectionStatue";
import { STATUES } from "@/content/statues";
import Note from "./marginalia/Note";

export const MANIFESTO_TEXT =
  "Most software doesn't break on launch day. It breaks months later, when the data has grown, someone has added a feature in a hurry, or a number on a report has stopped adding up. That's the part I care about. I'd rather spend a day finding the real cause than an hour patching the symptom. Two of the products are live. Keep scrolling.";

export default function Manifesto() {
  return (
    <section id="manifesto" data-anno="<section #manifesto> · ScrollType, one span per character" className="relative border-t border-line px-page py-[clamp(110px,18vh,200px)]">
      <div className="mb-[34px] font-mono text-[11px] tracking-[0.2em] text-faint">
        THE SHORT VERSION
      </div>
      <Note
        className="top-[clamp(64px,10vh,120px)] left-[clamp(260px,26vw,420px)]"
        lines={["How far you've scrolled decides how many", "letters show. Scroll back up and it un-writes."]}
        refs={[2]}
      />
      <Note
        className="top-[clamp(64px,10vh,120px)] right-[clamp(20px,6vw,100px)] text-right"
        rotate={1.2}
        delay={1.6}
        lines={["The Pietà scan arrived lying on its back.", "One axis swap in the bake script stood it up."]}
        refs={[6, 9]}
      />
      <div className="flex items-end gap-[clamp(32px,5vw,80px)]">
        <div className="relative z-[1] min-w-0 flex-1">
          <ScrollType text={MANIFESTO_TEXT} signed />
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
