import { describe, expect, it } from 'vitest';
import { getFullResSrc } from './Lqip';

function mockImg(attrs: Record<string, string> = {}, src = ''): HTMLImageElement {
  return {
    hasAttribute: (name: string) => Object.prototype.hasOwnProperty.call(attrs, name),
    currentSrc: src,
    src,
  } as HTMLImageElement;
}

describe('getFullResSrc', () => {
  it('returns null for lqip-ignore images', () => {
    const img = mockImg({ 'lqip-ignore': '' }, 'http://localhost/assets/img/lqip/foo.jpg');
    expect(getFullResSrc(img)).toBeNull();
  });

  it('returns null for already swapped images', () => {
    const img = mockImg({ 'data-lqip-swapped': '' }, 'http://localhost/assets/img/lqip/foo.jpg');
    expect(getFullResSrc(img)).toBeNull();
  });

  it('strips lqip path segment', () => {
    const img = mockImg({}, 'http://localhost/assets/img/lqip/futureEarth.jpg');
    expect(getFullResSrc(img)).toBe('http://localhost/assets/img/futureEarth.jpg');
  });

  it('supports nested lqip directories', () => {
    const img = mockImg({}, 'http://localhost/assets/img/amae/lqip/Screen_Dashboard.png');
    expect(getFullResSrc(img)).toBe('http://localhost/assets/img/amae/Screen_Dashboard.png');
  });

  it('upgrades to gif when lqip-gif is set', () => {
    const img = mockImg({ 'lqip-gif': '' }, 'http://localhost/assets/img/foo/lqip/bar.jpg');
    expect(getFullResSrc(img)).toBe('http://localhost/assets/img/foo/bar.gif');
  });

  it('upgrades to webp when lqip-webp is set', () => {
    const img = mockImg({ 'lqip-webp': '' }, 'http://localhost/assets/img/foo/lqip/bar.jpg');
    expect(getFullResSrc(img)).toBe('http://localhost/assets/img/foo/bar.webp');
  });
});
