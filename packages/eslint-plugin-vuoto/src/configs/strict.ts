import type { Linter } from 'eslint';

import { baseRules } from './recommended.js';

const configStrict: Linter.Config[] = [
  {
    name: 'vuoto/strict',
    rules: baseRules,
  },
];

export default configStrict;
