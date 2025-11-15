import type { ESLint } from 'eslint';

import byteOrderMark from './byte-order-mark.js';
import emSpace from './em-space.js';
import enSpace from './en-space.js';
import formFeed from './form-feed.js';
import ideographicSpace from './ideographic-space.js';
import invisibleSeparators from './invisible-separators.js';
import lineSeparator from './line-separator.js';
import narrowNoBreakSpace from './narrow-no-break-space.js';
import nonBreakingSpace from './non-breaking-space.js';
import paragraphSeparator from './paragraph-separator.js';
import verticalTab from './vertical-tab.js';
import visibleMiscSpaces from './visible-misc-spaces.js';
import zeroWidth from './zero-width.js';

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
