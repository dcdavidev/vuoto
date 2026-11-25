---
name: spellbookx-cspell-config
description: Configures and customizes CSpell spell-checking with cspell-config-spellbookx. Covers choosing a YAML config (.config/cspell.yml) or a JavaScript config with defineSbxConfig (cspell.config.mjs in the root), project word lists, multi-language dictionaries, ignore paths, defineSbxConfig, and the ESLint and VS Code integrations.
---

# Spellbookx CSpell Skill

This skill guides an AI agent through setting up, extending, and maintaining spell-checking with **`cspell-config-spellbookx`**.

---

## 1. What the Preset Provides

1. **Languages**: `en,es,it,fr,de`, with the English (US and GB), Italian, Spanish, French, and German dictionaries.
2. **Programming dictionaries**: TypeScript, Node.js, npm, Python, Go, PHP, PowerShell, HTML, CSS, C#, LaTeX, Bash, and more.
3. **Technical words**: modern tooling terms such as `bunfig`, `czrc`, `dotenvx`, `esmock`, `shadcn`, and `turborepo`.
4. **Compound words**: `allowCompoundWords: true`, so identifiers such as `configloader` pass.
5. **Ignore paths**: shared with ESLint through `@spellbookx/recipes/ignores`. They cover dependencies, build outputs and caches (`dist`, `.turbo`, `.next`, `target`), lock files, `LICENSE` and `CHANGELOG.md` files, AI agent folders (`.agents`, `.claude`), and operating system files.
6. **Dot files**: `enableGlobDot: true`, so files such as `.github/workflows/*.yml` are checked.

> **Agent folders are ignored by path.** If the repository itself sits inside an ignored folder (for example a Git worktree under `.claude/worktrees/`), CSpell reports `No files found to check`. Run it from a checkout outside those folders.

---

## 2. Setup

### A. Install

```bash
pnpm add -D cspell-config-spellbookx cspell
```

### B. Choose the Config File

Ask the user which format they want: **YAML** (static settings) or **JavaScript with `defineSbxConfig`** (computed words or paths). The format decides the location, following the Spellbookx naming rule:

- A name with `.config.` in it (`<tool>.config.<ext>`) always goes in the **repository root**.
- A name that is only the tool name (`cspell.yml`, `cspell.json`) goes in **`.config/`**, when the CLI accepts `--config`. CSpell does (`--config <path>`), and it also finds `.config/cspell.yml` without the flag.

| Format     | File                 | Found by the CLI, ESLint and VS Code without `--config` |
| :--------- | :------------------- | :------------------------------------------------------ |
| YAML       | `.config/cspell.yml` | Yes                                                     |
| JavaScript | `cspell.config.mjs`  | Yes                                                     |

Both names are official ([CSpell docs](https://cspell.org/docs/Configuration)). Keep one config file per project. Paths inside the file are relative to the file itself.

### C. Option 1: YAML (`.config/cspell.yml`)

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

### D. Option 2: JavaScript with `defineSbxConfig` (`cspell.config.mjs`)

`defineSbxConfig` already contains the preset, so the file does not `import` it again:

```javascript
// CSpell configuration
// Documentation: https://cspell.org/docs/Configuration
import { defineSbxConfig } from 'cspell-config-spellbookx';

export default defineSbxConfig({
  // Project word lists, one lowercase word per line. Paths are relative to
  // this file, in the repository root.
  dictionaryDefinitions: [
    {
      name: 'project-words',
      path: './.config/cspell/custom.txt',
      addWords: true,
    },
  ],
  dictionaries: ['project-words'],

  // Paths the preset does not already ignore.
  ignorePaths: ['skills-lock.json'],
});
```

`defineSbxConfig` accepts several configs (or arrays of configs) and merges them in order. `mergeCSpellConfigs` does the same without the preset. `defineConfig` is an alias of `defineSbxConfig`.

The package is ESM only: use `.mjs` (or `.js` with `"type": "module"`), not `require`.

### E. Word List

```bash
mkdir -p .config/cspell
touch .config/cspell/custom.txt
```

### F. Script in `package.json`

Both config files are found without `--config`:

```json
{
  "scripts": {
    "lint:spelling": "cspell --no-progress --no-summary ."
  }
}
```

---

## 3. Customizing

### A. In YAML

Add keys to `.config/cspell.yml`. They are merged on top of the preset:

````yaml
# Extra paths to skip.
ignorePaths:
  - skills-lock.json
  - '**/fixtures/**'

# Skip fenced code blocks in Markdown files.
overrides:
  - filename: '**/*.md'
    ignoreRegExpList:
      - '/^\s*```[\s\S]*?^\s*```/gm'
````

### B. In JavaScript

Pass more configs to `defineSbxConfig`, or compute values:

```javascript
import { defineSbxConfig } from 'cspell-config-spellbookx';

const brandWords = ['myCustomBrand', 'internalProtocol'];

export default defineSbxConfig(
  {
    dictionaryDefinitions: [
      {
        name: 'project-words',
        path: './.config/cspell/custom.txt',
        addWords: true,
      },
    ],
    dictionaries: ['project-words'],
  },
  {
    words: brandWords,
    ignorePaths: ['**/generated/**', '**/fixtures/**'],
  }
);
```

---

## 4. Integrations

### A. ESLint

The `recommended-spellcheck` and `cspell` presets of `eslint-plugin-spellbookx` run `@cspell/eslint-plugin`, which reads the same config file. Unknown words then show up as ESLint warnings in the editor and in the pre-commit hook.

### B. VS Code

`.vscode/extensions.json`:

```jsonc
{
  "recommendations": ["streetsidesoftware.code-spell-checker"],
}
```

`.vscode/settings.json`:

```jsonc
{
  // Spellbookx CSpell configuration
  "cSpell.enabled": true,
}
```

The extension finds both config files. When it adds a word to the workspace, it writes to the dictionary marked `addWords: true`, here `.config/cspell/custom.txt`.

---

## 5. Commands & Maintenance

1. **Check the whole project**:
   ```bash
   pnpm lint:spelling
   ```
2. **Find out where a word comes from**:
   ```bash
   pnpm exec cspell trace <word>
   ```
3. **Adding new words**: when a real technical term, product name, or identifier fails, add it to `.config/cspell/custom.txt` in lowercase, one per line, and keep the list sorted. Fix real typos instead of adding them.
