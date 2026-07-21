import { afterEach, describe, expect, it, vi } from 'vitest';
import { getWebGLPixelRatio, isLowPoweredDevice, isRetinaDisplay } from './device-capability';

function mockNavigator(partial: Partial<Navigator & { deviceMemory?: number }>) {
  vi.stubGlobal('navigator', { userAgent: '', hardwareConcurrency: 8, ...partial });
}

function mockWindow(partial: { devicePixelRatio?: number; reducedMotion?: boolean }) {
  const dpr = partial.devicePixelRatio ?? 1;
  vi.stubGlobal('window', {
    devicePixelRatio: dpr,
    matchMedia: (query: string) => ({
      matches: query.includes('prefers-reduced-motion') && !!partial.reducedMotion,
    }),
  });
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('isLowPoweredDevice', () => {
  it('detects mobile user agents', () => {
    mockNavigator({ userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)' });
    mockWindow({});
    expect(isLowPoweredDevice()).toBe(true);
  });

  it('detects prefers-reduced-motion', () => {
    mockNavigator({ userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' });
    mockWindow({ reducedMotion: true });
    expect(isLowPoweredDevice()).toBe(true);
  });

  it('detects low core count', () => {
    mockNavigator({ userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)', hardwareConcurrency: 4 });
    mockWindow({});
    expect(isLowPoweredDevice()).toBe(true);
  });

  it('detects low device memory', () => {
    mockNavigator({
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      hardwareConcurrency: 8,
      deviceMemory: 4,
    });
    mockWindow({});
    expect(isLowPoweredDevice()).toBe(true);
  });

  it('returns false for capable desktops', () => {
    mockNavigator({
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      hardwareConcurrency: 8,
      deviceMemory: 8,
    });
    mockWindow({});
    expect(isLowPoweredDevice()).toBe(false);
  });
});

describe('isRetinaDisplay', () => {
  it('returns true when devicePixelRatio > 1', () => {
    mockWindow({ devicePixelRatio: 2 });
    expect(isRetinaDisplay()).toBe(true);
  });

  it('returns false for standard DPI', () => {
    mockWindow({ devicePixelRatio: 1 });
    expect(isRetinaDisplay()).toBe(false);
  });
});

describe('getWebGLPixelRatio', () => {
  it('returns full DPR on capable hardware', () => {
    mockNavigator({
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      hardwareConcurrency: 8,
      deviceMemory: 8,
    });
    mockWindow({ devicePixelRatio: 2 });
    expect(getWebGLPixelRatio()).toBe(2);
  });

  it('caps DPR on low-powered retina displays', () => {
    mockNavigator({
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      hardwareConcurrency: 4,
    });
    mockWindow({ devicePixelRatio: 2 });
    expect(getWebGLPixelRatio()).toBe(1.5);
  });

  it('does not cap DPR on low-powered non-retina displays', () => {
    mockNavigator({
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      hardwareConcurrency: 4,
    });
    mockWindow({ devicePixelRatio: 1 });
    expect(getWebGLPixelRatio()).toBe(1);
  });
});
