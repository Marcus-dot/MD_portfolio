import { STATUES } from "@/content/statues";
import StatueCanvas from "./statue/StatueCanvas";
import LusakaClock from "./LusakaClock";
import Magnetic from "./Magnetic";

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-dvh overflow-hidden">
      {/* statue column, right side - Marcus turns to follow the pointer */}
      <div className="hero-portrait absolute top-0 right-0 bottom-0 w-[min(52vw,780px)] min-w-[280px] max-[760px]:w-full max-[760px]:min-w-0 max-[760px]:opacity-90">
        <StatueCanvas
          src={STATUES.marcus.src}
          label={STATUES.marcus.label}
          turn
          scope="window"
          waitLoader
          className="absolute inset-x-0 top-[80px] bottom-0 max-[760px]:bottom-auto max-[760px]:h-[44svh] max-[760px]:[mask-image:linear-gradient(180deg,black_72%,transparent)]"
        />
        <div className="pointer-events-none absolute top-[84px] right-[clamp(20px,6vw,100px)] hidden text-right font-mono text-[9.5px] leading-[1.7] tracking-[0.14em] text-faint min-[761px]:block">
          {STATUES.marcus.caption}
          <br />
          <span className="tracking-[0.06em] normal-case">{STATUES.marcus.credit}</span>
        </div>
      </div>

      {/* content layer - name overlaps the statue edge; clicks fall through to
          the statue except on the actual links */}
      <div className="pointer-events-none relative z-[2] flex min-h-dvh [&_a]:pointer-events-auto [&_button]:pointer-events-auto flex-col justify-end px-page pt-[140px] pb-[clamp(50px,8vh,90px)] max-[760px]:pt-[calc(80px+44svh)]">
        {/* meta strip: local time set large, status as plain type - no badges */}
        <div
          className="hero-fade mb-8 flex flex-wrap items-stretch gap-x-8 gap-y-5"
          style={{ animationDelay: "0.2s" }}
        >
          <div>
            <div className="mb-3 font-mono text-[10.5px] tracking-[0.2em] text-faint">
              LOCAL TIME · LUSAKA
            </div>
            <LusakaClock size="display" />
          </div>
          <div className="flex flex-col border-l border-line pl-8">
            <div className="mb-3 font-mono text-[10.5px] tracking-[0.2em] text-faint">
              STATUS
            </div>
            <p className="m-0 mt-auto max-w-[200px] text-[15px] leading-[1.45] text-text">
              Open to select
              <br />
              engagements
            </p>
          </div>
        </div>
        <h1 className="m-0 text-[clamp(56px,11.5vw,164px)] font-bold uppercase leading-[0.92] tracking-[-0.045em]">
          <span className="line-wrap">
            <span className="line-in" style={{ animationDelay: "0.1s" }}>
              Madalitso
            </span>
          </span>
          <span className="line-wrap">
            <span className="line-in" style={{ animationDelay: "0.24s" }}>
              Daka
              <em className="font-serif font-normal italic normal-case tracking-[-0.02em] text-accent">
                .
              </em>
            </span>
          </span>
        </h1>
        <div className="mt-9 flex flex-wrap items-end justify-between gap-8">
          <p
            className="hero-fade m-0 max-w-[420px] text-[16.5px] leading-[1.7] text-dim"
            style={{ animationDelay: "0.5s" }}
          >
            Engineer in Lusaka. I build, audit and ship software that{" "}
            <em className="font-serif italic text-text">
              holds up in production
            </em>{", "}
            for insurance, live events and product teams.
          </p>
          <div
            className="hero-fade flex flex-wrap gap-3"
            style={{ animationDelay: "0.65s" }}
          >
            <Magnetic
              href="#work"
              data-cursor="GO"
              className="inline-block rounded-full bg-accent px-[30px] py-4 text-[15px] font-semibold text-bg no-underline"
            >
              View the work
            </Magnetic>
            <Magnetic
              href="#method"
              className="inline-block rounded-full border border-line bg-[rgba(10,10,11,0.45)] px-[30px] py-4 text-[15px] font-medium text-text no-underline backdrop-blur-[6px]"
            >
              How I work
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}
