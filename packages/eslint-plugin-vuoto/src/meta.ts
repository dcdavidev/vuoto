import { ESLint } from 'eslint';

import pkg from '../package.json' with { type: 'json' };

export const meta: ESLint.Plugin['meta'] = {
  name: pkg.name,
  version: pkg.version,
  namespace: 'vuoto',
};
