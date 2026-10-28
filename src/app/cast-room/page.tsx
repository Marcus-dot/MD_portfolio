import type { Metadata } from "next";
import Link from "next/link";
import Grain from "@/components/Grain";
import Note from "@/components/marginalia/Note";
import References from "@/components/marginalia/References";
import MarginaliaToggle from "@/components/marginalia/MarginaliaToggle";
import Toast from "@/components/Toast";
import TypedLine from "@/components/TypedLine";
import Reveal from "@/components/Reveal";
import StatueCanvas from "@/components/statue/StatueCanvas";
import { CAST_ROOM, STATUES } from "@/content/statues";
import { MEDITATIONS } from "@/content/meditations";

export const metadata: Metadata = {
  title: "The Cast Room · Madalitso Daka",
  description:
    "Every statue on this site, from 3D scans of classical sculpture, rebuilt as etched marble tiles and relit live.",
  alternates: { canonical: "/cast-room" },
};

export default function CastRoom() {
  return (
    <div className="min-h-dvh">
      <Grain />
      <Toast />

      <header className="flex items-center justify-between px-page pt-8">
        <Link href="/" className="text-[14px] font-bold tracking-[-0.02em] text-text no-underline">
          MD<span className="text-accent">.</span>
        </Link>
        <Link
          href="/"
          className="font-mono text-[11px] tracking-[0.12em] text-dim no-underline transition-colors hover:text-accent pointer-coarse:py-3"
        >
          ← PORTFOLIO
        </Link>
      </header>
      <div className="flex justify-center px-page">
        <MarginaliaToggle />
      </div>

      <main className="relative px-page pt-[clamp(60px,12vh,140px)] pb-[clamp(80px,12vh,140px)]">
        <Note
          className="top-[clamp(120px,18vh,200px)] right-[clamp(20px,6vw,100px)] max-w-[420px] text-right"
          rotate={1.2}
          lines={["Each scan, up to about 400,000 triangles, is", "rasterised offline in Node: a depth buffer at", "3x resolution, averaged down into 150 x 150", "cells. No WebGL anywhere."]}
          refs={[9]}
        />
        <div className="max-w-[760px]">
          <TypedLine line={MEDITATIONS.castRoom} className="mb-12 max-w-[520px]" />
          <h1 className="m-0 text-[clamp(52px,10vw,148px)] font-semibold leading-[0.92] tracking-[-0.05em] uppercase">
            The Cast
            <br />
            Room<span className="text-accent">.</span>
          </h1>
          <p className="mt-8 mb-0 max-w-[560px] text-[clamp(16px,1.6vw,18px)] leading-[1.7] text-dim">
            Every statue on the site, in one room. They&apos;re real 3D scans of
            classical sculpture, turned into etched marble tiles and lit live in
            your browser. Bring your pointer close to move the light, and click to
            chip the marble.
          </p>
          <p className="mt-5 mb-0 font-mono text-[11px] tracking-[0.12em] text-faint max-[639px]:text-[12px]">
            {CAST_ROOM.length} WORKS · HUNG IN THE ORDER YOU MEET THEM
          </p>
        </div>

        {/* staggered hang: the right-hand column drops, like a gallery wall */}
        <ol className="m-0 mt-[clamp(70px,12vh,130px)] grid list-none gap-x-[clamp(40px,7vw,120px)] gap-y-[clamp(80px,12vh,140px)] p-0 min-[900px]:grid-cols-2">
          {CAST_ROOM.map((ex, i) => {
            const st = STATUES[ex.key];
            return (
              <li key={ex.key} className="min-[900px]:even:mt-[clamp(120px,16vw,240px)]">
                <figure className="relative m-0">
                  {ex.key === "marcus" && (
                    <Note
                      className="top-[30px] left-[calc(100%+24px)] max-w-[300px]"
                      delay={1.2}
                      lines={["The only CC BY-SA scan, so his credit", "travels with every image made from it,", "the share card included."]}
                      refs={[5]}
                    />
                  )}
                  {ex.key === "pieta" && (
                    <Note
                      className="top-[-96px] right-0 max-w-[360px] text-right"
                      rotate={1}
                      lines={["Exported lying on its back. up: \"y\" in the", "bake turns (x, y, z) into (x, -z, y)."]}
                      refs={[9]}
                    />
                  )}
                  {ex.key === "hercules" && (
                    <Note
                      className="top-[30px] left-[calc(100%+24px)] max-w-[300px]"
                      lines={["Carved top to bottom the first time it", "scrolls into view. The green flecks are", "the chisel."]}
                    />
                  )}
                  {ex.key === "apollo" && (
                    <Note
                      className="top-[-96px] right-0 max-w-[360px] text-right"
                      rotate={1}
                      lines={["Labels only say what the source records say.", "No date unless the record gives one."]}
                    />
                  )}
                  <div
                    className={`relative w-full ${
                      ex.tall ? "h-[clamp(440px,52vw,640px)]" : "h-[clamp(360px,40vw,520px)]"
                    }`}
                  >
                    <StatueCanvas src={st.src} label={st.label} targetCell={5} turn={ex.key === "marcus"} />
                  </div>
                  <Reveal>
                    <figcaption className="mt-8 border-t border-line pt-6">
                      <div className="flex items-baseline justify-between gap-4">
                        <span className="font-serif text-[clamp(28px,3vw,40px)] leading-none italic text-accent">
                          No. {String(i + 1).padStart(2, "0")}
                        </span>
                        <Link
                          href={ex.where.href}
                          className="font-mono text-[11px] tracking-[0.1em] text-dim no-underline transition-colors hover:text-accent pointer-coarse:py-3 max-[639px]:text-[12px]"
                        >
                          SEE IT IN PLACE: {ex.where.label.toUpperCase()} →
                        </Link>
                      </div>
                      <h2 className="mt-5 mb-0 text-[clamp(22px,2.4vw,30px)] font-semibold tracking-[-0.025em]">
                        {ex.title}
                      </h2>
                      <p className="mt-3 mb-0 max-w-[460px] text-[15px] leading-[1.7] text-dim">
                        {ex.why}
                      </p>
                      <p className="mt-5 mb-0 font-mono text-[10.5px] leading-[1.8] tracking-[0.06em] text-faint max-[639px]:text-[12px]">
                        {ex.object}
                        <br />
                        {ex.source}
                      </p>
                    </figcaption>
                  </Reveal>
                </figure>
              </li>
            );
          })}
        </ol>

        <div className="mt-[clamp(90px,14vh,150px)] flex flex-wrap items-center justify-between gap-6 border-t border-line pt-10">
          <Link
            href="/"
            className="inline-block rounded-[3px] bg-text px-7 py-3.5 text-[14px] font-semibold text-bg no-underline"
          >
            Back to the work →
          </Link>
          <p className="m-0 max-w-[460px] font-mono text-[10.5px] leading-[1.8] tracking-[0.06em] text-faint">
            Scans are baked into small cell maps and relit on a 2D canvas, no 3D
            engine in the browser. Sources and licences are listed with each work.
          </p>
        </div>
        <References />
      </main>
    </div>
  );
}
