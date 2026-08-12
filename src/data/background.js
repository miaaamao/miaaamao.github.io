import beecoming from '../assets/img/experience/beecoming.png';
import stms from '../assets/img/experience/stms.png';
import mckinsey from '../assets/img/experience/mckinsey.png';
import versailles from '../assets/img/experience/versailles.png';
import ecnu from '../assets/img/experience/ecnu_no2_high_school.png';
import pwc from '../assets/img/experience/pwc.png';
import mindcruise from '../assets/img/experience/mindcruise.png';
import ucsb from '../assets/img/education/ucsb.png';
import duke from '../assets/img/education/duke.png';
import stanford from '../assets/img/education/stanford.png';

export const experience = [
  {
    period: 'Sep 2025 — Present',
    place: 'Beecoming',
    slug: 'beecoming',
    short: 'Beecoming',
    field: 'teaching',
    logo: beecoming,
    role: 'SAT Instructor and College Admissions Counselor (Part-Time)',
    location: 'San Jose, CA',
    current: true,
  },
  {
    period: 'Sep 2024 — Sep 2025',
    place: 'Shanghai Tongzhou Model School',
    slug: 'tongzhou',
    short: 'Tongzhou',
    field: 'education',
    logo: stms,
    role: 'Assistant Instructional Designer of International Education (Remote)',
    location: 'Shanghai, China',
  },
  {
    period: 'Sep 2022 — Nov 2022',
    place: 'McKinsey & Company',
    slug: 'mckinsey',
    short: 'McKinsey',
    field: 'analysis',
    logo: mckinsey,
    role: 'Business Analyst Intern',
    location: 'Beijing, China',
  },
  {
    period: 'Jun 2022 — Jul 2022',
    place: 'Versailles Group',
    slug: 'versailles',
    short: 'Versailles',
    field: 'analysis',
    logo: versailles,
    role: 'Portfolio Analyst Intern',
    location: 'Boston, MA',
  },
  {
    period: 'Feb 2022 — Jun 2022',
    place: 'International Division of No.2 High School of ECNU',
    slug: 'ecnu',
    short: 'ECNU No.2',
    field: 'teaching',
    logo: ecnu,
    role: 'AP Calculus Tutor & Substitute Math Teacher',
    location: 'Shanghai, China',
  },
  {
    period: 'Jun 2021 — Sep 2021',
    place: 'PricewaterhouseCoopers',
    slug: 'pwc',
    short: 'PwC',
    field: 'analysis',
    logo: pwc,
    role: 'Business Analyst Intern',
    location: 'Shanghai, China',
  },
  {
    period: 'Jun 2020 — Sep 2020',
    place: 'MindCruise Technology',
    slug: 'mindcruise',
    short: 'MindCruise',
    field: 'analysis',
    logo: mindcruise,
    role: 'Data Analyst Intern',
    location: 'Shanghai, China',
  },
];

export const education = [
  {
    period: 'Jun 2026 — Jun 2027',
    place: 'Stanford University',
    slug: 'stanford',
    tint: '#e9eaef',
    logo: stanford,
    location: 'Stanford, CA',
    current: true,
    degrees: [{ degree: 'Master of Arts' }],
  },
  {
    period: 'Jul 2023 — May 2024',
    place: 'Duke University',
    slug: 'duke',
    tint: '#e7ecee',
    logo: duke,
    location: 'Durham, NC',
    degrees: [{ degree: 'Master of Science' }],
  },
  {
    period: 'Sep 2019 — Jun 2023',
    place: 'UC Santa Barbara',
    slug: 'ucsb',
    tint: '#efe7d7',
    logo: ucsb,
    location: 'Santa Barbara, CA',
    degrees: [
      { degree: 'Bachelor of Science', major: 'Financial Mathematics and Statistics' },
      { degree: 'Bachelor of Arts', major: 'Theatre/Theater' },
    ],
  },
];

const byStem = (files) =>
  Object.fromEntries(
    Object.entries(files).map(([path, url]) => [
      path
        .split('/')
        .pop()
        .replace(/\.[^.]+$/, ''),
      url,
    ]),
  );

const scans = byStem(
  import.meta.glob('../assets/diplomas/*.{jpg,jpeg,png}', {
    eager: true,
    import: 'default',
    query: '?url',
  }),
);

const originals = byStem(
  import.meta.glob('../assets/diplomas/*.pdf', {
    eager: true,
    import: 'default',
    query: '?url',
  }),
);

export const schools = education.map((entry, order) => ({
  ...entry,
  index: String(order + 1).padStart(2, '0'),
  title: entry.place,
  scan: scans[entry.slug] ?? null,
  original: originals[entry.slug] ?? null,
}));

export function getSchool(slug) {
  return schools.find((school) => school.slug === slug) ?? null;
}

export const roles = [
  {
    slug: 'teacher',
    label: 'Teacher',
    icon: 'teacher',
    weight: 1,
    at: ['beecoming', 'ecnu', 'tongzhou'],
  },
  { slug: 'tutor', label: 'Tutor', icon: 'tutor', weight: 0.86, at: ['ecnu'] },
  {
    slug: 'business-analyst',
    label: 'Business Analyst',
    icon: 'business',
    weight: 0.7,
    at: ['mckinsey', 'pwc'],
  },
  {
    slug: 'financial-analyst',
    label: 'Financial Analyst',
    icon: 'finance',
    weight: 0.66,
    at: ['versailles'],
  },
  { slug: 'data-analyst', label: 'Data Analyst', icon: 'data', weight: 0.66, at: ['mindcruise'] },
  { slug: 'actor', label: 'Actor', icon: 'actor', weight: 0.6, at: [] },
  { slug: 'director', label: 'Director', icon: 'director', weight: 0.6, at: [] },
  { slug: 'model', label: 'Model', icon: 'model', weight: 0.6, at: [] },
  { slug: 'stage-manager', label: 'Stage Manager', icon: 'stage', weight: 0.6, at: [] },
];

export function placesOf(role) {
  if (!role || role.detail === false) return [];
  return role.at.map((slug) => experience.find((entry) => entry.slug === slug)).filter(Boolean);
}

export function getRole(slug) {
  return roles.find((role) => role.slug === slug) ?? null;
}
