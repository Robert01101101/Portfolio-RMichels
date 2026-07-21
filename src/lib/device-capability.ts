const MOBILE_UA = /mobile|android|iphone|ipod/i;

type NavigatorWithMemory = Navigator & { deviceMemory?: number };

/** Heuristic for devices that should skip heavy WebGL / scroll effects. */
export function isLowPoweredDevice(): boolean {
  if (typeof navigator === 'undefined') return false;

  if (MOBILE_UA.test(navigator.userAgent)) return true;

  if (
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  ) {
    return true;
  }

  const cores = navigator.hardwareConcurrency;
  if (typeof cores === 'number' && cores > 0 && cores <= 4) return true;

  const memory = (navigator as NavigatorWithMemory).deviceMemory;
  if (typeof memory === 'number' && memory > 0 && memory <= 4) return true;

  return false;
}

export function isRetinaDisplay(): boolean {
  if (typeof window === 'undefined') return false;
  return (window.devicePixelRatio || 1) > 1;
}

/**
 * WebGL pixel ratio. Full device DPR by default; capped on low-powered retina
 * displays to reduce GPU fill cost without affecting standard-DPI machines.
 */
export function getWebGLPixelRatio(maxRetinaLowPower = 1.5): number {
  const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
  if (isLowPoweredDevice() && dpr > 1) {
    return Math.min(dpr, maxRetinaLowPower);
  }
  return dpr;
}
