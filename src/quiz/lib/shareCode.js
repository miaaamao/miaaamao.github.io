import { questions } from '../data/questions.js';

const LETTERS = { A: 'a', B: 'b', C: 'c', D: 'd' };
const BACK = { a: 'A', b: 'B', c: 'C', d: 'D' };
const BLANK = '-';

export function encodeAnswers(answers) {
  return answers.map((a) => LETTERS[a] ?? BLANK).join('');
}

// Null unless the code is a complete, well-formed run; a partial one must not build a result.
export function decodeAnswers(code) {
  if (typeof code !== 'string' || code.length !== questions.length) return null;
  const answers = [...code].map((c) => BACK[c] ?? null);
  return answers.every(Boolean) ? answers : null;
}

export const SHARE_PARAM = 'r';
