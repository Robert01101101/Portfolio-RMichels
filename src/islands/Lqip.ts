import { getFullResSrc, isLqipImage, LQIP_SWAPPED_ATTR } from '../lib/lqip';

const ROOT_MARGIN = '200px';

function swapImage(img: HTMLImageElement) {
  const fullSrc = getFullResSrc(img);
  if (!fullSrc) return;

  img.setAttribute(LQIP_SWAPPED_ATTR, '');

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
