import { NON_BREAKING_SPACE } from '../consts.js';

/**
 * Replaces non-breaking space (U+00A0) with a normal space.
 * @param input The string to normalize.
 *
 * @returns The normalized string.
 *
 * @example
 *
 * ```ts
 * const normalized = normalizeNonBreakingSpace('Hello\u00A0World'); // 'Hello World'
 * ```
 */
export function normalizeNonBreakingSpace(input: string): string {
  return input.replaceAll(NON_BREAKING_SPACE, ' ');
}
