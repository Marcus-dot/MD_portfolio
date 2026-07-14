"use client";

import { useEffect, useRef, useState } from "react";
import { CONFIG } from "@/content/config";
import { toast } from "./Toast";

export const PALETTE_EVENT = "md:palette-toggle";

type Command = {
  k: string;
  hint: string;
  href?: string;
  external?: string;
  action?: "email";
};

const COMMANDS: Command[] = [
  { k: "Go to Work", hint: "flagship + case outlines", href: "#work" },
  { k: "Go to Skills", hint: "capability grid", href: "#skills" },
  { k: "Go to Method", hint: "operating principles", href: "#method" },
  { k: "Contact", hint: "open channel", href: "#contact" },
  { k: "Open GitHub", hint: "github.com/Marcus-dot", external: CONFIG.links.github },
  { k: "Open LinkedIn", hint: "profile", external: CONFIG.links.linkedin },
  { k: "Copy email", hint: CONFIG.email, action: "email" },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    const onToggle = () => setOpen((o) => !o);
    window.addEventListener("keydown", onKey);
    window.addEventListener(PALETTE_EVENT, onToggle);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(PALETTE_EVENT, onToggle);
    };
  }, []);

  if (!open) return null;
  return <Panel close={() => setOpen(false)} />;
}

/* Mounted only while open, so search state resets on each open and the
   focus-restore lives in the effect cleanup. */
function Panel({ close }: { close: () => void }) {
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const restore = document.activeElement as HTMLElement | null;
    const t = setTimeout(() => inputRef.current?.focus(), 50);
    return () => {
      clearTimeout(t);
      restore?.focus?.();
    };
  }, []);

  const list = COMMANDS.filter((c) =>
    c.k.toLowerCase().includes(q.toLowerCase()),
  );

  const run = (c: Command) => {
    if (c.action === "email") {
      navigator.clipboard?.writeText(CONFIG.email);
      toast("EMAIL COPIED");
    } else if (c.external) {
      window.open(c.external, "_blank", "noopener,noreferrer");
    } else if (c.href) {
      document.querySelector(c.href)?.scrollIntoView({ behavior: "smooth" });
    }
    close();
  };

  const trapTab = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      setSel((s) => {
        if (list.length === 0) return 0;
        const next = e.key === "ArrowDown" ? s + 1 : s - 1;
        return (next + list.length) % list.length;
      });
      return;
    }
    if (e.key === "Enter" && list[sel]) {
      e.preventDefault();
      run(list[sel]);
      return;
    }
    if (e.key !== "Tab" || !panelRef.current) return;
    const focusables = panelRef.current.querySelectorAll<HTMLElement>(
      "input, button, [href]",
    );
    if (focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return (
    <div
      onClick={close}
      className="fixed inset-0 z-[60] flex justify-center bg-[rgba(5,6,5,0.7)] pt-[18vh] backdrop-blur-[8px]"
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={trapTab}
        className="h-fit w-[min(560px,92vw)] overflow-hidden rounded-[20px] border border-line-hover bg-surface shadow-[0_40px_120px_-20px_rgba(0,0,0,0.9),0_0_80px_-30px_rgba(155,201,126,0.3)] [animation:fadeUp_.35s_var(--ease)_both]"
      >
        <input
          ref={inputRef}
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setSel(0);
          }}
          placeholder="Where to? Try 'work'…"
          className="w-full border-0 border-b border-solid border-b-line bg-transparent px-6 py-5 text-[17px] text-text outline-none"
        />
        {list.map((c, i) => (
          <button
            key={c.k}
            type="button"
            onClick={() => run(c)}
            onMouseEnter={() => setSel(i)}
            data-selected={i === sel || undefined}
            className={`flex w-full cursor-pointer items-center justify-between border-none bg-transparent px-6 py-[15px] text-[15px] text-text transition-colors focus-visible:bg-[rgba(155,201,126,0.06)] ${
              i === sel ? "bg-[rgba(155,201,126,0.06)]" : ""
            }`}
          >
            <span>{c.k}</span>
            <span className="font-mono text-[12px] text-faint">{c.hint}</span>
          </button>
        ))}
        <div className="border-t border-line px-6 py-3 font-mono text-[11px] text-faint">
          ↵ select · esc close · works like my software: navigable,
          instrumented, fast
        </div>
      </div>
    </div>
  );
}
