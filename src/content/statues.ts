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
} satisfies Record<string, Statue>;
