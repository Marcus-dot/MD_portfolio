/* Facts sourced from PORTFOLIO_SOURCE_OF_TRUTH.md - verified claims only. */
import { CONFIG } from "@/content/config";
import LEDGER from "@/content/dashly-ledger.json";

// Dashly figures come from the dated codebase snapshot (scripts/dashly-ledger.mjs)
const n = (v: number) => v.toLocaleString("en-GB");

export type Story = {
  n: string;
  slug: string;
  s: string;
  scale: string;
  badge: "Confidential" | "Shipped" | "Live" | "Contract" | "Internship";
  d: string;
  case: {
    intro: string;
    did: string[];
    tech?: string;
    note?: string;
    link?: { label: string; href: string };
  };
};

export const STORIES: Story[] = [
  {
    n: "01",
    slug: "dashly",
    s: "Dashly",
    scale: "Live SaaS · co-founded",
    badge: "Live",
    d: `Multi-tenant project portfolio software for emerging markets. Every project gets one health score, a weighted formula you can check by hand, plus ${LEDGER.calculators} industry calculators and Postgres row-level security between teams. ${n(LEDGER.sourceLines)} lines of TypeScript, live at dashlyhq.com.`,
    case: {
      intro:
        "Dashly is project portfolio software for emerging markets, live at dashlyhq.com. A team sees the health, risk, budget and milestones of every project in one place, and each project gets one score they can check for themselves. It's made by Dashly Software, which I co-founded with my business partner in 2025. I lead the engineering.",
      did: [
        "Set up the multi-tenant architecture on Next.js 16 and Supabase. Tenants are isolated with Postgres row-level security, and there's a suite of RLS tests that try to read across workspaces. MFA and role-based teams on top",
        "Built Dashly Sense, the health score. It's a weighted formula over schedule, budget, risk, progress and activity (25/25/20/15/15), recomputed on every read rather than cached. The AI doesn't grade anything. Claude gets the computed score and has to answer through one tool, deliver_insights, with exactly three items that zod validates before anything renders",
        "Built 26 financial calculators (NPV, DSCR, OEE, RevPAR, SROI and others) from one factory. Each calculator is a zod input schema plus a pure compute function, and auth, tenancy and persistence are written once in the factory",
        "Built the planning side: the portfolio dashboard, calendar, Gantt chart, PDF board reports and multi-workspace switching",
        `Got it production-ready: rate limiting, error tracking, a server-rendered data layer with TanStack Query on the client, and PWA offline support. At the last count, ${n(LEDGER.testCases)} automated tests and ${LEDGER.migrations} database migrations`,
      ],
      tech: "Next.js 16 · React 19 · TypeScript · Supabase · Tailwind v4 · Anthropic API · TanStack Query",
      link: { label: "dashlyhq.com ↗", href: CONFIG.links.dashly },
    },
  },
  {
    n: "02",
    slug: "telecom-analytics-audit",
    s: "Telecommunications",
    scale: "National operator",
    badge: "Confidential",
    d: "I audited a national operator's customer-analytics pipeline. A many-to-many join was multiplying rows, the RFM recency score was inverted, a monetary tier had collapsed, and revenue was being summed across mixed units. Each one written up with a reproduction, its impact and the fix.",
    case: {
      intro:
        "A national telecom operator's customer-analytics pipeline was putting out numbers the business couldn't fully stand behind. I went through it end to end, from the raw joins up to the RFM scores and segments managers were actually reading.",
      did: [
        "Found a many-to-many join fanning out rows and inflating every aggregate downstream of it. I reproduced it, measured the inflation, and fixed the join",
        "Found the RFM recency score inverted, so the most recently active customers were scored as the most dormant",
        "Found a collapsed monetary tier that flattened the customer-value segmentation",
        "Reconciled revenue figures recorded in mixed units, so the reported totals tie back to source",
        "Wrote up every issue with reproduction steps, business impact and the correction applied",
      ],
      note: "I'm not naming the operator. They're a client of my employer, and an audit isn't something to advertise on their behalf. What stayed with me is that these numbers had already passed review. They were still wrong, and the only way to show it was to reproduce it.",
    },
  },
  {
    n: "03",
    slug: "insurance-conference-platform",
    s: "Insurance",
    scale: "215-delegate conference",
    badge: "Shipped",
    d: "NexVenue at a 215-delegate national insurance conference: live Q&A, speaker ratings and capacity-managed sessions on React Native and Firestore, plus the analytics report that went to the board afterwards.",
    case: {
      intro:
        "NexVenue is an event app on both app stores. At the IAZ Annual Insurance Conference 2026 it ran the whole event: the agenda and sessions, live Q&A, group and direct chat, push notifications, networking between delegates, speaker ratings, and role-based access for attendees, speakers, exhibitors and organisers.",
      did: [
        "Led the pre-launch engineering pass, mostly security, including closing a live Firestore privilege-escalation vulnerability",
        "Reproduced a race condition on session capacity, two people taking the last seat at once, then fixed it with transactional writes. No speculative fix went out",
        "Moved the design system onto tokens and consolidated duplicate components before release",
        "215 delegates and 71 live Q&A entries over the event",
        "Wrote the post-event analytics report that went to the board",
      ],
      tech: "React Native · Expo · Firebase/Firestore · Next.js web companion",
    },
  },
  {
    n: "04",
    slug: "health-insurance-mis",
    s: "Health insurance",
    scale: "ILO-commissioned · national authority",
    badge: "Contract",
    d: "I was on the team designing a new management information system for Zambia's national health insurance authority, commissioned by the ILO and funded by the EU. I wrote the provider-management and financial-management module designs, 18 UML diagrams, from contextual-inquiry interviews through to SOPs. Now with the ILO for technical review.",
    case: {
      intro:
        "An ILO-commissioned, EU-funded project (the Digital Convergence Initiative) to design a new management information system for Zambia's National Health Insurance Management Authority. It ran nine weeks in three phases: user analysis and service-journey mapping, then future-state business-process models, then functional analysis, gap assessment and SOPs. I was one of the consultants on the team.",
      did: [
        "Ran contextual-inquiry interviews and observation sessions across departments before the workshop",
        "Took part in a five-day requirements workshop on site",
        "Wrote the Provider Management and Financial Management & Payments modules of the future-state design. That's 18 UML diagrams at value-stream, process and activity level, covering provider accreditation, claims adjudication, maker-checker financial controls and three-way reconciliation",
        "Worked on the functional analysis, SOPs and RACI matrices",
        "Led a lot of the document production and QC against ILO reviewer feedback",
      ],
      note: "The deliverables are with the ILO for technical review.",
    },
  },
  {
    n: "05",
    slug: "whatsapp-ussd-platform",
    s: "Messaging platform",
    scale: "WhatsApp + USSD · solo build",
    badge: "Live",
    d: "One backend serving WhatsApp and USSD, so people with basic phones aren't left out. Stateless USSD sessions inside the gateway's timeout, an HMAC-SHA256 selection engine anyone can re-run, a private media pipeline and an admin dashboard. I built and ran the whole stack on my own.",
    case: {
      intro:
        "A messaging platform that runs on WhatsApp and USSD with shared backend logic, so someone with a feature phone gets the same service as someone with a smartphone. I was the only developer, from the architecture down to the box it runs on.",
      did: [
        "Stateless USSD session handling against a third-party gateway: first-dial detection, parsing the accumulated message string the gateway sends on each step, and menus under 160 characters that complete inside a strict timeout window",
        "A verifiable selection engine. Seeds are derived with HMAC-SHA256, so every weighted-random outcome is reproducible and can be audited after the fact",
        "A media pipeline for uploaded images: private object storage, authenticated and audit-logged viewing, and duplicate detection",
        "A responsive admin dashboard for operations, reporting and data export",
        "Provisioned and deployed the production stack myself: Node.js, PostgreSQL, Nginx, PM2, SSL, object storage, CDN and DNS",
      ],
      tech: "Node.js · PostgreSQL · Nginx · PM2 · DigitalOcean",
      note: "Built for a national Zambia Sugar promotion, through Blink Marketing Solutions.",
    },
  },
  {
    n: "06",
    slug: "whatsapp-promotion-chatbot",
    s: "WhatsApp chatbot",
    scale: "Bobtail promotion · solo build",
    badge: "Shipped",
    d: "A WhatsApp Business Cloud API bot for a Bobtail promotion: state-managed entry flows, proof-of-purchase image processing, automatic confirmations and FAQ routing, with every entry written to Google Sheets live. I built and ran it alone. The promotion's over and the bot is switched off.",
    case: {
      intro:
        "A WhatsApp bot for a national Bobtail promotion, through Big Mango Events Management. It took people through entering step by step, collected a photo of their proof of purchase and confirmed the entry, and each entry landed in a Google Sheet the promotion team could watch live. I was the only developer.",
      did: [
        "State-managed conversational flows on the WhatsApp Business Cloud API, with input validation and automatic confirmations",
        "Proof-of-purchase image upload with media processing and validation before an entry was accepted",
        "FAQ routing, so common questions got answered without a person stepping in",
        "Wired the WhatsApp Cloud API to the Google Sheets API for structured, real-time capture the promotion team could read",
        "Ran it on a hardened cloud host I set up myself: Nginx reverse proxy, SSL, PM2, Node.js",
      ],
      tech: "Node.js · WhatsApp Business Cloud API · Google Sheets API · Nginx · PM2",
      note: "It ran in production for the promotion. The promotion has ended and the bot is switched off.",
    },
  },
  {
    n: "07",
    slug: "insurtech-internship",
    s: "InsurTech",
    scale: "Malaysia · 15-week engagement",
    badge: "Internship",
    d: "Front end and back end at a Malaysian insurtech. I extended their API with Flask and GraphQL, modularised parts of the existing system, and built two internal HR tools: a personality test and leave management.",
    case: {
      intro:
        "A 15-week Technology Development & Operations internship at Guard Genius, an insurtech in Malaysia. I worked on both the front end and the back end with their engineering team.",
      did: [
        "Extended the company API with Flask and GraphQL",
        "Worked in their CI/CD pipeline on GitHub Actions",
        "Modularised parts of the existing system",
        "Built two internal HR tools: a personality test and a leave-management system",
        "Made the UI/UX wireframes and wrote the system documentation",
      ],
      tech: "Flask · GraphQL · Vue · MySQL · GitHub Actions",
    },
  },
];
