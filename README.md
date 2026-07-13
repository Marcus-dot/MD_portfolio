# Madalitso Daka — Portfolio

Personal portfolio site. Next.js 16 (App Router), TypeScript strict,
Tailwind CSS v4, Framer Motion. Dark by design; the brand rule is
**verified claims only** — every number and biography line on the site
must be true and traceable.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (all routes prerender statically)
npx eslint src     # lint
```

Deploys automatically via Vercel on push to `main`.

## Editing content — where everything lives

All real-world values sit in typed data files under `src/content/`. Copy
lives in the components. No CMS.

| What | File |
| --- | --- |
| Email, site URL, store links | `src/content/config.ts` — the single edit point |
| Flip-card claims + evidence | `src/content/claims.ts` |
| Work stories (NDA cards) | `src/content/stories.ts` |
| Method principles | `src/content/principles.ts` |
| Manifesto (scroll-typing text) | `MANIFESTO_TEXT` in `src/components/Manifesto.tsx` |
| Marquee phrases | `PHRASES` in `src/components/Marquee.tsx` |
| Hero intro line | `src/components/Hero.tsx` |
| NexVenue stats (215 / 71 / 2) | `src/components/Flagship.tsx` |
| Footer NOW line | `src/components/Footer.tsx` |
| CV download | replace `public/cv.pdf` |
| Portrait | replace `public/portrait.jpg` (source: `portrait-original.jpeg`) |
| OG share image | regenerate: edit `scripts/og-template.html`, then `node scripts/screenshot.mjs "file://$PWD/scripts/og-template.html" public/og.png '' 1200 630 3000` |

**Content rules** (from PROJECT_PLAN.md): never invent numbers, ratings or
client names; NDA work is described by sector and scale only; no emojis
in code or UI.

## Before pointing a real domain

Update `siteUrl` in `src/content/config.ts` — it drives the canonical URL,
OpenGraph/Twitter tags, `sitemap.xml` and `robots.txt`.

## Structure

- `src/app/` — layout (fonts/metadata), page composition, global styles/tokens
- `src/components/` — one component per section + interaction components
  (Loader, ScrollType, FlipCard, CommandPalette, ContextCursor, Spotlight…)
- `scripts/screenshot.mjs` — headless-Chrome QA helper (scroll-to-selector
  screenshots; also renders the OG image)

Motion honours `prefers-reduced-motion` everywhere; the loader runs once
per session. Lighthouse (last run): desktop 98/96→100/100/100, mobile
89–93/100/100/100.
