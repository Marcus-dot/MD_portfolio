/* Screenshots for /dashly, captured from dashlyhq.com (public pages, and the
   app signed in to a demo workspace). Files live in public/dashly/. */
export type Screen = { src: string; w: number; h: number; alt: string; caption: string };

export const DASHLY_SCREENS: Screen[] = [
  {
    src: "/dashly/app-dashboard.webp",
    w: 1268,
    h: 748,
    alt: "The Dashly dashboard: portfolio totals, a budget warning, and a payback chart showing when the portfolio pays back, month by month",
    caption: "Inside the app · the portfolio dashboard and its payback view (test workspace)",
  },
  {
    src: "/dashly/app-sense.webp",
    w: 1065,
    h: 700,
    alt: "A Dashly project page: milestones with two overdue, beside the Dashly Sense panel scoring the project 50, Fair, across five dimensions with signals",
    caption: "Inside the app · a project scored by Sense, with the signals that explain it",
  },
  {
    src: "/dashly/app-npv.webp",
    w: 1130,
    h: 795,
    alt: "Dashly's NPV calculator: investment parameters in kwacha, a net present value of ZMW 35,303.72 marked viable, and a what-if curve on the discount rate",
    caption: "Inside the app · the NPV calculator, one of the 26, with what-if analysis",
  },
  {
    src: "/dashly/site-hero.webp",
    w: 2400,
    h: 1160,
    alt: "The dashlyhq.com home page: the line 'Every project. One honest score.' beside a portfolio of sample projects, each with its Sense score",
    caption: "dashlyhq.com · the promise, and a portfolio scored by Sense (sample data)",
  },
  {
    src: "/dashly/site-sense.webp",
    w: 2280,
    h: 680,
    alt: "Dashly Sense on dashlyhq.com: one project graded across schedule, budget, risk, progress and activity, beside the 26 industry calculators",
    caption: "dashlyhq.com · the five Sense dimensions, and the calculator toolbox",
  },
];
