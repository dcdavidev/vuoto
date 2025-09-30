import type { ESLint } from 'eslint';

import { baseRules } from './configs/base.js';
import { meta } from './meta.js';
import { rules } from './rules.js';

const plugin: ESLint.Plugin = {
  meta,
  rules,
  processors: {},
  configs: {},
};

plugin.configs = plugin.configs ?? {};
Object.assign(plugin.configs, {
  recommended: {
    plugins: { vuoto: plugin },
    rules: { ...baseRules },
  },

  strict: {
    plugins: { vuoto: plugin },
    rules: { ...baseRules },
  },

  all: {
    plugins: { vuoto: plugin },
    rules: { ...baseRules },
  },

  off: {
    plugins: { vuoto: plugin },
    rules: Object.fromEntries(
      Object.keys(baseRules).map((rule) => [rule, 'off'])
    ),
  },
});

export default plugin;
