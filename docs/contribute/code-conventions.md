# Code Conventions

This guide describes the code conventions for the Vuoto monorepo. Most rules are enforced automatically by the repository's Spellbookx-based ESLint, Prettier, and CSpell configuration.

## Documentation

Follow the nearby code's documentation style. Add JSDoc to public APIs and non-obvious behavior; a file-level `@file` header is not required.

## Language and Modules

- Write source code, tests, and scripts in **TypeScript** with `strict`, `isolatedModules`, and `verbatimModuleSyntax` enabled (see [`tsconfig.base.json`](../../tsconfig.base.json)).
- The repository and all workspace packages target `ES2024` and are pure ECMAScript modules (`"type": "module"`). Do not use CommonJS (`require`, `module.exports`).
- TypeScript uses `module: NodeNext` and `moduleResolution: NodeNext`. Relative imports must include the `.js` extension, including inside `.ts` files:

  ```ts
  import { normalize } from '../src/index.js';
  ```

- Use explicit `import type` for type-only imports as enforced by `verbatimModuleSyntax`.
- Import Node.js built-in modules with the `node:` prefix, for example `node:fs` and `node:child_process`.

## Formatting (Prettier)

The root [`prettier.config.mjs`](../../prettier.config.mjs) uses the `prettier-config-spellbookx/base` preset:

| Option           | Value  |
| :--------------- | :----- |
| `printWidth`     | `80`   |
| `tabWidth`       | `2`    |
| `semi`           | `true` |
| `singleQuote`    | `true` |
| `trailingComma`  | `es5`  |
| `bracketSpacing` | `true` |
| `endOfLine`      | `lf`   |

The preset also formats shell scripts, TOML, INI, `.properties`, XML, and `package.json` files (with sorted keys). Excluded paths are listed in [`.prettierignore`](../../.prettierignore), and shared editor defaults (UTF-8, LF, 2-space indentation, final newline) are in [`.editorconfig`](../../.editorconfig).

Do not format files by hand: run `pnpm fmt`, or let the Lefthook pre-commit hook format your staged files.

## Linting (ESLint)

The root [`eslint.config.mjs`](../../eslint.config.mjs) uses the `recommended-spellcheck` preset of `eslint-plugin-spellbookx`. It applies these rules across the entire monorepo:

### JavaScript and TypeScript

- The recommended rules of `@eslint/js`, `typescript-eslint`, and `eslint-plugin-unicorn`.
- **Unused variables** are errors. To keep an intentionally unused argument or variable, prefix its name with `_`.
- **File names** use `kebab-case`, for example `update-node.ts`.
- **Imports and exports are sorted** with `eslint-plugin-simple-import-sort`. Import groups come from `@spellbookx/recipes/imports`: Node.js built-ins first, then frameworks and third-party packages, then internal aliases, and relative imports last.
- **JSDoc**: every function declaration, class, and method must have a JSDoc comment with a description (`eslint-plugin-jsdoc`).
- **Dependencies**: `eslint-plugin-node-dependencies` checks dependency compatibility with Node.js.
- Selected `unicorn` rules are disabled by the preset: `no-null`, `prevent-abbreviations`, `name-replacements`, `no-top-level-side-effects`, `no-process-exit`, and `no-asterisk-prefix-in-documentation-comments`.

### Other Files

- **JSON**: `@eslint/json` checks `.json`, `.json5`, and `.jsonc` files. `tsconfig*.json` and `.vscode/*.json` files are parsed as JSONC, so comments are allowed.
- **`package.json`**: `eslint-plugin-package-json` checks property ordering and requires valid `name`, `version`, `description`, `license`, `keywords`, and `bugs` fields.
- **Markdown**: `@eslint/markdown` checks `.md` files with GitHub Flavored Markdown rules.
- **Empty code**: `eslint-plugin-vuoto` reports empty files, empty blocks, and unused empty constructs.
- **Prettier**: `eslint-plugin-prettier` reports formatting differences as ESLint errors.

### Spelling

`@cspell/eslint-plugin` checks the spelling of identifiers, strings, and comments inside ESLint, and `pnpm lint:spelling` checks the entire repository with CSpell using [`.config/cspell.yml`](../../.config/cspell.yml).

If a valid technical term, tool name, or identifier is flagged as unknown, add it to [`.config/cspell/custom.txt`](../../.config/cspell/custom.txt) in lowercase, one word per line, keeping the list sorted alphabetically. Fix real typos rather than adding them to the dictionary.

## Running the Checks

| Command              | What it does                                                                               |
| :------------------- | :----------------------------------------------------------------------------------------- |
| `pnpm check`         | Runs root type-check plus build, ESLint, CSpell, package type-checks, Prettier, and tests. |
| `pnpm lint`          | Runs `lint:code` and `lint:spelling` via Turborepo.                                        |
| `pnpm lint:code`     | Checks the codebase with ESLint.                                                           |
| `pnpm lint:code:fix` | Checks the codebase with ESLint and applies automatic fixes.                               |
| `pnpm lint:spelling` | Checks spelling across the repository with CSpell.                                         |
| `pnpm lint:types`    | Type-checks root `scripts/` and every workspace package via Turborepo.                     |
| `pnpm fmt`           | Formats all supported files with Prettier.                                                 |
| `pnpm fmt:check`     | Checks Prettier formatting without modifying files.                                        |

The Lefthook `pre-commit` hook ([`.config/lefthook.yml`](../../.config/lefthook.yml)) runs ESLint (`--fix`) and Prettier (`--write`) on staged files automatically, so most issues are fixed before a commit is created.
