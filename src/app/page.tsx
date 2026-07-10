export default function Home() {
  return (
    <main className="flex min-h-dvh flex-col justify-end p-[clamp(20px,6vw,100px)]">
      <p className="font-mono text-[11px] tracking-[0.2em] text-faint">
        MADALITSO DAKA — PORTFOLIO / PHASE 0
      </p>
      <h1 className="mt-6 text-[clamp(56px,11.5vw,164px)] font-bold uppercase leading-[0.92] tracking-[-0.045em]">
        Madalitso
        <br />
        Daka
        <em className="font-serif font-normal italic normal-case tracking-[-0.02em] text-accent">
          .
        </em>
      </h1>
      <p className="mt-9 max-w-[420px] text-[16.5px] leading-[1.7] text-dim">
        Engineer in Lusaka. I build, audit and ship software that{" "}
        <em className="font-serif italic text-text">holds up in production</em>{" "}
        — for finance, telecoms and research.
      </p>
    </main>
  );
}
