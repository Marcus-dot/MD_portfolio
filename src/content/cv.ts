/* The CV as data - mirrors "Madalitso Daka CV (Oct 2026)". Project stacks use
   the exact item names from STACK so skills can be traced through the work.
   Phone number deliberately left off the public web. */

export const CV_UPDATED = "Oct 2026";

export const SUMMARY =
  "I'm a software engineer in Lusaka. I take products from idea to production across web, mobile and data, mostly for insurance, telecom and institutional clients. I like being in from the start, understanding the problem before the design, build and launch. I work anywhere in the stack, and I also do data, machine learning and AI integration. I co-own a registered software company. What I care about: clear communication, solving the right problem before writing code, and results you can check.";

export const FIGURES: { n: string; l: string; src: string }[] = [
  { n: "215", l: "delegates served", src: "NexVenue · IAZ conference" },
  { n: "71", l: "live Q&A entries", src: "NexVenue · IAZ conference" },
  { n: "18", l: "UML diagrams authored", src: "ILO · NHIMA MIS design" },
  { n: "67", l: "KPIs modelled", src: "ZSIC SBP Tracker" },
];

export type Role = {
  title: string;
  org: string;
  place: string;
  when: string;
  points: string[];
};

export const EXPERIENCE: Role[] = [
  {
    title: "Software Engineer",
    org: "Gralix Technologies",
    place: "Lusaka, Zambia",
    when: "Jan 2025 – Present",
    points: [
      "Build and ship production applications across web, mobile and data domains for insurance, telecom and institutional clients",
      "Design system architecture, data models and APIs, and turn business, regulatory and operational requirements into technical solutions",
      "Own delivery end to end: client discovery, requirements, implementation, security review, deployment and support",
      "Lead security and quality passes: patched a Firestore privilege-escalation vulnerability, resolved concurrency race conditions with transactional writes, enforced code-review discipline",
      "Work with cross-functional teams on UI/UX refinement and design-system consistency",
    ],
  },
  {
    title: "Co-Founder & Software Engineer",
    org: "Dashly Software",
    place: "Registered partnership, Zambia",
    when: "2025 – Present",
    points: [
      "Co-founded a registered software partnership. Its product, Dashly, is live at dashlyhq.com",
    ],
  },
  {
    title: "Consultant: Health Insurance MIS Design",
    org: "Gralix Technologies · ILO-commissioned",
    place: "Lusaka, Zambia",
    when: "Jan 2026 – Apr 2026",
    points: [
      "Contributed to an ILO-commissioned, EU-funded design of a new MIS for Zambia's National Health Insurance Management Authority (NHIMA)",
      "Ran pre-workshop contextual-inquiry interviews and observation sessions, and took part in a five-day requirements workshop",
      "Authored the Provider Management and Financial Management & Payments modules: 18 UML diagrams covering accreditation, claims adjudication, maker-checker controls and three-way reconciliation",
      "Contributed to functional analysis, SOPs and RACI matrices, and led document production and QC against ILO reviewer feedback",
    ],
  },
  {
    title: "Technology Development & Operations Intern",
    org: "Guard Genius Sdn. Bhd.",
    place: "Selangor, Malaysia",
    when: "Sep 2023 – Dec 2023",
    points: [
      "15-week internship across frontend and backend on InsurTech systems",
      "Extended the company API with Flask and GraphQL, and worked in CI/CD on GitHub Actions",
      "Built an HR personality-test app and a leave-management system, plus the wireframes and documentation",
    ],
  },
];

export type CvProject = {
  t: string;
  d: string;
  stack: string[];
  slug?: string;
};

export const PROJECTS: CvProject[] = [
  {
    t: "NexVenue",
    d: "Event app on iOS and Android. 215 delegates and 71 live Q&A entries at the IAZ Annual Insurance Conference. I led the security, stability and design-system work before launch and wrote the post-event report for the board.",
    stack: ["React Native (Expo)", "Firebase / Firestore", "Next.js"],
    slug: "insurance-conference-platform",
  },
  {
    t: "Dashly",
    d: "Project portfolio software, live. One health score per project that you can check, 26 financial calculators, and separate team workspaces with row-level security and MFA.",
    stack: ["Next.js", "React", "JavaScript / TypeScript", "PostgreSQL", "Tailwind", "AI/LLM integration"],
    slug: "dashly",
  },
  {
    t: "Dual-channel messaging platform",
    d: "Built alone for a national Zambia Sugar promotion, through Blink Marketing Solutions. WhatsApp and USSD on the same backend, USSD sessions with no server state, a selection engine you can re-check with HMAC-SHA256, and a secure media pipeline.",
    stack: ["Node.js", "PostgreSQL", "WhatsApp Cloud API", "USSD gateways", "DigitalOcean", "Nginx", "PM2"],
    slug: "whatsapp-ussd-platform",
  },
  {
    t: "ZSIC SBP Tracker",
    d: "Strategic-plan tracker for ZSIC General Insurance that replaced a spreadsheet. 67 KPIs scored automatically and compared period to period, with data entry by role and exports for the board.",
    stack: ["Django", "Django REST Framework", "React", "PostgreSQL"],
  },
  {
    t: "Fixed-asset & finance module",
    d: "With the team, on a Gralix finance platform: depreciation with a simulator, revaluations, gains and losses on disposal, multiple currencies, automatic double-entry posting, and FIFO, LIFO and weighted-average stock.",
    stack: ["Django", "PostgreSQL"],
  },
  {
    t: "AgriPredict credit scoring",
    d: "Credit scoring for smallholder farmers in Zambia, for a Gralix Actuarial Consulting and AgriPredict joint venture. I built the scoring platform and a double-entry ledger, with money moving over MTN MoMo, Airtel Money and Zamtel Kwacha.",
    stack: ["Django", "Django REST Framework", "PostgreSQL", "Mobile money"],
  },
  {
    t: "WhatsApp automation chatbot",
    d: "Built alone for a national Bobtail promotion, through Big Mango Events Management. Step-by-step entry, proof-of-purchase photos, automatic confirmations, and entries landing live in Google Sheets.",
    stack: ["Node.js", "WhatsApp Cloud API", "Google Sheets API", "DigitalOcean", "Nginx", "PM2"],
    slug: "whatsapp-promotion-chatbot",
  },
  {
    t: "Corporate web platform overhaul",
    d: "Reworked the animation and interaction on the Gralix website, keeping Lighthouse above 90 and toning it down on devices that can't keep up.",
    stack: ["Next.js", "GSAP", "Framer Motion"],
  },
  {
    t: "Monitoring & evaluation system",
    d: "Monitoring and evaluation platform with assessment, finance, grievance, investigation and mapping modules. I fixed dependency and integration problems that cut across them.",
    stack: ["Django", "Next.js", "PostgreSQL"],
  },
];
