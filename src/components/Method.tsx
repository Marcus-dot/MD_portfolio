import { PRINCIPLES } from "@/content/principles";

export default function Method() {
  return (
    <section id="method" className="px-page py-[clamp(90px,14vh,160px)]">
      <h2 className="mb-[50px] text-[clamp(36px,5.5vw,68px)] font-semibold leading-[1.03] tracking-[-0.035em]">
        Four rules,{" "}
        <em className="font-serif font-normal italic text-dim">
          zero exceptions.
        </em>
      </h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-[18px]">
        {PRINCIPLES.map((p, i) => (
          <div
            key={p.t}
            className="h-full rounded-3xl border border-line bg-surface px-7 py-[30px]"
          >
            <div className="mb-5 font-serif text-[40px] leading-none italic text-accent">
              0{i + 1}
            </div>
            <div className="mb-2.5 text-[19px] font-semibold tracking-[-0.02em]">
              {p.t}
            </div>
            <p className="m-0 text-[14px] leading-[1.65] text-dim">{p.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
