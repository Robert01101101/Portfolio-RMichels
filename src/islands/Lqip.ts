const SWAPPED_ATTR = 'data-lqip-swapped';
const ROOT_MARGIN = '200px';

function isLqipImage(img: HTMLImageElement): boolean {
  if (img.hasAttribute('lqip-ignore')) return false;
  if (img.hasAttribute(SWAPPED_ATTR)) return false;
  const src = img.currentSrc || img.src;
  return src.includes('lqip/');
}

export function getFullResSrc(img: HTMLImageElement): string | null {
  if (!isLqipImage(img)) return null;

  let src = img.currentSrc || img.src;
  src = src.replace('lqip/', '');
  if (src.includes('gif')) src = src.replace('gif', 'png');
  if (img.hasAttribute('lqip-gif')) src = src.replace('jpg', 'gif');
  if (img.hasAttribute('lqip-webp')) src = src.replace('jpg', 'webp');
  return src;
}

function swapImage(img: HTMLImageElement) {
  const fullSrc = getFullResSrc(img);
  if (!fullSrc) return;

  img.setAttribute(SWAPPED_ATTR, '');

  const preload = new Image();
  preload.onload = () => {
    img.src = fullSrc;
  };
  preload.onerror = () => {
    img.src = fullSrc;
  };
  preload.src = fullSrc;
}

export function initLqip() {
  const images = document.getElementsByTagName('img');
  const candidates: HTMLImageElement[] = [];

  for (let i = 0; i < images.length; i++) {
    const img = images[i];
    if (isLqipImage(img)) candidates.push(img);
  }

  if (candidates.length === 0) return;

  if (typeof IntersectionObserver === 'undefined') {
    for (const img of candidates) swapImage(img);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const img = entry.target as HTMLImageElement;
        swapImage(img);
        observer.unobserve(img);
      }
    },
    { rootMargin: ROOT_MARGIN },
  );

  for (const img of candidates) observer.observe(img);
}

if (typeof document !== 'undefined') {
  initLqip();
}
