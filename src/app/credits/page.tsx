import type { Metadata } from "next";
import Link from "next/link";
import Mark from "@/components/Mark";
import Grain from "@/components/Grain";
import Reveal from "@/components/Reveal";
import { CAST_ROOM } from "@/content/statues";
import { CONFIG } from "@/content/config";

export const metadata: Metadata = {
  title: "Colophon · Madalitso Daka",
  description: "Who and what this site is built on, what it keeps about you, and who may reuse what.",
  alternates: { canonical: "/credits" },
};

type Line = { k: string; v: React.ReactNode; href?: string };

const ext = (href: string, label: string) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="whitespace-nowrap text-text underline decoration-line-hover underline-offset-4 hover:text-accent pointer-coarse:inline-block pointer-coarse:py-3 pointer-coarse:-my-3">
    {label}
  </a>
);

const GROUPS: { title: string; id?: string; lines: Line[] }[] = [
  {
    title: "Inspiration",
    lines: [
      {
        k: "daoho.dev",
        v: <>Dao Ho&apos;s site has a koi pond you can feed. It&apos;s why this one has one thing to play with instead of ten effects, and a line typed out at the top of each page. {ext("https://www.daoho.dev", "daoho.dev ↗")}</>,
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
  {
    title: "Privacy",
    id: "privacy",
    lines: [
      { k: "Collected", v: "Nothing. No cookies, no analytics, no tracking, no forms, no accounts. Fonts, images and statues are served from this domain, so browsing makes no requests to anyone else." },
      {
        k: "On your device",
        v: <>Three small values stay in your own browser and are never sent anywhere: <code className="font-mono text-[13px] text-text">md-loader-seen</code> skips the opening animation for the rest of your visit, <code className="font-mono text-[13px] text-text">md-marginalia</code> remembers whether Marginalia is on, and <code className="font-mono text-[13px] text-text">md-chips</code> counts the marble chips you have knocked off. Clearing this site&apos;s data removes them.</>,
      },
      {
        k: "Where you are",
        v: <>The homepage shows you your own rough location (city and country, worked out from your IP address by Vercel) and how far that is from Lusaka. It goes back to your browser only and is never stored. </>,
      },
      {
        k: "Hosting",
        v: <>Vercel serves the site and, like any host, keeps standard request logs (IP address, page, time) to run and secure it, under its own policy. {ext("https://vercel.com/legal/privacy-policy", "Vercel privacy ↗")}</>,
      },
      {
        k: "Email",
        v: <>If you write to {CONFIG.email}, your address and message are used to reply to you and for nothing else. They are never shared or added to a list.</>,
      },
    ],
  },
  {
    title: "Licence",
    id: "licence",
    lines: [
      {
        k: "Code",
        v: <>The source is public under the MIT licence: read it, take it apart, reuse it, and keep the notice. {ext("https://github.com/Marcus-dot/MD_portfolio/blob/main/LICENSE", "LICENSE ↗")}</>,
      },
      { k: "Words and work", v: "The writing, the CV, the case studies and the visual design are © Madalitso Daka, all rights reserved. Dashly screenshots are © Dashly Software." },
      { k: "Statue images", v: "Images made from the Marcus Aurelius scan, the share image included, are shared under CC BY-SA 3.0 FR, as its licence requires. The SMK casts are public domain, as is the Long translation." },
    ],
  },
];

export default function Credits() {
  return (
    <div className="min-h-dvh">
      <Grain />
      <header className="flex items-center justify-between px-page pt-8">
        <Link href="/" aria-label="Madalitso Daka, home" className="group flex items-center gap-3 text-text no-underline pointer-coarse:min-h-11 pointer-coarse:min-w-11">
          <Mark size={30} />
          <span className="font-mono text-[11px] tracking-[0.16em] max-[400px]:hidden">MADALITSO DAKA</span>
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
          Who and what this site is built on, what it keeps about you, and who may reuse what.
          Each statue&apos;s caption repeats its source where it hangs, and the Marcus Aurelius
          scan carries its credit everywhere it appears, as its licence asks.
        </p>
        <div className="mt-[clamp(60px,10vh,110px)] flex flex-col gap-[clamp(50px,8vh,80px)]">
          {GROUPS.map((g) => (
            <Reveal key={g.title}>
              <section id={g.id} className="scroll-mt-10">
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
