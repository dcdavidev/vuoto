import { ESLint } from 'eslint';

import byteOrderMark from './rules/byte-order-mark.js';
import emSpace from './rules/em-space.js';
import enSpace from './rules/en-space.js';
import formFeed from './rules/form-feed.js';
import ideographicSpace from './rules/ideographic-space.js';
import invisibleSeparators from './rules/invisible-separators.js';
import lineSeparator from './rules/line-separator.js';
import narrowNoBreakSpace from './rules/narrow-no-break-space.js';
import nonBreakingSpace from './rules/non-breaking-space.js';
import paragraphSeparator from './rules/paragraph-separator.js';
import verticalTab from './rules/vertical-tab.js';
import visibleMiscSpaces from './rules/visible-misc-spaces.js';
import zeroWidth from './rules/zero-width.js';

export const rules: ESLint.Plugin['rules'] = {
  'byte-order-mark': byteOrderMark,
  'em-space': emSpace,
  'en-space': enSpace,
  'form-feed': formFeed,
  'ideographic-space': ideographicSpace,
  'invisible-separators': invisibleSeparators,
  'line-separator': lineSeparator,
  'narrow-no-break-space': narrowNoBreakSpace,
  'non-breaking-space': nonBreakingSpace,
  'paragraph-separator': paragraphSeparator,
  'vertical-tab': verticalTab,
  'visible-misc-spaces': visibleMiscSpaces,
  'zero-width': zeroWidth,
};
