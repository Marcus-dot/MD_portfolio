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
| "Also built" cards | `src/content/builds.ts` |
| Education + tech stack | `src/content/stack.ts` |
| CV page (/cv): summary, figures, roles, projects | `src/content/cv.ts` (skills come from `stack.ts`; project stacks must use the same names) |
| Manifesto (scroll-typing text) | `MANIFESTO_TEXT` in `src/components/Manifesto.tsx` |
| Marquee phrases | `PHRASES` in `src/components/Marquee.tsx` |
| Hero intro line | `src/components/Hero.tsx` |
| NexVenue stats (215 / 71 / 2) | `src/components/Flagship.tsx` |
| Footer NOW line | `src/components/Footer.tsx` |
| Case-study pages (/work/…) | `case` blocks in `src/content/stories.ts` |
| Statues (hero, Work, Claims, Method, Education, footer, /cv, case pages, 404) | `src/content/statues.ts` + baked maps in `public/statue/` (see below) |
| OG share image | regenerate: `scripts/og-template.html` draws the statue from `public/statue/marcus.png`; serve both from one origin (e.g. a temp folder with `og.html` + `statue/marcus.png` under `python3 -m http.server`), screenshot at 1200x630, save as an 8-bit PNG under ~300 KB to `public/og.png` |

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
per session (shorter on mobile). Printing the homepage (Cmd/Ctrl+P)
produces a clean CV-style document; the CV page (/cv) has its own Save as PDF.

Lighthouse, measured 27 Oct 2026 on the production build (perf / a11y / best
practices / SEO):

| Page | Desktop | Mobile (simulated slow 4G) |
| --- | --- | --- |
| / | 99 / 100 / 100 / 100 | 92 / 100 / 100 / 100 |
| /cast-room | 100 / 100 / 100 / 100 | 95 / 100 / 100 / 100 |
| /dashly | 100 / 100 / 100 / 100 | 92 / 100 / 100 / 100 |
| /cv | 100 / 100 / 100 / 100 | 91 / 100 / 100 / 100 |
| /work/* | 100 / 100 / 100 / 100 | 97 / 100 / 100 / 100 |

The "This site" card on the homepage quotes these numbers; re-measure before
changing it.

## Statues

The statues are real 3D scans, baked into small PNG "cell maps" that a 2D
canvas (`src/components/statue/`) relights every frame. To add or re-bake one,
put the source `.stl` files in a folder outside the repo, add an entry to
`STATUES` in `scripts/statue/bake.mjs`, then:

```bash
node scripts/statue/bake.mjs <folder-with-stl-files> public/statue
```

Sources (keep the credit line for the Marcus scan, its licence requires it):

| Statue | Source | Licence |
| --- | --- | --- |
| Marcus Aurelius (hero) | MAH Geneva inv. 19050, 3D scan by Rama, Wikimedia Commons | CC BY-SA 3.0 FR |
| Farnese Hercules head, Hope Athena head, Apollo Belvedere, Belvedere Torso, Homer, Discobolus, Alexander as Helios, Zeus Ammon | SMK Royal Cast Collection, `api.smk.dk` (KAS701, KAS275, KAS353, KAS402, KAS210, KAS1549, KAS283, KAS1110) | Public domain |
