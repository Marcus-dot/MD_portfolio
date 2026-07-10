export const MANIFESTO_TEXT =
  "Much of my work is under NDA, so I'll say it plainly: I find the bugs that pass code review, I report numbers that can be traced, and I ship products that survive contact with real users. One of them is public — scroll on.";

export default function Manifesto() {
  return (
    <section className="border-t border-line px-page py-[clamp(110px,18vh,200px)]">
      <div className="mb-[34px] font-mono text-[11px] tracking-[0.2em] text-faint">
        THE SHORT VERSION —
      </div>
      {/* Static for Phase 1 — becomes scroll-scrubbed typing in Phase 3 */}
      <p className="m-0 max-w-[22em] text-[clamp(28px,4.6vw,58px)] font-semibold leading-[1.25] tracking-[-0.03em]">
        {MANIFESTO_TEXT}
      </p>
    </section>
  );
}
