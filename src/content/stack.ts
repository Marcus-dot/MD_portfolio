/* Tech stack - §6 of PORTFOLIO_SOURCE_OF_TRUTH.md and the Oct 2026 CV: only what's genuinely used. */
export type StackGroup = { label: string; items: string[] };

export const STACK: StackGroup[] = [
  {
    label: "Languages",
    items: ["Python", "JavaScript / TypeScript", "Java", "C/C++", "SQL"],
  },
  {
    label: "Frontend",
    items: ["React", "Next.js", "React Native (Expo)", "Flutter", "Vue", "Tailwind", "GSAP", "Framer Motion"],
  },
  {
    label: "Backend",
    items: ["Django", "Django REST Framework", "FastAPI", "Flask", "Node.js", "GraphQL"],
  },
  {
    label: "Databases",
    items: ["PostgreSQL", "MySQL", "SQLite"],
  },
  {
    label: "Data & AI",
    items: ["Data modelling", "Pipeline validation", "pandas", "scikit-learn", "AI/LLM integration"],
  },
  {
    label: "Integrations",
    items: ["WhatsApp Cloud API", "USSD gateways", "Google Sheets API", "Mobile money", "REST APIs"],
  },
  {
    label: "Cloud & tooling",
    items: ["Firebase / Firestore", "DigitalOcean", "Vercel", "Docker", "Nginx", "PM2", "GitHub Actions"],
  },
];

export type Education = {
  degree: string;
  school: string;
  detail: string;
  thesis?: string;
};

export const EDUCATION: Education[] = [
  {
    degree: "BEng Software Engineering (Honours)",
    school: "Xiamen University",
    detail: "Xiamen University Malaysia campus · 2020 – 2025",
    thesis:
      "Thesis: feature selection for IoT device detection using machine learning (SVM, Random Forest, DNN; RFE, PCA, ReliefF).",
  },
  {
    degree: "Foundation in Science",
    school: "Xiamen University Malaysia",
    detail: "2019 – 2020",
  },
];
