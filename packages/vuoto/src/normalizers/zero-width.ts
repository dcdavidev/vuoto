import { ZERO_WIDTH } from '../consts.js';

/**
 * Removes zero-width and invisible characters.
 * @param input The string to normalize.
 *
 * @returns The normalized string.
 *
 * @example
 *
 * ```ts
 * const normalized = normalizeZeroWidth('Hello\u200BWorld'); // 'HelloWorld'
 * ```
 */
export function normalizeZeroWidth(input: string): string {
  return input.replaceAll(ZERO_WIDTH, '');
}
