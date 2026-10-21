---
name: spellbookx-cspell
description: Configures and customizes CSpell spell-checking with cspell-config-spellbookx. Explains technical word whitelisting, multi-language dictionaries, ignore paths, and defineSbxConfig.
---

# Spellbookx CSpell Skill

This skill guides an AI agent through setting up, extending, and maintaining code spell-checking using **`cspell-config-spellbookx`**.

---

## 1. Built-in Dictionaries & Features

`cspell-config-spellbookx` eliminates false positives in modern toolchains by providing:

1. **Multi-Language Coverage**: Built-in support for English (`en_US`, `en-gb`), Italian (`it-it`), Spanish (`es-es`), French (`fr-fr`), and German (`de-de`).
2. **Programming Dictionaries**: Technical vocabularies for TypeScript, Node.js, Python, Go, PHP, PowerShell, HTML, CSS, C#, LaTeX, Bash, and npm.
3. **Curated Technical Vocabulary**: Modern tooling terms (`bunfig`, `czrc`, `dotenvx`, `esmock`, `shadcn`, `turborepo`, etc.).
4. **Universal Ignore Globs**: Pre-configured ignore paths for caches (`.turbo`, `.next`), lockfiles (`pnpm-lock.yaml`, `bun.lockb`), compiled output (`dist`, `target`), and operating system artifacts.

---

## 2. Setup Recipes

### Standard Monorepo Setup (`cspell.config.cjs`)

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

Create the custom words file for project-specific terms:

```bash
mkdir -p .config/cspell
touch .config/cspell/custom.txt
```

---

## 3. Customizing with `defineSbxConfig`

To compose or override ignore paths, dictionaries, or custom words programmatically:

```javascript
// cspell.config.cjs
const { defineSbxConfig } = require('cspell-config-spellbookx');

module.exports = defineSbxConfig({
  words: ['myCustomBrand', 'internalProtocol'],
  ignorePaths: ['**/generated/**', '**/fixtures/**'],
  dictionaries: ['custom-dictionary'],
});
```

---

## 4. Best Practices & Commands

1. **Quick check in local/pre-commit**:
   ```bash
   pnpm exec cspell --no-progress --no-summary .
   ```
2. **Detailed reporting in CI**:
   ```bash
   pnpm exec cspell .
   ```
3. **Adding New Words**:
   When legitimate technical terms, company names, or identifiers trigger a spell-check failure, append them to `.config/cspell/custom.txt` in lowercase.
