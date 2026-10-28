# Madalitso Daka: Portfolio

Personal portfolio site. Next.js 16 (App Router), TypeScript strict,
Tailwind CSS v4, Framer Motion. Dark by design, classical in theme. The
brand rule is **verified claims only**: every number and biography line on
the site must be true and traceable.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (every route prerenders statically)
npx eslint src     # lint
```

Deploys automatically via Vercel on push to `main`.

## Pages

| Route | What it is |
| --- | --- |
| `/` | Home: hero (Marcus Aurelius turns to follow the pointer), manifesto, work, claims, education and stack, method, contact |
| `/dashly` | The Dashly room: a playable re-creation of its scoring method, a codebase ledger, screenshots. `/work/dashly` redirects here |
| `/work/[slug]` | Case outlines for every other piece of work |
| `/cv` | The CV as a page: skills trace through the projects; Save as PDF prints it |
| `/cast-room` | Every statue on the site, hung with a museum label |
| `/credits` | Colophon: inspiration, sculpture and text sources, typefaces and their designers, software, then privacy (`#privacy`) and licence (`#licence`) |
| any unknown URL | 404, kept by the Belvedere Torso |

## Editing content: where everything lives

Real-world values sit in typed data files under `src/content/`. No CMS.

| What | File |
| --- | --- |
| Email, site URL, store links | `src/content/config.ts` (the single edit point) |
| Work stories and case outlines | `src/content/stories.ts` |
| Flip-card claims and evidence | `src/content/claims.ts` |
| Method principles | `src/content/principles.ts` |
| "Also built" cards | `src/content/builds.ts` |
| Education and tech stack | `src/content/stack.ts` |
| CV page: summary, figures, roles, projects | `src/content/cv.ts` (skills come from `stack.ts`; project stacks must use the same names) |
| Statues, their captions and the Cast Room labels | `src/content/statues.ts` |
| Marginalia notes' references | `src/content/marginalia.ts` (notes themselves sit next to what they describe, in each page) |
| Typed lines from the Meditations | `src/content/meditations.ts` (George Long's 1862 translation only, verbatim; modern translations are under copyright) |
| Dashly figures (commits, lines, tests...) | `src/content/dashly-ledger.json`, generated, see below |
| Dashly screenshots | `src/content/dashly-screens.ts` + `public/dashly/` |
| Manifesto (scroll-typing text) | `MANIFESTO_TEXT` in `src/components/Manifesto.tsx` |
| Marquee phrases | `PHRASES` in `src/components/Marquee.tsx` |
| NexVenue stats (215 / 71 / 2) | `src/components/Flagship.tsx` |
| Footer NOW line | `src/components/Footer.tsx` |

**Content rules:** never invent numbers, ratings or client names; the
telecom operator stays unnamed; no emojis and no em dashes anywhere; write
about the work, state roles once.

## Scripts

| Script | What it does |
| --- | --- |
| `scripts/statue/bake.mjs` | Bakes 3D scans into the statue cell maps in `public/statue/` (see Statues) |
| `scripts/dashly-ledger.mjs` | Counts figures from the private Dashly repo into `src/content/dashly-ledger.json`. Only counts leave the repo. Run `node scripts/dashly-ledger.mjs ../project-dashboard`, then commit |
| `scripts/screenshot.mjs` | Headless-Chrome QA screenshots (scroll to a selector, any viewport) |
| `scripts/og-template.html` | The share image (`public/og.png`). It draws the statue from `public/statue/marcus.png`, so serve both from one origin (e.g. a temp folder with `og.html` and `statue/marcus.png` under `python3 -m http.server`), screenshot at 1200x630, and save as an 8-bit PNG under about 300 KB |

## Before pointing a real domain

Update `siteUrl` in `src/content/config.ts`. It drives the canonical URL,
OpenGraph/Twitter tags, `sitemap.xml` and `robots.txt`.

## Structure

- `src/app/`: layout (fonts, metadata), routes, global styles and tokens
- `src/components/`: one component per section, plus the interaction pieces
  (Loader, ScrollType, FlipCard, CommandPalette, ContextCursor, TypedLine...)
- `src/components/statue/`: the statue renderer (canvas engine, section wrapper)
- `src/components/cv/`, `src/components/dashly/`: page-specific pieces

Motion honours `prefers-reduced-motion` everywhere; the loader runs once per
session. Printing the homepage produces a clean CV-style document; `/cv` has
its own Save as PDF.

Lighthouse, measured 27 Oct 2026 on the production build (perf / a11y / best
practices / SEO):

| Page | Desktop | Mobile (simulated slow 4G) |
| --- | --- | --- |
| / | 99 / 100 / 100 / 100 | 93 / 100 / 100 / 100 |
| /cast-room | 100 / 100 / 100 / 100 | 94 / 100 / 100 / 100 |
| /dashly | 100 / 100 / 100 / 100 | 91 / 100 / 100 / 100 |
| /cv | 100 / 100 / 100 / 100 | 90 / 100 / 100 / 100 |
| /credits | 100 / 100 / 100 / 100 | 95 / 100 / 100 / 100 |

The "This site" card on the homepage quotes these numbers; re-measure before
changing it.

## Statues

The statues are real 3D scans, baked into small PNG "cell maps" that a 2D
canvas relights every frame. To add or re-bake one, put the source `.stl`
files in a folder outside the repo, add an entry to `STATUES` in
`scripts/statue/bake.mjs` (set `up: "y"` for scans exported lying down), then:

```bash
node scripts/statue/bake.mjs <folder-with-stl-files> public/statue
```

Sources (keep the credit line for the Marcus scan; its licence requires it
wherever it, or an image made from it, appears):

| Statue | Source | Licence |
| --- | --- | --- |
| Marcus Aurelius (hero, share image) | MAH Geneva inv. 19050, 3D scan by Rama, Wikimedia Commons | CC BY-SA 3.0 FR |
| Farnese Hercules head (KAS701), Hope Athena head (KAS275), Apollo Belvedere (KAS353), Belvedere Torso (KAS402), Homer (KAS210), Discobolus (KAS1549), Alexander as Helios (KAS283), Zeus Ammon (KAS1110), St. Peter's Pietà (KAS115), Laocoön (KAS385), Moses (KAS243), Borghese Gladiator (KAS499), Head of David (KAS2232), Barberini Faun (KAS208), Young Prisoner (KAS2360) | SMK Royal Cast Collection, `api.smk.dk` | Public domain |

## Licence

The code is MIT (see `LICENSE`). The writing, CV, case studies and design
are all rights reserved; Dashly screenshots belong to Dashly Software; images
made from the Marcus Aurelius scan stay CC BY-SA 3.0 FR. `LICENSE` lists
exactly what is and is not covered.

If you add browser storage, cookies, analytics or a form, update the Privacy
section on `/credits` in the same change: it lists everything the site keeps.
