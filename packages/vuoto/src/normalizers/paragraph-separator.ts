import { PARAGRAPH_SEPARATOR } from '../consts.js';

/**
 * Replaces paragraph separator (U+2029) with two newlines.
 *
 * @param input - The input string.
 * @returns The normalized string.
 *
 * @example
 * ```ts
 * const input = "Hello\u2029World";
 * const output = normalizeParagraphSeparator(input);
 * console.log(output);
 * // Hello
 *
 * // World
 * ```
 */
export function normalizeParagraphSeparator(input: string): string {
  return input.replaceAll(PARAGRAPH_SEPARATOR, '\n\n');
}
