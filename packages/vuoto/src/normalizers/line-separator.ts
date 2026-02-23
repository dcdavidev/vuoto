import { LINE_SEPARATOR } from '../consts.js';

/**
 * Replaces line separator (U+2028) with a newline.
 * @param input The string to normalize.
 *
 * @returns The normalized string.
 *
 * @example
 *
 * ```ts
 * const normalized = normalizeLineSeparator('Hello\u2028World'); // 'Hello\nWorld'
 * ```
 */
export function normalizeLineSeparator(input: string): string {
  return input.replaceAll(LINE_SEPARATOR, '\n');
}
