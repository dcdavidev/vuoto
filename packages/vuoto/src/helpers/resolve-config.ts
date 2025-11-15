import { DEFAULT_IGNORES } from '../consts.js';
import { loadVuotoIgnore } from './load-config.js';

/**
 * Merge built-in ignores with user .vuotoignore patterns.
 * @param cwd Current working directory.
 * @returns Combined ignore patterns.
 * @example
 * ```ts
 * const patterns = await resolveIgnores(process.cwd());
 * console.log(patterns); // [...DEFAULT_IGNORES, ...userPatterns]
 * ```
 */
export async function resolveIgnores(cwd: string): Promise<string[]> {
  const userPatterns = await loadVuotoIgnore(cwd);
  return [...DEFAULT_IGNORES, ...userPatterns];
}
