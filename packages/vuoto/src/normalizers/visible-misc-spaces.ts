import { VISIBLE_MISC_SPACES } from '../consts.js';

/**
 * Replaces various visible miscellaneous spaces with normal spaces.
 * @param input The string to normalize.
 *
 * @returns The normalized string.
 *
 * @example
 *
 * ```ts
 * const normalized = normalizeVisibleMiscSpaces('Hello\u2004World'); // 'Hello World'
 * ```
 */
export function normalizeVisibleMiscSpaces(input: string): string {
  return input.replaceAll(VISIBLE_MISC_SPACES, ' ');
}
