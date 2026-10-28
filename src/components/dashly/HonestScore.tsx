"use client";

import { useState } from "react";

/*
 * A simplified re-creation of how Dashly Sense scores a project: five
 * dimensions, each scored 0-100, combined with fixed weights. Written for this
 * page from the published method, not copied from Dashly's (private) code;
 * production Sense reads more signals, including real milestones and dates.
 */

type Inputs = { elapsed: number; done: number; spent: number; risk: number; idle: number };

const clamp = (v: number) => Math.max(0, Math.min(100, Math.round(v)));

const DIMENSIONS = [
  { id: "schedule", name: "Schedule", weight: 0.25 },
  { id: "budget", name: "Budget", weight: 0.25 },
  { id: "risk", name: "Risk", weight: 0.2 },
  { id: "progress", name: "Progress", weight: 0.15 },
  { id: "activity", name: "Activity", weight: 0.15 },
] as const;

function score(i: Inputs) {
  const behind = Math.max(0, i.elapsed - i.done);
  const overrun = Math.max(0, i.spent - i.elapsed);
  const parts: Record<(typeof DIMENSIONS)[number]["id"], number> = {
    schedule: clamp(100 - behind * 2),
    budget: clamp(100 - overrun * 2.5 - Math.max(0, i.spent - 100) * 1.5),
    risk: clamp(100 - i.risk),
    progress: i.elapsed < 5 ? 100 : clamp((i.done / i.elapsed) * 100),
    activity: i.idle <= 3 ? 100 : clamp(100 - (i.idle - 3) * 4),
  };
  const total = clamp(DIMENSIONS.reduce((s, d) => s + parts[d.id] * d.weight, 0));
  // Dashly's own status bands
  const status =
    total >= 80 ? "Excellent" : total >= 65 ? "Good" : total >= 45 ? "Fair" : total >= 25 ? "Poor" : "Critical";

  const signals: [number, string][] = [];
  if (behind > 0) signals.push([parts.schedule, `Milestones are ${behind} points behind the clock.`]);
  if (overrun > 0) signals.push([parts.budget, `Spend is running ${overrun} points ahead of the schedule.`]);
  if (i.risk >= 40) signals.push([parts.risk, `Risk is rated ${i.risk} out of 100.`]);
  if (i.idle > 7) signals.push([parts.activity, `Nobody has updated it in ${i.idle} days.`]);
  signals.sort((a, b) => a[0] - b[0]);

  return { parts, total, status, signals: signals.slice(0, 2).map((s) => s[1]) };
}

const tone = (v: number) => (v >= 65 ? "#4ade80" : v >= 45 ? "#f59e0b" : "#ef4444");

const PRESETS: [string, Inputs][] = [
  ["On track", { elapsed: 50, done: 55, spent: 48, risk: 20, idle: 2 }],
  ["Over budget", { elapsed: 45, done: 40, spent: 78, risk: 35, idle: 4 }],
  ["Gone quiet", { elapsed: 70, done: 35, spent: 66, risk: 55, idle: 26 }],
];

const SLIDERS: { key: keyof Inputs; label: string; max: number; unit: string }[] = [
  { key: "elapsed", label: "Time elapsed", max: 100, unit: "%" },
  { key: "done", label: "Milestones done", max: 100, unit: "%" },
  { key: "spent", label: "Budget spent", max: 150, unit: "%" },
  { key: "risk", label: "Risk rating", max: 100, unit: "/100" },
  { key: "idle", label: "Days since an update", max: 45, unit: "d" },
];

export default function HonestScore() {
  const [inp, setInp] = useState<Inputs>(PRESETS[1][1]);
  const r = score(inp);

  return (
    <div className="grid gap-x-[clamp(32px,6vw,90px)] gap-y-12 min-[960px]:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      {/* the project you're scoring */}
      <div>
        <div className="mb-6 flex flex-wrap gap-2">
          {PRESETS.map(([name, p]) => (
            <button
              key={name}
              type="button"
              onClick={() => setInp(p)}
              className="cursor-pointer rounded-[3px] border border-line bg-transparent px-3.5 py-1.5 font-mono text-[11px] tracking-[0.08em] text-dim transition-colors hover:border-[#A56ABD] hover:text-text pointer-coarse:min-h-11 pointer-coarse:py-2.5"
            >
              {name}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-6">
          {SLIDERS.map((s) => (
            <label key={s.key} className="block">
              <span className="mb-2 flex items-baseline justify-between font-mono text-[11px] tracking-[0.12em] text-dim uppercase">
                {s.label}
                <span className="text-text tabular-nums">
                  {inp[s.key]}
                  {s.unit}
                </span>
              </span>
              <input
                type="range"
                min={0}
                max={s.max}
                value={inp[s.key]}
                onChange={(e) => setInp({ ...inp, [s.key]: Number(e.target.value) })}
                className="dashly-range w-full cursor-pointer"
              />
            </label>
          ))}
        </div>
      </div>

      {/* what Dashly would tell you */}
      <div aria-live="polite" className="border-t border-line pt-8 min-[960px]:border-t-0 min-[960px]:border-l min-[960px]:pt-0 min-[960px]:pl-[clamp(32px,4vw,60px)]">
        <div className="flex items-end gap-5">
          <span className="font-[family-name:var(--font-syne)] text-[clamp(84px,11vw,150px)] leading-[0.85] font-bold tabular-nums">
            {r.total}
          </span>
          <span className="mb-3 font-mono text-[12px] tracking-[0.16em] uppercase" style={{ color: tone(r.total) }}>
            {r.status}
          </span>
        </div>
        <div className="mt-8 flex flex-col gap-3.5">
          {DIMENSIONS.map((d) => {
            const v = r.parts[d.id];
            return (
              <div key={d.id} className="grid grid-cols-[96px_1fr_34px] items-center gap-4">
                <span className="font-mono text-[10.5px] tracking-[0.12em] text-dim uppercase">
                  {d.name}
                  <span className="ml-1.5 text-faint">{Math.round(d.weight * 100)}%</span>
                </span>
                <span className="h-[3px] bg-line">
                  <span
                    className="block h-full transition-[width,background-color] duration-500 ease-(--ease)"
                    style={{ width: `${v}%`, background: tone(v) }}
                  />
                </span>
                <span className="text-right font-mono text-[12px] tabular-nums">{v}</span>
              </div>
            );
          })}
        </div>
        <ul className="mt-8 flex list-none flex-col gap-2 p-0">
          {(r.signals.length ? r.signals : ["Nothing needs you today."]).map((s) => (
            <li key={s} className="flex gap-3 text-[14.5px] leading-[1.6] text-dim">
              <span aria-hidden className="mt-[11px] h-px w-3 shrink-0 bg-[#A56ABD]" />
              {s}
            </li>
          ))}
        </ul>
        <p className="mt-8 mb-0 max-w-[460px] font-mono text-[10.5px] leading-[1.8] tracking-[0.04em] text-faint">
          A simplified re-creation of the Dashly Sense method, written for this page. Production
          Sense reads real milestones, dates and spend, and scores more signals.
        </p>
      </div>
    </div>
  );
}
