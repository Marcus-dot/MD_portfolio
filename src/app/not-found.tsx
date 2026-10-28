import type { Metadata } from "next";
import Link from "next/link";
import Grain from "@/components/Grain";
import TypedLine from "@/components/TypedLine";
import { MEDITATIONS } from "@/content/meditations";
import StatueCanvas from "@/components/statue/StatueCanvas";
import { STATUES } from "@/content/statues";

export const metadata: Metadata = {
  title: "Not found · Madalitso Daka",
};

export default function NotFound() {
  return (
    <main className="relative min-h-dvh overflow-hidden">
      <Grain />
      <div className="absolute top-0 right-0 bottom-0 w-[min(52vw,680px)] min-w-[280px] max-[760px]:w-full max-[760px]:opacity-40">
        <StatueCanvas
          src={STATUES.torso.src}
          label={STATUES.torso.label}
          scope="window"
          className="absolute inset-x-0 top-[80px] bottom-0"
        />
        <div className="pointer-events-none absolute right-6 bottom-5 font-mono text-[9.5px] tracking-[0.16em] text-faint">
          {STATUES.torso.caption}
        </div>
      </div>

      <div className="pointer-events-none relative z-[2] flex min-h-dvh flex-col justify-end px-page pb-[clamp(50px,9vh,100px)]">
        <TypedLine line={MEDITATIONS.notFound} className="mb-10 max-w-[420px]" />
        <div className="mb-6 font-mono text-[11px] tracking-[0.2em] text-accent">ERROR 404</div>
        <h1 className="m-0 text-[clamp(48px,9vw,128px)] font-bold uppercase leading-[0.92] tracking-[-0.045em]">
          Lost
          <br />
          to time<span className="text-accent">.</span>
        </h1>
        <p className="mt-8 mb-0 max-w-[440px] text-[16.5px] leading-[1.7] text-dim">
          This page is missing, like his head and arms. Everything that
          survived is on the{" "}
          <Link href="/" className="pointer-events-auto text-text underline decoration-line-hover underline-offset-4">
            homepage
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
