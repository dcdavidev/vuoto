import fs from 'node:fs/promises';
import path from 'node:path';

import { VUOTO_IGNORE_FILENAME } from '../consts.js';

/**
 * Load patterns from .vuotoignore file.
 * @param cwd Current working directory.
 * @returns Array of ignore patterns.
 * @example
 * ```ts
 * const patterns = await loadVuotoIgnore(process.cwd());
 * console.log(patterns); // ['dist/**', 'build/**']
 * ```
 */
export async function loadVuotoIgnore(cwd: string): Promise<string[]> {
  const vuotoignorePath = path.join(cwd, VUOTO_IGNORE_FILENAME);

  try {
    const content = await fs.readFile(vuotoignorePath, 'utf8');
    return content
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith('#'));
  } catch {
    return [];
  }
}
