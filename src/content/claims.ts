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
      "I've taken an app from idea to both app stores: sign-in, live data, session limits that hold when everyone rushes the same session, and releases on iOS and Android.",
    back: [
      "Live in both stores",
      "Ran multi-day live events",
      "Owned the design system and release pipeline",
    ],
    proof: [
      {
        label: "Google Play ↗",
        url: "https://play.google.com/store/apps/details?id=co.gralix.nexvenue",
      },
      { label: "App Store ↗", url: "https://apps.apple.com/zm/app/nexvenue/id6767531768" },
    ],
  },
  {
    t: "Security & correctness",
    sub: "The bugs review misses",
    front:
      "Privilege escalation, race conditions, rows multiplying where nobody's looking. I'd rather find them before they cost anyone money.",
    back: [
      "Closed a live Firestore privilege-escalation hole before launch",
      "Reproduced a capacity race condition, then fixed it",
      "I don't ship a fix until I've reproduced the cause",
    ],
  },
  {
    t: "Data & analytics",
    sub: "Numbers you can trace",
    front:
      "Checking pipelines and writing reports on national-scale telecom data, for the people who make decisions with it.",
    back: [
      "Caught and measured a many-to-many join blowup",
      "Fixed a recency score that ran backwards",
      "Every figure traced back to source",
    ],
  },
  {
    t: "Full-stack breadth",
    sub: "Web · Mobile · Integrations",
    front:
      "Django and Node on the back end. React, Next.js and React Native on the front. Postgres underneath, and WhatsApp, USSD and Firebase where they're needed.",
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
