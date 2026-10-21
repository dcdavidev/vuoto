---
name: vuoto
description: Guides the detection, diagnosis, and cleanup of invisible, zero-width, non-breaking, and irregular Unicode whitespace using the vuoto CLI and programmatic TypeScript API. Covers .vuotoignore, git integration, CI/CD pipelines, and pre-commit hooks.
---

# Vuoto Skill

This skill guides an AI agent through detecting, diagnosing, and repairing invisible, ambiguous, and problematic Unicode whitespace across text and code files using **`vuoto`**.

---

## 1. When to Use This Skill

Activate this skill when:

- Scanning repositories, codebases, or configuration files for hidden Unicode whitespace or corrupted characters.
- Fixing compilers, parsers, or bundlers failing mysteriously due to zero-width or non-breaking characters.
- Preventing Trojan Source vulnerabilities or invisible diff pollution in git repositories.
- Setting up automated whitespace validation in CI/CD pipelines (e.g., GitHub Actions) or git hooks (e.g., Lefthook, Husky).
- Normalizing strings programmatically using TypeScript/JavaScript.

---

## 2. CLI Usage & Runbooks

`vuoto` can be run ad-hoc via `npx` or installed locally as a dev dependency.

### Installation

```bash
# Locally in a project (recommended)
pnpm add -D vuoto
# or
npm install --save-dev vuoto

# Ad-hoc execution without installing
npx vuoto [options] [patterns...]
```

### Common Command Runbooks

| Goal                                   | Command                                                     |
| :------------------------------------- | :---------------------------------------------------------- |
| **Check repository (dry-run)**         | `pnpm exec vuoto`                                           |
| **Check with line/col diagnostics**    | `pnpm exec vuoto --verbose`                                 |
| **Auto-fix all files in place**        | `pnpm exec vuoto --fix`                                     |
| **Check specific globs or folders**    | `pnpm exec vuoto "src/**/*.ts" "docs/**/*.md"`              |
| **Fix specific globs excluding tests** | `pnpm exec vuoto "src/**" --fix --exclude "**/fixtures/**"` |
| **Silent CI check (exit 1 on errors)** | `pnpm exec vuoto --silent`                                  |
| **Generate default `.vuotoignore`**    | `pnpm exec vuoto init`                                      |
| **Force overwrite `.vuotoignore`**     | `pnpm exec vuoto init --force`                              |

### CLI Options Reference

| Option                 | Flag | Description                                                                  |
| :--------------------- | :--- | :--------------------------------------------------------------------------- |
| `--check`              | `-c` | Check files for whitespace issues without modifying them (default behavior). |
| `--fix`                |      | Automatically repair and normalize all detected issues in-place.             |
| `--verbose`            |      | Print file-by-file tables with exact line and column coordinates.            |
| `--silent`             |      | Suppress non-error stdout (ideal for CI and quiet scripts).                  |
| `--exclude <globs...>` |      | One or more glob patterns to exclude from scanning.                          |
| `--no-gitignore`       |      | Ignore `.gitignore` rules (by default, `vuoto` respects `.gitignore`).       |
| `--version`            | `-v` | Output the current version.                                                  |
| `--help`               | `-h` | Display command help and usage instructions.                                 |

---

## 3. Normalized Characters Reference

`vuoto` recognizes and repairs 26+ distinct types of invisible, zero-width, non-breaking, and legacy control whitespace:

| Category            | Character Name                  | Code Point          | Action Taken                           |
| :------------------ | :------------------------------ | :------------------ | :------------------------------------- |
| **Zero-Width**      | Zero-Width Space (ZWSP)         | `U+200B`            | Removed (`""`)                         |
| **Zero-Width**      | Zero-Width Non-Joiner (ZWNJ)    | `U+200C`            | Removed (`""`)                         |
| **Zero-Width**      | Zero-Width Joiner (ZWJ)         | `U+200D`            | Removed (`""`)                         |
| **Zero-Width**      | Word Joiner                     | `U+2060`            | Removed (`""`)                         |
| **BOM**             | Zero-Width No-Break Space / BOM | `U+FEFF`            | Removed (`""`)                         |
| **Non-Breaking**    | Non-Breaking Space (NBSP)       | `U+00A0`            | Converted to standard space (`" "`)    |
| **Non-Breaking**    | Narrow No-Break Space (NNBSP)   | `U+202F`            | Converted to standard space (`" "`)    |
| **Wide Spaces**     | En Quad / Em Quad               | `U+2000`, `U+2001`  | Converted to standard space (`" "`)    |
| **Wide Spaces**     | En Space / Em Space             | `U+2002`, `U+2003`  | Converted to standard space (`" "`)    |
| **Wide Spaces**     | Three / Four / Six-Per-Em       | `U+2004` – `U+2006` | Converted to standard space (`" "`)    |
| **Wide Spaces**     | Figure / Punctuation Space      | `U+2007`, `U+2008`  | Converted to standard space (`" "`)    |
| **Wide Spaces**     | Thin Space / Hair Space         | `U+2009`, `U+200A`  | Converted to standard space (`" "`)    |
| **Wide Spaces**     | Ideographic Space               | `U+3000`            | Converted to standard space (`" "`)    |
| **Wide Spaces**     | Medium Mathematical Space       | `U+205F`            | Converted to standard space (`" "`)    |
| **Separators**      | Line Separator                  | `U+2028`            | Converted to newline (`"\n"`)          |
| **Separators**      | Paragraph Separator             | `U+2029`            | Converted to double newline (`"\n\n"`) |
| **Legacy Controls** | Form Feed                       | `U+000C` (`\f`)     | Converted to newline (`"\n"`)          |
| **Legacy Controls** | Vertical Tab                    | `U+000B` (`\v`)     | Converted to newline (`"\n"`)          |

---

## 4. Configuration & Ignore Rules

### A. `.vuotoignore`

Create a `.vuotoignore` file at your repository root to ignore build directories, lockfiles, minified files, or test fixtures:

```ignore
# Build and package outputs
dist/**
build/**
out/**
.next/**

# Dependencies
node_modules/**

# Minified and binary artifacts
*.min.js
*.min.css

# Lockfiles
pnpm-lock.yaml
package-lock.json
```

Generate this template quickly using:

```bash
pnpm exec vuoto init
```

### B. Gitignore Integration

`vuoto` automatically parses `.gitignore` in the target working directory and applies its ignore patterns. If you need to scan files that are normally gitignored, pass `--no-gitignore`:

```bash
pnpm exec vuoto "dist/**/*.js" --no-gitignore
```

---

## 5. Programmatic API

The `vuoto` package exports a typed TypeScript API for embedded usage in build tools, custom scripts, or test suites.

### Quick Verification & Diagnostics

```typescript
import { hasWhitespaceIssues, findWhitespaceIssues } from 'vuoto';

const sample = 'const token\u200B = "secret\u00A0value";';

// 1. Boolean check
if (hasWhitespaceIssues(sample)) {
  console.log('Problematic whitespace detected!');
}

// 2. Coordinate analysis
const issues = findWhitespaceIssues(sample);
// issues = [
//   { char: '\u200B', codePoint: 'U+200B', name: 'ZERO WIDTH SPACE', index: 11, line: 1, column: 12 },
//   { char: '\u00A0', codePoint: 'U+00A0', name: 'NON-BREAKING SPACE', index: 27, line: 1, column: 28 }
// ]
```

### In-Memory Normalization

```typescript
import { normalize } from 'vuoto';

// Full default normalization
const cleaned = normalize('Hello\u200B \u00A0World!');
// => "Hello  World!"

// Granular option overrides
const custom = normalize(sample, {
  zeroWidth: true, // Strip zero-width spaces
  nonBreakingSpace: false, // Preserve NBSP
  lineSeparator: true, // Convert U+2028 to \n
});
```

### Batch File Processing

```typescript
import { runNormalize } from 'vuoto';

const result = await runNormalize({
  patterns: ['src/**/*.ts', 'content/**/*.md'],
  fix: true,
  verbose: false,
  silent: true,
});

console.log(
  `Scanned ${result.totalFiles} files. Modified: ${result.fixedCount}`
);
```

---

## 6. CI/CD & Automation Recipes

### GitHub Actions Workflow

Add a whitespace hygiene check step to your CI:

```yaml
name: Whitespace Check

on: [push, pull_request]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm exec vuoto --silent
```

### Lefthook Git Hook

Ensure staged files are cleaned before commits:

```yaml
# lefthook.yml
pre-commit:
  commands:
    vuoto-cleanup:
      glob: '*.{js,ts,jsx,tsx,json,md,yml,yaml}'
      run: pnpm exec vuoto --fix {staged_files}
      stage_fixed: true
```

### `package.json` Scripts

```json
{
  "scripts": {
    "whitespace:check": "vuoto --silent",
    "whitespace:fix": "vuoto --fix"
  }
}
```

---

## 7. Troubleshooting & Best Practices

- **Minified Files Causing Noise**: Minified bundles often use special characters intentionally. Ensure `*.min.js` and `dist/**` are included in `.vuotoignore` or `.gitignore`.
- **Pre-commit Hook Performance**: Use `{staged_files}` parameter in Lefthook or lint-staged rather than scanning the entire repo on every commit.
- **Intentional Non-Breaking Spaces in Source Code**: If source files require explicit non-breaking spaces for display text, use HTML entities (`&nbsp;`) or Unicode escape sequences (`\u00A0`) instead of raw invisible characters.
