import { defineConfig } from 'eslint/config';
import spellbookx from 'eslint-plugin-spellbookx';

export default defineConfig([
  spellbookx.configs['recommended-spellcheck'],
  {
    rules: {
      'jsdoc/informative-docs': 'off',
      'unicorn/no-exports-in-scripts': 'off',
      'unicorn/consistent-boolean-name': 'off',
      'unicorn/prefer-unicode-code-point-escapes': 'off',
      'unicorn/prefer-code-point': 'off',
      'unicorn/prefer-ternary': 'off',
    },
  },
  {
    files: ['**/*.test.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
]);
