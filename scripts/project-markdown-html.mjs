/**
 * Helpers for raw HTML blocks in project markdown bodies.
 * Blank lines between HTML tag lines break @astrojs/markdown-remark HTML mode
 * and cause subsequent markup to render as Shiki plaintext code blocks.
 */

/**
 * @param {string} line
 */
function isHtmlTagLine(line) {
  return /<\/?[a-zA-Z]/.test(line.trim());
}

/**
 * @param {string} content Full markdown file (including frontmatter).
 * @returns {{ body: string, bodyStartLine: number }}
 */
export function splitProjectMarkdown(content) {
  const match = content.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/);
  if (!match) {
    return { body: content, bodyStartLine: 1 };
  }
  const body = content.slice(match[0].length);
  const bodyStartLine = content.slice(0, match[0].length).split('\n').length;
  return { body, bodyStartLine };
}

/**
 * @param {string} body Markdown body after frontmatter.
 * @returns {number[]} 1-based line numbers (within body) of blank lines between HTML tags.
 */
export function findHtmlBlankLineIssues(body) {
  const lines = body.split('\n');
  /** @type {number[]} */
  const issues = [];

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim() !== '') continue;

    let prev = i - 1;
    while (prev >= 0 && lines[prev].trim() === '') prev--;
    let next = i + 1;
    while (next < lines.length && lines[next].trim() === '') next++;

    const prevLine = prev >= 0 ? lines[prev] : '';
    const nextLine = next < lines.length ? lines[next] : '';

    if (isHtmlTagLine(prevLine) && isHtmlTagLine(nextLine)) {
      issues.push(i + 1);
    }
  }

  return issues;
}

/**
 * @param {string} body
 * @returns {string}
 */
export function stripHtmlBlankLines(body) {
  const lines = body.split('\n');
  /** @type {string[]} */
  const result = [];

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim() === '') {
      let prev = i - 1;
      while (prev >= 0 && lines[prev].trim() === '') prev--;
      let next = i + 1;
      while (next < lines.length && lines[next].trim() === '') next++;

      const prevLine = prev >= 0 ? lines[prev] : '';
      const nextLine = next < lines.length ? lines[next] : '';

      if (isHtmlTagLine(prevLine) && isHtmlTagLine(nextLine)) {
        continue;
      }
    }
    result.push(lines[i]);
  }

  return result.join('\n');
}

/**
 * @param {string} content
 * @returns {string}
 */
export function fixProjectMarkdownHtml(content) {
  const { body } = splitProjectMarkdown(content);
  const fixedBody = stripHtmlBlankLines(body);
  if (fixedBody === body) return content;
  const frontmatterEnd = content.length - body.length;
  return content.slice(0, frontmatterEnd) + fixedBody;
}
