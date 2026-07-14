import HeroPortrait from "./HeroPortrait";
import LusakaClock from "./LusakaClock";
import Magnetic from "./Magnetic";

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-dvh overflow-hidden">
      {/* full-bleed portrait column, right side */}
      <div className="hero-portrait absolute top-0 right-0 bottom-0 w-[min(46vw,620px)] min-w-[280px] overflow-hidden max-[760px]:w-full max-[760px]:min-w-0 max-[760px]:opacity-40">
        <HeroPortrait />
        {/* moss duotone + fade into the black page */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[rgba(40,53,38,0.14)] mix-blend-multiply"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(90deg,var(--bg)_0%,transparent_18%),linear-gradient(0deg,var(--bg)_0%,transparent_24%)]"
        />
      </div>

      {/* content layer - name overlaps the portrait edge */}
      <div className="relative z-[2] flex min-h-dvh flex-col justify-end px-page pt-[140px] pb-[clamp(50px,8vh,90px)]">
        <div
          className="hero-fade mb-7 flex flex-wrap items-center gap-[18px]"
          style={{ animationDelay: "0.2s" }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-[rgba(10,10,11,0.5)] px-4 py-2 font-mono text-[11px] tracking-[0.18em] text-dim uppercase backdrop-blur-[6px]">
            <span
              aria-hidden
              className="h-1.5 w-1.5 rounded-full bg-accent [animation:breathe_2.4s_infinite]"
            />
            Select engagements open
          </span>
          <LusakaClock />
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
