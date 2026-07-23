export const LQIP_SWAPPED_ATTR = 'data-lqip-swapped';

export function isLqipImage(img: HTMLImageElement): boolean {
  if (img.hasAttribute('lqip-ignore')) return false;
  if (img.hasAttribute(LQIP_SWAPPED_ATTR)) return false;
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
