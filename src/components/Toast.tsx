"use client";

import { useEffect, useRef, useState } from "react";

export const TOAST_EVENT = "md:toast";

export function toast(message: string) {
  window.dispatchEvent(new CustomEvent(TOAST_EVENT, { detail: message }));
}

/** Minimal mono-styled confirmation chip, bottom-centre, self-dismissing. */
export default function Toast() {
  const [msg, setMsg] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const on = (e: Event) => {
      setMsg((e as CustomEvent<string>).detail);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setMsg(null), 2200);
    };
    window.addEventListener(TOAST_EVENT, on);
    return () => {
      window.removeEventListener(TOAST_EVENT, on);
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  if (!msg) return null;
  return (
    <div
      role="status"
      className="fixed bottom-8 left-1/2 z-[90] -translate-x-1/2 rounded-full border border-line-hover bg-surface px-5 py-2.5 font-mono text-[11px] tracking-[0.14em] text-accent [animation:fadeUp_.3s_var(--ease)_both]"
    >
      {msg}
    </div>
  );
}
