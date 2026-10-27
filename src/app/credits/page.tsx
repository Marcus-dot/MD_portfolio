import type { Metadata } from "next";
import Link from "next/link";
import Grain from "@/components/Grain";
import Reveal from "@/components/Reveal";
import { CAST_ROOM } from "@/content/statues";

export const metadata: Metadata = {
  title: "Colophon - Madalitso Daka",
  description: "Who and what this site is built on: inspiration, sculpture, text, typefaces and software.",
  alternates: { canonical: "/credits" },
};

type Line = { k: string; v: React.ReactNode; href?: string };

const ext = (href: string, label: string) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-text underline decoration-line-hover underline-offset-4 hover:text-accent">
    {label}
  </a>
);

const GROUPS: { title: string; lines: Line[] }[] = [
  {
    title: "Inspiration",
    lines: [
      {
        k: "daoho.dev",
        v: <>Dao Ho&apos;s site, a koi pond you can feed, gave this one its brief: one living, playful centrepiece instead of ten effects, and a typed line opening each page. {ext("https://www.daoho.dev", "daoho.dev ↗")}</>,
      },
    ],
  },
  {
    title: "Sculpture",
    lines: [
      {
        k: "Marcus Aurelius",
        v: <>Marble bust, 161–169 CE, Musée d&apos;art et d&apos;histoire, Geneva (inv. 19050). 3D scan by Rama, Wikimedia Commons, licensed CC BY-SA 3.0 FR; the statue images made from it carry the same licence. {ext("https://commons.wikimedia.org/wiki/File:Bust_of_Marcus_Aurelus-MAHG_19050-High_poly-001.stl", "scan ↗")}</>,
      },
      {
        k: "Fifteen casts",
        v: <>3D scans of plaster casts in the Royal Cast Collection, SMK, the National Gallery of Denmark, released into the public domain: {CAST_ROOM.filter((e) => e.key !== "marcus").map((e) => e.title).join(", ")}. {ext("https://api.smk.dk", "SMK open data ↗")}</>,
      },
    ],
  },
  {
    title: "Text",
    lines: [
      {
        k: "Meditations",
        v: <>Marcus Aurelius, translated by George Long (1862), public domain. The lines typed on each page are copied word for word from Project Gutenberg&apos;s edition. {ext("https://www.gutenberg.org/ebooks/15877", "Gutenberg #15877 ↗")}</>,
      },
    ],
  },
  {
    title: "Typefaces",
    lines: [
      { k: "Inter Tight", v: "Rasmus Andersson. Display and body." },
      { k: "Instrument Serif", v: "Rodrigo Fuenzalida and Jordan Egstad. The italic accents and numerals." },
      { k: "JetBrains Mono", v: "JetBrains, Philipp Nurullin and Konstantin Bulenkov. Labels, captions, the statues' etched glyphs." },
      { k: "Caveat", v: "Impallari Type. The handwriting in Marginalia." },
      { k: "Syne", v: "Bonjour Monde, Lucas Descroix and George Triantafyllakos. Dashly's display face, used in its room." },
      { k: "Licence", v: "All five under the SIL Open Font License, self-hosted through next/font." },
    ],
  },
  {
    title: "Software",
    lines: [
      { k: "Framework", v: <>Next.js and React, written in TypeScript, styled with Tailwind CSS. {ext("https://nextjs.org", "nextjs.org ↗")}</> },
      { k: "Motion", v: <>Framer Motion for scroll-linked animation. {ext("https://motion.dev", "motion.dev ↗")}</> },
      { k: "Statues", v: "Baked offline with Node.js and ImageMagick; drawn with the browser's 2D canvas." },
      { k: "Measurement", v: "Lighthouse, by Google, for every performance and accessibility figure quoted." },
      { k: "Hosting", v: "Vercel." },
    ],
  },
];

export default function Credits() {
  return (
    <div className="min-h-dvh">
      <Grain />
      <header className="flex items-center justify-between px-page pt-8">
        <Link href="/" className="text-[14px] font-bold tracking-[-0.02em] text-text no-underline">
          MD<span className="text-accent">.</span>
        </Link>
        <Link href="/" className="font-mono text-[11px] tracking-[0.12em] text-dim no-underline transition-colors hover:text-accent pointer-coarse:py-3">
          ← PORTFOLIO
        </Link>
      </header>
      <main className="mx-auto max-w-[900px] px-page pt-[clamp(60px,11vh,130px)] pb-[clamp(80px,12vh,140px)]">
        <div className="font-mono text-[11px] tracking-[0.2em] text-faint">COLOPHON</div>
        <h1 className="mt-5 mb-0 text-[clamp(48px,9vw,120px)] font-semibold leading-[0.92] tracking-[-0.05em] uppercase">
          Credits<span className="text-accent">.</span>
        </h1>
        <p className="mt-8 mb-0 max-w-[560px] text-[16.5px] leading-[1.7] text-dim">
          Who and what this site is built on. Each statue&apos;s caption repeats its source where
          it hangs, and the Marcus Aurelius scan carries its credit everywhere it appears, as its
          licence asks.
        </p>
        <div className="mt-[clamp(60px,10vh,110px)] flex flex-col gap-[clamp(50px,8vh,80px)]">
          {GROUPS.map((g) => (
            <Reveal key={g.title}>
              <section>
                <h2 className="m-0 border-b border-line pb-3 font-mono text-[11px] font-normal tracking-[0.2em] text-faint uppercase">
                  {g.title}
                </h2>
                <dl className="m-0">
                  {g.lines.map((l) => (
                    <div key={l.k} className="grid gap-x-8 gap-y-1 border-b border-line py-5 min-[700px]:grid-cols-[180px_1fr]">
                      <dt className="text-[15px] font-semibold tracking-[-0.01em]">{l.k}</dt>
                      <dd className="m-0 text-[15px] leading-[1.7] text-dim">{l.v}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            </Reveal>
          ))}
        </div>
      </main>
    </div>
  );
}
