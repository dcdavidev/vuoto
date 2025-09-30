<p align='center'>
  <img alt='vuoto' src='./vuoto-ext.png' />
</p>

# eslint-plugin-vuoto

`eslint-plugin-vuoto` is an ESLint plugin that helps you normalize and detect irregular or invisible whitespace characters in your code.

It complements existing linting setups by enforcing clean, predictable whitespace rules and preventing hidden characters from sneaking into your files.

---

## ✨ Features

- Detects and fixes problematic whitespace such as:
  - Byte Order Mark (BOM)
  - Zero-width spaces
  - Non-breaking spaces
  - Form feed, vertical tab, and line/paragraph separators
  - Unicode spaces (e.g., `em-space`, `en-space`, `ideographic-space`)
- Provides multiple configuration presets (`recommended`, `strict`, `all`, `off`).
- Automatically fixable with `--fix`.

---

## 📦 Installation

```bash
npm install --save-dev eslint-plugin-vuoto
```

---

## ⚙️ Usage

Add `vuoto` to your ESLint configuration:

### Basic example

```jsonc
{
  "plugins": ["vuoto"],
  "extends": ["plugin:vuoto/recommended"],
}
```

### Available configs

- **`plugin:vuoto/recommended`**
  Enables the core rules for common whitespace issues.

- **`plugin:vuoto/strict`**
  Same as `recommended`, but designed for extension with stricter checks in future versions.

- **`plugin:vuoto/all`**
  Enables all whitespace rules.

- **`plugin:vuoto/off`**
  Disables all vuoto rules.

---

## 🔧 Rules

| Rule                          | Description                                                                                | Fixable |
| ----------------------------- | ------------------------------------------------------------------------------------------ | ------- |
| `vuoto/byte-order-mark`       | Disallow the Unicode Byte Order Mark (`U+FEFF`) at the start of files.                     | ✅      |
| `vuoto/em-space`              | Disallow the em-space character (`U+2003`).                                                | ✅      |
| `vuoto/en-space`              | Disallow the en-space character (`U+2002`).                                                | ✅      |
| `vuoto/form-feed`             | Disallow the form feed control character (`U+000C`).                                       | ✅      |
| `vuoto/ideographic-space`     | Disallow the ideographic space (`U+3000`).                                                 | ✅      |
| `vuoto/invisible-separators`  | Disallow invisible separator characters (e.g., `U+2063`).                                  | ✅      |
| `vuoto/line-separator`        | Disallow the line separator (`U+2028`).                                                    | ✅      |
| `vuoto/narrow-no-break-space` | Disallow the narrow no-break space (`U+202F`).                                             | ✅      |
| `vuoto/non-breaking-space`    | Disallow the non-breaking space (`U+00A0`).                                                | ✅      |
| `vuoto/paragraph-separator`   | Disallow the paragraph separator (`U+2029`).                                               | ✅      |
| `vuoto/vertical-tab`          | Disallow the vertical tab control character (`U+000B`).                                    | ✅      |
| `vuoto/visible-misc-spaces`   | Disallow miscellaneous visible space characters that are rarely intended (e.g., `U+2423`). | ✅      |
| `vuoto/zero-width`            | Disallow zero-width characters (`U+200B`, `U+200C`, `U+200D`, `U+FEFF`).                   | ✅      |

All rules are fixable with ESLint's `--fix` option.

You can enable rules individually:

```jsonc
{
  "rules": {
    "vuoto/zero-width": "error",
    "vuoto/non-breaking-space": "warn",
  },
}
```

---

## ▶️ Example

Input file:

```js
const message = 'Hello\u00A0World'; // contains a non-breaking space (U+00A0)
```

Run ESLint with `eslint-plugin-vuoto`:

```bash
npx eslint . --ext .js --fix
```

Output after autofix:

```js
const message = 'Hello World';
```

---

## 📖 License

**eslint-plugin-vuoto** is licensede under the [MIT License](./LICENSE).
