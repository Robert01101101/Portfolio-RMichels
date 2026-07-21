export interface GistFile {
  filename: string;
  language: string;
  content: string;
}

export interface GistData {
  id: string;
  url: string;
  files: GistFile[];
}

const GIST_SCRIPT_RE = /gist\.github\.com\/[^/]+\/([a-f0-9]+)\.js/i;

const LANGUAGE_MAP: Record<string, string> = {
  'C#': 'csharp',
  'C++': 'cpp',
  JavaScript: 'javascript',
  TypeScript: 'typescript',
  Python: 'python',
  HTML: 'html',
  CSS: 'css',
  JSON: 'json',
  Shell: 'bash',
  SQL: 'sql',
  Java: 'java',
};

const EXTENSION_MAP: Record<string, string> = {
  cs: 'csharp',
  js: 'javascript',
  ts: 'typescript',
  py: 'python',
  html: 'html',
  css: 'css',
  json: 'json',
  sql: 'sql',
  java: 'java',
  cpp: 'cpp',
  c: 'c',
  xml: 'xml',
  md: 'markdown',
};

const gistCache = new Map<string, GistData>();

export function parseGistId(src: string): string | null {
  const match = src.match(GIST_SCRIPT_RE);
  return match?.[1] ?? null;
}

export function guessShikiLanguage(filename: string, language: string | null | undefined): string {
  if (language && LANGUAGE_MAP[language]) return LANGUAGE_MAP[language];

  const extension = filename.split('.').pop()?.toLowerCase();
  if (extension && EXTENSION_MAP[extension]) return EXTENSION_MAP[extension];

  return 'text';
}

export async function fetchGist(gistId: string): Promise<GistData> {
  const cached = gistCache.get(gistId);
  if (cached) return cached;

  const response = await fetch(`https://api.github.com/gists/${gistId}`, {
    headers: {
      Accept: 'application/vnd.github+json',
      'User-Agent': 'portfolio-rmichels-astro-build',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch gist ${gistId}: ${response.status} ${response.statusText}`);
  }

  const payload = (await response.json()) as {
    html_url: string;
    files: Record<
      string,
      {
        filename: string;
        language: string | null;
        content: string;
      }
    >;
  };

  const gist: GistData = {
    id: gistId,
    url: payload.html_url,
    files: Object.values(payload.files).map((file) => ({
      filename: file.filename,
      language: guessShikiLanguage(file.filename, file.language),
      content: file.content,
    })),
  };

  gistCache.set(gistId, gist);
  return gist;
}

export function clearGistCache(): void {
  gistCache.clear();
}
