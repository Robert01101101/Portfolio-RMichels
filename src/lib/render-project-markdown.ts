import { createMarkdownProcessor } from '@astrojs/markdown-remark';
import { remarkGistEmbed } from '../plugins/remark-gist-embed';

let processorPromise: ReturnType<typeof createMarkdownProcessor> | null = null;

async function getProcessor() {
  processorPromise ??= createMarkdownProcessor({
    remarkPlugins: [remarkGistEmbed],
    gfm: true,
    smartypants: true,
  });
  return processorPromise;
}

export async function renderProjectMarkdown(
  body: string,
  frontmatter: Record<string, unknown> = {},
) {
  const processor = await getProcessor();
  const result = await processor.render(body, { frontmatter });
  return {
    html: result.code,
    headings: result.metadata.headings,
  };
}
