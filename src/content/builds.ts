/* Additional build work - §5 of PORTFOLIO_SOURCE_OF_TRUTH.md and the Oct 2026 CV. */
export type Build = { t: string; stack: string; d: string };

export const BUILDS: Build[] = [
  {
    t: "AgriPredict credit scoring",
    stack: "Django · DRF · PostgreSQL",
    d: "Credit scoring for smallholder farmers in Zambia, for a joint venture between Gralix Actuarial Consulting and AgriPredict. I built the scoring platform and an internal double-entry ledger, with loans paid out and collected over MTN MoMo, Airtel Money and Zamtel Kwacha.",
  },
  {
    t: "Fixed-asset & finance module",
    stack: "Django · PostgreSQL",
    d: "I was on the team building this part of a Gralix finance platform: asset transfers, straight-line and declining-balance depreciation with a simulator, revaluations, gains and losses on disposal, multiple currencies, automatic double-entry posting, and FIFO, LIFO and weighted-average stock, all with audit trails.",
  },
  {
    t: "ZSIC SBP Tracker",
    stack: "Django · DRF · React · PostgreSQL",
    d: "A tracker for ZSIC General Insurance's strategic plan, built on the balanced scorecard. It replaced a spreadsheet. 67 KPIs, scored automatically and compared period to period, with data entry by role and exports ready for the board.",
  },
  {
    t: "Gralix marketing site",
    stack: "GSAP · Framer Motion · Lenis · Three.js",
    d: "Reworked the animation and interaction on the Gralix website, keeping Lighthouse above 90 and toning it down on devices that can't keep up.",
  },
  {
    t: "MonEva",
    stack: "Django · Next.js",
    d: "A monitoring and evaluation platform for programme teams, with modules for assessments, finance, grievances, investigations and mapping.",
  },
  {
    t: "This site",
    stack: "Next.js 16 · TypeScript · Tailwind v4",
    d: "The site you're on. It respects reduced-motion settings and scores 100 for accessibility on every page in Lighthouse, and 99 to 100 for desktop performance (measured October 2026). Every number on it can be checked.",
  },
];
