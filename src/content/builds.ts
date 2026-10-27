/* Additional build work - §5 of PORTFOLIO_SOURCE_OF_TRUTH.md and the Oct 2026 CV. */
export type Build = { t: string; stack: string; d: string };

export const BUILDS: Build[] = [
  {
    t: "AgriPredict credit scoring",
    stack: "Django · DRF · PostgreSQL",
    d: "Agriculture credit-scoring platform for smallholder farmers in Zambia, a Gralix Actuarial Consulting and AgriPredict joint venture. Built the scoring platform and an internal double-entry ledger, with disbursement and collection over MTN MoMo, Airtel Money and Zamtel Kwacha.",
  },
  {
    t: "Fixed-asset & finance module",
    stack: "Django · PostgreSQL",
    d: "Part of the team on a Gralix enterprise finance platform: asset transfers, straight-line and declining-balance depreciation with simulation, revaluations, disposal gain/loss, multi-currency, automatic double-entry posting and FIFO/LIFO/weighted-average stock with audit trails.",
  },
  {
    t: "ZSIC SBP Tracker",
    stack: "Django · DRF · React · PostgreSQL",
    d: "Balanced-scorecard strategic-plan tracker for ZSIC General Insurance: 67 KPIs modelled with automated achievement scoring, period-on-period comparison, role-based data entry and board-ready exports.",
  },
  {
    t: "Gralix marketing site",
    stack: "GSAP · Framer Motion · Lenis · Three.js",
    d: "Premium animation overhaul of the Gralix web presence: Awwwards-grade motion held inside strict performance budgets (Lighthouse 90+) with device-capability fallbacks.",
  },
  {
    t: "MonEva",
    stack: "Django · Next.js",
    d: "Monitoring & evaluation platform: assessment, finance, grievance, investigation and mapping modules, built for programme teams.",
  },
  {
    t: "This site",
    stack: "Next.js 16 · TypeScript · Tailwind v4",
    d: "Dark by design, audited like the systems it describes: reduced-motion paths, Lighthouse accessibility 100 on every page and performance 99 to 100 on desktop, measured October 2026. Verified claims only.",
  },
];
