import type { ESLint, Linter } from 'eslint';

import configAll from './configs/all.js';
import configOff from './configs/off.js';
import configRecommended from './configs/recommended.js';
import configStrict from './configs/strict.js';
import { packageJson } from './helpers.js';
import { rules } from './rules/index.js';
import type { VuotoESLintConfig } from './types.js';

const configs: Record<VuotoESLintConfig, Linter.Config[]> = {
  recommended: configRecommended,
  strict: configStrict,
  all: configAll,
  off: configOff,
};

type Plugin = ESLint.Plugin & {
  configs: typeof configs;
};

const plugin: Plugin = {
  meta: {
    name: packageJson.name,
    version: packageJson.version,
  },
  configs,
  rules,
  processors: {},
};

export default plugin;
export type { VuotoESLintConfig, VuotoRuleLevel } from './types.js';
