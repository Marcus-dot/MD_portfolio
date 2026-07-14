import { CONFIG } from "@/content/config";
import Magnetic from "./Magnetic";
import Reveal from "./Reveal";

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
      <Reveal>
        <h2 className="mb-10 text-[clamp(36px,5.5vw,68px)] font-semibold leading-[1.03] tracking-[-0.035em]">
          One product is{" "}
          <em className="font-serif font-normal italic text-accent">public.</em>
        </h2>
      </Reveal>
      <Reveal delay={0.08}>
      <div className="flex flex-wrap overflow-hidden rounded-[28px] border border-line bg-[linear-gradient(140deg,var(--musgo),var(--bg)_75%)]">
        <div className="flex-[1_1_460px] p-[clamp(36px,5vw,64px)]">
          <h3 className="mb-5 text-[clamp(40px,6vw,76px)] font-semibold leading-none tracking-[-0.04em]">
            NexVenue<span className="text-accent">.</span>
          </h3>
          <p className="max-w-[520px] text-[16.5px] leading-[1.75] text-dim">
            Event networking platform: live Q&A, session management, delegate
            networking. React Native + Expo + Firebase, shipped to both app
            stores. Delivered end-to-end for a national insurance conference.
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
              <Magnetic
                key={b}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                strength={0.2}
                className="inline-block rounded-full border border-line px-5 py-[11px] text-[13px] font-medium text-text no-underline"
              >
                {b}
              </Magnetic>
            ))}
          </div>
        </div>
        <div className="flex flex-[1_1_320px] items-center justify-center p-10 print:hidden">
          <div className="w-[230px] rounded-[34px] border border-line-hover bg-bg p-3.5 shadow-[0_50px_100px_-30px_rgba(0,0,0,0.9)]">
            <div className="flex flex-col gap-2.5 rounded-3xl bg-surface p-4">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-bold">NexVenue</span>
                <span
                  aria-hidden
                  className="h-2 w-2 rounded-full bg-accent [animation:ticker_2s_infinite]"
                />
              </div>
              {MOCK_ROWS.map(([a, b]) => (
                <div
                  key={a}
                  className="rounded-[14px] border border-line bg-[rgba(237,240,228,0.03)] px-3.5 py-3"
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
    </div>
  );
}
