export type Claim = {
  t: string;
  sub: string;
  front: string;
  back: string[];
};

export const CLAIMS: Claim[] = [
  {
    t: "Product delivery",
    sub: "Idea → App Store",
    front:
      "End-to-end ownership: auth, real-time data, capacity logic under race conditions, release discipline on iOS + Android.",
    back: [
      "Production app live in both stores",
      "Multi-day live events served",
      "Design system + release pipeline owned solo",
    ],
  },
  {
    t: "Security & correctness",
    sub: "Bugs that pass code review",
    front:
      "Privilege-escalation vulns, race conditions, silent row-multiplication — found before they cost money.",
    back: [
      "Live Firestore privilege-escalation closed pre-launch",
      "Capacity race condition reproduced, then fixed",
      "No fix ships without a reproduced cause",
    ],
  },
  {
    t: "Data & analytics",
    sub: "Defensible numbers",
    front:
      "Pipeline validation and board-grade reporting on national-scale telecom data.",
    back: [
      "Many-to-many join blowup caught & quantified",
      "Inverted recency scoring corrected",
      "Every reported figure traceable to source",
    ],
  },
  {
    t: "Full-stack breadth",
    sub: "Web · Mobile · ML",
    front:
      "Django, FastAPI, Next.js, TypeScript, React Native, Firebase, Postgres — plus honest ML forecasting.",
    back: [
      "Time-series CV, not naive splits",
      "Extrapolation guards + explicit fallbacks",
      "4 sectors in production",
    ],
  },
];
