/**
 * Replaces miscellaneous Unicode space characters with a normal space.
 * Includes: U+1680, U+180E, U+2000, U+2001, U+2004–U+200A, U+205F, U+2060, U+3000.
 *
 * @param input - The input string.
 * @returns The normalized string.
 *
 * @example
 * ```ts
 * const input = "Hello\u2009World";
 * const output = normalizeMiscSpaces(input);
 * console.log(output); // "Hello World"
 * ```
 */
export function normalizeMiscSpaces(input: string): string {
  return input.replaceAll(
    /[\u1680\u180E\u2000\u2001\u2004-\u200A\u205F\u2060\u3000]/g,
    ' '
  );
}
