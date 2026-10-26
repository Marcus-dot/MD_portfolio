"use client";

import { PALETTE_EVENT } from "./CommandPalette";

export default function PaletteTrigger() {
  return (
    <button
      type="button"
      aria-label="Open command palette"
      onClick={() => window.dispatchEvent(new Event(PALETTE_EVENT))}
      className="hidden cursor-pointer items-center border-none bg-transparent p-0 text-dim min-[861px]:flex"
    >
      <kbd>⌘K</kbd>
    </button>
  );
}
