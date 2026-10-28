import Link from "next/link";
import { CONFIG } from "@/content/config";
import ArrowLink from "./ArrowLink";
import Reveal from "./Reveal";
import SectionStatue from "./statue/SectionStatue";
import { STATUES } from "@/content/statues";

const STATS: [string, string][] = [
  ["215", "delegates"],
  ["71", "live Q&A entries"],
  ["2", "app stores"],
];

const MOCK_ROWS: [string, string][] = [
  ["Live Q&A", "71 entries"],
  ["Delegates", "215 registered"],
  ["Speaker ratings", "Enabled"],
  ["Sessions", "Capacity-managed"],
];

const STORE_LINKS: [string, string][] = [
  ["App Store ↗", CONFIG.links.appStore],
  ["Google Play ↗", CONFIG.links.googlePlay],
  ["Web ↗", CONFIG.links.web],
];

export default function Flagship() {
  return (
    <div>
      <div className="relative mb-10 flex min-h-[200px] items-end max-[639px]:pt-10 justify-between gap-10">
        <Reveal className="relative z-[1]">
          <h2 className="m-0 text-[clamp(36px,5.5vw,68px)] font-semibold leading-[1.03] tracking-[-0.035em]">
            Two you can use{" "}
            <em className="font-serif font-normal italic text-accent">right now.</em>
          </h2>
        </Reveal>
        <SectionStatue statue={STATUES.hercules} className="mb-6 h-[clamp(240px,30vw,380px)] w-[clamp(200px,25vw,320px)]" />
      </div>
      <Reveal delay={0.08}>
      <div className="flex flex-wrap overflow-hidden rounded-[4px] border border-line bg-surface">
        <div className="flex-[1_1_460px] p-[clamp(36px,5vw,64px)]">
          <h3 className="mb-5 text-[clamp(40px,6vw,76px)] font-semibold leading-none tracking-[-0.04em]">
            NexVenue<span className="text-accent">.</span>
          </h3>
          <p className="max-w-[520px] text-[16.5px] leading-[1.75] text-dim">
            An event app for conferences: the agenda, live Q&A and networking
            between delegates. Built at Gralix with React Native, Expo and
            Firebase for a national insurance conference, and on both app stores.
          </p>
          <div className="my-9 flex flex-wrap gap-9">
            {STATS.map(([n, l]) => (
              <div key={l}>
                <div className="font-serif text-[44px] leading-none italic">
                  {n}
                </div>
                <div className="mt-1.5 text-[12.5px] tracking-[0.08em] text-faint uppercase">
                  {l}
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2.5">
            {STORE_LINKS.map(([b, url]) => (
              <ArrowLink
                key={b}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-[3px] border border-line px-5 py-[11px] text-[13px] font-medium text-text no-underline"
              >
                {b}
              </ArrowLink>
            ))}
          </div>
        </div>
        <div className="flex flex-[1_1_320px] items-center justify-center p-10 print:hidden">
          <div className="w-[230px] rounded-[34px] border border-line-hover bg-bg p-3.5">
            <div className="flex flex-col gap-2.5 rounded-[22px] bg-surface p-4">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-bold">NexVenue</span>
                <span className="font-mono text-[9px] tracking-[0.16em] text-accent">LIVE</span>
              </div>
              {MOCK_ROWS.map(([a, b]) => (
                <div
                  key={a}
                  className="rounded-[4px] border border-line bg-[rgba(237,240,228,0.03)] px-3.5 py-3"
                >
                  <div className="text-[12.5px] font-semibold">{a}</div>
                  <div className="mt-0.5 text-[11px] text-dim">{b}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      </Reveal>

      <Reveal delay={0.12}>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-6 rounded-[4px] border border-line bg-[rgba(237,240,228,0.02)] p-[clamp(24px,3.5vw,40px)]">
          <div className="flex-[1_1_420px]">
            <div className="mb-2.5 font-mono text-[11px] tracking-[0.12em] text-faint uppercase">
              The other one · live · co-founded
            </div>
            <h3 className="mb-3 text-[clamp(28px,3.5vw,44px)] font-semibold leading-none tracking-[-0.035em]">
              Dashly<span className="text-accent">.</span>
            </h3>
            <p className="max-w-[560px] text-[15.5px] leading-[1.7] text-dim">
              Project portfolio software for emerging markets. Every project
              gets one health score you can check the maths on, and there are
              26 industry calculators. Next.js and Supabase, live now.
            </p>
          </div>
          <div className="flex flex-col items-start gap-3">
            <ArrowLink
              href={CONFIG.links.dashly}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-[3px] border border-line px-5 py-[11px] text-[13px] font-medium text-text no-underline"
            >
              dashlyhq.com ↗
            </ArrowLink>
            <Link
              href="/dashly"
              className="font-mono pointer-coarse:py-3 text-[11px] tracking-[0.08em] text-accent no-underline"
            >
              ENTER THE DASHLY ROOM →
            </Link>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
