---
name: spellbookx-setup
description: Guides setup and integration of the Spellbookx developer toolchain (ESLint flat configs, Prettier presets, CSpell, Commitlint, the czg commit prompt, and Lefthook) into any JavaScript/TypeScript project or monorepo, with the tool configs in .config/.
---

# Spellbookx Setup Skill

This skill guides an AI agent through setting up, configuring, and verifying the **Spellbookx** toolchain across any modern JavaScript or TypeScript codebase.

For details on one tool, use its own skill: `spellbookx-eslint-plugin`, `spellbookx-prettier-config`, `spellbookx-cspell-config`, `spellbookx-commitlint-config`, or `spellbookx-cz-config`.

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

> The wizard follows the naming rule in section 3. For each selected tool it asks the config format and, where the format allows both, whether the file goes in `.config/`: ESLint and Prettier (`.mjs` or `.ts`, root), CSpell (YAML, JSON, or JavaScript with `defineSbxConfig`; YAML and JSON can go in `.config/`), commitlint and czg (`.config/` or root), and Lefthook (YAML, JSON, or TOML in `.config/`). The defaults give the `.config/` layout below, and the generated scripts and hooks pass `--config` / `--config=` where needed. It sets up Lefthook only (no husky) and czg only (no Commitizen). Non-interactive runs take flags such as `--cspell-format json`, `--lefthook-format toml`, or `--root czg` (`sbx init --help`).

### Option B: Manual Dependency Installation

Install the Spellbookx toolchain as development dependencies:

```bash
# pnpm
pnpm add -D eslint-plugin-spellbookx prettier-config-spellbookx cspell-config-spellbookx commitlint-config-spellbookx cz-config-spellbookx eslint prettier cspell czg @commitlint/cli lefthook

# npm
npm install --save-dev eslint-plugin-spellbookx prettier-config-spellbookx cspell-config-spellbookx commitlint-config-spellbookx cz-config-spellbookx eslint prettier cspell czg @commitlint/cli lefthook

# bun
bun add -d eslint-plugin-spellbookx prettier-config-spellbookx cspell-config-spellbookx commitlint-config-spellbookx cz-config-spellbookx eslint prettier cspell czg @commitlint/cli lefthook
```

Install `czg` globally as well (`pnpm add -g czg` or `npm install -g czg`), so it also works outside this project; the devDependency pins the version the scripts use. Spellbookx writes commits with czg, not with Commitizen or `cz-git`. `@spellbookx/recipes` holds the shared building blocks (import groups, ignore globs, commit types and scopes) and is installed as a dependency of the packages above. Add it to `devDependencies` only if a config file imports it directly.

---

## 3. Configuration Files Setup

For each tool, ask the user which config format they want, and use an official file name from that tool's documentation. The name decides the location:

- **A name with `.config.` in it** (`<tool>.config.<ext>`, for example `eslint.config.mjs`, `prettier.config.mjs`, `cspell.config.mjs`, `cz.config.mjs`) always goes in the **repository root**.
- **A name that is only the tool name** (`cspell.yml`, `cz.mjs`, `commitlint.mjs`, `lefthook.yml`) goes in **`.config/`**, but only when the tool's CLI accepts `--config` or finds `.config/` by itself. Configure every script and hook that runs the tool to pass the path.

With the default choices the layout is:

```text
.
├── .config/
│   ├── commitlint.mjs
│   ├── cspell.yml
│   ├── cspell/
│   │   └── custom.txt
│   ├── cz.mjs
│   └── lefthook.yml
├── .editorconfig
├── eslint.config.mjs
└── prettier.config.mjs
```

CSpell and Lefthook find their files in `.config/` on their own. commitlint and czg do not, so their scripts pass the path: `commitlint --config ./.config/commitlint.mjs` and `czg --config=./.config/cz.mjs` (czg needs the `=`; see section 4).

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

It is recommended to add an `.editorconfig` file to the root of the repository to ensure consistent editor settings across contributors. The Spellbookx CLI wizard generates a default `.editorconfig` file, but you can also create one manually:

```ini
# EditorConfig is awesome: https://editorconfig.org

# Top-level EditorConfig
root=true

# Global defaults for all files
[*]
charset=utf-8
end_of_line=lf
insert_final_newline=true
trim_trailing_whitespace=true
indent_style=space
indent_size=2

# JavaScript, TypeScript, and modern modules
[*.{js,jsx,ts,tsx,mjs,cjs,mts,cts}]
indent_style=space
indent_size=2
max_line_length=80

# Web frameworks
[*.{astro,svelte,vue}]
indent_style=space
indent_size=2

# JSON, JSON5, JSONC, and configuration files
[*.{json,json5,jsonc}]
indent_style=space
indent_size=2

# Runtime configurations
[.*rc]
indent_style=space
indent_size=2

# YAML and workflow configurations
[*.{yml,yaml}]
indent_style=space
indent_size=2

# Markdown documentation
[*.md]
trim_trailing_whitespace=false

# TOML configuration files
[*.toml]
indent_style=space
indent_size=2
max_line_length=100

# XML and SVG graphics
[*.{xml,svg}]
indent_style=space
indent_size=2

# Shell scripts
[*.{sh,bash,zsh}]
indent_style=space
indent_size=2

# Makefiles require hard tabs
[Makefile]
indent_style=tab
indent_size=4
```

### C. CSpell Config (`.config/cspell.yaml`)

```yaml
# yaml-language-server: $schema=https://raw.githubusercontent.com/streetsidesoftware/cspell/main/cspell.schema.json
# CSpell configuration
# Documentation: https://cspell.org/docs/Configuration

version: '0.2'

# Spellbookx preset: languages (en, es, it, fr, de), technical dictionaries,
# and the shared ignore globs (lock files, build outputs, AI agent folders,
# LICENSE, CHANGELOG.md, and so on).
import:
  - cspell-config-spellbookx

# Project word lists, one lowercase word per line. Paths are relative to this
# file.
dictionaryDefinitions:
  # Tool names, identifiers, and other terms missing from the preset.
  - name: project-words
    path: ./cspell/custom.txt
    addWords: true

dictionaries:
  - project-words

# Paths the preset does not already ignore.
ignorePaths:
  - skills-lock.json
```

Ensure the custom word file exists:

```bash
mkdir -p .config/cspell && touch .config/cspell/custom.txt
```

### D. Commitlint Config (`.config/commitlint.mjs`)

```javascript
export { default } from 'commitlint-config-spellbookx';
```

### E. czg Config (`.config/cz.mjs`)

```javascript
import { config } from 'cz-config-spellbookx';
import { definePrompt } from 'czg';

export default definePrompt({
  ...config,
  useEmoji: true,
});
```

### F. Lefthook Git Hooks (`.config/lefthook.yml`)

This example is for a pnpm monorepo with a `lint:types` script. In other projects, replace `pnpm exec` with the project's runner (`npx`, `bunx`), and drop the `types` or `lockfile` job if the project has no type check or no pnpm lock file.

```yaml
# Lefthook configuration
# Documentation: https://lefthook.dev/configuration/
#
# Skip every hook for one command:   LEFTHOOK=0 git commit ...
# Skip some jobs for one command:    LEFTHOOK_EXCLUDE=types git commit ...
# Override jobs locally (ignored by Git): lefthook-local.yml

min_version: 2.0.0
assert_lefthook_installed: true
skip_lfs: true

# ------------------------------------------------------------------------------
# Before the commit is created: check only the staged files.
# ------------------------------------------------------------------------------
pre-commit:
  parallel: true
  skip:
    - merge
    - rebase
  jobs:
    # ESLint and Prettier both write files, so they run one after the other.
    # ESLint also checks spelling through @cspell/eslint-plugin.
    - name: lint-and-format
      group:
        piped: true
        jobs:
          - name: eslint
            run: pnpm exec eslint --no-warn-ignored --fix {staged_files}
            stage_fixed: true
            fail_text: ESLint found errors that it cannot fix. Fix them and commit again.
          - name: prettier
            run: pnpm exec prettier --ignore-unknown --write {staged_files}
            stage_fixed: true

    # Turbo builds the workspace dependencies first, then type-checks every
    # package.
    - name: types
      glob: '*.{ts,tsx,mts,cts}'
      run: pnpm run lint:types
      fail_text: TypeScript found type errors.

    - name: lockfile
      glob: '{package.json,pnpm-workspace.yaml,packages/*/package.json}'
      run: pnpm install --frozen-lockfile --lockfile-only
      fail_text: pnpm-lock.yaml is out of date. Run "pnpm install" and stage pnpm-lock.yaml.

# ------------------------------------------------------------------------------
# Commit message: enforce Conventional Commits.
# ------------------------------------------------------------------------------
commit-msg:
  jobs:
    - name: commitlint
      run: pnpm exec commitlint --config ./.config/commitlint.mjs --edit {1} --verbose
      fail_text: 'Use Conventional Commits, for example "feat(cspell): add a word list". Run "pnpm commit" for a guided prompt.'

# No pre-push hook: the whole-project checks (lint, spelling, format, types,
# tests, build) run in CI.
```

---

## 4. Package.json Scripts

Add scripts to the root `package.json`. Names follow the `action[:target][:modifier]` convention: `lint` only checks, fixes are opt-in with `:fix`, and every read-only check is a `lint:<target>` script run by the `lint` aggregate. `sbx init` uses the same names; the `--config` flags are needed only for the `.config/` layout:

```json
{
  "scripts": {
    "commit": "pnpm exec czg --config=./.config/cz.mjs",
    "cz": "pnpm commit",
    "czg": "pnpm commit",
    "fmt": "prettier --ignore-unknown --write .",
    "fmt:check": "prettier --ignore-unknown --check .",
    "lint": "pnpm run \"/^lint:(code|spelling)$/\"",
    "lint:code": "pnpm exec eslint --no-warn-ignored .",
    "lint:code:fix": "pnpm exec eslint --no-warn-ignored --fix .",
    "lint:commits": "pnpm exec commitlint --config ./.config/commitlint.mjs --from=HEAD~1 --verbose",
    "lint:spelling": "pnpm exec cspell --no-progress --no-summary .",
    "prepare": "lefthook install"
  }
}
```

---

## 5. Verification Checklist

Always verify the setup by running:

1. `pnpm run prepare` (or equivalent) to initialize Git hooks.
2. `pnpm lint` to confirm the ESLint flat config and CSpell run without errors.
3. `pnpm fmt:check` to verify Prettier formatting across the repository.
4. Create a test commit to verify Commitlint validation and pre-commit hooks.

---

## 6. VS Code Extensions & Settings

`./.vscode/extensions.json`:

```jsonc
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "editorconfig.editorconfig",
    "esbenp.prettier-vscode",
    "redhat.vscode-yaml",
    "streetsidesoftware.code-spell-checker",
  ],
}
```

`./.vscode/settings.json`:

```jsonc
{
  // Editor & Formatter (Prettier & EditorConfig)
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,

  // ESLint & Auto-fix on Save
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
  },
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
    "json",
    "jsonc",
  ],
  // Monorepo / Turborepo: automatically resolves configuration paths for each workspace package
  "eslint.workingDirectories": [{ "mode": "auto" }],

  // JavaScript & TypeScript (js/ts.*)
  "js/ts.tsdk.path": "node_modules/typescript/lib",
  "js/ts.tsdk.promptToUseWorkspaceVersion": true,
  "js/ts.preferences.includePackageJsonAutoImports": "auto",
  "js/ts.suggest.autoImports": true,

  // CSpell
  "cSpell.enabled": true,

  // Language Specific Formatters
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
  },
  "[javascriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
  },
  "[jsonc]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
  },

  // Monorepo optimizations & Turborepo exclusions (Search / Watcher)
  "search.exclude": {
    "**/node_modules": true,
    "**/.turbo": true,
    "**/dist": true,
  },
  "files.watcherExclude": {
    "**/.git/objects/**": true,
    "**/.git/subtree-cache/**": true,
    "**/.turbo/**": true,
    "**/node_modules/**": true,
    "**/dist/**": true,
  },
}
```
