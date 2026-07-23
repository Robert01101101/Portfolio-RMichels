export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

const SECTION_TEXT_RE =
  /<section\b[^>]*\bclass="[^"]*\bsectionText\b[^"]*"[^>]*>([\s\S]*?)<\/section>/gi;

const HEADING_RE = /<h([23])\b([^>]*)>([\s\S]*?)<\/h\1>/gi;

const HTML_ENTITY_RE = /&(?:#(\d+)|#x([\da-f]+)|(\w+));/gi;

const NAMED_ENTITIES: Record<string, string> = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: ' ',
};

function decodeHtmlEntities(text: string): string {
  return text.replace(HTML_ENTITY_RE, (_match, dec, hex, named) => {
    if (dec) return String.fromCharCode(Number(dec));
    if (hex) return String.fromCharCode(parseInt(hex, 16));
    if (named && named in NAMED_ENTITIES) return NAMED_ENTITIES[named];
    return _match;
  });
}

function stripHtml(text: string): string {
  return decodeHtmlEntities(text.replace(/<[^>]+>/g, '').trim());
}

/** Lowercase slug from heading text; stable across EN/DE alphanumeric content. */
export function slugifyHeading(text: string): string {
  const plain = stripHtml(text)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
  const slug = plain
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return slug || 'section';
}

function uniqueId(base: string, used: Set<string>): string {
  let id = base;
  let n = 2;
  while (used.has(id)) {
    id = `${base}-${n}`;
    n += 1;
  }
  used.add(id);
  return id;
}

/** h2 and h3 headings in each `.sectionText` section, in document order. */
export function extractSectionHeadings(html: string): TocItem[] {
  const items: TocItem[] = [];
  const usedIds = new Set<string>();

  for (const match of html.matchAll(SECTION_TEXT_RE)) {
    const sectionBody = match[1];
    for (const hMatch of sectionBody.matchAll(HEADING_RE)) {
      const level = Number(hMatch[1]) as 2 | 3;
      const text = stripHtml(hMatch[3]);
      if (!text) continue;

      const id = uniqueId(slugifyHeading(text), usedIds);
      items.push({ id, text, level });
    }
  }

  return items;
}

function headingHasId(attrs: string): boolean {
  return /\bid\s*=/.test(attrs);
}

/** Add `id` to TOC heading elements (idempotent). */
export function injectHeadingIds(html: string, items: TocItem[]): string {
  if (items.length === 0) return html;

  let itemIndex = 0;

  return html.replace(SECTION_TEXT_RE, (sectionMatch, sectionBody: string) => {
    const newBody = sectionBody.replace(HEADING_RE, (full, level, attrs, inner) => {
      if (itemIndex >= items.length) return full;

      const item = items[itemIndex];
      itemIndex += 1;

      if (headingHasId(attrs)) return full;

      return `<h${level} id="${item.id}"${attrs}>${inner}</h${level}>`;
    });

    return sectionMatch.replace(sectionBody, newBody);
  });
}

export function prepareProjectContent(html: string): { html: string; toc: TocItem[] } {
  const toc = extractSectionHeadings(html);
  const enriched = injectHeadingIds(html, toc);
  return { html: enriched, toc };
}
