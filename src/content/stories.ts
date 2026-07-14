/* Facts sourced from PORTFOLIO_SOURCE_OF_TRUTH.md — verified claims only. */
export type Story = {
  n: string;
  s: string;
  scale: string;
  badge: "Under NDA" | "Shipped" | "Live" | "Contract" | "Internship";
  d: string;
};

export const STORIES: Story[] = [
  {
    n: "01",
    s: "Telecommunications",
    scale: "National operator",
    badge: "Under NDA",
    d: "Audited a customer-analytics pipeline — a join silently multiplying rows, an inverted recency score, a collapsed monetary tier, mixed-unit revenue reconciliation. Each documented with reproduction, impact, correction.",
  },
  {
    n: "02",
    s: "Insurance",
    scale: "215-delegate conference",
    badge: "Shipped",
    d: "Full event platform for a national insurance conference — live Q&A, ratings, capacity — plus the post-event analytics report that went to the board.",
  },
  {
    n: "03",
    s: "Health insurance",
    scale: "ILO-commissioned · national authority",
    badge: "Contract",
    d: "Contributed to the ILO-commissioned, EU-funded design of a new management information system for Zambia's national health insurance authority — authored the provider-management and financial-management module designs (18 UML diagrams), from contextual-inquiry interviews through SOPs. Deliverables submitted for ILO technical review.",
  },
  {
    n: "04",
    s: "Messaging platform",
    scale: "WhatsApp + USSD · solo build",
    badge: "Live",
    d: "Dual-channel platform reaching smartphones and feature phones alike — stateless USSD session handling against a gateway timeout window, an HMAC-audited selection engine, a secure media pipeline, and a custom admin dashboard. Full production stack provisioned and run solo.",
  },
  {
    n: "05",
    s: "InsurTech",
    scale: "Malaysia · 15-week engagement",
    badge: "Internship",
    d: "Frontend and backend development inside a Malaysian insurtech — extended the company API with Flask and GraphQL, modularized existing systems, and shipped internal HR tools for personality testing and leave management.",
  },
];
