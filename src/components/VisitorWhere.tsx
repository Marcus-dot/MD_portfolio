"use client";

import { useEffect, useState } from "react";
import Note from "./marginalia/Note";

const LUSAKA = { lat: -15.3875, lon: 28.3228 };

// great-circle distance in km
function km(lat: number, lon: number) {
  const r = (d: number) => (d * Math.PI) / 180;
  const dLat = r(lat - LUSAKA.lat), dLon = r(lon - LUSAKA.lon);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(r(LUSAKA.lat)) * Math.cos(r(lat)) * Math.sin(dLon / 2) ** 2;
  return 6371 * 2 * Math.asin(Math.sqrt(a));
}

// minutes east of UTC for a time zone, right now
function offset(tz: string) {
  const d = new Date();
  const local = new Date(d.toLocaleString("en-US", { timeZone: tz }));
  const utc = new Date(d.toLocaleString("en-US", { timeZone: "UTC" }));
  return Math.round((local.getTime() - utc.getTime()) / 60000);
}

function aheadLine(tz: string) {
  const diff = (offset("Africa/Lusaka") - offset(tz)) / 60;
  if (Math.abs(diff) < 0.25) return "Same time as Lusaka";
  const h = Math.abs(diff);
  const n = Number.isInteger(h) ? String(h) : h.toFixed(1);
  return `Lusaka is ${n} h ${diff > 0 ? "ahead" : "behind"}`;
}

type Where = { place: string; far: string | null; time: string };

/* "You · reading from": the visitor's rough location, echoed back to them
   only (see /api/where), with how far that is from Lusaka and the time
   difference, which is what you need to book a call. Space is reserved,
   so nothing moves when it arrives. */
export default function VisitorWhere() {
  const [where, setWhere] = useState<Where | null>(null);

  useEffect(() => {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    let off = false;
    // without a server answer, the browser's own time zone still says something true
    const fromZone = (): Where | null => {
      if (!tz || !tz.includes("/")) return null;
      return { place: tz.split("/").pop()!.replace(/_/g, " "), far: null, time: aheadLine(tz) };
    };
    fetch("/api/where")
      .then((r) => (r.ok ? r.json() : null))
      .catch(() => null)
      .then((g: { city: string | null; country: string; lat: number; lon: number; tz: string | null } | null) => {
        if (off) return;
        if (!g) return setWhere(fromZone());
        const country = new Intl.DisplayNames(["en"], { type: "region" }).of(g.country) ?? g.country;
        const d = km(g.lat, g.lon);
        const place = g.city ? `${g.city}, ${country}` : country;
        const near = d < 40 ? "Right here in Lusaka" : `${Math.round(d).toLocaleString("en-GB")} km from Lusaka`;
        setWhere({ place, far: near, time: aheadLine(g.tz || tz) });
      });
    return () => {
      off = true;
    };
  }, []);

  return (
    <div
      className="relative flex flex-col border-l border-line pl-8 transition-[clip-path] duration-700 ease-(--ease) max-[640px]:basis-full max-[640px]:border-l-0 max-[640px]:border-t max-[640px]:pt-4 max-[640px]:pl-0"
      style={{ clipPath: where ? "inset(-40px -400px -40px -1px)" : "inset(0 0 100% 0)" }}
      aria-hidden={!where}
    >
      <Note
        className="top-[-6px] left-[calc(100%+28px)] w-[300px] max-[1279px]:!hidden"
        rotate={1}
        delay={3.4}
        size={19}
        lines={["From your IP address, by Vercel's edge.", "It comes back to you and is never stored.", "If it can't tell, it uses your time zone."]}
        refs={[14]}
      />
      <div className="mb-3 font-mono text-[10.5px] tracking-[0.2em] text-faint">YOU · READING FROM</div>
      <p className="m-0 mt-auto max-w-[240px] text-[15px] leading-[1.45] text-text">
        {where?.place ?? "Somewhere"}
        {where?.far && (
          <span className="mt-1 block font-mono text-[10.5px] tracking-[0.06em] text-faint">{where.far}</span>
        )}
        <span className="block font-mono text-[10.5px] tracking-[0.06em] text-faint">
          {where?.time ?? "Working it out"}
        </span>
      </p>
    </div>
  );
}
