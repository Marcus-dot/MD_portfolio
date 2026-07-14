/* Facts sourced from PORTFOLIO_SOURCE_OF_TRUTH.md - verified claims only. */
export type Story = {
  n: string;
  slug: string;
  s: string;
  scale: string;
  badge: "Under NDA" | "Shipped" | "Live" | "Contract" | "Internship";
  d: string;
  case: {
    intro: string;
    did: string[];
    tech?: string;
    note?: string;
  };
};

export const STORIES: Story[] = [
  {
    n: "01",
    slug: "telecom-analytics-audit",
    s: "Telecommunications",
    scale: "National operator",
    badge: "Under NDA",
    d: "Audited a customer-analytics pipeline: a join silently multiplying rows, an inverted recency score, a collapsed monetary tier, mixed-unit revenue reconciliation. Each documented with reproduction, impact, correction.",
    case: {
      intro:
        "A national telecom operator's customer-analytics pipeline was producing figures the business couldn't fully defend. I audited it end to end, from the raw joins to the scores decision-makers were reading.",
      did: [
        "Caught a many-to-many join silently multiplying rows, inflating downstream aggregates. Reproduced, quantified, corrected",
        "Found the RFM recency score inverted: the most recently active customers were being scored as the most dormant",
        "Identified a collapsed monetary tier that flattened the customer-value segmentation",
        "Reconciled mixed-unit revenue figures so reported totals traced cleanly to source",
        "Documented every issue with reproduction steps, business impact, and the correction applied",
      ],
      note: "The operator stays unnamed under NDA. The findings pattern is the point: numbers that pass review can still be wrong, and the fix starts with reproduction.",
    },
  },
  {
    n: "02",
    slug: "insurance-conference-platform",
    s: "Insurance",
    scale: "215-delegate conference",
    badge: "Shipped",
    d: "Full event platform for a national insurance conference: live Q&A, ratings, capacity, plus the post-event analytics report that went to the board.",
    case: {
      intro:
        "NexVenue is an event-networking platform live on both app stores. For the IAZ Annual Insurance Conference 2026 it ran the full event: live agenda and session management, live Q&A, group and direct chat, push notifications, delegate networking, speaker ratings, and role-based access for attendees, speakers, exhibitors and organisers.",
      did: [
        "Led the pre-launch engineering pass: security hardening, including closing a live Firestore privilege-escalation vulnerability before launch",
        "Reproduced and fixed a session-capacity race condition, with no speculative fix shipped",
        "Tokenized the design system and consolidated components ahead of release",
        "Served 215 delegates and 71 live Q&A entries across the event",
        "Produced the post-event analytics report that went to the board",
      ],
      tech: "React Native · Expo · Firebase/Firestore · Next.js web companion",
    },
  },
  {
    n: "03",
    slug: "health-insurance-mis",
    s: "Health insurance",
    scale: "ILO-commissioned · national authority",
    badge: "Contract",
    d: "Contributed to the ILO-commissioned, EU-funded design of a new management information system for Zambia's national health insurance authority. Authored the provider-management and financial-management module designs (18 UML diagrams), from contextual-inquiry interviews through SOPs. Deliverables submitted for ILO technical review.",
    case: {
      intro:
        "An ILO-commissioned, EU-funded engagement (Digital Convergence Initiative) to design a new management information system for Zambia's National Health Insurance Management Authority. A nine-week, three-phase assignment: user analysis and service-journey mapping; future-state business-process models; functional analysis, gap assessment and SOPs. I was a contributing consultant on the team.",
      did: [
        "Ran pre-workshop contextual-inquiry interviews and observation sessions across client departments",
        "Participated in a five-day on-site requirements-gathering workshop",
        "Authored the Provider Management and Financial Management & Payments modules of the future-state design: 18 UML diagrams across value-stream, process and activity levels, covering provider accreditation, claims adjudication, maker-checker financial controls and three-way reconciliation",
        "Contributed to functional analysis, SOPs and RACI matrices",
        "Led substantial document production and quality control against ILO reviewer feedback",
      ],
      note: "Deliverables are submitted and under ILO technical review.",
    },
  },
  {
    n: "04",
    slug: "whatsapp-ussd-platform",
    s: "Messaging platform",
    scale: "WhatsApp + USSD · solo build",
    badge: "Live",
    d: "Dual-channel platform reaching smartphones and feature phones alike: stateless USSD session handling against a gateway timeout window, an HMAC-audited selection engine, a secure media pipeline, and a custom admin dashboard. Full production stack provisioned and run solo.",
    case: {
      intro:
        "A production messaging platform spanning WhatsApp and USSD with shared backend logic across both channels, so feature-phone users get the same service without a smartphone. Sole developer, full lifecycle: from architecture to the box it runs on.",
      did: [
        "Built stateless USSD session handling against a third-party gateway: first-dial detection, accumulated-message parsing, and sub-160-character menu flows inside a strict timeout window",
        "Designed a verifiable selection engine: HMAC-SHA256-derived seeds producing auditable, reproducible weighted-random outcomes",
        "Built a secure media pipeline: image ingestion into private object storage with authenticated, audit-logged viewing and duplicate detection",
        "Shipped a custom responsive admin dashboard for operations, reporting and data export",
        "Provisioned and deployed the full production stack solo: Node.js, PostgreSQL, Nginx, PM2, SSL, object storage, CDN/DNS",
      ],
      tech: "Node.js · PostgreSQL · Nginx · PM2 · DigitalOcean",
    },
  },
  {
    n: "05",
    slug: "insurtech-internship",
    s: "InsurTech",
    scale: "Malaysia · 15-week engagement",
    badge: "Internship",
    d: "Frontend and backend development inside a Malaysian insurtech. Extended the company API with Flask and GraphQL, modularized existing systems, and shipped internal HR tools for personality testing and leave management.",
    case: {
      intro:
        "A 15-week Technology Development & Operations internship at Guard Genius, a Malaysian InsurTech, working across frontend and backend inside a production engineering team.",
      did: [
        "Extended the company API with Flask and GraphQL",
        "Worked in CI/CD via GitHub Actions",
        "Modularized existing systems",
        "Built internal HR tools: a personality-test application and a leave-management system",
        "Produced UI/UX wireframes and system documentation",
      ],
      tech: "Flask · GraphQL · Vue · MySQL · GitHub Actions",
    },
  },
];
