import type { Locale } from './i18n';

export interface AboutSkill {
  label: string;
}

export interface AboutSkillGroup {
  titleKey?: 'programming' | 'frameworks' | 'development' | 'other';
  title?: string;
  skills: AboutSkill[];
}

const enSkills: AboutSkillGroup[] = [
  {
    titleKey: 'programming',
    skills: [
      { label: 'C#' },
      { label: 'C++' },
      { label: 'Dart' },
      { label: 'TypeScript' },
      { label: 'Sass' },
      { label: 'PHP' },
      { label: 'Java' },
    ],
  },
  {
    titleKey: 'frameworks',
    skills: [
      { label: '.NET' },
      { label: 'Flutter' },
      { label: 'Blazor' },
      { label: 'Unity XRI' },
      { label: 'Three.js' },
      { label: 'D3.js' },
      { label: 'Tailwind' },
    ],
  },
  {
    titleKey: 'development',
    skills: [
      { label: 'Unity' },
      { label: 'Git' },
      { label: 'Azure' },
      { label: 'Firebase' },
      { label: 'GCP' },
      { label: 'MySQL' },
      { label: 'CI/CD' },
    ],
  },
  {
    title: 'Design',
    skills: [
      { label: 'Prototyping' },
      { label: 'UX/UI Wireframing' },
      { label: 'Figma' },
      { label: 'Adobe CC' },
      { label: 'XR Design' },
    ],
  },
  {
    titleKey: 'other',
    skills: [
      { label: 'GIS' },
      { label: 'CAD' },
      { label: '3D Modelling' },
      { label: 'Photogrammetry' },
      { label: 'AI Development' },
      { label: 'Ollama' },
    ],
  },
];

const deSkills: AboutSkillGroup[] = [
  {
    titleKey: 'programming',
    skills: [{ label: 'C#' }, { label: 'Dart' }, { label: 'JavaScript' }, { label: 'TypeScript' }],
  },
  {
    titleKey: 'frameworks',
    skills: [{ label: 'React' }, { label: 'Flutter' }, { label: 'Three.js' }, { label: 'Astro' }],
  },
  {
    titleKey: 'development',
    skills: [{ label: 'Unity' }, { label: 'Git' }, { label: 'CI/CD' }],
  },
  {
    title: 'Design',
    skills: [{ label: 'UX/UI' }, { label: 'Figma' }, { label: 'XR' }],
  },
  {
    titleKey: 'other',
    skills: [{ label: 'GIS' }, { label: 'AI Development' }, { label: 'Ollama' }],
  },
];

export function getAboutSkillGroups(locale: Locale): AboutSkillGroup[] {
  return locale === 'de' ? deSkills : enSkills;
}
