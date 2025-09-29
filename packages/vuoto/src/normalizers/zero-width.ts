import { ZERO_WIDTH } from '../consts.js';

/**
 * Removes zero-width and invisible characters.
 *
 * Includes: U+200B (Zero Width Space), U+200C (Non-Joiner),
 * U+200D (Joiner), U+FEFF (BOM), U+2060 (Word Joiner).
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
  return input.replaceAll(ZERO_WIDTH, '');
}
