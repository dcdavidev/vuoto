import type { Linter } from 'eslint';

import { plugin } from '../plugin.js';
import { baseRules, offRules } from './rules.js';

/**
 * Available configuration preset names in eslint-plugin-vuoto.
 */
export type VuotoESLintConfig = 'recommended' | 'strict' | 'all' | 'off';

/**
 * Severity level for ESLint rules.
 */
export type VuotoRuleLevel = 'error' | 'warn' | 'off';

export const configRecommended: Linter.Config[] = [
  {
    name: 'vuoto/recommended',
    plugins: {
      vuoto: plugin,
    },
    rules: baseRules,
  },
];

export const configStrict: Linter.Config[] = [
  {
    name: 'vuoto/strict',
    plugins: {
      vuoto: plugin,
    },
    rules: baseRules,
  },
];

export const configAll: Linter.Config[] = [
  {
    name: 'vuoto/all',
    plugins: {
      vuoto: plugin,
    },
    rules: baseRules,
  },
];

export const configOff: Linter.Config[] = [
  {
    name: 'vuoto/off',
    plugins: {
      vuoto: plugin,
    },
    rules: offRules,
  },
];

export const configs: Record<VuotoESLintConfig, Linter.Config[]> = {
  recommended: configRecommended,
  strict: configStrict,
  all: configAll,
  off: configOff,
};

// Bind configs back to plugin
plugin.configs = configs;

export { baseRules, offRules } from './rules.js';
