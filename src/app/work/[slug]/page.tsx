import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { STORIES } from "@/content/stories";
import { CONFIG } from "@/content/config";

export function generateStaticParams() {
  return STORIES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const story = STORIES.find((s) => s.slug === slug);
  if (!story) return {};
  return {
    title: `${story.s} - Madalitso Daka`,
    description: story.d,
    alternates: { canonical: `/work/${story.slug}` },
  };
}

export default async function CaseOutline({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const story = STORIES.find((s) => s.slug === slug);
  if (!story) notFound();

  return (
    <div className="min-h-dvh">
      {/* slim header - anchors on the home page, not here */}
      <header className="flex items-center justify-between px-page pt-8">
        <Link
          href="/"
          className="text-[14px] font-bold tracking-[-0.02em] text-text no-underline"
        >
          MD<span className="text-accent">.</span>
        </Link>
        <Link
          href="/#work"
          className="font-mono text-[11px] tracking-[0.12em] text-dim no-underline transition-colors hover:text-accent"
        >
          ← ALL WORK
        </Link>
      </header>

      <main className="mx-auto max-w-[820px] px-page pt-[clamp(60px,10vh,120px)] pb-[clamp(80px,12vh,140px)]">
        <div className="font-mono text-[11px] tracking-[0.2em] text-faint">
          CASE OUTLINE · {story.n}
        </div>
        <h1 className="mt-5 mb-0 text-[clamp(40px,7vw,76px)] font-semibold leading-[1.02] tracking-[-0.035em]">
          {story.s}
          <em className="font-serif font-normal italic text-accent">.</em>
        </h1>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <span className="font-mono text-[11px] tracking-[0.1em] text-dim uppercase">
            {story.scale}
          </span>
          <span
            className={`rounded-full border border-line px-3.5 py-1.5 font-mono text-[11px] ${
              story.badge === "Under NDA" ? "text-dim" : "text-accent"
            }`}
          >
            {story.badge}
          </span>
        </div>

        <p className="mt-10 text-[clamp(17px,2vw,21px)] leading-[1.7] text-text">
          {story.case.intro}
        </p>

        <div className="mt-12 font-mono text-[11px] tracking-[0.2em] text-faint">
          WHAT I DID
        </div>
        <ul className="mt-6 flex list-none flex-col gap-4 p-0">
          {story.case.did.map((item) => (
            <li key={item} className="flex items-start gap-3.5">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                aria-hidden
                className="mt-[5px] shrink-0"
              >
                <circle cx="8" cy="8" r="7" fill="none" stroke="var(--accent)" strokeWidth="1.2" />
                <path d="M5 8.3l2.2 2.2 3.8-4.4" fill="none" stroke="var(--accent)" strokeWidth="1.4" />
              </svg>
              <span className="text-[15.5px] leading-[1.7] text-dim">{item}</span>
            </li>
          ))}
        </ul>

        {story.case.tech && (
          <div className="mt-10 font-mono text-[12px] tracking-[0.06em] text-accent">
            {story.case.tech}
          </div>
        )}
        {story.case.note && (
          <p className="mt-10 border-l-2 border-line pl-5 font-serif text-[16px] italic leading-[1.7] text-dim">
            {story.case.note}
          </p>
        )}

        <div className="mt-16 flex flex-wrap items-center gap-6 border-t border-line pt-10">
          <a
            href={`mailto:${CONFIG.email}`}
            className="inline-block rounded-full bg-text px-7 py-3.5 text-[14px] font-semibold text-bg no-underline"
          >
            Talk about work like this →
          </a>
          <Link
            href="/#work"
            className="font-mono text-[12px] text-dim no-underline transition-colors hover:text-accent"
          >
            More case outlines
          </Link>
        </div>
      </main>
    </div>
  );
}
