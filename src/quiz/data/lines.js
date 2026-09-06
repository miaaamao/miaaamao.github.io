// Keyed by event. No line may respond to which option was chosen.
export const lines = {
  greet: ['sixteen of these. i’ll be right here.', 'okay. no wrong answers, genuinely.'],

  idle: [
    'take your time.',
    'no rush. i have nowhere to be.',
    'still thinking? valid.',
    'whatever’s actually true is the right one.',
    'i once watched a loading bar for nine minutes.',
    'i’m not scoring you. i can’t even count.',
  ],

  back: ['changed your mind. respectable.', 'go back as much as you want.'],

  pet: [
    '…',
    'okay that was nice.',
    'again? fine.',
    'i’m purring. tell nobody.',
    'we’re friends now.',
  ],

  quarter: {
    4: 'four down. i have not moved.',
    8: 'halfway. i’m still on my phone too.',
    12: 'four left.',
  },

  done: ['done. let me look.'],
};

export function pick(bank, last) {
  const pool = bank.length > 1 ? bank.filter((line) => line !== last) : bank;
  return pool[Math.floor(Math.random() * pool.length)];
}
