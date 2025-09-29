<p align="center">
  <img alt="vuoto" src="./vuoto-ext.png" />
</p>

**vuoto** is a tool that normalizes whitespace and removes invisible or irregular characters from your project files.

Its goal is to keep code and text files **clean, readable, and consistent**, avoiding bugs or errors caused by unexpected spaces or hidden Unicode characters.

---

## ✨ Features

- 🔍 **Detects** irregular whitespace (`no-irregular-whitespace`).
- 🧹 **Normalizes** spaces, tabs, and newlines.
- 📦 Works both as a **CLI** and a **library**.

---

## 📦 Installation

Using **npm**:

```sh
npm install -D @dcdavidev/vuoto
```

Using **pnpm**:

```sh
pnpm add -D @dcdavidev/vuoto
```

Using **yarn**:

```sh
yarn add -D @dcdavidev/vuoto
```

---

## 🚀 Usage

### CLI

```sh
# Check files and folders
vuoto src/

# Automatically fix files
vuoto --fix src/
```

Common options:

- `--fix` → apply automatic fixes
- `--exclude` → exclude specific patterns

### Configuration

Create a `vuoto.config.js` file in your project root:

```js
export default {
  exclude: ['**/node_modules/**', '**/dist/**', '**/*.png', '**/*.jpg'],
};
```

---

## 📄 License

**VUOTO** is licensed under the _MIT License_.
