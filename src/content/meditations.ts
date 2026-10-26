/* Lines from Marcus Aurelius, Meditations, in George Long's 1862 translation
   (public domain; Project Gutenberg #15877). Copied verbatim and checked
   against that text - do not swap in modern translations, which are still
   under copyright. */
export type Meditation = { text: string; ref: string };

const cite = (ref: string) => `MARCUS AURELIUS, MEDITATIONS ${ref} · TR. GEORGE LONG`;

export const MEDITATIONS = {
  cv: {
    text: "No longer talk at all about the kind of man that a good man ought to be, but be such.",
    ref: cite("X.16"),
  },
  caseOutline: {
    text: "If it is not right, do not do it: if it is not true, do not say it.",
    ref: cite("XII.17"),
  },
  notFound: {
    text: "Loss is nothing else than change.",
    ref: cite("IX.35"),
  },
  castRoom: {
    text: "Everything is only for a day, both that which remembers and that which is remembered.",
    ref: cite("IV.35"),
  },
} satisfies Record<string, Meditation>;
