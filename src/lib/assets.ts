import fs from 'node:fs';
import path from 'node:path';

/** Prefer public/assets (runtime); fall back to tracked assets/ when junction is absent (CI). */
export function resolveAssetDir(...parts: string[]): string {
  for (const base of ['public/assets', 'assets']) {
    const dir = path.join(process.cwd(), base, ...parts);
    if (fs.existsSync(dir)) return dir;
  }
  return path.join(process.cwd(), 'public/assets', ...parts);
}

export function heroLqipExists(slug: string): boolean {
  const lqipPath = path.join(resolveAssetDir('img', 'lqip'), `${slug}.jpg`);
  return fs.existsSync(lqipPath);
}
