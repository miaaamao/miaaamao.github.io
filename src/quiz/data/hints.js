// Keyed by question number, then dimension. Each line names a subject, never a consequence.
export const hints = {
  1: {
    A: 'this one’s about opening it and then actually leaving.',
    B: 'this one’s about going there for people specifically.',
    C: 'this one’s about what you notice about yourself while you look.',
    D: 'this one’s about the time going missing, not the content.',
  },
  2: {
    A: 'this one’s about it passing quickly.',
    B: 'this one’s about the people, not the number.',
    C: 'this one’s about it landing on you personally.',
    D: 'this one’s about going back to it without deciding to.',
  },
  3: {
    A: 'this one’s about the decision holding.',
    B: 'this one’s about one specific thing you’re checking for.',
    C: 'this one’s about it staying with you after you stop.',
    D: 'this one’s about the stopping point moving.',
  },
  4: {
    A: 'this one’s about it being able to wait.',
    B: 'this one’s about not wanting to be out of the loop.',
    C: 'this one’s about where you sit in the group.',
    D: 'this one’s about drifting somewhere you weren’t headed.',
  },
  5: {
    A: 'this one’s about coming out about level.',
    B: 'this one’s about coming out closer to people.',
    C: 'this one’s about how you measure up afterwards.',
    D: 'this one’s about not really registering it either way.',
  },
  6: {
    A: 'this one’s about the feeling staying with them.',
    B: 'this one’s about doing something with it.',
    C: 'this one’s about it turning back toward you.',
    D: 'this one’s about it not really registering.',
  },
  7: {
    A: 'this one’s about not much changing.',
    B: 'this one’s about missing the people.',
    C: 'this one’s about being outside something.',
    D: 'this one’s about the hand, not the wanting.',
  },
  8: {
    A: 'this one’s about it being on your terms.',
    B: 'this one’s about the people it puts you near.',
    C: 'this one’s about knowing what’s going on.',
    D: 'this one’s about it being there when nothing else is.',
  },
  9: {
    A: 'this one’s about there being a reason first.',
    B: 'this one’s about a specific person-shaped reason.',
    C: 'this one’s about checking on something of yours.',
    D: 'this one’s about it happening before the thought does.',
  },
  10: {
    A: 'this one’s about the phone going quiet.',
    B: 'this one’s about the phone being part of the hangout.',
    C: 'this one’s about attention going somewhere else.',
    D: 'this one’s about noticing only afterwards.',
  },
  11: {
    A: 'this one’s about it not being about you.',
    B: 'this one’s about the checking itself.',
    C: 'this one’s about looking for the reason in yourself.',
    D: 'this one’s about what you do instead of waiting.',
  },
  12: {
    A: 'this one’s about the decision working.',
    B: 'this one’s about people specifically getting through.',
    C: 'this one’s about a thought pulling you there.',
    D: 'this one’s about no decision being involved.',
  },
  13: {
    A: 'this one’s a low amount, most of the time.',
    B: 'this one’s a low amount, for a people reason.',
    C: 'this one’s a higher amount, at least sometimes.',
    D: 'this one’s a low amount per post, but time is the part.',
  },
  14: {
    A: 'this one’s about the moment coming first.',
    B: 'this one’s about telling particular people.',
    C: 'this one’s about how it would read from outside.',
    D: 'this one’s about the reflex, before you’ve decided.',
  },
  15: {
    A: 'this one’s about being the one deciding.',
    B: 'this one’s about it being where your people are.',
    C: 'this one’s about it reaching inward.',
    D: 'this one’s about time going before you notice.',
  },
  16: {
    A: 'this one’s about not wanting to change it.',
    B: 'this one’s about the obligation easing off.',
    C: 'this one’s about the comparing easing off.',
    D: 'this one’s about the amount of time.',
  },
};

export function readingTime(text) {
  if (!text) return 0;
  return Math.min(Math.max(2000 + text.length * 55, 3200), 9000);
}
