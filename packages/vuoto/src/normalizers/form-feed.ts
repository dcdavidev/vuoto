// src/normalize/form-feed.ts

/**
 * Normalizes form feed characters (U+000C) by removing them.
 *
 * Form feed is a legacy control character used in old printers.
 * It has no place in modern source code and should be stripped out.
 *
 * @param input - The input string possibly containing form feed characters.
 * @returns The normalized string without form feed characters.
 *
 * @example
 * ```ts
 * normalizeFormFeed("Hello\fWorld");
 * // => "HelloWorld"
 * ```
 */
export function normalizeFormFeed(input: string): string {
  return input.replaceAll('\f', '');
}
