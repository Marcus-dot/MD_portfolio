"use client";

import { useState } from "react";
import type { Claim } from "@/content/claims";

export default function FlipCard({ claim }: { claim: Claim }) {
  const [flipped, setFlipped] = useState(false);
  const toggle = () => setFlipped((f) => !f);
  return (
    <div
      className={`flip h-[340px] cursor-pointer ${flipped ? "flipped" : ""}`}
      data-cursor="FLIP"
      role="button"
      tabIndex={0}
      aria-label={`${claim.t} — press to flip and see evidence`}
      onClick={toggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggle();
        }
      }}
    >
      <div className="flip-inner">
        <div className="flip-face bg-bg">
          <div className="mb-3.5 text-[12px] tracking-[0.12em] text-faint uppercase">
            {claim.sub}
          </div>
          <h3 className="mb-3.5 text-[26px] font-semibold tracking-[-0.025em]">
            {claim.t}
          </h3>
          <p className="text-[15px] leading-[1.7] text-dim">{claim.front}</p>
          <div className="absolute bottom-[26px] left-[30px] font-mono text-[11px] text-accent">
            FLIP FOR EVIDENCE ⟲
          </div>
        </div>
        <div className="flip-face rotate-y-180 bg-musgo">
          <div className="mb-5 font-mono text-[11px] tracking-[0.15em] text-accent">
            EVIDENCE TRAIL
          </div>
          {claim.back.map((b) => (
            <div key={b} className="mb-4 flex items-start gap-3">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                aria-hidden
                className="mt-[3px] shrink-0"
              >
                <circle
                  cx="8"
                  cy="8"
                  r="7"
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="1.2"
                />
                <path
                  d="M5 8.3l2.2 2.2 3.8-4.4"
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="1.4"
                />
              </svg>
              <span className="text-[14px] leading-[1.55] text-text">{b}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
