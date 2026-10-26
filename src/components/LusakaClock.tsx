"use client";

import { useEffect, useState } from "react";

const fmt = () =>
  new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "Africa/Lusaka",
  }).format(new Date());

function useLusakaTime() {
  const [t, setT] = useState("");
  useEffect(() => {
    const tick = () => setT(fmt());
    tick();
    const i = setInterval(tick, 1000);
    return () => clearInterval(i);
  }, []);
  return t;
}

/* "display": the hero's large serif clock - hours and minutes set big,
   seconds ticking small beside them. Placeholder dashes hold the width
   until the client clock mounts, so nothing shifts. */
export default function LusakaClock({ size = "small" }: { size?: "small" | "display" }) {
  const t = useLusakaTime();

  if (size === "display") {
    const [hh = "--", mm = "--", ss = "--"] = t ? t.split(":") : [];
    return (
      <span className="flex items-start gap-2" aria-label={t ? `Lusaka time ${hh}:${mm}` : undefined}>
        <span className="font-serif text-[clamp(44px,5.4vw,72px)] leading-[0.9] italic tabular-nums">
          {hh}
          <span className="text-faint">:</span>
          {mm}
        </span>
        <span className="mt-1.5 flex flex-col gap-1 font-mono text-[11px] leading-none tracking-[0.12em]">
          <span className="text-accent tabular-nums">{ss}</span>
          <span className="text-faint">CAT</span>
        </span>
      </span>
    );
  }

  return (
    <span className="font-mono text-[11px] tracking-[0.1em] text-dim">
      LUSAKA <span className="text-accent">{t}</span> CAT
    </span>
  );
}
