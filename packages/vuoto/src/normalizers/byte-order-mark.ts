/**
 * Removes byte order mark (U+FEFF).
 *
 * @param input - The input string.
 * @returns The normalized string.
 *
 * @example
 * ```ts
 * const input = "\uFEFFHello";
 * const output = normalizeByteOrderMark(input);
 * console.log(output); // "Hello"
 * ```
 */
export function normalizeByteOrderMark(input: string): string {
  return input.replaceAll('\uFEFF', '');
}
