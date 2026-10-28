import Link from "next/link";
import { CONFIG } from "@/content/config";
import LEDGER from "@/content/dashly-ledger.json";
import Reveal from "./Reveal";
import SectionStatue from "./statue/SectionStatue";
import { STATUES } from "@/content/statues";
import Note from "./marginalia/Note";

type Row = [string, React.ReactNode];

const ext = (href: string, label: string) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="whitespace-nowrap text-text underline decoration-line-hover underline-offset-4 transition-colors hover:text-accent pointer-coarse:py-2 pointer-coarse:inline-block pointer-coarse:py-3 pointer-coarse:-my-3"
  >
    {label}
  </a>
);

/* The two public products, hung like the Cast Room: a number, a name, a line,
   and a museum label of plain facts. No mock-ups: what's here is true. */
const EXHIBITS: { no: string; name: string; line: string; rows: Row[] }[] = [
  {
    no: "01",
    name: "NexVenue",
    line: "An event app for conferences: the agenda, live Q&A and networking between delegates.",
    rows: [
      ["Object", "Event app, iOS and Android"],
      ["Made with", "React Native · Expo · Firebase"],
      ["Made at", "Gralix Technologies"],
      ["Shown at", "IAZ Annual Insurance Conference, 2026"],
      ["Visitors", "215 delegates · 71 live questions"],
      [
        "See it",
        <span key="s" className="flex flex-wrap gap-x-4 gap-y-1">
          {ext(CONFIG.links.appStore, "App Store ↗")}
          {ext(CONFIG.links.googlePlay, "Google Play ↗")}
          {ext(CONFIG.links.web, "Web ↗")}
        </span>,
      ],
    ],
  },
  {
    no: "02",
    name: "Dashly",
    line: "Project portfolio software for emerging markets. Every project gets one health score you can check by hand.",
    rows: [
      ["Object", "Multi-tenant web app"],
      ["Made with", "Next.js · Supabase · Claude"],
      ["Made by", "Dashly Software, which I co-founded"],
      ["Status", "In production"],
      ["In numbers", `${LEDGER.calculators} calculators · ${LEDGER.testCases.toLocaleString("en-GB")} tests`],
      [
        "See it",
        <span key="s" className="flex flex-wrap gap-x-4 gap-y-1">
          {ext(CONFIG.links.dashly, "dashlyhq.com ↗")}
          <Link
            href="/dashly"
            className="whitespace-nowrap text-accent no-underline transition-colors hover:text-text pointer-coarse:inline-block pointer-coarse:py-3 pointer-coarse:-my-3"
          >
            The Dashly room →
          </Link>
        </span>,
      ],
    ],
  },
];

export default function Flagship() {
  return (
    <div>
      <div className="relative mb-[clamp(40px,6vh,70px)] flex min-h-[200px] items-end justify-between gap-10 max-[639px]:pt-10 max-[1100px]:flex-wrap max-[1100px]:gap-y-0">
        <Reveal className="relative z-[1]">
          <div className="mb-4 font-mono text-[11px] tracking-[0.2em] text-faint">ROOM 01 · WORK</div>
          <h2 className="m-0 text-[clamp(36px,5.5vw,68px)] font-semibold leading-[1.03] tracking-[-0.035em]">
            Two in production.
          </h2>
        </Reveal>
        <Note
          className="bottom-[10px] left-[clamp(560px,46vw,700px)] max-w-[340px] max-[1100px]:!static max-[1100px]:order-last max-[1100px]:basis-full max-[1100px]:mt-4"
          rotate={-1}
          size={19}
          lines={["There used to be a phone mock-up here. Its", "screens were made up, so it's a label of", "facts now, like the Cast Room."]}
        />
        <SectionStatue statue={STATUES.hercules} className="mb-6 h-[clamp(240px,30vw,380px)] w-[clamp(200px,25vw,320px)]" />
      </div>
      <div className="grid gap-x-[clamp(40px,6vw,96px)] gap-y-16 min-[900px]:grid-cols-2">
        {EXHIBITS.map((ex, i) => (
          <Reveal key={ex.name} delay={i * 0.08}>
            <article className="border-t border-line-hover pt-7">
              <div className="flex items-baseline gap-5">
                <span className="font-serif text-[clamp(40px,4.5vw,56px)] leading-none italic text-faint tabular-nums">
                  {ex.no}
                </span>
                <h3 className="m-0 text-[clamp(40px,5.5vw,72px)] font-semibold leading-none tracking-[-0.04em]">
                  {ex.name}
                  <span className="text-accent">.</span>
                </h3>
              </div>
              <p className="mt-5 mb-8 max-w-[460px] text-[16px] leading-[1.7] text-dim">{ex.line}</p>
              {/* the museum label */}
              <dl className="m-0 border-t border-line">
                {ex.rows.map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[110px_1fr] gap-4 border-b border-line py-3">
                    <dt className="pt-[3px] font-mono text-[10px] max-[639px]:text-[11px] tracking-[0.16em] text-faint uppercase">{k}</dt>
                    <dd className="m-0 text-[14.5px] leading-[1.55] text-text">{v}</dd>
                  </div>
                ))}
              </dl>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
