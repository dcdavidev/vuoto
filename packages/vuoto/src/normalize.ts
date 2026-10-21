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
import type { NormalizeOptions } from './types/index.js';

/**
 * Applies whitespace normalizations in sequence.
 * @param input The string to normalize.
 * @param options Optional configuration to selectively enable or disable normalizers.
 *
 * @returns The normalized string.
 *
 * @example
 *
 * ```ts
 * const normalized = normalize('Hello\u200BWorld'); // 'HelloWorld'
 * ```
 */
export function normalize(input: string, options?: NormalizeOptions): string {
  if (!input) {
    return input;
  }

  let output = input;

  // Invisible / zero-width
  if (options?.zeroWidth ?? true) output = normalizeZeroWidth(output);
  if (options?.byteOrderMark ?? true) output = normalizeByteOrderMark(output);
  if (options?.invisibleSeparators ?? true)
    output = normalizeInvisibleSeparators(output);

  // Non-breaking variants
  if (options?.nonBreakingSpace ?? true)
    output = normalizeNonBreakingSpace(output);
  if (options?.narrowNoBreakSpace ?? true)
    output = normalizeNarrowNoBreakSpace(output);

  // Line / paragraph separators
  if (options?.lineSeparator ?? true) output = normalizeLineSeparator(output);
  if (options?.paragraphSeparator ?? true)
    output = normalizeParagraphSeparator(output);

  // Visible wide spaces
  if (options?.emSpace ?? true) output = normalizeEmSpace(output);
  if (options?.enSpace ?? true) output = normalizeEnSpace(output);
  if (options?.ideographicSpace ?? true)
    output = normalizeIdeographicSpace(output);
  if (options?.visibleMiscSpaces ?? true)
    output = normalizeVisibleMiscSpaces(output);

  // Legacy controls
  if (options?.formFeed ?? true) output = normalizeFormFeed(output);
  if (options?.verticalTab ?? true) output = normalizeVerticalTab(output);

  return output;
}
