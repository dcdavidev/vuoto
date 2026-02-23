import { EN_SPACE } from '../consts.js';

/**
 * Replaces en space (U+2002) with a normal space.
 * @param input The string to normalize.
 *
 * @returns The normalized string.
 *
 * @example
 *
 * ```ts
 * const normalized = normalizeEnSpace('Hello\u2002World'); // 'Hello World'
 * ```
 */
export function normalizeEnSpace(input: string): string {
  return input.replaceAll(EN_SPACE, ' ');
}
