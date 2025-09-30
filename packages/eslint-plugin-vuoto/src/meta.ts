import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import type { ESLint } from 'eslint';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pkg = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../package.json'), 'utf8')
);

export const meta: ESLint.Plugin['meta'] = {
  name: pkg.name,
  version: pkg.version,
  namespace: 'vuoto',
};
