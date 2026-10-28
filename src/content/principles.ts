export type Principle = { t: string; d: string };

export const PRINCIPLES: Principle[] = [
  {
    t: "Diagnose first",
    d: "I reproduce the bug before I touch the code.",
  },
  {
    t: "Only numbers I can trace",
    d: "If I can't show where a figure came from, it doesn't go out.",
  },
  {
    t: "Measure, then guess",
    d: "Look at what the system is actually doing before deciding why.",
  },
  {
    t: "Write it plainly",
    d: "Docs people can follow without having to call me.",
  },
];
