---
name: eslint-plugin-vuoto
description: Detects, highlights, and auto-fixes invisible characters, zero-width spaces, and irregular Unicode whitespace in JavaScript and TypeScript using eslint-plugin-vuoto. Covers ESLint 9+ flat configs, all 13 rules, presets (recommended, strict, all, off), and AST skips.
---

# ESLint Plugin Vuoto Skill

This skill guides an AI agent through integrating, configuring, and customizing **`eslint-plugin-vuoto`** for real-time linting and automated whitespace hygiene in JavaScript, TypeScript, and JSX projects.

---

## 1. When to Use This Skill

Activate this skill when:

- Setting up or maintaining ESLint flat config (`eslint.config.js` or `eslint.config.mjs`) in modern projects.
- Preventing and auto-fixing invisible characters, zero-width artifacts, or Trojan Source exploits in source files.
- Configuring granular rule overrides (e.g., allowing non-breaking spaces in user-facing JSX copy or comments).
- Troubleshooting unexpected ESLint syntax errors caused by invisible characters.
- Composing flat configuration bundles alongside tools like `eslint-plugin-spellbookx`, Prettier, or TypeScript-ESLint.

---

## 2. Installation

`eslint-plugin-vuoto` requires ESLint `^9.0.0` or higher:

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

---

## 3. Flat Config Presets

The plugin provides ready-to-use ESLint flat config arrays that register the plugin and enable rule sets:

| Preset                          | Description                                                                     | Default Severity |
| :------------------------------ | :------------------------------------------------------------------------------ | :--------------- |
| **`vuoto.configs.recommended`** | Enables all 13 whitespace rules. Ideal baseline for all projects.               | `'error'`        |
| **`vuoto.configs.strict`**      | Strict enforcement of all 13 whitespace rules.                                  | `'error'`        |
| **`vuoto.configs.all`**         | Enables every rule provided by the plugin.                                      | `'error'`        |
| **`vuoto.configs.off`**         | Explicitly disables every vuoto rule (useful for migrations or test overrides). | `'off'`          |

---

## 4. Setup Recipes

### A. Recommended Setup (`eslint.config.mjs`)

```javascript
// eslint.config.mjs
import vuoto from 'eslint-plugin-vuoto';

export default [
  ...vuoto.configs.recommended,
  {
    // Custom project overrides
  },
];
```

### B. Using `defineConfig` (ESLint 9.14+)

```javascript
// eslint.config.mjs
import { defineConfig } from 'eslint/config';
import vuoto from 'eslint-plugin-vuoto';

export default defineConfig([...vuoto.configs.recommended]);
```

### C. Manual Plugin Registration

If you prefer explicit control over plugin scoping and rule activation:

```javascript
// eslint.config.mjs
import vuoto from 'eslint-plugin-vuoto';

export default [
  {
    plugins: {
      vuoto,
    },
    rules: {
      'vuoto/byte-order-mark': 'error',
      'vuoto/zero-width': 'error',
      'vuoto/non-breaking-space': 'error',
    },
  },
];
```

### D. Composing with `eslint-plugin-spellbookx`

When using Spellbookx, `eslint-plugin-vuoto` is already pre-bundled in the `recommended` preset. However, if using standalone presets, you can easily combine them:

```javascript
// eslint.config.mjs
import { defineConfig } from 'eslint/config';
import spellbookx from 'eslint-plugin-spellbookx';
import vuoto from 'eslint-plugin-vuoto';

export default defineConfig([
  spellbookx.configs.javascript,
  ...vuoto.configs.recommended,
]);
```

---

## 5. Rules Reference

All 13 rules are auto-fixable via `eslint --fix` and report character code points, descriptions, and exact coordinate locations:

| Rule Name                         | Category   | Matched Characters                                   | Auto-Fix Action        |
| :-------------------------------- | :--------- | :--------------------------------------------------- | :--------------------- |
| **`vuoto/byte-order-mark`**       | Control    | `U+FEFF` (Byte Order Mark)                           | Stripped (`""`)        |
| **`vuoto/zero-width`**            | Zero-Width | `U+200B`, `U+200C`, `U+200D`, `U+2060`, `U+FEFF`     | Stripped (`""`)        |
| **`vuoto/invisible-separators`**  | Separators | `U+2060` (Word Joiner), `U+FEFF` (ZWNBSP)            | Stripped (`""`)        |
| **`vuoto/non-breaking-space`**    | Spaces     | `U+00A0` (Non-Breaking Space)                        | Replaced with `" "`    |
| **`vuoto/narrow-no-break-space`** | Spaces     | `U+202F` (Narrow No-Break Space)                     | Replaced with `" "`    |
| **`vuoto/em-space`**              | Spaces     | `U+2003` (Em Space)                                  | Replaced with `" "`    |
| **`vuoto/en-space`**              | Spaces     | `U+2002` (En Space)                                  | Replaced with `" "`    |
| **`vuoto/ideographic-space`**     | Spaces     | `U+3000` (Ideographic Space)                         | Replaced with `" "`    |
| **`vuoto/visible-misc-spaces`**   | Spaces     | `U+2000`–`U+200A`, `U+205F` (Quad, Thin, Hair, etc.) | Replaced with `" "`    |
| **`vuoto/line-separator`**        | Separators | `U+2028` (Line Separator)                            | Replaced with `"\n"`   |
| **`vuoto/paragraph-separator`**   | Separators | `U+2029` (Paragraph Separator)                       | Replaced with `"\n\n"` |
| **`vuoto/form-feed`**             | Control    | `U+000C` (`\f` Form Feed)                            | Replaced with `"\n"`   |
| **`vuoto/vertical-tab`**          | Control    | `U+000B` (`\v` Vertical Tab)                         | Replaced with `"\n"`   |

---

## 6. Rule Options & Granular AST Skips

Every rule accepts an optional options schema to skip validation inside specific AST nodes:

```typescript
interface WhitespaceRuleOptions {
  /** Skip checking inside single-line and multi-line comments. */
  skipComments?: boolean;

  /** Skip checking inside standard string literals. */
  skipStrings?: boolean;

  /** Skip checking inside template literal quasis. */
  skipTemplates?: boolean;

  /** Skip checking inside JSX text and JSX attribute values. */
  skipJSXText?: boolean;
}
```

### Example: Allowing Non-Breaking Spaces in JSX Copy

In React/Next.js projects where typography requires non-breaking spaces between words or currency symbols:

```javascript
// eslint.config.mjs
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

### Example: Scoping Rule Exceptions to Specific Paths

To avoid loosening rules across the whole repository, target specific folders or file patterns:

```javascript
// eslint.config.mjs
import vuoto from 'eslint-plugin-vuoto';

export default [
  ...vuoto.configs.recommended,
  {
    files: ['**/locales/**/*.ts', '**/i18n/**/*.json'],
    rules: {
      'vuoto/non-breaking-space': 'off',
      'vuoto/ideographic-space': 'off',
    },
  },
];
```

---

## 7. Pairing with the `vuoto` CLI

| Tool                      | Focus                                  | Scope                                                                   |
| :------------------------ | :------------------------------------- | :---------------------------------------------------------------------- |
| **`eslint-plugin-vuoto`** | Real-time JS, TS, and JSX linting      | Runs inside ESLint (`eslint --fix`), editor language server, pre-commit |
| **`vuoto` CLI**           | Fast repository-wide scanning & fixing | Markdown, JSON, YAML, lockfiles, `.vuotoignore`, CI pipeline scripts    |

Recommended combined workflow:

1. Use `eslint-plugin-vuoto` in `eslint.config.mjs` for in-editor feedback while writing code.
2. Use `vuoto --silent` in CI to ensure non-JS files (documentation, config, assets) remain completely clean.
