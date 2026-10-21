import type { Rule } from 'eslint';
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

import type { VuotoRuleName } from '../constants/index.js';
import { createWhitespaceRule } from './factory.js';

export const rules: Record<VuotoRuleName, Rule.RuleModule> = {
  'byte-order-mark': createWhitespaceRule(
    BYTE_ORDER_MARK,
    'Disallow byte order mark (BOM) (U+FEFF)'
  ),
  'em-space': createWhitespaceRule(EM_SPACE, 'Disallow em space (U+2003)', ' '),
  'en-space': createWhitespaceRule(EN_SPACE, 'Disallow en space (U+2002)', ' '),
  'form-feed': createWhitespaceRule(
    FORM_FEED,
    'Disallow form feed (U+000C)',
    '\n'
  ),
  'ideographic-space': createWhitespaceRule(
    IDEOGRAPHIC_SPACE,
    'Disallow ideographic space (U+3000)',
    ' '
  ),
  'invisible-separators': createWhitespaceRule(
    INVISIBLE_SEPARATORS,
    'Disallow invisible separators (U+2060, U+FEFF)'
  ),
  'line-separator': createWhitespaceRule(
    LINE_SEPARATOR,
    'Disallow line separator (U+2028)',
    '\n'
  ),
  'narrow-no-break-space': createWhitespaceRule(
    NARROW_NO_BREAK_SPACE,
    'Disallow narrow no-break space (U+202F)',
    ' '
  ),
  'non-breaking-space': createWhitespaceRule(
    NON_BREAKING_SPACE,
    'Disallow non-breaking space (U+00A0)',
    ' '
  ),
  'paragraph-separator': createWhitespaceRule(
    PARAGRAPH_SEPARATOR,
    'Disallow paragraph separator (U+2029)',
    '\n\n'
  ),
  'vertical-tab': createWhitespaceRule(
    VERTICAL_TAB,
    'Disallow vertical tab (U+000B)',
    '\n'
  ),
  'visible-misc-spaces': createWhitespaceRule(
    VISIBLE_MISC_SPACES,
    'Disallow miscellaneous visible spaces',
    ' '
  ),
  'zero-width': createWhitespaceRule(
    ZERO_WIDTH,
    'Disallow zero-width characters (U+200B, U+200C, U+200D, U+FEFF, U+2060)'
  ),
};
