import { normalizeByteOrderMark } from './normalizers/byte-order-mark.js';
import { normalizeEmSpace } from './normalizers/em-space.js';
import { normalizeEnSpace } from './normalizers/en-space.js';
import { normalizeFormFeed } from './normalizers/form-feed.js';
import { normalizeIdeographicSpace } from './normalizers/ideographic-space.js';
import { normalizeInvisibleSeparators } from './normalizers/invisible-separators.js';
import { normalizeLineSeparator } from './normalizers/line-separator.js';
import { normalizeNarrowNoBreakSpace } from './normalizers/narrow-no-break-space.js';
import { normalizeNonBreakingSpace } from './normalizers/non-breaking-space.js';
import { normalizeParagraphSeparator } from './normalizers/paragraph-separator.js';
import { normalizeVerticalTab } from './normalizers/vertical-tab.js';
import { normalizeVisibleMiscSpaces } from './normalizers/visible-misc-spaces.js';
import { normalizeZeroWidth } from './normalizers/zero-width.js';

/**
 * Applies all whitespace normalizations in sequence.
 *
 * @param input - The input string.
 * @returns The fully normalized string.
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
