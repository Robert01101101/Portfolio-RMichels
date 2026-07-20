import { describe, expect, it } from 'vitest';
import { getRoleBySlug, roles } from './roles';

describe('getRoleBySlug', () => {
  it('returns the role for a known slug', () => {
    expect(getRoleBySlug('vr')).toEqual({
      slug: 'vr',
      name: { en: 'VR', de: 'VR' },
    });
    expect(getRoleBySlug('front-end')).toEqual({
      slug: 'front-end',
      name: { en: 'Front-End', de: 'Front-End' },
    });
  });

  it('returns undefined for unknown slug', () => {
    expect(getRoleBySlug('nonexistent')).toBeUndefined();
    expect(getRoleBySlug('')).toBeUndefined();
  });

  it('covers every slug in the roles array', () => {
    for (const role of roles) {
      expect(getRoleBySlug(role.slug)).toEqual(role);
    }
  });
});
