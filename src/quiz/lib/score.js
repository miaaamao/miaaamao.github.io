import { questions, DIMENSION_ORDER } from '../data/questions.js';

// Two points is one strong-indicator question: one flipped key answer must not change the label.
export const MIXED_THRESHOLD = 2;

const emptyTally = () => ({ A: 0, B: 0, C: 0, D: 0 });

export function score(answers) {
  const totals = emptyTally();
  const strong = emptyTally();

  answers.forEach((dimension, i) => {
    const question = questions[i];
    if (!dimension || !question) return;
    totals[dimension] += question.weight;
    if (question.weight > 1) strong[dimension] += question.weight;
  });

  // Deterministic: strong-indicator subtotal breaks ties, then fixed order.
  const ranked = [...DIMENSION_ORDER].sort((a, b) => {
    if (totals[b] !== totals[a]) return totals[b] - totals[a];
    if (strong[b] !== strong[a]) return strong[b] - strong[a];
    return DIMENSION_ORDER.indexOf(a) - DIMENSION_ORDER.indexOf(b);
  });

  const [primary, secondary] = ranked;
  const gap = totals[primary] - totals[secondary];

  return {
    totals,
    strong,
    ranked,
    primary,
    secondary,
    gap,
    isMixed: gap <= MIXED_THRESHOLD,
    answered: answers.filter(Boolean).length,
  };
}
