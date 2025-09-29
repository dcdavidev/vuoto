import { LINE_SEPARATOR } from '../consts.js';

/**
 * Replaces line separator (U+2028) with a newline character.
 *
 * @param input - The input string.
 * @returns The normalized string.
 *
 * @example
 * ```ts
 * const input = "Hello\u2028World";
 * const output = normalizeLineSeparator(input);
 * console.log(output);
 * // Hello
 * // World
 * ```
 */
export function normalizeLineSeparator(input: string): string {
  return input.replaceAll(LINE_SEPARATOR, '\n');
}
