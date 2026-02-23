import { IDEOGRAPHIC_SPACE } from '../consts.js';

/**
 * Replaces ideographic space (U+3000) with a normal space.
 * @param input The string to normalize.
 *
 * @returns The normalized string.
 *
 * @example
 *
 * ```ts
 * const normalized = normalizeIdeographicSpace('Hello\u3000World'); // 'Hello World'
 * ```
 */
export function normalizeIdeographicSpace(input: string): string {
  return input.replaceAll(IDEOGRAPHIC_SPACE, ' ');
}
