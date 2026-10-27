/* References for Marginalia's footnotes. Versions are the installed ones;
   update when dependencies move. Numbers are cited by notes as [n]. */
export type Ref = { n: number; title: string; detail: string; href?: string };

export const REFS: Ref[] = [
  { n: 1, title: "Next.js 16.4.3", detail: "App Router; every route prerendered as static HTML.", href: "https://nextjs.org" },
  { n: 2, title: "Framer Motion 12.42", detail: "useScroll drives the scroll-typing, the CV timeline and the progress line.", href: "https://motion.dev" },
  { n: 3, title: "Tailwind CSS 4.3 and React 19.2", detail: "Styling as utilities; design tokens as CSS variables in globals.css.", href: "https://tailwindcss.com" },
  { n: 4, title: "Typefaces, self-hosted with next/font", detail: "Inter Tight, Instrument Serif, JetBrains Mono; Caveat for these notes, loaded only when Marginalia is on." },
  { n: 5, title: "Bust of Marcus Aurelius, MAH Geneva inv. 19050", detail: "3D scan by Rama, Wikimedia Commons, CC BY-SA 3.0 FR.", href: "https://commons.wikimedia.org/wiki/File:Bust_of_Marcus_Aurelus-MAHG_19050-High_poly-001.stl" },
  { n: 6, title: "SMK Royal Cast Collection, Copenhagen", detail: "Public-domain 3D scans of plaster casts: the other fifteen statues.", href: "https://api.smk.dk" },
  { n: 7, title: "Marcus Aurelius, Meditations, tr. George Long (1862)", detail: "Public domain; every quoted line checked word for word against Project Gutenberg #15877.", href: "https://www.gutenberg.org/ebooks/15877" },
  { n: 8, title: "Lighthouse 12.8.2", detail: "Measured 27 October 2026 on the production build; full table in the README." },
  { n: 9, title: "scripts/statue/bake.mjs", detail: "Rasterises each scan offline (Node.js, ImageMagick for PNG) into surface directions and depth: the cell map." },
];
