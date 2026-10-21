import type { Linter } from 'eslint';

import { ALL_RULE_NAMES } from '../constants/index.js';

/**
 * Standard rule record with all vuoto rules set to 'error'.
 */
export const baseRules: Linter.RulesRecord = Object.fromEntries(
  ALL_RULE_NAMES.map((name) => [`vuoto/${name}`, 'error'])
);

/**
 * Rule record with all vuoto rules disabled ('off').
 */
export const offRules: Linter.RulesRecord = Object.fromEntries(
  ALL_RULE_NAMES.map((name) => [`vuoto/${name}`, 'off'])
);
