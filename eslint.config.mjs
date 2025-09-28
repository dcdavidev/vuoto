import { defineConfig, globalIgnores } from 'eslint/config';
import importPlg from 'eslint-plugin-import';
import jsdoc from 'eslint-plugin-jsdoc';
import prettierPlugin from 'eslint-plugin-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unicorn from 'eslint-plugin-unicorn';
import globals from 'globals';
import jsoncParser from 'jsonc-eslint-parser';
import tseslint from 'typescript-eslint';
import js from '@eslint/js';
import json from '@eslint/json';
import markdown from '@eslint/markdown';
import packageJson from 'eslint-plugin-package-json';
/**
 * Js/Ts imports/exports rules
 * @typedef {import("eslint").Linter.RulesRecord}
 * @example
 * ```js
 * import importPlg from 'eslint-plugin-import';
 * import simpleImportSort from 'eslint-plugin-simple-import-sort';
 *
 * export default defineConfig([
 *   {
 *     plugins: {
 *       import: importPlg,
 *       'simple-import-sort': simpleImportSort,
 *     },
 *     rules: {
 *       ...rulesImportsExports
 *     }
 *   }
 * ]);
 */
const rulesImportsExports = {
  'sort-imports': 'off',
  'simple-import-sort/imports': [
    'error',
    {
      groups: [
        // 1. Dotenv
        ['^dotenv', '^@dotenvx/dotenvx'],

        // 2. Node.js built-ins (completo)
        [
          '^assert',
          '^buffer',
          '^child_process',
          '^cluster',
          '^console',
          '^constants',
          '^crypto',
          '^dgram',
          '^dns',
          '^domain',
          '^events',
          '^fs',
          '^http',
          '^https',
          '^inspector',
          '^module',
          '^net',
          '^os',
          '^path',
          '^perf_hooks',
          '^process',
          '^punycode',
          '^querystring',
          '^readline',
          '^repl',
          '^stream',
          '^string_decoder',
          '^timers',
          '^tls',
          '^tty',
          '^url',
          '^util',
          '^v8',
          '^vm',
          '^zlib',
          '^node:',
        ],

        // 3. Side-effect imports
        ['^\\u0000'],
        // 4. Third-party
        ['^[^@./]', '^@\\w'],
        // 5. React
        ['^react$', '^react-dom$', '^react'],
        // 6. UI libs
        ['^@mui', '^@material-ui', '^@tabler'],
        // 7. Internal + relatives
        ['^(@dcdavidev)(/.*|$)', '^\\.\\.?/'],
        // 8. Styles & assets
        [
          '^.+\\.s?css$',
          '^.+\\.(png|jpe?g|gif|webp|svg)$',
          '^.+\\.(mp3|wav|ogg)$',
          '^.+\\.(mp4|avi|mov)$',
        ],
      ],
    },
  ],
  'simple-import-sort/exports': 'error',
};

/**
 * @typedef {import("eslint").Linter.Config[]}
 */
export default defineConfig([
  // --- Ignores ---
  globalIgnores(['node_modules/', '**/node_modules/'], 'Ignore dependencies'),
  globalIgnores(['.nx/'], 'Ignore nx data'),
  globalIgnores(
    [
      'dist/',
      '**/dist/',
      'build/',
      '**/build/',
      'tmp/',
      '**/tmp/',
      'out-tsc/',
      '**/out-tsc/**',
    ],
    'Ignore compiled output',
  ),
  globalIgnores(
    ['.github/instructions/', '.cursor/rules/'],
    'Ignore instructions for AI agents',
  ),
  globalIgnores(
    ['**/vite.config.*.timestamp*', '**/vitest.config.*.timestamp*'],
    'Ignore timestamps',
  ),
  globalIgnores(['*.log', '**/*.log'], 'Ignore logs'),
  globalIgnores(
    [
      'package-lock.json',
      '**/package-lock.json',
      'pnpm-lock.yaml',
      '**/pnpm-lock.yaml',
      'yarn.lock',
      '**/yarn.lock',
      'bun.lock',
      'bun.lockb',
      '**/bun.lock',
      '**/bun.lockb',
    ],
    'Ignore lock files',
  ),

  // --- Core: JS + TS ---
  ...tseslint.configs.recommended,
  js.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    plugins: {
      unicorn,
      jsdoc,
      prettier: prettierPlugin,
      import: importPlg,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      ...rulesImportsExports,

      // TS: allow unused prefixed with "_"
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],

      // --- Unicorn ---
      'unicorn/filename-case': ['error', { case: 'kebabCase' }],
      'unicorn/prefer-module': 'error',
      'unicorn/no-new-buffer': 'error',
      'unicorn/no-instanceof-array': 'error',
      'unicorn/prefer-includes': 'error',
      'unicorn/prefer-string-replace-all': 'error',
      'unicorn/prefer-type-error': 'error',
      'unicorn/throw-new-error': 'error',
      'unicorn/no-null': 'off',
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/explicit-length-check': 'warn',

      // --- JSDoc ---
      'jsdoc/require-jsdoc': [
        'warn',
        {
          require: {
            FunctionDeclaration: true,
            MethodDefinition: true,
            ClassDeclaration: true,
          },
        },
      ],
      'jsdoc/require-description': 'warn',

      // --- Prettier ---
      'prettier/prettier': 'error',
    },
  },

  // --- JSON / JSONC / JSON5 ---
  packageJson.configs.recommended,
  {
    files: ['**/*.json'],
    plugins: { json },
    language: 'json/json',
    extends: ['json/recommended'],
    languageOptions: { parser: jsoncParser },
  },
  {
    files: ['**/*.jsonc', '**/*.json5', '**/tsconfig*.json'],
    plugins: { json },
    language: 'json/jsonc',
    extends: ['json/recommended'],
    languageOptions: { parser: jsoncParser },
  },

  // --- Markdown ---
  {
    files: ['**/*.md'],
    plugins: { markdown },
    language: 'markdown/gfm',
    extends: ['markdown/recommended'],
  },
  {
    files: ['**/*.md/*.js', '**/*.md/*.ts', '**/*.md/*.jsx', '**/*.md/*.tsx'],
    rules: { ...rulesImportsExports },
  },
]);
