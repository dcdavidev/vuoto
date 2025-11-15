# vuoto

cut the noise, clean the void—normalize your whitespace

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [CLI](#cli)
  - [Programmatic API](#programmatic-api)
- [Configuration](#configuration)
- [What it Normalizes](#what-it-normalizes)
- [Enhancements over Legacy Package](#enhancements-over-legacy-package)
- [Building](#building)
- [License](#license)

## Features

- 🎨 **Enhanced CLI** with Commander.js - Better command parsing and help system
- 🌈 **Colorful Output** with Chalk - Beautiful, readable terminal output
- 📊 **Progress Tracking** - Clear feedback on what's being processed
- 🔍 **Verbose Mode** - Detailed logging for debugging
- 🤫 **Silent Mode** - Quiet operation for CI/CD pipelines
- ⚡ **Fast** - Efficient file processing with fast-glob
- 🎯 **Smart Defaults** - Sensible ignore patterns out of the box
- 📝 **Simple Configuration** - Use `.vuotoignore` file for custom exclusions

## Installation

```bash
pnpm install
```

## Usage

### CLI

```bash
# Check all files
vuoto

# Fix whitespace issues
vuoto --fix

# Check specific patterns
vuoto "src/**/*.ts" --fix

# Exclude specific patterns
vuoto --fix --exclude "**/*.min.js"

# Verbose output
vuoto --verbose --fix

# Silent mode (for CI)
vuoto --silent --fix
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

```properties
# Build outputs
dist/** =
build/** =
.next/** =

# Dependencies
node_modules/** =

# Minified files
*.min.js =
*.min.css =

# Lock files
package-lock.json =
pnpm-lock.yaml =
```

You can also use the `--exclude` flag to exclude patterns on the fly:

```bash
vuoto --fix --exclude "**/*.test.ts" "**/*.spec.ts"
```

## What it Normalizes

- ✓ Zero-width characters (U+200B, U+200C, U+200D)
- ✓ Byte order marks (U+FEFF)
- ✓ Non-breaking spaces (U+00A0, U+202F)
- ✓ Line/paragraph separators (U+2028, U+2029)
- ✓ Em/en spaces (U+2003, U+2002)
- ✓ Ideographic spaces (U+3000)
- ✓ Form feeds and vertical tabs
- ✓ Various Unicode space characters

## Enhancements over Legacy Package

1. **Better CLI Experience** - Commander.js provides better argument parsing and help
2. **Visual Feedback** - Chalk colors make output clear and professional
3. **Improved Output** - Summary statistics and progress indicators
4. **Simpler Configuration** - Just use `.vuotoignore` file instead of JavaScript config
5. **Type Safety** - Full TypeScript support with proper types
6. **Modern APIs** - Uses latest Node.js and npm package features

## Building

Run `nx build vuoto` to build the library.

---

## License

This project is licensed under the MIT License.

**Copyright (c) 2025 Davide Di Criscito**

For the full details, see the [LICENSE](./LICENSE) file.
