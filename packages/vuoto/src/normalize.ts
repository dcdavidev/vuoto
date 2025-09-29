import { normalizeByteOrderMark } from './normalizers/byte-order-mark.js';
import { normalizeEmSpace } from './normalizers/em-space.js';
import { normalizeEnSpace } from './normalizers/en-space.js';
import { normalizeFormFeed } from './normalizers/form-feed.js';
import { normalizeIdeographicSpace } from './normalizers/ideographic-space.js';
import { normalizeLineSeparator } from './normalizers/line-separator.js';
import { normalizeMiscSpaces } from './normalizers/misc-spaces.js';
import { normalizeNarrowNoBreakSpace } from './normalizers/narrow-no-break-space.js';
import { normalizeNonBreakingSpace } from './normalizers/non-breaking-space.js';
import { normalizeParagraphSeparator } from './normalizers/paragraph-separator.js';
import { normalizeVerticalTab } from './normalizers/vertical-tab.js';
import { normalizeZeroWidth } from './normalizers/zero-width.js';

/**
 * Applies all whitespace normalizations in sequence.
 *
 * @param input - The input string.
 * @returns The fully normalized string.
 */
export function normalize(input: string): string {
  let output = input;
  output = normalizeNonBreakingSpace(output);
  output = normalizeZeroWidth(output);
  output = normalizeByteOrderMark(output);
  output = normalizeNarrowNoBreakSpace(output);
  output = normalizeLineSeparator(output);
  output = normalizeParagraphSeparator(output);
  output = normalizeEmSpace(output);
  output = normalizeEnSpace(output);
  output = normalizeMiscSpaces(output);
  output = normalizeIdeographicSpace(output);
  output = normalizeFormFeed(output);
  output = normalizeVerticalTab(output);
  return output;
}
