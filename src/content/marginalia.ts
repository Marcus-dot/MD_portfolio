/* References for Marginalia's footnotes. Versions are the installed ones;
   update when dependencies move. Numbers are cited by notes as [n]. */
export type Ref = { n: number; title: string; detail: string; href?: string };

export const REFS: Ref[] = [
  { n: 1, title: "Next.js 16.4.3", detail: "App Router; every route prerendered as static HTML.", href: "https://nextjs.org" },
  { n: 2, title: "Framer Motion 12.42", detail: "useScroll drives the scroll-typing, the CV timeline and the progress line.", href: "https://motion.dev" },
  { n: 3, title: "Tailwind CSS 4.3 and React 19.2", detail: "Styling as utilities; design tokens as CSS variables in globals.css.", href: "https://tailwindcss.com" },
  { n: 4, title: "Typefaces, self-hosted with next/font, SIL Open Font License", detail: "Inter Tight (Rasmus Andersson); Instrument Serif (Rodrigo Fuenzalida, Jordan Egstad); JetBrains Mono (JetBrains, Philipp Nurullin, Konstantin Bulenkov); Caveat (Impallari Type) for these notes, loaded only when Marginalia is on; Syne (Bonjour Monde, Lucas Descroix, George Triantafyllakos) in the Dashly room." },
  { n: 5, title: "Bust of Marcus Aurelius, MAH Geneva inv. 19050", detail: "3D scan by Rama, Wikimedia Commons, CC BY-SA 3.0 FR.", href: "https://commons.wikimedia.org/wiki/File:Bust_of_Marcus_Aurelus-MAHG_19050-High_poly-001.stl" },
  { n: 6, title: "SMK Royal Cast Collection, Copenhagen", detail: "Public-domain 3D scans of plaster casts: the other fifteen statues.", href: "https://api.smk.dk" },
  { n: 7, title: "Marcus Aurelius, Meditations, tr. George Long (1862)", detail: "Public domain; every quoted line checked word for word against Project Gutenberg #15877.", href: "https://www.gutenberg.org/ebooks/15877" },
  { n: 8, title: "Lighthouse 12.8.2", detail: "Measured 27 October 2026 on the production build; full table in the README." },
  { n: 9, title: "scripts/statue/bake.mjs", detail: "Rasterises each scan offline (Node.js, ImageMagick for PNG) into surface directions and depth: the cell map." },
  { n: 10, title: "scripts/dashly-ledger.mjs", detail: "Counts commits, lines, tests and migrations from Dashly's private repository; only the numbers are published." },
  { n: 11, title: "daoho.dev, by Dao Ho", detail: "The inspiration for one living, playful centrepiece and for typed opening lines on every page.", href: "https://www.daoho.dev" },
];
