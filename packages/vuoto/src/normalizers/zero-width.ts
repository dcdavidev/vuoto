/**
 * Removes zero-width characters (U+200B, U+200C, U+200D).
 *
 * @param input - The input string.
 * @returns The normalized string.
 *
 * @example
 * ```ts
 * const input = "Hello\u200BWorld";
 * const output = normalizeZeroWidth(input);
 * console.log(output); // "HelloWorld"
 * ```
 */
export function normalizeZeroWidth(input: string): string {
  return input.replace(/[\u200B\u200C\u200D]/g, '');
}
