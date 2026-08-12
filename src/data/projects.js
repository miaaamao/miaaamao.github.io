export const projects = [
  {
    slug: 'project-one',
    index: '01',
    title: 'Project One',
    client: 'Placeholder Client',
    year: '2026',
    role: 'Placeholder Role',
    services: ['Strategy', 'Design', 'Development'],
    summary: 'A short placeholder line describing what this project was and why it mattered.',
    approach:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    challenges:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.',
    aspect: 'video',
    tint: '#efe7d7',
    url: 'https://example.com',
  },
  {
    slug: 'project-two',
    index: '02',
    title: 'Project Two',
    client: 'Placeholder Client',
    year: '2025',
    role: 'Placeholder Role',
    services: ['Research', 'Art Direction'],
    summary: 'A short placeholder line describing what this project was and why it mattered.',
    approach:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    challenges:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.',
    aspect: 'square',
    tint: '#f4f4f2',
    url: 'https://example.com',
  },
  {
    slug: 'project-three',
    index: '03',
    title: 'Project Three',
    client: 'Placeholder Client',
    year: '2025',
    role: 'Placeholder Role',
    services: ['Product Design', 'Prototyping'],
    summary: 'A short placeholder line describing what this project was and why it mattered.',
    approach:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    challenges:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.',
    aspect: 'video',
    tint: '#e6ebe6',
    url: 'https://example.com',
  },
  {
    slug: 'project-four',
    index: '04',
    title: 'Project Four',
    client: 'Placeholder Client',
    year: '2024',
    role: 'Placeholder Role',
    services: ['Brand', 'Motion'],
    summary: 'A short placeholder line describing what this project was and why it mattered.',
    approach:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    challenges:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.',
    aspect: 'portrait',
    tint: '#e9eaef',
    url: 'https://example.com',
  },
  {
    slug: 'project-five',
    index: '05',
    title: 'Project Five',
    client: 'Placeholder Client',
    year: '2024',
    role: 'Placeholder Role',
    services: ['Systems', 'Design'],
    summary: 'A short placeholder line describing what this project was and why it mattered.',
    approach:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    challenges:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.',
    aspect: 'video',
    tint: '#f1e9e4',
    url: 'https://example.com',
  },
  {
    slug: 'project-six',
    index: '06',
    title: 'Project Six',
    client: 'Placeholder Client',
    year: '2023',
    role: 'Placeholder Role',
    services: ['Editorial', 'Web'],
    summary: 'A short placeholder line describing what this project was and why it mattered.',
    approach:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    challenges:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.',
    aspect: 'square',
    tint: '#eceaea',
    url: 'https://example.com',
  },
  {
    slug: 'project-seven',
    index: '07',
    title: 'Project Seven',
    client: 'Placeholder Client',
    year: '2023',
    role: 'Placeholder Role',
    services: ['Concept', 'Direction'],
    summary: 'A short placeholder line describing what this project was and why it mattered.',
    approach:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    challenges:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.',
    aspect: 'video',
    tint: '#e7ecee',
    url: 'https://example.com',
  },
];

export function getProject(slug) {
  return projects.find((project) => project.slug === slug);
}

export function getNextProject(slug) {
  const at = projects.findIndex((project) => project.slug === slug);
  if (at === -1) return projects[0];
  return projects[(at + 1) % projects.length];
}
