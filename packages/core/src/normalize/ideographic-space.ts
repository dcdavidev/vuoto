/**
 * Normalizes ideographic space (U+3000) to a standard space (U+0020).
 *
 * Ideographic space is commonly used in CJK texts and is visually wide.
 * This function replaces it with a standard ASCII space for consistency.
 *
 * @param input - The input string possibly containing ideographic spaces.
 * @returns The normalized string with all ideographic spaces replaced.
 *
 * @example
 * ```ts
 * normalizeIdeographicSpace("Hello\u3000World");
 * // => "Hello World"
 * ```
 */
export function normalizeIdeographicSpace(input: string): string {
  return input.replace(/\u3000/g, ' ');
}
