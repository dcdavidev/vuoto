import {
  normalizeByteOrderMark,
  normalizeEmSpace,
  normalizeEnSpace,
  normalizeFormFeed,
  normalizeIdeographicSpace,
  normalizeInvisibleSeparators,
  normalizeLineSeparator,
  normalizeNarrowNoBreakSpace,
  normalizeNonBreakingSpace,
  normalizeParagraphSeparator,
  normalizeVerticalTab,
  normalizeVisibleMiscSpaces,
  normalizeZeroWidth,
} from './normalizers/index.js';

/**
 * Applies all whitespace normalizations in sequence.
 * @param input The string to normalize.
 *
 * @returns The normalized string.
 *
 * @example
 *
 * ```ts
 * const normalized = normalize('Hello\u200BWorld'); // 'HelloWorld'
 * ```
 */
export function normalize(input: string): string {
  let output = input;

  // Invisible / zero-width
  output = normalizeZeroWidth(output);
  output = normalizeByteOrderMark(output);
  output = normalizeInvisibleSeparators(output);

  // Non-breaking variants
  output = normalizeNonBreakingSpace(output);
  output = normalizeNarrowNoBreakSpace(output);

  // Line / paragraph separators
  output = normalizeLineSeparator(output);
  output = normalizeParagraphSeparator(output);

  // Visible wide spaces
  output = normalizeEmSpace(output);
  output = normalizeEnSpace(output);
  output = normalizeIdeographicSpace(output);
  output = normalizeVisibleMiscSpaces(output);

  // Legacy controls
  output = normalizeFormFeed(output);
  output = normalizeVerticalTab(output);

  return output;
}
