import ScrollType from "./ScrollType";

export const MANIFESTO_TEXT =
  "I care how engineering decisions compound: architecture, data flows, and the trade-offs that decide whether a system holds up under growth or breaks under complexity. I build for the former. One product is public. Scroll on.";

export default function Manifesto() {
  return (
    <section className="border-t border-line px-page py-[clamp(110px,18vh,200px)]">
      <div className="mb-[34px] font-mono text-[11px] tracking-[0.2em] text-faint">
        THE SHORT VERSION
      </div>
      <ScrollType text={MANIFESTO_TEXT} />
    </section>
  );
}
