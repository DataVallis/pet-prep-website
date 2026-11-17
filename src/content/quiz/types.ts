/**
 * Words of the hub "Before you get a dog" and the breed quiz, one object per site language (M6-S06). The
 * e-mail field and the partner call-out reuse the strings of the real-cost app (shared.ts), the "good for / keep in
 * mind" labels come from the register (`suitability_labels`). Templates use {n}, {total}, {name}.
 */
export type QuizQuestion = { q: string; options: string[] };

export type QuizCopy = {
  /** Header link. */
  nav: string;
  hubMetaTitle: string;
  hubMetaDesc: string;
  hubEyebrow: string;
  hubTitle: string;
  hubLead: string;
  cardQuizTitle: string;
  cardQuizText: string;
  cardQuizCta: string;
  cardWorkTitle: string;
  cardWorkText: string;
  cardWorkCta: string;
  cardSizeTitle: string;
  cardSizeText: string;
  cardHomeTitle: string;
  cardHomeText: string;
  /** Badge on the two cards without a tool yet. */
  soon: string;
  listTitle: string;
  listIntro: string;
  listSearch: string;
  listPlaceholder: string;
  listNone: string;
  whyTitle: string;
  whyText: string;
  quizMetaTitle: string;
  quizMetaDesc: string;
  quizEyebrow: string;
  quizTitle: string;
  quizIntro: string;
  start: string;
  stepOf: string;
  back: string;
  restart: string;
  /** Nine questions, in the order of QUESTION_IDS (src/lib/breedQuiz.ts); options in the order documented there. */
  questions: QuizQuestion[];
  resultTitle: string;
  resultLead: string;
  /** "We chose among {n} breeds …" */
  pool: string;
  rank: string;
  fitSize: string;
  fitExercise: string;
  clashSize: string;
  clashExercise: string;
  seeBreed: string;
  calcLink: string;
  /** "Try the breed {mid} in PetPrep": `{mid}` = breed name in running text (lib/breedName.ts), so no declension is needed. */
  tryCta: string;
  considerNote: string;
  adoptionTitle: string;
  adoptionText: string;
  notNowTitle: string;
  notNowText: string;
  notNowCta: string;
  shareButton: string;
  shareCopied: string;
  disclaimer: string;
  noScript: string;
};
