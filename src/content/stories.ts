export type Story = {
  n: string;
  s: string;
  scale: string;
  badge: "Under NDA" | "Shipped" | "Internship";
  d: string;
};

export const STORIES: Story[] = [
  {
    n: "01",
    s: "Telecommunications",
    scale: "National operator",
    badge: "Under NDA",
    d: "Audited a customer-analytics pipeline — a join silently multiplying rows, an inverted recency score, a collapsed monetary tier. Each documented with reproduction, impact, correction.",
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
    s: "InsurTech",
    scale: "Malaysia · 15-week engagement",
    badge: "Internship",
    d: "Frontend and backend development inside a Malaysian insurtech — extended the company API with Flask and GraphQL, modularized existing systems, and shipped internal HR tools for personality testing and leave management.",
  },
];
