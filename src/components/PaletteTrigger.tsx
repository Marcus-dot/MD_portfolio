"use client";

import { PALETTE_EVENT } from "./CommandPalette";

export default function PaletteTrigger() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(PALETTE_EVENT))}
      className="hidden cursor-pointer items-center border-none bg-transparent px-2 text-dim min-[861px]:flex"
    >
      <kbd>⌘K</kbd>
      <span className="sr-only"> command palette</span>
    </button>
  );
}
