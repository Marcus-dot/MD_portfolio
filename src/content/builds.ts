/* Additional build work — §5 of PORTFOLIO_SOURCE_OF_TRUTH.md. */
export type Build = { t: string; stack: string; d: string };

export const BUILDS: Build[] = [
  {
    t: "ZSIC SBP Tracker",
    stack: "Django · DRF · React · PostgreSQL",
    d: "Balanced-scorecard strategic-plan tracker for ZSIC General Insurance — 67 KPIs modelled with automated achievement scoring, period-on-period comparison, role-based data entry and board-ready exports.",
  },
  {
    t: "Gralix marketing site",
    stack: "GSAP · Framer Motion · Lenis · Three.js",
    d: "Premium animation overhaul of the Gralix web presence — Awwwards-grade motion held inside strict performance budgets (Lighthouse 90+) with device-capability fallbacks.",
  },
  {
    t: "MonEva",
    stack: "Django · Next.js",
    d: "Monitoring & evaluation platform — assessment, finance, grievance, investigation and mapping modules, built for programme teams.",
  },
  {
    t: "This site",
    stack: "Next.js 16 · TypeScript · Tailwind v4",
    d: "Dark by design, audited like the systems it describes — reduced-motion paths, axe-clean accessibility, Lighthouse 95+ desktop. Verified claims only.",
  },
];
