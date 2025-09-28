/**
 * Replaces non-breaking space (U+00A0) with a normal space.
 *
 * @param input - The input string.
 * @returns The normalized string.
 *
 * @example
 * ```ts
 * const input = "Hello\u00A0World";
 * const output = normalizeNonBreakingSpace(input);
 * console.log(output); // "Hello World"
 * ```
 */
export function normalizeNonBreakingSpace(input: string): string {
  return input.replace(/\u00A0/g, ' ');
}
