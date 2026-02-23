import type { ESLint } from 'eslint';
import {
  BYTE_ORDER_MARK,
  EM_SPACE,
  EN_SPACE,
  FORM_FEED,
  IDEOGRAPHIC_SPACE,
  INVISIBLE_SEPARATORS,
  LINE_SEPARATOR,
  NARROW_NO_BREAK_SPACE,
  NON_BREAKING_SPACE,
  PARAGRAPH_SEPARATOR,
  VERTICAL_TAB,
  VISIBLE_MISC_SPACES,
  ZERO_WIDTH,
} from 'vuoto/consts';

import { createWhitespaceRule } from './factory.js';

export const rules = {
  'byte-order-mark': createWhitespaceRule(
    BYTE_ORDER_MARK,
    'disallow byte order mark (BOM) (U+FEFF)'
  ),
  'em-space': createWhitespaceRule(EM_SPACE, 'disallow em space (U+2003)', ' '),
  'en-space': createWhitespaceRule(EN_SPACE, 'disallow en space (U+2002)', ' '),
  'form-feed': createWhitespaceRule(FORM_FEED, 'disallow form feed (U+000C)', '\n'),
  'ideographic-space': createWhitespaceRule(
    IDEOGRAPHIC_SPACE,
    'disallow ideographic space (U+3000)',
    ' '
  ),
  'invisible-separators': createWhitespaceRule(
    INVISIBLE_SEPARATORS,
    'disallow invisible separators (U+2060, U+FEFF)'
  ),
  'line-separator': createWhitespaceRule(
    LINE_SEPARATOR,
    'disallow line separator (U+2028)',
    '\n'
  ),
  'narrow-no-break-space': createWhitespaceRule(
    NARROW_NO_BREAK_SPACE,
    'disallow narrow no-break space (U+202F)',
    ' '
  ),
  'non-breaking-space': createWhitespaceRule(
    NON_BREAKING_SPACE,
    'disallow non-breaking space (U+00A0)',
    ' '
  ),
  'paragraph-separator': createWhitespaceRule(
    PARAGRAPH_SEPARATOR,
    'disallow paragraph separator (U+2029)',
    '\n\n'
  ),
  'vertical-tab': createWhitespaceRule(
    VERTICAL_TAB,
    'disallow vertical tab (U+000B)',
    '\n'
  ),
  'visible-misc-spaces': createWhitespaceRule(
    VISIBLE_MISC_SPACES,
    'disallow miscellaneous visible spaces',
    ' '
  ),
  'zero-width': createWhitespaceRule(
    ZERO_WIDTH,
    'disallow zero-width characters (U+200B, U+200C, U+200D, U+FEFF, U+2060)'
  ),
} satisfies ESLint.Plugin['rules'];
