import Image from "next/image";
import LusakaClock from "./LusakaClock";

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-dvh overflow-hidden">
      {/* full-bleed portrait column, right side */}
      <div className="absolute top-0 right-0 bottom-0 w-[min(46vw,620px)] min-w-[280px] overflow-hidden max-[760px]:w-full max-[760px]:min-w-0 max-[760px]:opacity-40">
        <Image
          src="/portrait.jpg"
          alt="Madalitso Daka"
          fill
          preload
          sizes="(max-width: 760px) 100vw, 46vw"
          className="object-cover object-[50%_22%] grayscale-[0.3] contrast-[1.05]"
        />
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

      {/* content layer — name overlaps the portrait edge */}
      <div className="relative z-[2] flex min-h-dvh flex-col justify-end px-page pt-[140px] pb-[clamp(50px,8vh,90px)]">
        <div className="mb-7 flex flex-wrap items-center gap-[18px]">
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-[rgba(10,10,11,0.5)] px-4 py-2 font-mono text-[11px] tracking-[0.18em] text-dim uppercase backdrop-blur-[6px]">
            <span
              aria-hidden
              className="h-1.5 w-1.5 rounded-full bg-accent"
            />
            Select engagements open
          </span>
          <LusakaClock />
        </div>
        <h1 className="m-0 text-[clamp(56px,11.5vw,164px)] font-bold uppercase leading-[0.92] tracking-[-0.045em]">
          Madalitso
          <br />
          Daka
          <em className="font-serif font-normal italic normal-case tracking-[-0.02em] text-accent">
            .
          </em>
        </h1>
        <div className="mt-9 flex flex-wrap items-end justify-between gap-8">
          <p className="m-0 max-w-[420px] text-[16.5px] leading-[1.7] text-dim">
            Engineer in Lusaka. I build, audit and ship software that{" "}
            <em className="font-serif italic text-text">
              holds up in production
            </em>{" "}
            — for finance, telecoms and research.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#work"
              className="inline-block rounded-full bg-accent px-[30px] py-4 text-[15px] font-semibold text-bg no-underline"
            >
              View the work
            </a>
            <a
              href="#method"
              className="inline-block rounded-full border border-line bg-[rgba(10,10,11,0.45)] px-[30px] py-4 text-[15px] font-medium text-text no-underline backdrop-blur-[6px]"
            >
              How I work
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
