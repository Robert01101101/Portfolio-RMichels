import { describe, expect, it } from 'vitest';
import { getFullResSrc, isLqipImage } from './lqip';

function mockImg(attrs: Record<string, string> = {}, src = ''): HTMLImageElement {
  return {
    hasAttribute: (key: string) => key in attrs,
    getAttribute: (key: string) => attrs[key] ?? null,
    currentSrc: src,
    src,
  } as unknown as HTMLImageElement;
}

describe('isLqipImage', () => {
  it('returns true for lqip paths', () => {
    const img = mockImg({}, '/assets/img/foo/lqip/bar.jpg');
    expect(isLqipImage(img)).toBe(true);
  });

  it('returns false when lqip-ignore is set', () => {
    const img = mockImg({ 'lqip-ignore': '' }, '/assets/img/foo/lqip/bar.jpg');
    expect(isLqipImage(img)).toBe(false);
  });

  it('returns false when already swapped', () => {
    const img = mockImg({ 'data-lqip-swapped': '' }, '/assets/img/foo/lqip/bar.jpg');
    expect(isLqipImage(img)).toBe(false);
  });

  it('returns false for non-lqip paths', () => {
    const img = mockImg({}, '/assets/img/foo/bar.jpg');
    expect(isLqipImage(img)).toBe(false);
  });
});

describe('getFullResSrc', () => {
  it('strips lqip/ from path', () => {
    const img = mockImg({}, '/assets/img/foo/lqip/bar.jpg');
    expect(getFullResSrc(img)).toBe('/assets/img/foo/bar.jpg');
  });

  it('converts gif to png by default', () => {
    const img = mockImg({}, '/assets/img/foo/lqip/bar.gif');
    expect(getFullResSrc(img)).toBe('/assets/img/foo/bar.png');
  });

  it('keeps gif when lqip-gif is set', () => {
    const img = mockImg({ 'lqip-gif': '' }, '/assets/img/foo/lqip/bar.jpg');
    expect(getFullResSrc(img)).toBe('/assets/img/foo/bar.gif');
  });

  it('converts to webp when lqip-webp is set', () => {
    const img = mockImg({ 'lqip-webp': '' }, '/assets/img/foo/lqip/bar.jpg');
    expect(getFullResSrc(img)).toBe('/assets/img/foo/bar.webp');
  });

  it('returns null for non-lqip images', () => {
    const img = mockImg({}, '/assets/img/foo/bar.jpg');
    expect(getFullResSrc(img)).toBeNull();
  });
});
