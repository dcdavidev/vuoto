<p align="center">
  <img src="gh-banner.png" alt="vuoto banner" width="100%">
</p>

# vuoto

> cut the noise, clean the void—normalize your whitespace

`vuoto` is a modern whitespace normalizer and ESLint plugin designed to detect and fix invisible, ambiguous, or problematic Unicode whitespace characters that can cause issues in codebases, data processing, and terminal output.

## Features

- 🎯 **Whitespace Normalization**: Detects and fixes 13+ types of problematic characters (Zero-width, NBSP, BOM, etc.)
- 🚀 **ESLint Plugin**: Includes `eslint-plugin-vuoto` for real-time linting and auto-fixing.
- 🌈 **Beautiful CLI**: Enhanced terminal output with progress tracking and detailed reporting.
- 🤖 **AI Agent Skills**: Built-in `.agents/skills` enabling AI coding assistants to automatically detect, diagnose, and clean invisible whitespace.
- ⚡ **Turbo Powered**: Built as a monorepo for maximum performance and reliability.
- 🔧 **Highly Configurable**: Supports `.vuotoignore` for custom exclusions.

## Packages

| Package                                                 | Description                               | Version                                                                                                                   |
| ------------------------------------------------------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| [`vuoto`](./packages/vuoto)                             | Core CLI and normalization engine         | [![npm version](https://img.shields.io/npm/v/vuoto.svg)](https://www.npmjs.com/package/vuoto)                             |
| [`eslint-plugin-vuoto`](./packages/eslint-plugin-vuoto) | ESLint rules for whitespace normalization | [![npm version](https://img.shields.io/npm/v/eslint-plugin-vuoto.svg)](https://www.npmjs.com/package/eslint-plugin-vuoto) |

## Quick Start

### CLI

```bash
npx vuoto --fix
```

### ESLint

```javascript
// eslint.config.js
import vuoto from 'eslint-plugin-vuoto';

export default [...vuoto.configs.recommended];
```

## What it Normalizes

- ✓ **Zero-width characters**: ZWSP, ZWNJ, ZWJ, ZWNBSP
- ✓ **Invisible separators**: Word Joiner, BOM
- ✓ **Non-breaking spaces**: NBSP, NNBSP
- ✓ **Legacy controls**: Form Feed, Vertical Tab
- ✓ **Unicode separators**: Line/Paragraph separators (U+2028, U+2029)
- ✓ **Wide spaces**: Em/En spaces, Ideographic space

## AI Agent Skills

`vuoto` includes official agent skills conforming to the open [Agent Skills specification](https://github.com/vercel-labs/skills). These skills enable AI coding assistants (such as Antigravity, Cursor, GitHub Copilot, Claude Code, Cline, Windsurf, Zed, and Warp) to automatically detect, diagnose, and repair invisible whitespace, Trojan Source artifacts, and configure ESLint rules without prompt engineering.

### Available Skills

| Skill                     | Description                                                                                                                                                                                                                    | Location                                                                              |
| :------------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------ |
| **`vuoto`**               | Guided detection, diagnosis, and cleanup of invisible, zero-width, non-breaking, and irregular Unicode whitespace via CLI and programmatic API. Covers `.vuotoignore`, git integration, CI/CD pipelines, and pre-commit hooks. | [`.agents/skills/vuoto`](./.agents/skills/vuoto/SKILL.md)                             |
| **`eslint-plugin-vuoto`** | Real-time ESLint 9+ flat config integration, all 13 whitespace rules, presets (`recommended`, `strict`, `all`, `off`), and granular AST skip options (`skipComments`, `skipStrings`, `skipTemplates`, `skipJSXText`).          | [`.agents/skills/eslint-plugin-vuoto`](./.agents/skills/eslint-plugin-vuoto/SKILL.md) |

### Installation

Install `vuoto` skills into your project using the `skills` CLI:

```bash
# Add all vuoto skills to your project
npx skills add dcdavidev/vuoto

# Or install a specific skill:
npx skills add dcdavidev/vuoto --skill vuoto
npx skills add dcdavidev/vuoto --skill eslint-plugin-vuoto

# Or install globally for your personal AI assistant across all workspaces:
npx skills add -g dcdavidev/vuoto
```

#### Manual Installation

You can also copy the skills directly into any project's `.agents/skills` directory:

```bash
mkdir -p .agents/skills
git clone --depth 1 https://github.com/dcdavidev/vuoto.git /tmp/vuoto
cp -r /tmp/vuoto/.agents/skills/vuoto /tmp/vuoto/.agents/skills/eslint-plugin-vuoto .agents/skills/
rm -rf /tmp/vuoto
```

### Usage with AI Assistants

Once installed, your AI coding assistant automatically discovers and activates the skills when relevant. You can also trigger them directly with natural language instructions:

- _"Scan the entire repository for invisible Unicode whitespace using the `vuoto` skill."_
- _"Set up a pre-commit hook in Lefthook to auto-fix whitespace on staged files with `vuoto`."_
- _"Configure `eslint-plugin-vuoto` in my `eslint.config.mjs` and allow non-breaking spaces in JSX text."_
- _"Diagnose and normalize zero-width characters in this file using the `vuoto` skill."_
- _"Audit my codebase for Trojan Source or hidden Unicode control characters."_

## License

This project is licensed under the MIT License.

**Copyright (c) 2026 Davide Di Criscito**

For the full details, see the [LICENSE](LICENSE) file.
