const pageType = document.body.dataset.pageType;

if (pageType === 'home') {
  void import('./LandingModel.ts');
  void import('./TextRotate.ts');
}

if (pageType === 'projects') {
  void import('./ProjectFilter.ts');
}

if (pageType === 'project') {
  void import('./ImageViewer.ts');
  void import('./ThreeMockup.ts');
}
