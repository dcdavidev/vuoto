---
name: spellbookx-eslint
description: Configures, customizes, and troubleshoots ESLint flat configs using eslint-plugin-spellbookx. Covers all 16 presets, framework configurations (React, Astro, Svelte, Node), and import sorting with @spellbookx/recipes.
---

# Spellbookx ESLint Skill

This skill guides an AI agent through selecting, composing, and customizing ESLint flat configurations using **`eslint-plugin-spellbookx`**.

---

## 1. Available Configurations

`eslint-plugin-spellbookx` exposes 16 flat configuration presets via `spellbookx.configs.<name>` or direct subpath exports `eslint-plugin-spellbookx/<name>`:

| Preset                       | Description                           | Key Inclusions                                                            |
| :--------------------------- | :------------------------------------ | :------------------------------------------------------------------------ |
| **`recommended`**            | Default preset for modern web & TS    | `ignores`, `javascript`, `react`, `json`, `markdown`, `vuoto`, `prettier` |
| **`recommended-spellcheck`** | Recommended bundle with spellchecking | `recommended` + `cspell`                                                  |
| **`all`**                    | All-inclusive bundle for monorepos    | All 16 configurations and framework rules                                 |
| **`base`**                   | Minimal baseline for JS/TS            | `ignores`, `javascript`, `prettier`                                       |
| **`node`**                   | Tailored for backend/CLI Node.js      | `ignores`, `javascript`, `json`, `vuoto`, `prettier`                      |
| **`react`**                  | React & React Native TSX/JSX          | `@eslint-react/eslint-plugin` rules                                       |
| **`astro`**                  | Astro `.astro` components             | `eslint-plugin-astro`                                                     |
| **`svelte`**                 | Svelte `.svelte` components           | `eslint-plugin-svelte`                                                    |
| **`strict`**                 | Strict TypeScript rule suite          | `typescript-eslint` strict configs                                        |
| **`javascript`**             | JS/TS, Unicorn, JSDoc, import sort    | `@eslint/js`, `typescript-eslint`, `unicorn`, `simple-import-sort`        |
| **`json`**                   | JSON and JSONC linting                | `@eslint/json`, `jsonc-eslint-parser`                                     |
| **`markdown`**               | Markdown linting                      | `@eslint/markdown`                                                        |
| **`prettier`**               | Prettier rule conflict resolver       | `eslint-plugin-prettier/recommended`                                      |
| **`cspell`**                 | CSpell integration for ESLint         | `@cspell/eslint-plugin`                                                   |
| **`ignores`**                | Global monorepo ignore globs          | Extracted from `@spellbookx/recipes/ignores`                              |
| **`vuoto`**                  | Code cleanliness and empty blocks     | `eslint-plugin-vuoto`                                                     |

---

## 2. Framework Configuration Recipes

### React & Next.js Projects

```javascript
// eslint.config.mjs
import { defineConfig } from 'eslint/config';
import spellbookx from 'eslint-plugin-spellbookx';

export default defineConfig([
  spellbookx.configs['recommended-spellcheck'],
  spellbookx.configs.react,
  {
    rules: {
      // Add custom project-specific rule overrides here
    },
  },
]);
```

### Astro Projects

```javascript
// eslint.config.mjs
import { defineConfig } from 'eslint/config';
import spellbookx from 'eslint-plugin-spellbookx';

export default defineConfig([
  spellbookx.configs.recommended,
  spellbookx.configs.astro,
]);
```

### Svelte & SvelteKit Projects

```javascript
// eslint.config.mjs
import { defineConfig } from 'eslint/config';
import spellbookx from 'eslint-plugin-spellbookx';

export default defineConfig([
  spellbookx.configs.recommended,
  spellbookx.configs.svelte,
]);
```

### Node.js Backend & CLI Tools

```javascript
// eslint.config.mjs
import { defineConfig } from 'eslint/config';
import spellbookx from 'eslint-plugin-spellbookx';

export default defineConfig([spellbookx.configs.node]);
```

---

## 3. Custom Import Sorting with `@spellbookx/recipes`

Spellbookx uses `simple-import-sort` pre-configured with curated regex patterns from `@spellbookx/recipes/imports`. You can customize the sorting order using `defineImports`:

```javascript
// eslint.config.mjs
import { defineConfig } from 'eslint/config';
import spellbookx from 'eslint-plugin-spellbookx';
import { defineImports } from 'eslint-plugin-spellbookx/lib';
import { imports } from '@spellbookx/recipes/imports';

export default defineConfig([
  spellbookx.configs.base,
  {
    files: ['**/*.{js,ts,jsx,tsx}'],
    rules: {
      'simple-import-sort/imports': [
        'error',
        {
          groups: defineImports(
            imports.dotenv,
            imports.builtinModules,
            imports.uiFrameworks,
            imports.thirdParty,
            imports.internalAliases,
            imports.relative
          ),
        },
      ],
    },
  },
]);
```

---

## 4. Best Practices & Troubleshooting

1. **Always use `defineConfig`**: Wrap the array with `import { defineConfig } from 'eslint/config'` for full TypeScript autocompletion and flat config type validation.
2. **Prettier Conflict Management**: Put `spellbookx.configs.prettier` or any custom formatting override at the **end** of your config array to avoid conflicting rules.
3. **Running the Linter**:
   - To auto-fix: `pnpm exec eslint --no-warn-ignored --fix .`
   - In CI: `pnpm exec eslint --no-warn-ignored .`
