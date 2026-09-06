// Question numbers worth 2 points; the rest are worth 1.
const STRONG = [2, 3, 4, 9, 13, 15];

// Every dimension lands in every slot exactly four times; fixed, so share links stay reproducible.
const DISPLAY_ORDER = [
  ['D', 'A', 'C', 'B'],
  ['A', 'C', 'D', 'B'],
  ['B', 'C', 'A', 'D'],
  ['A', 'D', 'B', 'C'],
  ['D', 'C', 'B', 'A'],
  ['C', 'A', 'B', 'D'],
  ['C', 'A', 'D', 'B'],
  ['B', 'D', 'C', 'A'],
  ['D', 'B', 'C', 'A'],
  ['D', 'B', 'A', 'C'],
  ['B', 'C', 'A', 'D'],
  ['B', 'A', 'D', 'C'],
  ['C', 'B', 'A', 'D'],
  ['A', 'B', 'D', 'C'],
  ['A', 'D', 'C', 'B'],
  ['C', 'D', 'B', 'A'],
];

const RAW = [
  {
    prompt: 'You have a few free minutes between things. What are you most likely to do?',
    options: {
      A: 'Check social media for a bit, then move on to something else.',
      B: 'See what my friends are doing or check my messages.',
      C: 'Look at what people have posted and end up thinking about my own stuff.',
      D: 'Start scrolling and sometimes realize way more time passed than I expected.',
    },
  },
  {
    prompt:
      'You post something and it gets fewer likes or reactions than you expected. How do you usually feel?',
    options: {
      A: 'I notice for a second, then stop thinking about it.',
      B: 'I wonder whether my friends saw it or why they haven’t responded.',
      C: 'I start wondering whether people didn’t like it — or didn’t like me.',
      D: 'I end up checking it a few more times while I’m scrolling anyway.',
    },
  },
  {
    prompt: 'It’s 11:30 p.m. and you planned to go to sleep, but your phone is right next to you.',
    options: {
      A: 'I can usually put it down when I decide it’s time to sleep.',
      B: 'I check whether anyone messaged me before I go to sleep.',
      C: 'I might check what people are posting and end up thinking about it afterward.',
      D: '“Five more minutes” sometimes turns into 30 minutes or more.',
    },
  },
  {
    prompt: 'A group chat is active while you’re doing homework. What usually happens?',
    options: {
      A: 'I’ll check it later when I’m finished.',
      B: 'It’s hard not to check because I don’t want to miss what’s happening.',
      C: 'I wonder what people are saying and whether I’m being left out.',
      D: 'I check one notification and somehow end up on other apps too.',
    },
  },
  {
    prompt: 'After spending time on social media, how do you most often feel?',
    options: {
      A: 'About the same as before, or entertained.',
      B: 'More connected to people I care about.',
      C: 'Sometimes worse about myself or like other people’s lives are better.',
      D: 'Sometimes I don’t even know — I just realize I’ve been scrolling for a long time.',
    },
  },
  {
    prompt:
      'You see someone your age post about an achievement, trip, relationship, appearance, or exciting experience. What’s closest to your reaction?',
    options: {
      A: 'Cool for them. I’m usually happy for them.',
      B: 'I might message or react if I know them.',
      C: 'I sometimes compare it with my own life and wonder whether I’m doing enough.',
      D: 'I keep scrolling and quickly move on to the next post.',
    },
  },
  {
    prompt: 'Imagine you couldn’t use social media for an entire Saturday. How would that feel?',
    options: {
      A: 'Mostly fine. I’d find other things to do.',
      B: 'I’d really miss talking to friends and knowing what’s going on.',
      C: 'I’d wonder what everyone else was doing without me.',
      D: 'I’d probably reach for my phone automatically a lot.',
    },
  },
  {
    prompt: 'What is the BEST part of social media for you?',
    options: {
      A: 'Picking it up when I want it, and leaving it when I don’t.',
      B: 'Staying connected with friends and people I care about.',
      C: 'Keeping up with what everyone’s doing.',
      D: 'It’s the easiest thing to reach for when I’m bored.',
    },
  },
  {
    prompt: 'How often do you open an app without really deciding to?',
    options: {
      A: 'Not often — I usually know why I’m opening it.',
      B: 'Mostly when I’m checking messages or seeing if someone replied.',
      C: 'Sometimes when I want to see whether anyone reacted to something.',
      D: 'A lot. Sometimes my hand opens it almost automatically.',
    },
  },
  {
    prompt: 'You’re hanging out with friends in person. How does your phone usually fit in?',
    options: {
      A: 'I can mostly forget about it while we’re together.',
      B: 'We use it together — sharing stuff, taking photos.',
      C: 'I sometimes notice what other people are posting or wonder what I’m missing elsewhere.',
      D: 'I sometimes catch myself scrolling even when people are right there.',
    },
  },
  {
    prompt:
      'Someone leaves you on “read” or doesn’t reply for several hours. What are you most likely to think?',
    options: {
      A: 'They’re probably busy.',
      B: 'I keep checking to see if they’ve replied.',
      C: 'I might wonder if I said something wrong or if they’re upset with me.',
      D: 'I usually distract myself by opening something else and scrolling.',
    },
  },
  {
    prompt: 'When you have something important to do, how easy is it to stay off social media?',
    options: {
      A: 'Usually pretty easy if I decide to focus.',
      B: 'I can focus, but messages from friends are hard to ignore.',
      C: 'If something social is on my mind, I check.',
      D: 'Pretty difficult — I often check without meaning to.',
    },
  },
  {
    prompt:
      'How much does what you see online affect how you feel about your appearance, achievements, friendships, or life?',
    options: {
      A: 'Not very much most of the time.',
      B: 'A little — mostly it just makes me feel closer to people.',
      C: 'Quite a bit, at least some of the time.',
      D: 'Not much from any one post — it’s the time that gets me.',
    },
  },
  {
    prompt: 'When something exciting happens to you, what’s closest to your first instinct?',
    options: {
      A: 'Enjoy it; I may or may not post about it later.',
      B: 'Share it with friends or people I care about.',
      C: 'Think about how it would look if I posted it or how people might react.',
      D: 'I reach for my phone out of habit before I’ve even thought about why.',
    },
  },
  {
    prompt: 'Which statement sounds MOST like you?',
    options: {
      A: '“I usually feel like I’m choosing when to use social media.”',
      B: '“Social media is one of the main ways I stay connected to people.”',
      C: '“What happens online can affect how I feel about myself.”',
      D: '“Sometimes social media is using my time before I realize it.”',
    },
  },
  {
    prompt: 'If you could change ONE thing about your social media habits, what would it be?',
    options: {
      A: 'Honestly, I mostly like the balance I have now.',
      B: 'Feel less pressure to always be available or respond quickly.',
      C: 'Compare myself less and care less about what other people think online.',
      D: 'Spend less time scrolling and be better at stopping when I want to.',
    },
  },
];

export const DIMENSION_ORDER = ['A', 'B', 'C', 'D'];

export const questions = RAW.map((q, i) => ({
  number: i + 1,
  prompt: q.prompt,
  weight: STRONG.includes(i + 1) ? 2 : 1,
  options: DISPLAY_ORDER[i].map((dimension) => ({
    dimension,
    text: q.options[dimension],
  })),
}));

export const TOTAL_POINTS = questions.reduce((sum, q) => sum + q.weight, 0);

export const checkpoints = {
  4: 'four down. i have not moved.',
  8: 'halfway. i’m still on my phone too.',
  12: 'four left. no wrong answers, remember.',
};
