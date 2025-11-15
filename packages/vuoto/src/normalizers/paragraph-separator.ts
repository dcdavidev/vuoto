import { PARAGRAPH_SEPARATOR } from '../consts.js';

/**
 * Replaces paragraph separator (U+2029) with a double newline.
 * @param input The string to normalize.
 *
 * @returns The normalized string.
 *
 * @example
 *
 * ```ts
 * const normalized = normalizeParagraphSeparator('Hello\u2029World'); // 'Hello\n\nWorld'
 * ```
 */
export function normalizeParagraphSeparator(input: string): string {
  return input.replaceAll(PARAGRAPH_SEPARATOR, '\n\n');
}
