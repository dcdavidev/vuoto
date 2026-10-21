# vuoto

> Cut the noise, clean the void — modern, high-performance whitespace normalizer and diagnostics tool.

[![npm version](https://img.shields.io/npm/v/vuoto.svg?style=flat-square)](https://www.npmjs.com/package/vuoto)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18-brightgreen.svg?style=flat-square)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg?style=flat-square)](https://www.typescriptlang.org)

`vuoto` detects, diagnoses, and repairs invisible, ambiguous, and problematic Unicode whitespace characters across codebases and text files.

Invisible zero-width characters, non-breaking spaces, legacy line separators, and unexpected BOM headers silently break compilers, parsers, Git diffs, terminal outputs, and text searches. `vuoto` cleans the void quickly and safely.

---

## Features

- 🎯 **Deep Unicode Normalization** — Detects and fixes 26+ distinct types of invisible, zero-width, non-breaking, and legacy control whitespace.
- 🔍 **Detailed Diagnostics** — Pinpoints exact line and column coordinates alongside Unicode code points and human-readable character names.
- ⚡ **High Performance** — Fast batch file scanning powered by `fast-glob` with smart caching and binary file filtering.
- 🛡️ **Smart Ignore Resolution** — Built-in ignore rules, `.vuotoignore` configuration, and automatic `.gitignore` discovery.
- 🎨 **Enhanced Terminal UX** — Beautiful, informative colored terminal reports with verbose drill-downs and quiet CI mode.
- 🧩 **Comprehensive Programmatic API** — Pure TypeScript module with first-class type definitions for string normalization, detection, and file batch processing.

---

## Quick Start

Run instantly without installing:

```bash
# Check current directory for whitespace issues
npx vuoto

# Automatically fix all whitespace issues
npx vuoto --fix
```

### Installation

```bash
# Locally in your project (recommended)
pnpm add -D vuoto
# or
npm install --save-dev vuoto

# Globally as a standalone CLI
pnpm add -g vuoto
# or
npm install -g vuoto
```

---

## CLI Usage

```text
Usage: vuoto [options] [command] [patterns...]

Arguments:
  patterns              files or globs to normalize (default: .)

Options:
  -v, --version         output the current version
  -h, --help            display help for command
  --fix                 apply fixes directly to files
  -c, --check           check files without modifying them (default)
  --exclude <globs...>  glob patterns to exclude
  --no-gitignore        skip reading ignore patterns from .gitignore
  --verbose             show detailed output with line/col coordinates
  --silent              suppress all output except fatal errors

Commands:
  init [options]        scaffold a .vuotoignore file with smart defaults
```

### Examples

```bash
# Check all files in the current repository
vuoto

# Fix all files in the repository
vuoto --fix

# Check specific files or globs
vuoto "src/**/*.ts" "docs/**/*.md"

# Run in check mode with detailed coordinate diagnostics
vuoto --verbose

# Fix source files while excluding fixtures and minified assets
vuoto "src/**" --fix --exclude "**/fixtures/**" "**/*.min.js"

# Run silently in CI scripts (exits with code 1 if issues exist)
vuoto --silent

# Generate a .vuotoignore file
vuoto init
```

---

## What `vuoto` Normalizes

| Category            | Character Name                          | Unicode Code Point  | Normalization Action                   |
| :------------------ | :-------------------------------------- | :------------------ | :------------------------------------- |
| **Zero-Width**      | Zero-Width Space (ZWSP)                 | `U+200B`            | Removed (`""`)                         |
| **Zero-Width**      | Zero-Width Non-Joiner (ZWNJ)            | `U+200C`            | Removed (`""`)                         |
| **Zero-Width**      | Zero-Width Joiner (ZWJ)                 | `U+200D`            | Removed (`""`)                         |
| **Zero-Width**      | Word Joiner                             | `U+2060`            | Removed (`""`)                         |
| **BOM**             | Zero-Width No-Break Space / BOM         | `U+FEFF`            | Removed (`""`)                         |
| **Non-Breaking**    | Non-Breaking Space (NBSP)               | `U+00A0`            | Converted to space (`" "`)             |
| **Non-Breaking**    | Narrow No-Break Space (NNBSP)           | `U+202F`            | Converted to space (`" "`)             |
| **Wide Spaces**     | En Quad / Em Quad                       | `U+2000`, `U+2001`  | Converted to space (`" "`)             |
| **Wide Spaces**     | En Space / Em Space                     | `U+2002`, `U+2003`  | Converted to space (`" "`)             |
| **Wide Spaces**     | Three-Per-Em / Four-Per-Em / Six-Per-Em | `U+2004` – `U+2006` | Converted to space (`" "`)             |
| **Wide Spaces**     | Figure Space / Punctuation Space        | `U+2007`, `U+2008`  | Converted to space (`" "`)             |
| **Wide Spaces**     | Thin Space / Hair Space                 | `U+2009`, `U+200A`  | Converted to space (`" "`)             |
| **Wide Spaces**     | Ideographic Space                       | `U+3000`            | Converted to space (`" "`)             |
| **Wide Spaces**     | Medium Mathematical Space               | `U+205F`            | Converted to space (`" "`)             |
| **Separators**      | Line Separator                          | `U+2028`            | Converted to newline (`"\n"`)          |
| **Separators**      | Paragraph Separator                     | `U+2029`            | Converted to double newline (`"\n\n"`) |
| **Legacy Controls** | Form Feed                               | `U+000C` (`\f`)     | Converted to newline (`"\n"`)          |
| **Legacy Controls** | Vertical Tab                            | `U+000B` (`\v`)     | Converted to newline (`"\n"`)          |

---

## Configuration

### `.vuotoignore`

Create a `.vuotoignore` file in your repository root to ignore specific paths (using standard Git ignore syntax).

Generate a configuration file automatically:

```bash
vuoto init
```

Example `.vuotoignore`:

```ignore
# Build and bundle outputs
dist/**
build/**
.next/**
out/**

# Dependencies
node_modules/**

# Minified and binary files
*.min.js
*.min.css

# Lockfiles
pnpm-lock.yaml
package-lock.json
```

### Git Integration

`vuoto` automatically reads your root `.gitignore` file and includes its patterns in addition to built-in ignores and `.vuotoignore`. To disable `.gitignore` resolution, pass `--no-gitignore`.

---

## Programmatic API

`vuoto` provides a modular API for string normalization, diagnostics, and file processing.

### `normalize(input, options?)`

Normalizes a string by transforming or removing all problematic whitespace characters.

```typescript
import { normalize } from 'vuoto';

// Standard normalization
const clean = normalize('Hello\u200B \u00A0World!');
// => "Hello  World!"

// Granular control via options
const custom = normalize(input, {
  zeroWidth: true,
  nonBreakingSpace: false, // Keep NBSP intact
  lineSeparator: true,
});
```

### `hasWhitespaceIssues(input)`

Quick boolean check to see if a string contains any unsupported or problematic whitespace.

```typescript
import { hasWhitespaceIssues } from 'vuoto';

if (hasWhitespaceIssues(sourceCode)) {
  console.log('Whitespace issues detected!');
}
```

### `findWhitespaceIssues(input)`

Analyzes a string and returns detailed coordinate information for every problematic whitespace character found.

```typescript
import { findWhitespaceIssues } from 'vuoto';

const issues = findWhitespaceIssues('const x\u200B = 1;\nconst y\u00A0= 2;');

console.log(issues);
/*
[
  {
    char: '\u200B',
    codePoint: 'U+200B',
    name: 'ZERO WIDTH SPACE',
    index: 7,
    line: 1,
    column: 8
  },
  {
    char: '\u00A0',
    codePoint: 'U+00A0',
    name: 'NON-BREAKING SPACE',
    index: 23,
    line: 2,
    column: 8
  }
]
*/
```

### `runNormalize(options)`

Programmatically scan and fix files across a directory.

```typescript
import { runNormalize } from 'vuoto';

const result = await runNormalize({
  patterns: ['src/**/*.ts', 'docs/**/*.md'],
  fix: true,
  verbose: true,
});

console.log(`Total files scanned: ${result.totalFiles}`);
console.log(`Files fixed: ${result.fixedCount}`);
console.log(`Has remaining issues: ${result.hasIssues}`);
```

### `initConfig(cwd?, options?)`

Scaffold a `.vuotoignore` configuration file programmatically.

```typescript
import { initConfig } from 'vuoto';

const { created, path } = await initConfig(process.cwd(), { force: false });
```

---

## CI / CD Integration

Add `vuoto` to your CI pipeline or Git pre-commit hooks to prevent invisible characters from ever being committed.

### GitHub Actions

```yaml
name: Verify Whitespace

on: [push, pull_request]

jobs:
  lint-whitespace:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 24
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm exec vuoto --silent
```

### Lefthook / Pre-commit

```yaml
# lefthook.yml
pre-commit:
  commands:
    whitespace:
      glob: '*.{js,ts,jsx,tsx,json,md,yml,yaml}'
      run: pnpm exec vuoto --fix {staged_files}
      stage_fixed: true
```

---

## Ecosystem

- [`eslint-plugin-vuoto`](https://www.npmjs.com/package/eslint-plugin-vuoto) — Official ESLint rules and automatic fixes for whitespace hygiene in JavaScript and TypeScript.

---

## License

[MIT](./LICENSE) © [Davide Di Criscito](https://github.com/dcdavidev)
