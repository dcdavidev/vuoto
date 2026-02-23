import type { Linter } from 'eslint';

import { baseRules } from './recommended.js';

const configOff: Linter.Config[] = [
  {
    name: 'vuoto/off',
    rules: Object.fromEntries(
      Object.keys(baseRules).map((rule) => [rule, 'off'])
    ),
  },
];

export default configOff;
