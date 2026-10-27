/* Screenshots for /dashly, captured from dashlyhq.com (public pages, and the
   app signed in to a demo workspace). Files live in public/dashly/. */
export type Screen = { src: string; w: number; h: number; alt: string; caption: string };

export const DASHLY_SCREENS: Screen[] = [
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
