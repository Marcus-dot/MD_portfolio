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
  pieta: {
    src: "/statue/pieta.png",
    caption: "ST. PETER'S PIETÀ, AFTER MICHELANGELO · CAST, SMK",
    label: "Michelangelo's Pietà, Mary holding Christ across her lap, drawn in etched tiles",
  },
  laocoon: {
    src: "/statue/laocoon.png",
    caption: "LAOCOÖN · CAST, SMK",
    label: "The Laocoön group, a priest and his sons fighting serpents, drawn in etched tiles",
  },
  gladiator: {
    src: "/statue/gladiator.png",
    caption: "BORGHESE GLADIATOR · CAST, SMK",
    label: "The Borghese Gladiator, a fighter lunging mid-contest, drawn in etched tiles",
  },
  moses: {
    src: "/statue/moses.png",
    caption: "MOSES, AFTER MICHELANGELO · CAST, SMK",
    label: "Michelangelo's Moses, seated with the tablets, drawn in etched tiles",
  },
  david: {
    src: "/statue/david.png",
    caption: "HEAD OF DAVID, AFTER MICHELANGELO · CAST, SMK",
    label: "The head of Michelangelo's David drawn in etched tiles",
  },
  faun: {
    src: "/statue/faun.png",
    caption: "BARBERINI FAUN · CAST, SMK",
    label: "The Barberini Faun, a satyr asleep, drawn in etched tiles",
  },
  prisoner: {
    src: "/statue/prisoner.png",
    caption: "YOUNG PRISONER, AFTER MICHELANGELO · CAST, SMK",
    label: "Michelangelo's Young Prisoner, a figure half-freed from the block, drawn in etched tiles",
  },
} satisfies Record<string, Statue>;

/* One statue per case outline, chosen for what the work was. None of these
   appear anywhere else on the site. */
export const CASE_STATUE: Record<string, keyof typeof STATUES> = {
  dashly: "zeus",
  "telecom-analytics-audit": "laocoon",
  "insurance-conference-platform": "gladiator",
  "health-insurance-mis": "moses",
  "whatsapp-ussd-platform": "david",
  "whatsapp-promotion-chatbot": "faun",
  "insurtech-internship": "prisoner",
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
    key: "pieta",
    title: "St. Peter's Pietà, after Michelangelo",
    object: "Plaster cast · SMK Royal Cast Collection, Copenhagen, KAS115",
    source: "3D scan by SMK · public domain",
    where: { label: "The short version", href: "/#manifesto" },
    why: "By Vasari's account, the only work Michelangelo ever signed: he carved his name on it after hearing it credited to another sculptor. It sits beside the statement I put my name to.",
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
    where: { label: "The Dashly room", href: "/dashly" },
    why: "Zeus with the ram's horns of the Egyptian Amun, keeping the one room given to a single product."
  },
  {
    key: "laocoon",
    title: "Laocoön",
    object: "Plaster cast · SMK Royal Cast Collection, Copenhagen, KAS385",
    source: "3D scan by SMK · public domain",
    where: { label: "Telecom audit", href: "/work/telecom-analytics-audit" },
    why: "The priest who warned Troy that the gift at its gates was not what it seemed, over an audit of numbers that had passed review and were still wrong.",
  },
  {
    key: "gladiator",
    title: "Borghese Gladiator",
    object: "Plaster cast · SMK Royal Cast Collection, Copenhagen, KAS499",
    source: "3D scan by SMK · public domain",
    where: { label: "NexVenue", href: "/work/insurance-conference-platform" },
    why: "A fighter mid-contest with the crowd watching: the event platform that ran live for 215 delegates.",
    tall: true,
  },
  {
    key: "moses",
    title: "Moses, after Michelangelo",
    object: "Plaster cast · SMK Royal Cast Collection, Copenhagen, KAS243",
    source: "3D scan by SMK · public domain",
    where: { label: "Health insurance MIS", href: "/work/health-insurance-mis" },
    why: "The lawgiver with the tablets, over the work of writing the rules down: processes, controls and SOPs.",
  },
  {
    key: "david",
    title: "Head of David, after Michelangelo",
    object: "Plaster cast · SMK Royal Cast Collection, Copenhagen, KAS2232",
    source: "3D scan by SMK · public domain",
    where: { label: "WhatsApp + USSD", href: "/work/whatsapp-ussd-platform" },
    why: "One against a giant: a national-scale platform, built and run solo.",
  },
  {
    key: "faun",
    title: "Barberini Faun",
    object: "Plaster cast · SMK Royal Cast Collection, Copenhagen, KAS208",
    source: "3D scan by SMK · public domain",
    where: { label: "WhatsApp chatbot", href: "/work/whatsapp-promotion-chatbot" },
    why: "Asleep after the revel. The promotion ended and the bot was decommissioned; it rests here.",
  },
  {
    key: "prisoner",
    title: "Young Prisoner, after Michelangelo",
    object: "Plaster cast · SMK Royal Cast Collection, Copenhagen, KAS2360",
    source: "3D scan by SMK · public domain",
    where: { label: "Internship", href: "/work/insurtech-internship" },
    why: "Michelangelo left his Prisoners half-freed from the block. The early years, still being carved.",
    tall: true,
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
