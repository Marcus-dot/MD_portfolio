import type { Statue } from "@/content/statues";
import StatueCanvas from "./StatueCanvas";

/* A quieter statue that sits beside a section heading: lamp only wakes when
   the pointer comes close. On phones it drops behind the heading, dimmed,
   like the hero. The parent row must be `relative`. Hidden in print. */
export default function SectionStatue({
  statue,
  className = "",
}: {
  statue: Statue;
  className?: string;
}) {
  return (
    <figure
      className={`relative m-0 shrink-0 print:hidden max-[639px]:pointer-events-none max-[639px]:!absolute max-[639px]:right-[-6px] max-[639px]:bottom-0 max-[639px]:z-0 max-[639px]:!mb-0 max-[639px]:!h-[230px] max-[639px]:!w-[170px] max-[639px]:opacity-55 ${className}`}
    >
      <StatueCanvas src={statue.src} label={statue.label} targetCell={4} />
      <figcaption className="absolute right-0 -bottom-6 max-[639px]:hidden font-mono text-[9.5px] tracking-[0.16em] whitespace-nowrap text-faint">
        {statue.caption}
      </figcaption>
    </figure>
  );
}
