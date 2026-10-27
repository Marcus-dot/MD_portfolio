import Taped from "./Taped";

/* Process photos taped in after the manifesto: the real files behind the
   hero statue. Only shown with Marginalia on. */
export default function Workbench() {
  return (
    <section
      aria-label="From the workbench"
      className="mg relative border-t border-dashed border-[var(--blueprint)] px-page py-[clamp(60px,9vh,100px)]"
    >
      <p className="mt-0 mb-12 font-mono text-[11px] tracking-[0.12em] text-[rgba(150,195,230,0.95)]">
        FROM THE WORKBENCH · THE FILES BEHIND THE HERO STATUE
      </p>
      <div className="flex flex-wrap items-start gap-x-[clamp(40px,7vw,110px)] gap-y-14">
        <Taped
          src="/marginalia/cell-map.webp"
          w={432}
          h={456}
          alt="Marcus Aurelius as a cell map: a colourful image where red and green encode which way each patch of surface faces and blue encodes depth"
          caption={["What your browser downloads for Marcus:", "red and green say which way each patch faces,", "blue how near it is. 25 KB. [9]"]}
          rotate={-2}
          className="w-[min(300px,80vw)]"
        />
        <Taped
          src="/marginalia/turntable.webp"
          w={1370}
          h={290}
          alt="Five grey renders of the Marcus Aurelius bust turning from left to right"
          caption={["Five of the 25 baked angles, -60° to +60°.", "The head turn picks the nearest one", "to wherever your pointer is."]}
          rotate={1.5}
          className="w-[min(640px,90vw)] min-[900px]:mt-16"
        />
      </div>
    </section>
  );
}
