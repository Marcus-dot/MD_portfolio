/* The CV as data - mirrors "Madalitso Daka CV (Oct 2026)". Project stacks use
   the exact item names from STACK so skills can be traced through the work.
   Phone number deliberately left off the public web. */

export const CV_UPDATED = "Oct 2026";

export const SUMMARY =
  "Software engineer who takes products from idea to production across web, mobile and data systems for insurance, telecom and institutional clients. I own the full process, from understanding the problem through design, delivery and launch, and work comfortably across the stack, with range into data, machine learning and AI integration. I co-own a registered software company, and I value clear communication, solving the right problem before writing code, and results that can be verified.";

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
      "Design system architecture, data models and APIs; translate business, regulatory and operational requirements into technical solutions",
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
      "Co-founded a registered software partnership focused on software product development; its product, Dashly, is live at dashlyhq.com",
    ],
  },
  {
    title: "Consultant: Health Insurance MIS Design",
    org: "Gralix Technologies · ILO-commissioned",
    place: "Lusaka, Zambia",
    when: "Jan 2026 – Apr 2026",
    points: [
      "Contributed to an ILO-commissioned, EU-funded design of a new MIS for Zambia's National Health Insurance Management Authority (NHIMA)",
      "Ran pre-workshop contextual-inquiry interviews and observation sessions; took part in a five-day requirements workshop",
      "Authored the Provider Management and Financial Management & Payments modules: 18 UML diagrams covering accreditation, claims adjudication, maker-checker controls and three-way reconciliation",
      "Contributed to functional analysis, SOPs and RACI matrices; led document production and QC against ILO reviewer feedback",
    ],
  },
  {
    title: "Technology Development & Operations Intern",
    org: "Guard Genius Sdn. Bhd.",
    place: "Selangor, Malaysia",
    when: "Sep 2023 – Dec 2023",
    points: [
      "15-week internship across frontend and backend on InsurTech systems",
      "Extended the company API with Flask and GraphQL; worked in CI/CD via GitHub Actions",
      "Built an HR personality-test app and a leave-management system; produced wireframes and documentation",
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
    d: "Event-networking platform live on iOS and Android. Served 215 delegates and 71 live Q&A entries at the IAZ Annual Insurance Conference; led the pre-launch security, stability and design-system push and produced the post-event report for the board.",
    stack: ["React Native (Expo)", "Firebase / Firestore", "Next.js"],
    slug: "insurance-conference-platform",
  },
  {
    t: "Dashly",
    d: "Project-portfolio platform in production: an auditable health score per project, 26 industry-specific financial calculators, multi-tenant teams with row-level security and MFA.",
    stack: ["Next.js", "React", "JavaScript / TypeScript", "PostgreSQL", "Tailwind", "AI/LLM integration"],
    slug: "dashly",
  },
  {
    t: "Dual-channel messaging platform",
    d: "Solo build for a national Zambia Sugar promotion via Blink Marketing Solutions: WhatsApp and USSD on shared logic, stateless USSD sessions, an HMAC-SHA256 auditable selection engine and a secure media pipeline.",
    stack: ["Node.js", "PostgreSQL", "WhatsApp Cloud API", "USSD gateways", "DigitalOcean", "Nginx", "PM2"],
    slug: "whatsapp-ussd-platform",
  },
  {
    t: "ZSIC SBP Tracker",
    d: "Balanced-scorecard tracker for ZSIC General Insurance replacing a spreadsheet process: 67 KPIs with automated achievement scoring, period-on-period comparison, role-based entry and board-ready exports.",
    stack: ["Django", "Django REST Framework", "React", "PostgreSQL"],
  },
  {
    t: "Fixed-asset & finance module",
    d: "Team build on a Gralix enterprise finance platform: depreciation with simulation, revaluations, disposal gain/loss, multi-currency, automatic double-entry posting and FIFO/LIFO/weighted-average stock.",
    stack: ["Django", "PostgreSQL"],
  },
  {
    t: "AgriPredict credit scoring",
    d: "Gralix Actuarial Consulting and AgriPredict joint venture scoring smallholder farmers in Zambia. Built the scoring platform and a double-entry ledger with MTN MoMo, Airtel Money and Zamtel Kwacha flows.",
    stack: ["Django", "Django REST Framework", "PostgreSQL", "Mobile money"],
  },
  {
    t: "WhatsApp automation chatbot",
    d: "Solo build for a national Bobtail promotion via Big Mango Events Management: guided flows, proof-of-purchase uploads, automated confirmations and live Google Sheets capture.",
    stack: ["Node.js", "WhatsApp Cloud API", "Google Sheets API", "DigitalOcean", "Nginx", "PM2"],
    slug: "whatsapp-promotion-chatbot",
  },
  {
    t: "Corporate web platform overhaul",
    d: "Premium animation and interaction overhaul of the Gralix marketing platform, held inside strict performance budgets (Lighthouse 90+) with device-capability fallbacks.",
    stack: ["Next.js", "GSAP", "Framer Motion"],
  },
  {
    t: "Monitoring & evaluation system",
    d: "M&E platform spanning assessment, finance, grievance, investigation and mapping modules, resolving cross-cutting dependency and integration issues across the stack.",
    stack: ["Django", "Next.js", "PostgreSQL"],
  },
];
