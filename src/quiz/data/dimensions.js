// Colours run 5.3:1 to 6.2:1 on the canvas, so no dimension reads louder than another.
export const dimensions = {
  A: {
    key: 'A',
    name: 'Self-Regulation',
    color: '#4a6b4f',
  },
  B: {
    key: 'B',
    name: 'Connection',
    color: '#8c4f2b',
  },
  C: {
    key: 'C',
    name: 'Social Comparison',
    color: '#6b5480',
  },
  D: {
    key: 'D',
    name: 'Automatic Use',
    color: '#3f5c78',
  },
};

export const dimensionList = ['A', 'B', 'C', 'D'].map((k) => dimensions[k]);
