# eslint-plugin-vuoto

> ESLint plugin for detecting and fixing whitespace issues - zero-width characters, non-breaking spaces, and Unicode normalization

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [Flat Config (ESLint 9+)](#flat-config-eslint-9)
  - [Configuration Presets](#configuration-presets)
- [Rules](#rules)
  - [Zero-Width Characters](#zero-width-characters)
  - [Invisible Separators](#invisible-separators)
  - [Visible Whitespace](#visible-whitespace)
  - [Control Characters](#control-characters)
- [Building](#building)
- [License](#license)

## Features

- ✅ **13 specialized rules** for whitespace normalization
- 🔧 **Auto-fix support** for all rules
- 📦 **4 preset configurations** (recommended, strict, all, off)
- 🎯 **ESLint 9+ flat config** support
- 🚀 **Zero dependencies** (except peer dependency on ESLint)
- 📝 **TypeScript support** with full type definitions

## Installation

```bash
npm install --save-dev eslint-plugin-vuoto
# or
yarn add -D eslint-plugin-vuoto
# or
pnpm add -D eslint-plugin-vuoto
```

## Usage

### Flat Config (ESLint 9+)

```javascript
// eslint.config.js
import vuoto from 'eslint-plugin-vuoto';

export default [
  {
    plugins: {
      vuoto,
    },
    rules: {
      ...vuoto.configs.recommended[0].rules,
    },
  },
];
```

### Configuration Presets

The plugin provides four preset configurations:

#### `recommended`

The default configuration with all rules set to `error`. Suitable for most projects.

```javascript
import vuoto from 'eslint-plugin-vuoto';

export default [
  {
    plugins: { vuoto },
    rules: {
      ...vuoto.configs.recommended[0].rules,
    },
  },
];
```

#### `strict`

Same as recommended (all rules as errors). Use for maximum strictness.

```javascript
rules: {
  ...vuoto.configs.strict[0].rules,
}
```

#### `all`

Enable all available rules.

```javascript
rules: {
  ...vuoto.configs.all[0].rules,
}
```

#### `off`

Disable all rules (useful for gradual adoption).

```javascript
rules: {
  ...vuoto.configs.off[0].rules,
}
```

## Rules

All rules support auto-fixing and are enabled by default in the recommended config.

### Zero-Width Characters

| Rule               | Description                                             | Fixable |
| ------------------ | ------------------------------------------------------- | ------- |
| `vuoto/zero-width` | Detects zero-width characters (ZWSP, ZWNJ, ZWJ, ZWNBSP) | ✅      |

### Invisible Separators

| Rule                         | Description                                  | Fixable |
| ---------------------------- | -------------------------------------------- | ------- |
| `vuoto/invisible-separators` | Detects invisible separator characters       | ✅      |
| `vuoto/line-separator`       | Detects Unicode line separator (U+2028)      | ✅      |
| `vuoto/paragraph-separator`  | Detects Unicode paragraph separator (U+2029) | ✅      |

### Visible Whitespace

| Rule                          | Description                             | Fixable |
| ----------------------------- | --------------------------------------- | ------- |
| `vuoto/non-breaking-space`    | Detects non-breaking spaces (U+00A0)    | ✅      |
| `vuoto/narrow-no-break-space` | Detects narrow no-break spaces (U+202F) | ✅      |
| `vuoto/em-space`              | Detects em spaces (U+2003)              | ✅      |
| `vuoto/en-space`              | Detects en spaces (U+2002)              | ✅      |
| `vuoto/ideographic-space`     | Detects ideographic spaces (U+3000)     | ✅      |
| `vuoto/visible-misc-spaces`   | Detects other visible Unicode spaces    | ✅      |

### Control Characters

| Rule                    | Description                              | Fixable |
| ----------------------- | ---------------------------------------- | ------- |
| `vuoto/byte-order-mark` | Detects byte order mark (BOM) characters | ✅      |
| `vuoto/form-feed`       | Detects form feed characters (U+000C)    | ✅      |
| `vuoto/vertical-tab`    | Detects vertical tab characters (U+000B) | ✅      |

## Building

Run `nx build eslint-plugin-vuoto` to build the library.

---

## License

This project is licensed under the MIT License.

**Copyright (c) 2025 Davide Di Criscito**

For the full details, see the [LICENSE](./LICENSE) file.
