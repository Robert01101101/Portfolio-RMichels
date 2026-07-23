import { describe, expect, it } from 'vitest';
import {
  extractSectionHeadings,
  injectHeadingIds,
  prepareProjectContent,
  slugifyHeading,
} from './project-toc';

const scanViewsHtml = `
<section class="sectionText">
  <h2>Overview</h2>
  <p>Intro</p>
</section>
<section class="sectionMedia"><figure></figure></section>
<section class="sectionText">
  <h2>Development</h2>
  <p>Dev</p>
</section>
<section class="sectionText">
  <h2>Challenges</h2>
  <p>Hard</p>
</section>
`;

const scanShareHtml = `
<section class="sectionText">
  <h2>Overview</h2>
</section>
<section class="sectionText">
  <h2>Development</h2>
  <h3>Share UI and Logic</h3>
</section>
<section class="sectionMedia">
  <div class="divText">
    <h2>Code Sample</h2>
  </div>
</section>
<section class="sectionText">
  <h2>Webviewer</h2>
</section>
`;

describe('slugifyHeading', () => {
  it('lowercases and hyphenates', () => {
    expect(slugifyHeading('The Task')).toBe('the-task');
  });

  it('strips accents for stable slugs', () => {
    expect(slugifyHeading('Überblick')).toBe('uberblick');
  });

  it('strips inline HTML', () => {
    expect(slugifyHeading('<em>Overview</em>')).toBe('overview');
  });
});

describe('extractSectionHeadings', () => {
  it('extracts h2 from each sectionText', () => {
    expect(extractSectionHeadings(scanViewsHtml)).toEqual([
      { id: 'overview', text: 'Overview', level: 2 },
      { id: 'development', text: 'Development', level: 2 },
      { id: 'challenges', text: 'Challenges', level: 2 },
    ]);
  });

  it('includes h3 subsections within sectionText', () => {
    const items = extractSectionHeadings(scanShareHtml);
    expect(items).toEqual([
      { id: 'overview', text: 'Overview', level: 2 },
      { id: 'development', text: 'Development', level: 2 },
      { id: 'share-ui-and-logic', text: 'Share UI and Logic', level: 3 },
      { id: 'webviewer', text: 'Webviewer', level: 2 },
    ]);
  });

  it('excludes headings inside sectionMedia', () => {
    const items = extractSectionHeadings(scanShareHtml);
    expect(items.map((i) => i.text)).not.toContain('Code Sample');
  });

  it('deduplicates identical heading text', () => {
    const html = `
      <section class="sectionText"><h2>Overview</h2></section>
      <section class="sectionText"><h2>Overview</h2></section>
    `;
    expect(extractSectionHeadings(html)).toEqual([
      { id: 'overview', text: 'Overview', level: 2 },
      { id: 'overview-2', text: 'Overview', level: 2 },
    ]);
  });
});

describe('injectHeadingIds', () => {
  it('adds id attributes to matching h2 elements', () => {
    const toc = extractSectionHeadings(scanViewsHtml);
    const result = injectHeadingIds(scanViewsHtml, toc);
    expect(result).toContain('<h2 id="overview">Overview</h2>');
    expect(result).toContain('<h2 id="development">Development</h2>');
    expect(result).toContain('<h2 id="challenges">Challenges</h2>');
  });

  it('adds id attributes to h3 subsections', () => {
    const toc = extractSectionHeadings(scanShareHtml);
    const result = injectHeadingIds(scanShareHtml, toc);
    expect(result).toContain('<h3 id="share-ui-and-logic">Share UI and Logic</h3>');
  });

  it('does not overwrite existing ids', () => {
    const html = '<section class="sectionText"><h2 id="custom">Overview</h2></section>';
    const toc = [{ id: 'overview', text: 'Overview', level: 2 as const }];
    expect(injectHeadingIds(html, toc)).toBe(html);
  });
});

describe('prepareProjectContent', () => {
  it('returns enriched html and toc together', () => {
    const { html, toc } = prepareProjectContent(scanViewsHtml);
    expect(toc).toHaveLength(3);
    expect(html).toContain('id="overview"');
  });
});
