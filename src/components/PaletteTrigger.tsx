"use client";

import { PALETTE_EVENT } from "./CommandPalette";

export default function PaletteTrigger() {
  return (
    <button
      type="button"
      aria-label="Open command palette"
      onClick={() => window.dispatchEvent(new Event(PALETTE_EVENT))}
      className="hidden cursor-pointer items-center gap-2 rounded-full border-none bg-transparent px-3.5 py-2 text-[13px] text-dim min-[681px]:flex"
    >
      <kbd>⌘K</kbd>
    </button>
  );
}
