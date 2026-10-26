/* Statues baked by scripts/statue/bake.mjs into public/statue/.
   Captions say exactly what the object is: the SMK pieces are plaster casts
   (public domain scans, SMK Royal Cast Collection); Marcus is the Geneva
   marble, whose scan licence (CC BY-SA) requires the credit line. */
export type Statue = {
  src: string;
  caption: string;
  credit?: string;
  label: string;
};

export const STATUES = {
  marcus: {
    src: "/statue/marcus-turn.png",
    caption: "MARCUS AURELIUS · MARBLE, 161–169 CE · MAH GENEVA",
    credit: "3D scan by Rama, Wikimedia Commons, CC BY-SA 3.0 FR",
    label: "A marble bust of Marcus Aurelius drawn in etched tiles; it turns toward the pointer",
  },
  hercules: {
    src: "/statue/hercules.png",
    caption: "HEAD OF THE FARNESE HERCULES · CAST, SMK",
    label: "The head of the Farnese Hercules drawn in etched tiles",
  },
  apollo: {
    src: "/statue/apollo.png",
    caption: "APOLLO BELVEDERE · CAST, SMK",
    label: "The Apollo Belvedere drawn in etched tiles",
  },
  athena: {
    src: "/statue/athena.png",
    caption: "HEAD OF THE HOPE ATHENA · CAST, SMK",
    label: "The helmeted head of the Hope Athena drawn in etched tiles",
  },
  torso: {
    src: "/statue/torso.png",
    caption: "BELVEDERE TORSO · CAST, SMK",
    label: "The Belvedere Torso, a statue missing its head and arms, drawn in etched tiles",
  },
  homer: {
    src: "/statue/homer.png",
    caption: "HOMER · CAST, SMK",
    label: "A bust of Homer drawn in etched tiles",
  },
  discobolus: {
    src: "/statue/discobolus.png",
    caption: "DISCOBOLUS · CAST, SMK",
    label: "The Discobolus, an athlete about to throw, drawn in etched tiles",
  },
  alexander: {
    src: "/statue/alexander.png",
    caption: "ALEXANDER AS HELIOS · CAST, SMK",
    label: "A head of Alexander the Great as the sun god Helios drawn in etched tiles",
  },
  zeus: {
    src: "/statue/zeus.png",
    caption: "ZEUS AMMON · CAST, SMK",
    label: "A head of Zeus Ammon with ram's horns drawn in etched tiles",
  },
} satisfies Record<string, Statue>;

/* One statue per case outline, chosen for what the work was. */
export const CASE_STATUE: Record<string, keyof typeof STATUES> = {
  dashly: "zeus", // the founder's own product
  "telecom-analytics-audit": "apollo", // god of truth: numbers that pass review can still be wrong
  "insurance-conference-platform": "homer", // a hall of 215 listeners
  "health-insurance-mis": "athena", // strategy and process design
  "whatsapp-ussd-platform": "hercules", // the whole stack, carried solo
  "whatsapp-promotion-chatbot": "discobolus", // one clean throw, delivered and done
  "insurtech-internship": "alexander", // the student years
};

/* The Cast Room (/cast-room): every statue on the site, with a plaque.
   Object lines come only from the source records (SMK object data,
   Wikimedia Commons file page); "why" says where it sits on this site. */
export type Exhibit = {
  key: keyof typeof STATUES;
  title: string;
  object: string;
  source: string;
  where: { label: string; href: string };
  why: string;
  tall?: boolean;
};

export const CAST_ROOM: Exhibit[] = [
  {
    key: "marcus",
    title: "Marcus Aurelius",
    object: "Marble bust, 161–169 CE · Musée d'art et d'histoire, Geneva, inv. 19050",
    source: "3D scan by Rama, Wikimedia Commons · CC BY-SA 3.0 FR",
    where: { label: "Homepage", href: "/" },
    why: "Emperor, Stoic, and my namesake: I go by Marcus. He keeps the front door, and he is the only statue here that turns to look at you.",
  },
  {
    key: "hercules",
    title: "Head of the Farnese Hercules",
    object: "Plaster cast · SMK Royal Cast Collection, Copenhagen, KAS701",
    source: "3D scan by SMK · public domain",
    where: { label: "Work", href: "/#work" },
    why: "The hero of the twelve labours stands over the work.",
  },
  {
    key: "apollo",
    title: "Apollo Belvedere",
    object: "Plaster cast · SMK Royal Cast Collection, Copenhagen, KAS353",
    source: "3D scan by SMK · public domain",
    where: { label: "Claims", href: "/#skills" },
    why: "Apollo was the god of truth. He keeps watch over the claims and the evidence behind them.",
    tall: true,
  },
  {
    key: "athena",
    title: "Head of the Hope Athena",
    object: "Plaster cast · SMK Royal Cast Collection, Copenhagen, KAS275",
    source: "3D scan by SMK · public domain",
    where: { label: "Method", href: "/#method" },
    why: "Goddess of wisdom and strategy, beside the four rules I work by.",
  },
  {
    key: "alexander",
    title: "Alexander the Great as Helios",
    object: "Plaster cast · SMK Royal Cast Collection, Copenhagen, KAS283",
    source: "3D scan by SMK · public domain",
    where: { label: "Education", href: "/#education" },
    why: "Aristotle's student, under the education section.",
  },
  {
    key: "discobolus",
    title: "Discobolus",
    object: "Plaster cast of a Roman copy, with a modern head · SMK Royal Cast Collection, Copenhagen, KAS1549",
    source: "3D scan by SMK · public domain",
    where: { label: "Contact", href: "/#contact" },
    why: "The athlete a breath before the throw, beside the ask.",
    tall: true,
  },
  {
    key: "homer",
    title: "Homer",
    object: "Plaster cast · SMK Royal Cast Collection, Copenhagen, KAS210",
    source: "3D scan by SMK · public domain",
    where: { label: "CV", href: "/cv" },
    why: "The storyteller, on the page that tells mine.",
  },
  {
    key: "zeus",
    title: "Zeus Ammon",
    object: "Plaster cast · SMK Royal Cast Collection, Copenhagen, KAS1110",
    source: "3D scan by SMK · public domain",
    where: { label: "Dashly case outline", href: "/work/dashly" },
    why: "Zeus with the ram's horns of the Egyptian Amun, over the company I co-founded.",
  },
  {
    key: "torso",
    title: "Belvedere Torso",
    object: "Plaster cast · SMK Royal Cast Collection, Copenhagen, KAS402",
    source: "3D scan by SMK · public domain",
    where: { label: "Any page that doesn't exist", href: "/lost-to-time" },
    why: "Missing its head and arms, it keeps watch over the pages that went missing too.",
  },
];
