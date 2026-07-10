# PROJECT PLAN — Madalitso Daka Portfolio (Production Build)

## 0. Context for the agent

You are building the production version of a personal portfolio website for
Madalitso "Marcus" Daka, a software engineer in Lusaka, Zambia. A fully
working single-file React prototype exists at `./portfolio-prototype.jsx` in
this folder. **It is the design source of truth.** Your job is to translate
it into a production-grade Next.js application — not to redesign it.

Read the prototype top to bottom before writing any code. Every visual
decision (palette, type, motion, copy) is already made there.

## 1. Goal & positioning

A skills-first portfolio. Most client work is under NDA, so the site sells
*capabilities with evidence*, anonymized by sector and scale. One product is
named and verifiable: **NexVenue** (live in both app stores). The recurring
brand thread: **verified claims only** — the site itself behaves like an
audited system.

## 2. Stack

- **Next.js 15+ (App Router)**, static export or SSG on Vercel — no server
  runtime needed
- **TypeScript**, strict mode
- **Tailwind CSS v4** for layout/utility styling; design tokens as CSS
  variables in `globals.css` (see §4). Complex/stateful animation stays in
  small client components
- **Framer Motion** for scroll-linked and entrance animation (replaces the
  hand-rolled IntersectionObserver/scroll listeners in the prototype)
- **next/font** for fonts (self-hosted): Inter Tight, Instrument Serif,
  JetBrains Mono. No render-blocking Google Fonts `<link>`
- **next/image** for the portrait (AVIF/WebP, priority on hero). The
  prototype embeds the portrait as base64 — extract it to
  `public/portrait.jpg` (a script for this is fine) or ask Marcus for the
  original file
- No CMS, no database. Content lives in typed data files
  (`src/content/*.ts`)

## 3. Project structure

```
src/
  app/
    layout.tsx        # fonts, metadata, theme
    page.tsx          # single-page composition
    globals.css       # tokens, keyframes, base styles
  components/
    Loader.tsx        # serif counter, slide-up exit
    Nav.tsx           # floating pill nav, responsive collapse
    Hero.tsx          # full-bleed portrait + oversized name
    Manifesto.tsx     # scroll-scrubbed typing text
    Marquee.tsx
    Flagship.tsx      # NexVenue card + device mock
    WorkStack.tsx     # sticky-stacking NDA cards + hover preview
    Claims.tsx        # flip-to-verify cards
    Method.tsx
    OffTheClock.tsx
    Footer.tsx
    CommandPalette.tsx
    ContextCursor.tsx
    Spotlight.tsx
    Grain.tsx
  content/
    config.ts         # email, links (single edit point — mirrors CONFIG)
    claims.ts, stories.ts, principles.ts
  lib/
    hooks.ts          # useReducedMotion helpers etc.
```

## 4. Design system (extract verbatim from prototype)

Tokens (CSS variables):
- `--bg: #0A0A0B` (black foundation)
- `--surface: #101210`
- `--musgo: #283526` (raised panels, ambient glows)
- `--text: #F2F4EC` (bone white)
- `--dim: #9AA394`, `--faint: #5E665A`
- `--accent: #9BC97E` (moss leaf)
- Borders: `rgba(237,240,228,0.09)`, hover `rgba(155,201,126,0.35)`
- Easing everywhere: `cubic-bezier(0.16, 1, 0.3, 1)`

Type: Inter Tight (600/700, tight tracking) for display; Instrument Serif
*italic* for accent words and big numerals; JetBrains Mono for system-UI
chrome (eyebrows, badges, annotations). Selection color: accent on black.

Hard rules:
- Black stays the page ground; Musgo is depth/atmosphere, never the wall
- No emojis or pictograph glyphs anywhere in code or UI. Typographic arrows
  and the command symbol are allowed
- Film grain overlay at ~5% opacity, fixed, pointer-events none

## 5. Features & acceptance criteria

Each feature below exists in the prototype. Port behavior faithfully.

1. **Loader** — 0→100 counter (large italic serif, bottom-right), label
   "MADALITSO DAKA — PORTFOLIO / VERIFYING CLAIMS…", full-page slide-up exit;
   hero entrance animations must not start until loader exits. Skips
   instantly for reduced-motion users and on repeat visits within the session
   (sessionStorage flag — new behavior, add it).
2. **Hero** — portrait full-height right column (~46vw, min 280px), duotone
   Musgo wash + edge fades into black, slight scroll parallax contained by an
   overflow-hidden wrapper (image 115% height, translateY ≤ ~8% scroll).
   Name "MADALITSO / DAKA." oversized uppercase, bottom-left, overlapping the
   portrait edge. Status pill + live Lusaka clock (Africa/Lusaka, CAT).
   Mobile: portrait becomes dimmed backdrop (opacity ~0.4, full width).
3. **Manifesto (scroll-typing)** — one statement that reveals per-character
   scrubbed to scroll position and un-reveals scrolling back, with an accent
   caret at the write head. Progress mapped from element position in
   viewport; must be fully reversible. aria-label carries full text; chars
   are aria-hidden.
4. **Marquee** — infinite loop of capability phrases in italic serif with CSS
   diamond separators.
5. **Flagship (NexVenue)** — Musgo-to-black gradient card, big italic serif
   stats (215 delegates / 71 live Q&A entries / 2 app stores — do not invent
   other numbers), device mock with defensible chip copy only, store buttons
   from `config.ts`.
6. **Work stack** — three NDA stories as position:sticky stacking cards
   (top offset 90px + i*26px), hover preview panel following cursor
   (desktop only), badges NDA/Shipped/Contract.
7. **Claims (flip cards)** — front = claim, back = evidence trail with SVG
   check marks. Flips on hover AND click/tap AND keyboard (Enter/Space,
   role=button, tabIndex, aria-label). 3D rotateY, preserve-3d.
8. **Command palette** — Cmd/Ctrl+K toggles; searchable actions: section
   nav, copy email, download CV (public/cv.pdf — placeholder ok). Esc
   closes; focus trapped while open; backdrop blur.
9. **Context cursor** — eased dot following pointer; expands to labelled
   chip on elements with `data-cursor` (GO, FLIP, VIEW, NDA, SAY HI, TOP).
   Disabled entirely on coarse pointers.
10. **Spotlight** — blueprint grid revealed in a radial mask around cursor.
    Desktop only.
11. **Scroll progress bar** (musgo→accent gradient) + right-edge section
    dots with active state.
12. **Off the clock** + **Footer** — as prototype: two culture cards, giant
    CTA "Building something that has to be right?", NOW line, back-to-top,
    live clock.

## 6. Non-functional requirements

- **Performance budget**: Lighthouse ≥ 95 performance/accessibility/SEO on
  desktop, ≥ 90 mobile. LCP < 2.5s, CLS < 0.05. Consolidate scroll handlers
  (one rAF-driven listener feeding a context or store — the prototype
  already merged them; don't regress).
- **Reduced motion**: `prefers-reduced-motion` disables loader animation,
  kinetic text, marquee, parallax, cursor, spotlight. Content must be fully
  readable with zero animation.
- **Accessibility**: visible focus-visible rings (accent), all interactive
  elements keyboard-operable, semantic landmarks (header/main/footer),
  single h1, alt text on portrait.
- **SEO/meta**: title "Madalitso Daka — Software Engineer, Lusaka";
  description from the manifesto; OpenGraph + Twitter card with an OG image
  (1200x630, black + Musgo + name — generate a static one); canonical URL;
  sitemap.xml + robots.txt via Next conventions.
- **Responsive**: 360px → 1920px. Nav collapses below ~680px to logo + CTA.
  Sticky stack degrades gracefully; flip cards tap-to-flip on touch.

## 7. Content & config

All real-world values live in `src/content/config.ts`:
- email: PLACEHOLDER — ask Marcus before shipping
- appStore: direct Apple listing URL — currently unknown, use
  https://www.nexvenue.app/ and mark TODO
- googlePlay: https://play.google.com/store/apps/details?id=co.gralix.nexvenue
- web: https://tech.gralix.co/products/nexvenue

Copy: reuse prototype copy verbatim unless it contains an unverifiable
claim. **Never invent numbers, ratings, or client names.** NDA work is
described by sector and scale only.

## 8. Engineering rules (non-negotiable, from Marcus)

- Diagnosis before fixes: if something breaks, reproduce and explain before
  changing code
- Show diffs / summarize changes before committing; small, scoped commits
  with conventional messages (`feat:`, `fix:`, `chore:`)
- **No AI co-author attribution in git** — no "Co-Authored-By: Claude", no
  "Generated with" lines in commit messages
- No unverifiable claims in UI copy
- No emojis in code, comments, commits, or UI
- Don't add dependencies beyond §2 without stating why first

## 9. Phased delivery (commit checkpoint after each phase)

- **Phase 0 — Scaffold**: create-next-app (TS, Tailwind, App Router), fonts
  via next/font, tokens in globals.css, extract portrait from prototype to
  public/, config.ts. Site renders empty shell with correct background/type.
- **Phase 1 — Static structure**: all sections composed with real content,
  no animation. Fully responsive. Semantic HTML complete.
- **Phase 2 — Motion core**: loader, entrance reveals, marquee, scroll
  progress, section dots, hero parallax. Reduced-motion paths verified.
- **Phase 3 — Signature interactions**: scroll-typing manifesto, sticky
  work stack + hover preview, flip cards, command palette, context cursor,
  spotlight, grain.
- **Phase 4 — Hardening**: a11y pass (keyboard walk-through, axe clean),
  metadata/OG/sitemap, Lighthouse runs with numbers reported, cross-viewport
  QA at 360/768/1024/1440.
- **Phase 5 — Deploy**: Vercel project, production build verified, README
  with run/deploy instructions and a content-editing guide (how to change
  config.ts and content files).

Definition of done per phase: builds clean (`next build` zero errors), no
console errors, acceptance criteria for that phase's features met.

## 10. Out of scope (do not build)

Blog, CMS, contact form backend, analytics, i18n, dark/light toggle (site
is dark by design), Three.js/WebGL. If tempted, ask first.
