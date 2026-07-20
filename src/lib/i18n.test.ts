import { describe, expect, it } from 'vitest';
import {
  alternateLocale,
  getAlternateUrl,
  getAlternateUrls,
  getLocaleFromUrl,
  localizedPath,
  t,
} from './i18n';

describe('getLocaleFromUrl', () => {
  it('returns en for root and non-de paths', () => {
    expect(getLocaleFromUrl(new URL('https://rmichels.com/'))).toBe('en');
    expect(getLocaleFromUrl(new URL('https://rmichels.com/about'))).toBe('en');
    expect(getLocaleFromUrl(new URL('https://rmichels.com/futureEarth'))).toBe('en');
  });

  it('returns de when pathname starts with /de', () => {
    expect(getLocaleFromUrl(new URL('https://rmichels.com/de/'))).toBe('de');
    expect(getLocaleFromUrl(new URL('https://rmichels.com/de/about'))).toBe('de');
  });
});

describe('t', () => {
  it('returns translated string for known keys', () => {
    expect(t('about', 'en')).toBe('About');
    expect(t('about', 'de')).toBe('Über Mich');
  });

  it('falls back to en then key when missing', () => {
    expect(t('nonexistent_key_xyz', 'de')).toBe('nonexistent_key_xyz');
  });

  it('substitutes {var} placeholders', () => {
    expect(t('{name}', 'en', { name: 'Robert' })).toBe('Robert');
  });
});

describe('localizedPath', () => {
  it('prefixes /de for German locale', () => {
    expect(localizedPath('/', 'de')).toBe('/de/');
    expect(localizedPath('/about', 'de')).toBe('/de/about');
    expect(localizedPath('projects', 'de')).toBe('/de/projects');
  });

  it('strips /de prefix for English locale', () => {
    expect(localizedPath('/', 'en')).toBe('/');
    expect(localizedPath('/about', 'en')).toBe('/about');
    expect(localizedPath('/de/about', 'en')).toBe('/about');
    expect(localizedPath('/de', 'en')).toBe('/');
  });
});

describe('alternateLocale', () => {
  it('toggles between en and de', () => {
    expect(alternateLocale('en')).toBe('de');
    expect(alternateLocale('de')).toBe('en');
  });
});

describe('getAlternateUrl', () => {
  it('returns German path when locale is de', () => {
    expect(getAlternateUrl('/', 'de')).toBe('/de/');
    expect(getAlternateUrl('/about', 'de')).toBe('/de/about');
    expect(getAlternateUrl('/de/about', 'de')).toBe('/de/about');
  });

  it('returns English path when locale is en', () => {
    expect(getAlternateUrl('/', 'en')).toBe('/');
    expect(getAlternateUrl('/about', 'en')).toBe('/about');
    expect(getAlternateUrl('/de/about', 'en')).toBe('/about');
  });
});

describe('getAlternateUrls', () => {
  it('builds absolute en/de URLs from pathname', () => {
    expect(getAlternateUrls('/', 'https://rmichels.com')).toEqual({
      en: 'https://rmichels.com',
      de: 'https://rmichels.com/de',
    });
    expect(getAlternateUrls('/about', 'https://rmichels.com/')).toEqual({
      en: 'https://rmichels.com/about',
      de: 'https://rmichels.com/de/about',
    });
    expect(getAlternateUrls('/de/futureEarth', 'https://rmichels.com')).toEqual({
      en: 'https://rmichels.com/futureEarth',
      de: 'https://rmichels.com/de/futureEarth',
    });
  });
});
