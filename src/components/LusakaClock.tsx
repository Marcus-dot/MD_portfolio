"use client";

import { useEffect, useState } from "react";

export default function LusakaClock() {
  const [t, setT] = useState("");
  useEffect(() => {
    const tick = () =>
      setT(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZone: "Africa/Lusaka",
        }).format(new Date()),
      );
    tick();
    const i = setInterval(tick, 1000);
    return () => clearInterval(i);
  }, []);
  return (
    <span className="font-mono text-[11px] tracking-[0.1em] text-dim">
      LUSAKA <span className="text-accent">{t}</span> CAT
    </span>
  );
}
