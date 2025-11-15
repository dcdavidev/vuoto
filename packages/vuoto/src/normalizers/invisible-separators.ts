import { INVISIBLE_SEPARATORS } from '../consts.js';

/**
 * Removes invisible separators.
 * @param input The string to normalize.
 *
 * @returns The normalized string.
 *
 * @example
 *
 * ```ts
 * const normalized = normalizeInvisibleSeparators('Hello\u2063World'); // 'HelloWorld'
 * ```
 */
export function normalizeInvisibleSeparators(input: string): string {
  return input.replaceAll(INVISIBLE_SEPARATORS, '');
}
