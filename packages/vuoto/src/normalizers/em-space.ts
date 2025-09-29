import { EM_SPACE } from '../consts.js';

/**
 * Replaces em space (U+2003) with a normal space.
 *
 * @param input - The input string.
 * @returns The normalized string.
 *
 * @example
 * ```ts
 * const input = "Hello\u2003World";
 * const output = normalizeEmSpace(input);
 * console.log(output); // "Hello World"
 * ```
 */
export function normalizeEmSpace(input: string): string {
  return input.replaceAll(EM_SPACE, ' ');
}
