/**
 * Normalizes vertical tab characters (U+000B) by removing them.
 *
 * Vertical tab is a rarely used control character, mostly obsolete.
 * It should be stripped to avoid invisible whitespace issues.
 *
 * @param input - The input string possibly containing vertical tabs.
 * @returns The normalized string without vertical tabs.
 *
 * @example
 * ```ts
 * normalizeVerticalTab("Hello\vWorld");
 * // => "HelloWorld"
 * ```
 */
export function normalizeVerticalTab(input: string): string {
  return input.replaceAll('\v', '');
}
