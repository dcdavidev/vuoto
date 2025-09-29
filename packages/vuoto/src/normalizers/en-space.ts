/**
 * Replaces en space (U+2002) with a normal space.
 *
 * @param input - The input string.
 * @returns The normalized string.
 *
 * @example
 * ```ts
 * const input = "Hello\u2002World";
 * const output = normalizeEnSpace(input);
 * console.log(output); // "Hello World"
 * ```
 */
export function normalizeEnSpace(input: string): string {
  return input.replace(/\u2002/g, ' ');
}
