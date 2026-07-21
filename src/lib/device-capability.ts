const MOBILE_UA = /mobile|android|iphone|ipod/i;
const INTEL_INTEGRATED_RE = /intel.*(uhd|iris|hd graphics)/i;

type NavigatorWithMemory = Navigator & { deviceMemory?: number };

export type DevicePerformanceTier = 'full' | 'reduced' | 'minimal';

let cachedRendererString: string | null | undefined;

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

/**
 * Three-tier performance classification.
 * - minimal: skip heavy WebGL (same heuristics as isLowPoweredDevice)
 * - reduced: WebGL with DPR cap, fewer particles, Lenis off by default
 * - full: full experience
 */
export function getDevicePerformanceTier(): DevicePerformanceTier {
  if (typeof navigator === 'undefined') return 'full';

  if (isLowPoweredDevice()) return 'minimal';

  if (isIntelIntegratedGpu()) return 'reduced';

  return 'full';
}

export function isRetinaDisplay(): boolean {
  if (typeof window === 'undefined') return false;
  return (window.devicePixelRatio || 1) > 1;
}

/** Sniff WebGL renderer string for Intel integrated GPUs (UHD / Iris). */
export function getWebGLRendererString(): string | null {
  if (cachedRendererString !== undefined) return cachedRendererString;

  if (typeof document === 'undefined') {
    cachedRendererString = null;
    return null;
  }

  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') ?? canvas.getContext('experimental-webgl');
    if (!gl) {
      cachedRendererString = null;
      return null;
    }
    const debugInfo = (gl as WebGLRenderingContext).getExtension('WEBGL_debug_renderer_info');
    if (!debugInfo) {
      cachedRendererString = null;
      return null;
    }
    cachedRendererString = (gl as WebGLRenderingContext).getParameter(
      debugInfo.UNMASKED_RENDERER_WEBGL,
    ) as string;
    return cachedRendererString;
  } catch {
    cachedRendererString = null;
    return null;
  }
}

export function isIntelIntegratedGpu(): boolean {
  const renderer = getWebGLRendererString();
  if (!renderer) return false;
  return INTEL_INTEGRATED_RE.test(renderer);
}

/**
 * WebGL pixel ratio. Full device DPR on capable hardware; capped on reduced-tier
 * retina displays to reduce GPU fill cost.
 */
export function getWebGLPixelRatio(maxRetinaReduced = 1.5): number {
  const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
  const tier = getDevicePerformanceTier();

  if (tier === 'reduced' && dpr > 1) {
    return Math.min(dpr, maxRetinaReduced);
  }

  // Legacy path: isLowPoweredDevice covers minimal tier (WebGL skipped anyway)
  if (isLowPoweredDevice() && dpr > 1) {
    return Math.min(dpr, maxRetinaReduced);
  }

  return dpr;
}

/** Reset cached GPU sniff (for tests). */
export function resetWebGLRendererCache(): void {
  cachedRendererString = undefined;
}
