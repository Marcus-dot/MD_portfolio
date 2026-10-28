import { STATUES } from "@/content/statues";
import HeroName from "./HeroName";
import VisitorWhere from "./VisitorWhere";
import StatueCanvas from "./statue/StatueCanvas";
import ChipCounter from "./statue/ChipCounter";
import Note from "./marginalia/Note";
import LusakaClock from "./LusakaClock";
import ArrowLink from "./ArrowLink";

export default function Hero() {
  return (
    <section id="hero" data-anno="<section #hero> · statue canvas under a content layer that lets clicks through" className="relative min-h-dvh overflow-hidden">
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
          <ChipCounter className="mt-3 block text-[10.5px] text-dim" />
        </div>
        {/* phones: the tally sits at the statue's base */}
        <ChipCounter className="pointer-events-none absolute top-[calc(80px+44svh-26px)] right-5 text-[11px] text-dim min-[761px]:hidden" />
      </div>

      <Note
        className="top-[104px] left-[clamp(20px,6vw,100px)] max-w-[440px] max-[899px]:!hidden"
        lines={[
          "No 3D engine here. I baked the scan offline",
          "into a 150 x 150 map of which way each bit",
          "faces, and a 2D canvas relights it every frame.",
          "25 baked angles make the head turn.",
        ]}
        refs={[5, 9]}
        arrow={{ d: "M4 46 C 70 10, 150 6, 214 40 M201 30 L214 40 L199 46", w: 220, h: 60, className: "left-[360px] top-[52px]" }}
      />
      <Note
        className="top-[156px] right-[clamp(20px,6vw,100px)] max-w-[330px] text-right max-[899px]:!hidden"
        rotate={1.5}
        delay={2.4}
        lines={["Click him. Tiles fly out on damped springs", "and settle back. The tally lives in your", "browser and nowhere else."]}
      />
      <Note
        className="top-[262px] right-[clamp(20px,6vw,100px)] max-w-[330px] text-right max-[899px]:!hidden"
        rotate={-1}
        delay={6.4}
        size={19}
        lines={["This is Caveat, a stand-in. Soon these", "notes will be in my own handwriting."]}
        refs={[4]}
      />
      <Note
        className="top-[74px] left-[calc(50%-150px)] max-[899px]:!hidden"
        rotate={-0.5}
        delay={4.6}
        size={19}
        lines={["The thin green line in the nav follows whichever", "room you're in. The ruler on the right does the same", "for the whole page."]}
        refs={[2]}
      />

      {/* content layer - name overlaps the statue edge; clicks fall through to
          the statue except on the actual links */}
      <div className="pointer-events-none relative z-[2] flex min-h-dvh [&_a]:pointer-events-auto [&_button]:pointer-events-auto flex-col justify-end px-page pt-[140px] pb-[clamp(50px,8vh,90px)] max-[760px]:pt-[calc(80px+44svh)]">
        {/* phones: the hero notes as one inline aside under the statue */}
        <Note
          className="mb-6 min-[900px]:!hidden"
          rotate={-1}
          delay={0.8}
          size={19}
          lines={[
            "No 3D engine. The scan is baked into a",
            "150 x 150 map and a 2D canvas relights it.",
            "Tap him and the tiles fly out and settle.",
            "Tap my first name: it means something.",
            "(Caveat for now. My own handwriting is coming.)",
          ]}
          refs={[9]}
        />
        {/* meta strip: local time set large, status as plain type - no badges */}
        <div
          className="hero-fade mb-8 flex flex-wrap items-stretch gap-x-8 gap-y-5 max-[400px]:gap-x-5"
          style={{ animationDelay: "0.2s" }}
        >
          <div>
            <div className="mb-3 font-mono text-[10.5px] tracking-[0.2em] text-faint">
              LOCAL TIME · LUSAKA
            </div>
            <LusakaClock size="display" />
          </div>
          <div className="flex flex-col border-l border-line pl-8 max-[400px]:pl-5">
            <div className="mb-3 font-mono text-[10.5px] tracking-[0.2em] text-faint">
              STATUS
            </div>
            <p className="m-0 mt-auto max-w-[200px] text-[15px] leading-[1.45] text-text">
              Open to the
              <br />
              right project
            </p>
          </div>
          <VisitorWhere />
        </div>
        <HeroName />
        <div className="mt-5 flex flex-wrap items-end justify-between gap-8">
          <p
            className="hero-fade m-0 max-w-[420px] text-[16.5px] leading-[1.7] text-dim"
            style={{ animationDelay: "0.5s" }}
          >
            Software engineer in Lusaka. I build web, mobile and data
            products end to end, and I care most about what happens{" "}
            <em className="font-serif italic text-text">after launch</em>,
            when real people start using it.
          </p>
          <div
            className="hero-fade flex flex-wrap gap-3"
            style={{ animationDelay: "0.65s" }}
          >
            <ArrowLink
              href="#work"
              data-cursor="GO"
              className="inline-block rounded-[3px] bg-accent px-[30px] py-4 text-[15px] font-semibold text-bg no-underline"
            >
              See the work
            </ArrowLink>
            <ArrowLink
              href="#method"
              className="inline-block rounded-[3px] border border-line bg-bg px-[30px] py-4 text-[15px] font-medium text-text no-underline"
            >
              How I work
            </ArrowLink>
          </div>
        </div>
      </div>
    </section>
  );
}
