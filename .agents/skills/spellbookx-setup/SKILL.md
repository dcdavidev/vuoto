---
name: spellbookx-setup
description: Guides setup and integration of the Spellbookx developer toolchain (ESLint flat configs, Prettier presets, CSpell, Commitlint, and Lefthook) into any JavaScript/TypeScript project or monorepo.
---

# Spellbookx Setup Skill

This skill guides an AI agent through setting up, configuring, and verifying the **Spellbookx** toolchain across any modern JavaScript or TypeScript codebase.

---

## 1. Project Inspection

Before installing packages, inspect the project environment:

1. **Package Manager**: Identify the package manager in use (`pnpm`, `npm`, `yarn`, or `bun`).
2. **Repository Architecture**: Check if the project is a monorepo (`pnpm-workspace.yaml`, `lerna.json`, root `package.json` with `workspaces`) or a single standalone package.
3. **Frameworks & Languages**:
   - TypeScript: Check for `tsconfig.json`.
   - React / Next.js: Check `dependencies` for `react`, `next`.
   - Astro: Check for `astro`.
   - Svelte: Check for `svelte` or `@sveltejs/kit`.
   - Tailwind CSS: Check for `tailwindcss` or `postcss.config.*`.
   - Prisma: Check for `prisma` or `prisma/schema.prisma`.
   - Node.js backend: Express, Fastify, Nest, or standalone CLI tools.

---

## 2. Installation Options

### Option A: Automated CLI Wizard (Fastest)

Run the interactive setup wizard to scaffold configurations and install dependencies:

```bash
# pnpm
pnpm dlx spellbookx init

# npm / npx
npx spellbookx init

# bun
bunx spellbookx init
```

### Option B: Manual Dependency Installation

Install the required packages as development dependencies:

```bash
# pnpm
pnpm add -D eslint-plugin-spellbookx prettier-config-spellbookx cspell-config-spellbookx commitlint-config-spellbookx @spellbookx/recipes eslint prettier cspell @commitlint/cli lefthook

# npm
npm install --save-dev eslint-plugin-spellbookx prettier-config-spellbookx cspell-config-spellbookx commitlint-config-spellbookx @spellbookx/recipes eslint prettier cspell @commitlint/cli lefthook

# bun
bun add -d eslint-plugin-spellbookx prettier-config-spellbookx cspell-config-spellbookx commitlint-config-spellbookx @spellbookx/recipes eslint prettier cspell @commitlint/cli lefthook
```

---

## 3. Configuration Files Setup

Create the canonical configuration files in the repository root:

### A. ESLint Flat Config (`eslint.config.mjs`)

```javascript
import { defineConfig } from 'eslint/config';
import spellbookx from 'eslint-plugin-spellbookx';

export default defineConfig([
  spellbookx.configs['recommended-spellcheck'],
  // For framework-specific projects, add the relevant preset:
  // spellbookx.configs.react,
  // spellbookx.configs.astro,
  // spellbookx.configs.svelte,
  // spellbookx.configs.node,
]);
```

### B. Prettier Config (`prettier.config.mjs`)

Select the appropriate preset:

```javascript
// Default recommended (includes Tailwind CSS class sorting)
export { default } from 'prettier-config-spellbookx';

// Or framework-tailored presets:
// export { default } from 'prettier-config-spellbookx/astro-tailwind';
// export { default } from 'prettier-config-spellbookx/svelte-tailwind';
// export { default } from 'prettier-config-spellbookx/base';
```

### C. CSpell Config (`cspell.config.cjs`)

```javascript
const { defineConfig } = require('@cspell/cspell-types');

module.exports = defineConfig({
  version: '0.2',
  import: ['cspell-config-spellbookx'],
  dictionaryDefinitions: [
    {
      name: 'project-custom-words',
      path: './.config/cspell/custom.txt',
      addWords: true,
    },
  ],
  dictionaries: ['project-custom-words'],
});
```

Ensure the custom word file exists:

```bash
mkdir -p .config/cspell && touch .config/cspell/custom.txt
```

### D. Commitlint Config (`commitlint.config.mjs`)

```javascript
export { default } from 'commitlint-config-spellbookx';
```

### E. Lefthook Git Hooks (`lefthook.yml`)

```yaml
pre-commit:
  parallel: true
  commands:
    lint:
      glob: '*.{js,ts,jsx,tsx,json,jsonc,md}'
      run: pnpm exec eslint --no-warn-ignored --fix {staged_files}
      stage_fixed: true
    fmt:
      glob: '*.{js,ts,jsx,tsx,json,jsonc,md,yml,yaml}'
      run: pnpm exec prettier --ignore-unknown --write {staged_files}
      stage_fixed: true

commit-msg:
  commands:
    commitlint:
      run: pnpm exec commitlint --edit {1}
```

---

## 4. Package.json Scripts

Add convenient scripts to the root `package.json`:

```json
{
  "scripts": {
    "check": "pnpm run lint && pnpm run spellcheck && pnpm run test",
    "check:ci": "pnpm run lint:check && pnpm run fmt:check && pnpm run spellcheck && pnpm run test",
    "commit": "cz",
    "commit:lint": "commitlint --from=HEAD~1",
    "fmt": "prettier --ignore-unknown --write .",
    "fmt:check": "prettier --ignore-unknown --check .",
    "lint": "eslint --no-warn-ignored --fix .",
    "lint:check": "eslint --no-warn-ignored .",
    "prepare": "lefthook install",
    "spellcheck": "cspell --no-progress --no-summary ."
  },
  "config": {
    "commitizen": {
      "path": "cz-git"
    }
  }
}
```

---

## 5. Verification Checklist

Always verify the setup by running:

1. `pnpm run prepare` (or equivalent) to initialize Git hooks.
2. `pnpm run lint` to confirm ESLint flat config resolves and runs without syntax errors.
3. `pnpm run fmt:check` to verify Prettier formatting across the repository.
4. `pnpm run spellcheck` to confirm CSpell runs cleanly without false positives.
5. Create a test commit to verify Commitlint validation and pre-commit hooks.
