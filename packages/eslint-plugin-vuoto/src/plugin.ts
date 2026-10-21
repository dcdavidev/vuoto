import type { ESLint, Linter, Rule } from 'eslint';

import type { VuotoESLintConfig } from './configs/index.js';
import { rules } from './rules/index.js';
import { getPackageMeta } from './utils/package-meta.js';

/**
 * Typed plugin interface for eslint-plugin-vuoto.
 */
export type VuotoPlugin = ESLint.Plugin & {
  configs: Record<VuotoESLintConfig, Linter.Config[]>;
  rules: Record<string, Rule.RuleModule>;
};

export const plugin: VuotoPlugin = {
  meta: getPackageMeta(),
  rules,
  configs: {} as VuotoPlugin['configs'],
  processors: {},
};

export default plugin;
