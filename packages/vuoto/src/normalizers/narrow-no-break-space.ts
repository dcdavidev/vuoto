import { NARROW_NO_BREAK_SPACE } from '../consts.js';

/**
 * Replaces narrow no-break space (U+202F) with a normal space.
 * @param input The string to normalize.
 *
 * @returns The normalized string.
 *
 * @example
 *
 * ```ts
 * const normalized = normalizeNarrowNoBreakSpace('Hello\u202FWorld'); // 'Hello World'
 * ```
 */
export function normalizeNarrowNoBreakSpace(input: string): string {
  return input.replaceAll(NARROW_NO_BREAK_SPACE, ' ');
}
