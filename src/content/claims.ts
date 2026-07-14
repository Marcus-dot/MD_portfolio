export type Claim = {
  t: string;
  sub: string;
  front: string;
  back: string[];
  /** Public receipts - where a claim can be independently verified */
  proof?: { label: string; url: string }[];
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
    proof: [
      {
        label: "Google Play ↗",
        url: "https://play.google.com/store/apps/details?id=co.gralix.nexvenue",
      },
      { label: "nexvenue.app ↗", url: "https://www.nexvenue.app/" },
    ],
  },
  {
    t: "Security & correctness",
    sub: "Bugs that pass code review",
    front:
      "Privilege-escalation vulns, race conditions, silent row-multiplication, found before they cost money.",
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
    sub: "Web · Mobile · Integrations",
    front:
      "Django and Node on the back end; React, Next.js and React Native up front; Postgres underneath, plus WhatsApp, USSD and Firebase integrations.",
    back: [
      "Software Engineer at Gralix Technologies",
      "WhatsApp + USSD platform live in production, built solo",
      "BEng Software Engineering (Hons), Xiamen University",
    ],
    proof: [
      { label: "GitHub ↗", url: "https://github.com/Marcus-dot" },
      {
        label: "LinkedIn ↗",
        url: "https://www.linkedin.com/in/madalitso-daka-52912b248",
      },
    ],
  },
];
