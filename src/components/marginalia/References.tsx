import { REFS } from "@/content/marginalia";

/* The bibliography the footnotes point to. Only shown with Marginalia on. */
export default function References() {
  return (
    <section id="references" className="mg border-t border-dashed border-[var(--blueprint)] px-page py-[clamp(70px,10vh,110px)]">
      <div className="mg-note mb-2" style={{ fontSize: 30 }}>
        <span className="mg-line" style={{ "--t": "0.8s" } as React.CSSProperties}>
          References
        </span>
      </div>
      <div className="mg-note mb-6 max-w-[560px]" style={{ fontSize: 21, transform: "rotate(-1deg)" }}>
        <span className="mg-line" style={{ "--d": "0.9s", "--t": "1.2s" } as React.CSSProperties}>
          Coming soon: these notes are in Caveat, a stand-in font.
        </span>
        <span className="mg-line" style={{ "--d": "2.2s", "--t": "1.2s" } as React.CSSProperties}>
          I&apos;m scanning my own handwriting, and every note on
        </span>
        <span className="mg-line" style={{ "--d": "3.5s", "--t": "0.9s" } as React.CSSProperties}>
          this site will be redone in my hand. [4]
        </span>
      </div>
      <p className="mt-0 mb-10 font-mono text-[11px] tracking-[0.12em] text-[rgba(150,195,230,0.95)]">
        WHAT THIS SITE IS MADE OF, AND WHERE ITS CLAIMS COME FROM
      </p>
      <ol className="m-0 grid list-none gap-x-12 gap-y-6 p-0 min-[900px]:grid-cols-2">
        {REFS.map((r) => (
          <li key={r.n} id={`ref-${r.n}`} className="flex scroll-mt-24 gap-4">
            <span className="w-7 shrink-0 font-mono text-[12px] text-[var(--pen)]">[{r.n}]</span>
            <span className="text-[14.5px] leading-[1.6] text-dim">
              {r.href ? (
                <a href={r.href} target="_blank" rel="noopener noreferrer" className="text-text no-underline hover:text-[var(--pen)] pointer-coarse:inline-block pointer-coarse:py-3 pointer-coarse:-my-3">
                  {r.title}
                </a>
              ) : (
                <span className="text-text">{r.title}</span>
              )}
              . {r.detail}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
