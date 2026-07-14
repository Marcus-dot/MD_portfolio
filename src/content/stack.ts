/* Tech stack - §6 of PORTFOLIO_SOURCE_OF_TRUTH.md: only what's genuinely used. */
export type StackGroup = { label: string; items: string[] };

export const STACK: StackGroup[] = [
  {
    label: "Languages",
    items: ["Python", "JavaScript / TypeScript", "Java", "C/C++", "SQL"],
  },
  {
    label: "Frontend",
    items: ["React", "Next.js", "React Native (Expo)", "Vue", "Tailwind", "GSAP", "Framer Motion"],
  },
  {
    label: "Backend",
    items: ["Django", "Django REST Framework", "FastAPI", "Flask", "Node.js", "GraphQL"],
  },
  {
    label: "Data",
    items: ["PostgreSQL", "MySQL", "SQLite", "pandas", "scikit-learn"],
  },
  {
    label: "Integrations",
    items: ["WhatsApp Cloud API", "USSD gateways", "Firebase / Firestore", "Google Sheets API"],
  },
  {
    label: "Cloud & tooling",
    items: ["DigitalOcean", "Vercel", "Docker", "Nginx", "PM2", "GitHub Actions"],
  },
];

export const EDUCATION = [
  {
    degree: "BEng Software Engineering (Honours)",
    school: "Xiamen University",
    detail: "Xiamen University Malaysia campus · graduated 2025",
  },
  {
    degree: "Foundation in Science",
    school: "Xiamen University Malaysia",
    detail: "2019 – 2020",
  },
];
