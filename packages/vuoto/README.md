# vuoto

> cut the noise, clean the void—normalize your whitespace

`vuoto` is a CLI tool that finds and fixes invisible or problematic whitespace characters in your files.

## Features

- 🎨 **Enhanced CLI** with Commander.js - Better command parsing and help system
- 🌈 **Colorful Output** with Chalk - Beautiful, readable terminal output
- 📊 **Progress Tracking** - Clear feedback on what's being processed
- 🤫 **Silent Mode** - Quiet operation for CI/CD pipelines
- ⚡ **Fast** - Efficient file processing with fast-glob
- 🎯 **Smart Defaults** - Sensible ignore patterns out of the box
- 📝 **Simple Configuration** - Use `.vuotoignore` file for custom exclusions

## Installation

```bash
npm install -g vuoto
# or
pnpm add -g vuoto
```

You can also run it directly using npx:

```bash
npx vuoto --help
```

## Usage

### CLI

```bash
# Check all files in current directory
vuoto

# Fix whitespace issues
vuoto --fix

# Check specific patterns
vuoto "src/**/*.ts" --fix

# Exclude specific patterns
vuoto --fix --exclude "**/*.min.js"

# Verbose output
vuoto --verbose --fix
```

### Programmatic API

```typescript
import { normalize, runNormalize } from 'vuoto';

// Normalize a string
const clean = normalize('Hello\u00A0World'); // "Hello World"

// Process files
await runNormalize({
  patterns: ['src/**/*.ts'],
  fix: true,
  verbose: true,
});
```

## Configuration

Create a `.vuotoignore` file in your project root to exclude files (similar to `.gitignore`):

```ignore
# Build outputs
dist/**
build/**

# Dependencies
node_modules/**

# Minified files
*.min.js

# Lock files
pnpm-lock.yaml
```

## What it Normalizes

- ✓ **Zero-width characters** (U+200B, U+200C, U+200D)
- ✓ **Byte order marks** (U+FEFF)
- ✓ **Non-breaking spaces** (U+00A0, U+202F)
- ✓ **Line/paragraph separators** (U+2028, U+2029)
- ✓ **Em/en spaces** (U+2003, U+2002)
- ✓ **Ideographic spaces** (U+3000)
- ✓ **Form feeds and vertical tabs**

## Building

Run `pnpm run build` in the package directory or `turbo run build --filter=vuoto` from the root.

---

## License

This project is licensed under the MIT License.

**Copyright (c) 2026 Davide Di Criscito**

For the full details, see the [LICENSE](./LICENSE) file.
