import { t, type Locale } from './i18n';

const MARKER_RE = /\[\[([a-z0-9_]+)\]\]/g;

const GLOSSARY_LABELS: Record<string, string> = {
  xr: 'XR',
  op: 'O&P',
  gis: 'GIS',
  cnc: 'CNC',
};

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function getGlossaryTip(term: string, locale: Locale): string | undefined {
  const key = `glossary_${term}`;
  const tip = t(key, locale);
  return tip === key ? undefined : tip;
}

export function getGlossaryLabel(term: string): string {
  return GLOSSARY_LABELS[term] ?? term;
}

export function parseGlossaryText(text: string, locale: Locale): string {
  const parts: string[] = [];
  let lastIndex = 0;

  for (const match of text.matchAll(MARKER_RE)) {
    const index = match.index ?? 0;
    parts.push(escapeHtml(text.slice(lastIndex, index)));
    const term = match[1];
    const tip = getGlossaryTip(term, locale);
    const label = getGlossaryLabel(term);
    parts.push(
      tip
        ? `<abbr title="${escapeHtml(tip)}">${escapeHtml(label)}</abbr>`
        : escapeHtml(label),
    );
    lastIndex = index + match[0].length;
  }

  parts.push(escapeHtml(text.slice(lastIndex)));
  return parts.join('');
}
