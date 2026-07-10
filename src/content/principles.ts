export type Principle = { t: string; d: string };

export const PRINCIPLES: Principle[] = [
  {
    t: "No fixes without diagnosis",
    d: "Reproduce the failure before touching the code.",
  },
  {
    t: "Verified claims only",
    d: "If a number can't be traced, it doesn't ship.",
  },
  {
    t: "Instrumentation first",
    d: "Measure the system before theorising about it.",
  },
  {
    t: "Clean prose",
    d: "Documentation stakeholders read without a translator.",
  },
];
