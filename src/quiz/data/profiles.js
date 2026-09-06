// `lead` is the one suggestion shown for a Mixed result, where each tendency gets a single line.
export const profiles = {
  A: {
    key: 'A',
    mark: '🌿',
    title: 'The Balanced User',
    style:
      'You generally use social media on your terms. You enjoy what it offers, but it doesn’t seem to control much of your time, attention, or mood.',
    strengths:
      'You seem relatively comfortable stepping away from your phone and separating what happens online from how you feel about yourself.',
    notice:
      '“Balanced” doesn’t mean social media can never affect you. Habits can change during stressful periods, busy school weeks, or when something important is happening socially.',
    lead: 'Keep one part of your day intentionally phone-free.',
    tips: [
      'Keep one part of your day intentionally phone-free.',
      'Notice which accounts actually make your time online better.',
      'Don’t worry about achieving “perfect” screen time — focus on whether your use supports the life you want offline.',
    ],
  },
  B: {
    key: 'B',
    mark: '💬',
    title: 'The Connected Communicator',
    style:
      'For you, social media is mainly about people. Messages, group chats, sharing posts, and knowing what’s happening help you feel connected.',
    strengths:
      'Online spaces can genuinely support friendship, belonging, humor, and social connection.',
    notice:
      'Connection can turn into pressure to always be available. You may feel like you need to respond quickly or worry about missing something.',
    lead: 'Give yourself permission not to reply immediately.',
    tips: [
      'Give yourself permission not to reply immediately.',
      'Try muting non-urgent group chats while studying or sleeping.',
      'Ask yourself: “Am I checking because I want connection, or because I’m worried about missing something?”',
    ],
  },
  C: {
    key: 'C',
    mark: '🪞',
    title: 'The Social Comparator',
    style:
      'You’re especially aware of what other people are doing — and sometimes what you see online affects how you see yourself.',
    strengths:
      'Being socially aware isn’t automatically negative. You may be thoughtful about relationships and sensitive to what’s happening around you.',
    notice:
      'Social media gives you a lot of information about other people’s appearance, achievements, friendships and experiences — but usually only the parts they chose to show. Knowing that intellectually doesn’t always stop comparison emotionally.',
    lead: 'When comparison hits, ask: “What part of this person’s life am I not seeing?”',
    tips: [
      'Notice which accounts leave you feeling worse after viewing them.',
      'When comparison hits, ask: “What part of this person’s life am I not seeing?”',
      'Unfollow, mute, or take breaks from content that repeatedly makes you feel inadequate.',
      'Pay attention to accomplishments and relationships that matter to you, not just the ones that look impressive online.',
    ],
  },
  D: {
    key: 'D',
    mark: '🌊',
    title: 'The Autopilot Scroller',
    style:
      'Social media isn’t necessarily emotionally stressful for you — but sometimes you end up using it without really choosing to. You open one notification, and suddenly 35 minutes disappeared.',
    strengths:
      'Social media may genuinely help you relax, laugh, discover things, or take a break.',
    notice:
      'The issue isn’t necessarily what you’re watching. It’s whether your attention is going where you intended it to go.',
    lead: 'Before opening an app, ask: “What am I opening this for?”',
    tips: [
      'Before opening an app, ask: “What am I opening this for?”',
      'Move your most automatic app off your home screen.',
      'Create natural stopping points instead of relying only on willpower.',
      'Especially notice scrolling around bedtime, homework, and boredom.',
    ],
  },
};

export const mixedProfile = {
  mark: '🔀',
  title: 'The Mixed-Mode User',
  style:
    'Your social media habits don’t fit neatly into one category. You show strong patterns in more than one area — which is probably more realistic than fitting perfectly into a single “type.”',
};

export const disclaimer = 'This is a self-reflection tool, not a diagnostic assessment.';

export const intro = {
  title: 'What’s Your Social Media Style?',
  body: [
    'Social media can help us connect, create, relax, learn — and sometimes stress us out or keep us scrolling longer than we planned.',
    'Take this short quiz to explore how social media fits into your life. There are no “good” or “bad” answers. Choose the answer that sounds most like you, not the one you think you should choose.',
  ],
  meta: '16 questions · about 6 minutes · nothing you answer leaves this browser',
};

export const credit = {
  text: 'Cat animation “Say Hi to little Luna” by shayan.farid, CC BY.',
  href: 'https://rive.app/marketplace/22713-42491-say-hi-to-little-luna/',
};
