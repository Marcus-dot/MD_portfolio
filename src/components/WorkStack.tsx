import { STORIES } from "@/content/stories";

export default function WorkStack() {
  return (
    <div className="mt-[100px]">
      <div className="mb-[30px] flex flex-wrap items-baseline justify-between gap-3">
        <h3 className="m-0 text-[clamp(28px,4vw,48px)] font-semibold tracking-[-0.03em]">
          Confidential work,{" "}
          <em className="font-serif font-normal italic text-dim">
            credible outlines.
          </em>
        </h3>
        <span className="font-mono text-[11px] text-faint">
          {"// scroll — cards stack"}
        </span>
      </div>
      {STORIES.map((s) => (
        <article
          key={s.n}
          className="mb-[26px] flex flex-wrap items-baseline gap-7 rounded-[26px] border border-line bg-[linear-gradient(150deg,#131713,var(--bg))] p-[clamp(28px,4vw,48px)] shadow-[0_-20px_50px_-30px_rgba(0,0,0,0.9)]"
        >
          <span
            aria-hidden
            className="w-[100px] font-serif text-[clamp(48px,7vw,92px)] leading-none italic text-[rgba(155,201,126,0.28)]"
          >
            {s.n}
          </span>
          <div className="flex-[1_1_220px]">
            <div className="text-[clamp(24px,3vw,34px)] font-semibold tracking-[-0.025em]">
              {s.s}
            </div>
            <div className="mt-2 font-mono text-[11px] tracking-[0.1em] text-faint uppercase">
              {s.scale}
            </div>
          </div>
          <p className="m-0 flex-[2_1_340px] text-[15.5px] leading-[1.75] text-dim">
            {s.d}
          </p>
          <span
            className={`self-start rounded-full border border-line px-3.5 py-1.5 font-mono text-[11px] ${
              s.badge === "Under NDA" ? "text-dim" : "text-accent"
            }`}
          >
            {s.badge}
          </span>
        </article>
      ))}
    </div>
  );
}
