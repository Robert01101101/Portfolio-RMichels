export interface Role {
  slug: string;
  name: { en: string; de: string };
}

export const roles: Role[] = [
  // Order matches filter button priority on /projects (job-application focus)
  { slug: 'front-end', name: { en: 'Front-End', de: 'Front-End' } },
  { slug: 'back-end', name: { en: 'Back-End', de: 'Back-End' } },
  { slug: 'design', name: { en: 'UX / UI', de: 'UX / UI' } },
  { slug: 'game', name: { en: 'Game Development', de: 'Spielentwicklung' } },
  { slug: 'vr', name: { en: 'VR', de: 'VR' } },
  { slug: 'android', name: { en: 'Android', de: 'Android' } },
  { slug: 'blazor', name: { en: 'Blazor', de: 'Blazor' } },
  { slug: 'threejs', name: { en: 'Three.js', de: 'Three.js' } },
  { slug: 'd3js', name: { en: 'D3.js', de: 'D3.js' } },
  { slug: 'java-dev', name: { en: 'Java', de: 'Java' } },
  { slug: '3d-model', name: { en: '3D Modelling', de: '3D Modellierung' } },
  { slug: 'cad', name: { en: 'CAD', de: 'CAD' } },
  { slug: 'pm', name: { en: 'Project Management', de: 'Projektmanagement' } },
];

export function getRoleBySlug(slug: string): Role | undefined {
  return roles.find((r) => r.slug === slug);
}
