import { DEFAULT_IGNORES } from '../consts.js';
import { loadVuotoIgnore } from './load-config.js';
import { readGitignoreFile } from './read-gitignore-file.js';

export interface ResolveIgnoresOptions {
  /**
   * Whether to include .gitignore rules from the root directory.
   * Default: true.
   */
  includeGitignore?: boolean;
}

/**
 * Merge built-in ignores with user .vuotoignore patterns and optional .gitignore patterns.
 * @param cwd Current working directory.
 * @param options Options to customize ignore resolution.
 * @returns Combined and deduplicated ignore patterns.
 * @example
 * ```ts
 * const patterns = await resolveIgnores(process.cwd());
 * ```
 */
export async function resolveIgnores(
  cwd: string,
  options?: ResolveIgnoresOptions
): Promise<string[]> {
  const userPatterns = await loadVuotoIgnore(cwd);
  const gitignorePatterns =
    (options?.includeGitignore ?? true) ? await readGitignoreFile(cwd) : [];

  return [
    ...new Set([...DEFAULT_IGNORES, ...gitignorePatterns, ...userPatterns]),
  ];
}
