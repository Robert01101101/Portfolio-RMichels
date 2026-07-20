const pageType = document.body.dataset.pageType;

const WAVE_PAGE_TYPES = new Set(['home', 'projects', 'about', 'project']);

if (WAVE_PAGE_TYPES.has(pageType ?? '')) {
  void import('./ParticleWaves.ts');
}

if (pageType === 'home') {
  void import('./LandingModel.ts');
  void import('./TextRotate.ts');
  void import('./ProjectTileParallax.ts');
}

if (pageType === 'projects') {
  void import('./ProjectFilter.ts');
  void import('./ProjectTileParallax.ts');
}

if (pageType === 'project') {
  void import('./ImageViewer.ts');
  void import('./ThreeMockup.ts');
}
