import path from 'node:path';

import fg from 'fast-glob';

import { readGitignoreFile } from './read-gitignore-file.js';

/**
 * Collect .gitignore patterns recursively from cwd and all subfolders.
 * @param cwd The current working directory.
 *
 * @returns The collected .gitignore patterns.
 *
 * @example
 *
 * ```ts
 * const patterns = await collectGitignores(process.cwd());
 * ```
 */
export async function collectGitignores(cwd: string): Promise<string[]> {
  const gitignoreFiles = await fg('**/.gitignore', {
    cwd,
    absolute: true,
    dot: true,
  });

  const patterns: string[] = [];
  for (const file of gitignoreFiles) {
    const dir = path.dirname(file);
    const localPatterns = await readGitignoreFile(dir);
    // prefix patterns with relative path of that .gitignore dir
    const relDir = path.relative(cwd, dir) || '.';
    for (const p of localPatterns) {
      patterns.push(relDir === '.' ? p : `${relDir}/${p}`);
    }
  }
  return patterns;
}
