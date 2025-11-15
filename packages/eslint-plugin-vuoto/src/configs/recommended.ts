import type { Linter } from 'eslint';

export const baseRules: Linter.RulesRecord = {
  'vuoto/byte-order-mark': 'error',
  'vuoto/em-space': 'error',
  'vuoto/en-space': 'error',
  'vuoto/form-feed': 'error',
  'vuoto/ideographic-space': 'error',
  'vuoto/invisible-separators': 'error',
  'vuoto/line-separator': 'error',
  'vuoto/narrow-no-break-space': 'error',
  'vuoto/non-breaking-space': 'error',
  'vuoto/paragraph-separator': 'error',
  'vuoto/vertical-tab': 'error',
  'vuoto/visible-misc-spaces': 'error',
  'vuoto/zero-width': 'error',
};

const configRecommended: Linter.Config[] = [
  {
    name: 'vuoto/recommended',
    rules: baseRules,
  },
];

export default configRecommended;
