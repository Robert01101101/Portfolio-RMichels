import type { Root } from 'mdast';
import { visit } from 'unist-util-visit';
import { findGistScriptTags, renderGistHtml } from '../lib/gist-render';

export function remarkGistEmbed() {
  return async (tree: Root) => {
    const htmlNodes: Array<{ value: string }> = [];

    visit(tree, 'html', (node) => {
      if (findGistScriptTags(node.value).length > 0) {
        htmlNodes.push(node);
      }
    });

    for (const node of htmlNodes) {
      const matches = findGistScriptTags(node.value);
      let html = node.value;

      for (const match of matches) {
        const rendered = await renderGistHtml(match.id);
        html = html.replace(match.full, rendered);
      }

      node.value = html;
    }
  };
}
