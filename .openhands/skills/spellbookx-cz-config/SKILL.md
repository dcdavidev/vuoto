---
name: spellbookx-cz-config
description: Sets up and customizes the czg commit prompt with cz-config-spellbookx. Covers installing czg, choosing the config file name and location (root or .config/ with --config), emoji and AI options, monorepo scopes, and the commit scripts. Use it together with spellbookx-commitlint-config, which validates the messages.
---

# Spellbookx cz Skill

This skill guides an AI agent through setting up the interactive commit prompt with **`cz-config-spellbookx`**. Spellbookx writes commit messages with the [czg](https://cz-git.qbb.sh/cli/) CLI, not with Commitizen. The prompt writes Conventional Commits messages that pass the rules of `commitlint-config-spellbookx` (see the `spellbookx-commitlint-config` skill).

---

## 1. What the Preset Provides

`cz-config-spellbookx` exports a czg configuration ([options](https://cz-git.qbb.sh/config/)):

1. **Commit types**: the 11 Conventional Commits types, with an emoji and a description for each (see the table below).
2. **Scopes**: `workspace`, `release`, and every package that `@spellbookx/recipes/git` finds in the workspace globs of `package.json`, `pnpm-workspace.yaml`, and `lerna.json`.
3. **Multiple scopes**: the user can select more than one scope; the prompt joins them with `,`. Scoped packages such as `@spellbookx/recipes` can be combined with other scopes: `commitlint-config-spellbookx` splits scopes only on `,`.
4. **Custom and empty scopes**: allowed, listed at the bottom of the scope list.
5. **Header length**: 72 characters at most, the same limit commitlint enforces.
6. **Body line breaks**: type `|` to start a new line; lines wrap at 100 characters.
7. **Breaking changes**: the prompt asks about them only for `feat` and `fix`.
8. **Alias**: `fd` writes `docs: fix typos`.
9. **Theme**: Spellbookx purple (`THEME_COLOR_CODE`, ANSI `38;5;135`).
10. **Defaults**: `useEmoji: false` and `useAI: false`.

The package exports `config` (also the default export), `prompt` (the same object), `THEME_COLOR_CODE`, and `packageJson`. Subpaths: `cz-config-spellbookx/prompt` and `cz-config-spellbookx/lib`.

---

## 2. Commit Types Reference

These come from `COMMIT_TYPE_DEFINITIONS` in `@spellbookx/recipes/git`, in the order the prompt shows them:

| Type           | Emoji | Description                                                   |
| :------------- | :---: | :------------------------------------------------------------ |
| **`feat`**     |  ✨   | A new feature                                                 |
| **`fix`**      |  🐛   | A bug fix                                                     |
| **`docs`**     |  📖   | Documentation only changes                                    |
| **`style`**    |  🎨   | Changes that do not affect the meaning of the code            |
| **`refactor`** |  🧹   | A code change that neither fixes a bug nor adds a feature     |
| **`perf`**     |  🚀   | A code change that improves performance                       |
| **`test`**     |  🧪   | Adding missing tests or correcting existing tests             |
| **`build`**    |  📦   | Changes that affect the build system or external dependencies |
| **`ci`**       |  🤖   | Changes to our CI configuration files and scripts             |
| **`chore`**    |  ♻️   | Other changes that don't modify src or test files             |
| **`revert`**   |  🔙   | Reverts a previous commit                                     |

---

## 3. Setup

### A. Install

Install `czg` in two places:

- **globally**, so `czg` works in any repository:
  ```bash
  pnpm add -g czg
  # or: npm install -g czg
  ```
- **in the project**, as a devDependency together with the preset, so the scripts and every contributor use the same version:
  ```bash
  pnpm add -D cz-config-spellbookx czg
  ```

The config file imports `definePrompt` from `czg`, so the project needs no other prompt package.

### B. Choose the Config File

Ask the user which file they want. The name decides the location (Spellbookx naming rule):

- **`cz.config.mjs`** (or `.js`, `.cjs`, `.ts`), an official name from the [czg config docs](https://cz-git.qbb.sh/config/): it has `.config.` in the name, so it goes in the **repository root**. czg finds it without flags.
- **`.config/cz.mjs`**: a name that is only the tool name goes in **`.config/`**. czg does not look there, so every script passes `--config=./.config/cz.mjs` (section D). This is the Spellbookx default.

### C. Configuration (`.config/cz.mjs`)

Spread the preset, then override what the project needs:

```javascript
import { config } from 'cz-config-spellbookx';
import { definePrompt } from 'czg';

export default definePrompt({
  ...config,
  useEmoji: true,
});
```

To use the preset unchanged:

```javascript
export { default } from 'cz-config-spellbookx';
```

### D. Scripts in `package.json`

With `.config/cz.mjs`, pass the file with `--config=`. With a root `cz.config.mjs`, drop the flag (`"commit": "pnpm exec czg"`).

> **Write `--config=<path>`, with `=`.** czg 1.14 ignores `--config <path>` with a space and silently falls back to its defaults (no Spellbookx types, scopes, or theme). To check, stage a file and run `pnpm commit`: the type list must show the emoji, for example `feat:     ✨  A new feature`.

```json
{
  "scripts": {
    "commit": "pnpm exec czg --config=./.config/cz.mjs",
    "cz": "pnpm commit",
    "czg": "pnpm commit"
  }
}
```

---

## 4. Common Customizations

All options go in the object passed to `definePrompt`, after `...config`. Reference: [czg options](https://cz-git.qbb.sh/config/).

| Goal                                 | Option                                                  |
| :----------------------------------- | :------------------------------------------------------ |
| Add the emoji to the commit header   | `useEmoji: true`                                        |
| Suggest subjects with OpenAI         | `useAI: true` (set the key with `czg --api-key=<key>`)  |
| Only allow the discovered scopes     | `allowCustomScopes: false`, `allowEmptyScopes: false`   |
| Mark breaking changes with `!`       | `markBreakingChangeMode: true`                          |
| Skip questions                       | `skipQuestions: ['body', 'footerPrefix', 'footer']`     |
| Add aliases (`pnpm commit :<alias>`) | `alias: { ...config.alias, b: 'chore(release): bump' }` |

Keep `types`, `scopes`, and `maxHeaderLength` from the preset: commitlint rejects types, scopes, and headers that do not match them.

---

## 5. Commands

1. **Commit interactively**:
   ```bash
   pnpm commit
   ```
2. **Use an alias**:
   ```bash
   pnpm commit :fd
   ```
3. **Example output**:
   ```text
   feat(eslint-plugin-spellbookx): add the astro flat config
   ```

To validate the messages in a Git hook and in CI, use the `spellbookx-commitlint-config` skill.
