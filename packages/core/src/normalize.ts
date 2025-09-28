import { normalizeByteOrderMark } from './normalize/byte-order-mark.js';
import { normalizeEmSpace } from './normalize/em-space.js';
import { normalizeEnSpace } from './normalize/en-space.js';
import { normalizeLineSeparator } from './normalize/line-separator.js';
import { normalizeMiscSpaces } from './normalize/misc-spaces.js';
import { normalizeNarrowNoBreakSpace } from './normalize/narrow-no-break-space.js';
import { normalizeNonBreakingSpace } from './normalize/non-breaking-space.js';
import { normalizeParagraphSeparator } from './normalize/paragraph-separator.js';
import { normalizeZeroWidth } from './normalize/zero-width.js';
import { normalizeIdeographicSpace } from './normalize/ideographic-space.js';
import { normalizeFormFeed } from './normalize/form-feed.js';
import { normalizeVerticalTab } from './normalize/vertical-tab.js';

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
