import uiEn from '../i18n/ui-en.json';
import uiDe from '../i18n/ui-de.json';

export type Locale = 'en' | 'de';

const dictionaries: Record<Locale, Record<string, string>> = {
  en: uiEn,
  de: uiDe,
};

export function getLocaleFromUrl(url: URL): Locale {
  const [, first] = url.pathname.split('/');
  return first === 'de' ? 'de' : 'en';
}

export function t(key: string, locale: Locale, vars?: Record<string, string>): string {
  const dict = dictionaries[locale] ?? dictionaries.en;
  let text = dict[key] ?? dictionaries.en[key] ?? key;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      text = text.replace(`{${k}}`, v);
    }
  }
  return text;
}

export function localizedPath(path: string, locale: Locale): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (locale === 'de') {
    return clean === '/' ? '/de/' : `/de${clean}`;
  }
  return clean === '/de' ? '/' : clean.replace(/^\/de/, '') || '/';
}

export function alternateLocale(locale: Locale): Locale {
  return locale === 'en' ? 'de' : 'en';
}

export function getAlternateUrl(path: string, locale: Locale): string {
  const isDe = path.startsWith('/de');
  const stripped = isDe ? path.replace(/^\/de/, '') || '/' : path;
  if (locale === 'de') {
    return stripped === '/' ? '/de/' : `/de${stripped}`;
  }
  return stripped;
}

export function getCanonicalUrl(pathname: string, site: string): string {
  const base = site.replace(/\/$/, '');
  const path = pathname === '/' ? '' : pathname.replace(/\/$/, '');
  return `${base}${path}`;
}

export function getAlternateUrls(pathname: string, site: string): { en: string; de: string } {
  const base = site.replace(/\/$/, '');
  const isDe = pathname.startsWith('/de');
  const enPath = isDe ? pathname.replace(/^\/de/, '') || '/' : pathname;
  const dePath = isDe ? pathname : pathname === '/' ? '/de/' : `/de${pathname}`;
  return {
    en: `${base}${enPath === '/' ? '' : enPath.replace(/\/$/, '')}`,
    de: `${base}${dePath.replace(/\/$/, '') === '/de' ? '/de' : dePath.replace(/\/$/, '')}`,
  };
}
