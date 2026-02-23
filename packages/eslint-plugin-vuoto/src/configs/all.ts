import type { Linter } from 'eslint';

import { baseRules } from './recommended.js';

const configAll: Linter.Config[] = [
  {
    name: 'vuoto/all',
    rules: baseRules,
  },
];

export default configAll;
