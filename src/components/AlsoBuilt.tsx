import { BUILDS } from "@/content/builds";
import Reveal from "./Reveal";

/* The rest of the work as a museum register, not a wall of cards: an
   accession number, the name and its materials, then the description. */
export default function AlsoBuilt() {
  return (
    <div className="mt-[100px]">
      <div className="mb-5 flex items-baseline justify-between font-mono text-[11px] tracking-[0.2em] text-faint">
        ALSO BUILT · THE REGISTER
        <span className="tracking-[0.1em]">{String(BUILDS.length).padStart(2, "0")} ENTRIES</span>
      </div>
      <ol className="m-0 list-none border-t border-line-hover p-0">
        {BUILDS.map((b, i) => (
          <li key={b.t} className="border-b border-line">
            <Reveal delay={Math.min(i, 3) * 0.06}>
              <div className="group grid gap-x-8 gap-y-2 py-7 transition-colors duration-500 min-[900px]:grid-cols-[70px_minmax(240px,1fr)_minmax(0,2fr)]">
                <span className="font-mono text-[11px] tracking-[0.14em] text-faint transition-colors duration-500 group-hover:text-accent min-[900px]:pt-1.5">
                  ACC. {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <div className="text-[19px] font-semibold tracking-[-0.02em]">{b.t}</div>
                  <div className="mt-1.5 font-mono text-[10.5px] tracking-[0.08em] text-accent">{b.stack}</div>
                </div>
                <p className="m-0 max-w-[640px] text-[14.5px] leading-[1.7] text-dim">{b.d}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </div>
  );
}
