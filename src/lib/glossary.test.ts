import { describe, expect, it } from 'vitest';
import { parseGlossaryText } from './glossary';

describe('parseGlossaryText', () => {
  it('replaces markers with abbr elements', () => {
    const html = parseGlossaryText('[[xr]], [[gis]], [[op]], and [[cnc]].', 'en');
    expect(html).toContain('<abbr title="Extended Reality');
    expect(html).toContain('>XR</abbr>');
    expect(html).toContain('<abbr title="Geographic Information System');
    expect(html).toContain('>GIS</abbr>');
    expect(html).toContain('<abbr title="Orthotics &amp; Prosthetics');
    expect(html).toContain('>O&amp;P</abbr>');
    expect(html).toContain('<abbr title="Computer Numerical Control');
    expect(html).toContain('>CNC</abbr>');
  });

  it('escapes HTML in source text', () => {
    const html = parseGlossaryText('[[xr]] & <em>apps</em>.', 'en');
    expect(html).toContain('&lt;em&gt;');
  });

  it('uses German glossary tips for de locale', () => {
    const html = parseGlossaryText('[[xr]] apps', 'de');
    expect(html).toContain('title="Extended Reality — VR, AR und Mixed Reality"');
  });
});
