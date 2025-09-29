import { NARROW_NO_BREAK_SPACE } from '../consts.js';

/**
 * Replaces narrow no-break space (U+202F) with a normal space.
 *
 * @param input - The input string.
 * @returns The normalized string.
 *
 * @example
 * ```ts
 * const input = "Hello\u202FWorld";
 * const output = normalizeNarrowNoBreakSpace(input);
 * console.log(output); // "Hello World"
 * ```
 */
export function normalizeNarrowNoBreakSpace(input: string): string {
  return input.replaceAll(NARROW_NO_BREAK_SPACE, ' ');
}
