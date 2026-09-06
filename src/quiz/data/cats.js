// `sit` and `scale` are per-cat: every artboard frames its cat differently.
export const cats = {
  A: {
    sit: '-84%',
    scale: 1,
    src: '/cats/luna.riv',
    artboard: 'Artboard',
    machine: 'State Machine 1',
    triggers: ['Trigger 1', 'Trigger 3', 'Trigger 2', 'Trigger 4'],
    // Carries pointer listeners and X/Y timelines, so she follows the cursor unaided.
    tracksCursor: true,
    credit: {
      title: 'Say Hi to little Luna',
      author: 'shayan.farid',
      slug: '22713-42491-say-hi-to-little-luna',
    },
  },
  B: {
    sit: '-82%',
    scale: 1.28,
    src: '/cats/wave.riv',
    artboard: 'Cat',
    machine: 'State Machine 1',
    triggers: [],
    credit: { title: 'Cat Simple Edit', author: 'nvr', slug: '8999-17412-cat-simple-edit' },
  },
  C: {
    sit: '-80%',
    scale: 1,
    src: '/cats/peek.riv',
    artboard: 'New Artboard',
    machine: 'State Machine 1',
    triggers: [],
    credit: { title: 'Kitten_popup', author: 'magiloudin', slug: '3916-8198-kittenpopup' },
  },
  D: {
    sit: '-96%',
    scale: 1.25,
    src: '/cats/sleepy.riv',
    artboard: 'Artboard',
    machine: 'cat_controller',
    triggers: ['tap_wake'],
    hoverFlag: 'is_hovering',
    credit: {
      title: 'Sleepy Cat - Falling Asleep Loop',
      author: 'metamom_mama',
      slug: '25457-47508-sleepy-cat-falling-asleep-loop',
    },
  },
  MIXED: {
    sit: '-100%',
    scale: 1.12,
    src: '/cats/night.riv',
    artboard: 'night cat',
    // This artboard reports a state machine that draws nothing; its animation is on the timeline.
    machine: null,
    triggers: [],
    credit: { title: 'Day vs Night', author: 'ericawywong', slug: '25575-47734-day-vs-night' },
  },
};

export const HOST = cats.A;

export const catFor = (profileKey, isMixed) => (isMixed ? cats.MIXED : cats[profileKey]);

export const allCredits = Object.values(cats).map((c) => c.credit);
