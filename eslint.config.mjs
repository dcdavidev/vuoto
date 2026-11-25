import { defineConfig, globalIgnores } from 'eslint/config';
import spellbookx from 'eslint-plugin-spellbookx';

export default defineConfig([
  globalIgnores([
    '.agents/**',
    '.changesets/**',
    '.claude/**',
    '.openhands/**',
  ]),
  spellbookx.configs['recommended-spellcheck'],
]);
