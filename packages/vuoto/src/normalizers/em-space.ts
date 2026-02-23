import { EM_SPACE } from '../consts.js';

/**
 * Replaces em space (U+2003) with a normal space.
 * @param input The string to normalize.
 *
 * @returns The normalized string.
 *
 * @example
 *
 * ```ts
 * const normalized = normalizeEmSpace('Hello\u2003World'); // 'Hello World'
 * ```
 */
export function normalizeEmSpace(input: string): string {
  return input.replaceAll(EM_SPACE, ' ');
}
