const LINKS = ["Work", "Skills", "Method", "Contact"];

export default function Nav() {
  return (
    <header>
      <nav
        aria-label="Primary"
        className="fixed top-5 left-1/2 z-20 flex w-max max-w-[calc(100vw-24px)] -translate-x-1/2 items-center gap-1 rounded-full border border-line bg-[rgba(16,18,16,0.75)] p-[6px_8px] shadow-[0_8px_40px_-12px_rgba(0,0,0,0.8)] backdrop-blur-[20px]"
      >
        <span className="px-3.5 text-[14px] font-bold tracking-[-0.02em] whitespace-nowrap">
          MD<span className="text-accent">.</span>
        </span>
        <span className="hidden gap-1 min-[681px]:flex">
          {LINKS.map((n) => (
            <a
              key={n}
              href={`#${n.toLowerCase()}`}
              className="rounded-full px-3.5 py-2 text-[13px] font-medium whitespace-nowrap text-dim no-underline transition-colors duration-300 hover:bg-white/[0.06] hover:text-text"
            >
              {n}
            </a>
          ))}
        </span>
        <button
          type="button"
          aria-label="Open command palette"
          className="hidden cursor-pointer items-center gap-2 rounded-full border-none bg-transparent px-3.5 py-2 text-[13px] text-dim min-[681px]:flex"
        >
          <kbd>⌘K</kbd>
        </button>
        <a
          href="#contact"
          className="ml-1 inline-flex shrink-0 items-center rounded-full bg-text px-5 py-2.5 text-[13px] leading-none font-semibold whitespace-nowrap text-bg no-underline"
        >
          Let&apos;s&nbsp;talk
        </a>
      </nav>
    </header>
  );
}
