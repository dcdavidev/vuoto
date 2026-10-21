# eslint-plugin-vuoto

> ESLint plugin for detecting, highlighting, and auto-fixing invisible characters, zero-width spaces, and irregular Unicode whitespace.

[![npm version](https://img.shields.io/npm/v/eslint-plugin-vuoto.svg?style=flat-square)](https://www.npmjs.com/package/eslint-plugin-vuoto)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![ESLint](https://img.shields.io/badge/ESLint-%3E%3D9.0.0-4B32C3.svg?style=flat-square)](https://eslint.org)
[![Flat Config Ready](https://img.shields.io/badge/Flat%20Config-Ready-brightgreen.svg?style=flat-square)](https://eslint.org/docs/latest/use/configure/configuration-files)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg?style=flat-square)](https://www.typescriptlang.org)

`eslint-plugin-vuoto` is the official ESLint plugin counterpart to [`vuoto`](https://github.com/dcdavidev/vuoto/tree/main/packages/vuoto). It provides real-time in-editor diagnostics and automatic formatting for invisible, ambiguous, and deceptive Unicode whitespace characters across your JavaScript and TypeScript files.

Invisible zero-width characters, non-breaking spaces, legacy line separators, and unexpected BOM headers silently break compilers, parsers, Git diffs, terminal outputs, and text searches. They can also conceal Trojan Source security vulnerabilities. `eslint-plugin-vuoto` surfaces and eliminates them seamlessly.

---

## Features

- 🎯 **13 Specialized Rules** — Targeted enforcement for control characters, invisible separators, irregular spaces, and zero-width artifacts.
- 🔧 **Instant Auto-Fix** — Full `eslint --fix` support across every rule to cleanly normalize or strip problematic characters.
- 📦 **ESLint 9+ Flat Config Ready** — First-class support with self-registering preset configs (`recommended`, `strict`, `all`, `off`).
- ⚙️ **Configurable Granular Skips** — Support for `skipComments`, `skipStrings`, `skipTemplates`, and `skipJSXText` when specific characters are intentional in text literals.
- 🚀 **Lightweight & Fast** — Bundled ESM distribution with zero runtime dependencies and minimal overhead.
- 📝 **Full TypeScript Definitions** — Complete types for plugin exports, config presets, rule options, and rule names.

---

## Installation

```bash
# pnpm
pnpm add -D eslint-plugin-vuoto eslint

# npm
npm install --save-dev eslint-plugin-vuoto eslint

# yarn
yarn add -D eslint-plugin-vuoto eslint

# bun
bun add -d eslint-plugin-vuoto eslint
```

> **Note**: `eslint-plugin-vuoto` requires ESLint `^9.0.0` or higher.

---

## Usage

### Flat Config (`eslint.config.js` / `eslint.config.mjs`)

The plugin includes self-contained flat config presets with the `vuoto` plugin pre-registered:

```javascript
// eslint.config.js
import vuoto from 'eslint-plugin-vuoto';

export default [
  // Spread the recommended configuration
  ...vuoto.configs.recommended,

  // Optional: customize or override individual rules
  {
    rules: {
      'vuoto/non-breaking-space': ['error', { skipStrings: true }],
    },
  },
];
```

#### Using `defineConfig` (ESLint 9.14+)

```javascript
// eslint.config.js
import { defineConfig } from 'eslint/config';
import vuoto from 'eslint-plugin-vuoto';

export default defineConfig([...vuoto.configs.recommended]);
```

### Manual Plugin Registration

If you prefer registering plugins manually:

```javascript
// eslint.config.js
import vuoto from 'eslint-plugin-vuoto';

export default [
  {
    plugins: {
      vuoto,
    },
    rules: {
      'vuoto/zero-width': 'error',
      'vuoto/non-breaking-space': 'error',
      'vuoto/byte-order-mark': 'error',
    },
  },
];
```

---

## Configuration Presets

| Preset                      | Description                                                             | Severity  |
| :-------------------------- | :---------------------------------------------------------------------- | :-------- |
| `vuoto.configs.recommended` | Standard setup enabling all 13 rules. Recommended for all projects.     | `'error'` |
| `vuoto.configs.strict`      | Strict setup enforcing all 13 rules.                                    | `'error'` |
| `vuoto.configs.all`         | Enables every rule provided by the plugin.                              | `'error'` |
| `vuoto.configs.off`         | Explicitly disables every vuoto rule (useful for testing or migration). | `'off'`   |

---

## Rules Reference

Every rule is auto-fixable via `eslint --fix` and provides precise line/column ranges and Unicode identifiers in diagnostic messages.

| Rule                          | Category   | Characters Matched                                   | Auto-Fix Behavior      |
| :---------------------------- | :--------- | :--------------------------------------------------- | :--------------------- |
| `vuoto/byte-order-mark`       | Control    | `U+FEFF` (Byte Order Mark)                           | Stripped (`""`)        |
| `vuoto/zero-width`            | Zero-Width | `U+200B`, `U+200C`, `U+200D`, `U+2060`, `U+FEFF`     | Stripped (`""`)        |
| `vuoto/invisible-separators`  | Separators | `U+2060` (Word Joiner), `U+FEFF` (ZWNBSP)            | Stripped (`""`)        |
| `vuoto/non-breaking-space`    | Spaces     | `U+00A0` (Non-Breaking Space)                        | Replaced with `" "`    |
| `vuoto/narrow-no-break-space` | Spaces     | `U+202F` (Narrow No-Break Space)                     | Replaced with `" "`    |
| `vuoto/em-space`              | Spaces     | `U+2003` (Em Space)                                  | Replaced with `" "`    |
| `vuoto/en-space`              | Spaces     | `U+2002` (En Space)                                  | Replaced with `" "`    |
| `vuoto/ideographic-space`     | Spaces     | `U+3000` (Ideographic / Fullwidth Space)             | Replaced with `" "`    |
| `vuoto/visible-misc-spaces`   | Spaces     | `U+2000`–`U+200A`, `U+205F` (Quad, Thin, Hair, etc.) | Replaced with `" "`    |
| `vuoto/line-separator`        | Separators | `U+2028` (Line Separator)                            | Replaced with `"\n"`   |
| `vuoto/paragraph-separator`   | Separators | `U+2029` (Paragraph Separator)                       | Replaced with `"\n\n"` |
| `vuoto/form-feed`             | Control    | `U+000C` (Form Feed)                                 | Replaced with `"\n"`   |
| `vuoto/vertical-tab`          | Control    | `U+000B` (Vertical Tab)                              | Replaced with `"\n"`   |

---

## Rule Options

Every rule accepts an optional options object to selectively bypass whitespace validation inside specific AST contexts:

```typescript
interface WhitespaceRuleOptions {
  /**
   * Skip checking whitespace characters inside code comments.
   * @default false
   */
  skipComments?: boolean;

  /**
   * Skip checking whitespace characters inside string literals.
   * @default false
   */
  skipStrings?: boolean;

  /**
   * Skip checking whitespace characters inside template literals.
   * @default false
   */
  skipTemplates?: boolean;

  /**
   * Skip checking whitespace characters inside JSX text and attributes.
   * @default false
   */
  skipJSXText?: boolean;
}
```

### Example: Allowing Non-Breaking Spaces in User-Facing Strings

If your application deliberately utilizes non-breaking spaces (`&nbsp;` / `\u00A0`) inside string constants or JSX copy:

```javascript
// eslint.config.js
import vuoto from 'eslint-plugin-vuoto';

export default [
  ...vuoto.configs.recommended,
  {
    rules: {
      'vuoto/non-breaking-space': [
        'error',
        {
          skipStrings: true,
          skipTemplates: true,
          skipJSXText: true,
        },
      ],
      'vuoto/ideographic-space': [
        'error',
        {
          skipComments: true,
          skipStrings: true,
        },
      ],
    },
  },
];
```

---

## Pairing with `vuoto`

| Tool                                                                       | Focus                                | When to Use                                                               |
| :------------------------------------------------------------------------- | :----------------------------------- | :------------------------------------------------------------------------ |
| **`eslint-plugin-vuoto`**                                                  | Real-time JS/TS linting & formatting | Editor feedback, pre-commit lint stages, pull request CI                  |
| **[`vuoto`](https://github.com/dcdavidev/vuoto/tree/main/packages/vuoto)** | Fast whole-repository cleanup        | Markdown, JSON, YAML, configs, codebases, `.vuotoignore` batch processing |

---

## License

This project is licensed under the [MIT License](./LICENSE).

**Copyright (c) 2026 Davide Di Criscito**
