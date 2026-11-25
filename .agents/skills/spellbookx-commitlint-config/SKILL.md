---
name: spellbookx-commitlint-config
description: Enforces Conventional Commits with commitlint-config-spellbookx. Covers the rules, monorepo scope discovery, the .config/commitlint.mjs file, the lint:commits script, the Lefthook commit-msg hook, and the CI check. For the interactive commit prompt, use spellbookx-cz-config.
---

# Spellbookx Commitlint Skill

This skill guides an AI agent through setting up and validating commit messages with **`commitlint-config-spellbookx`**. For the interactive prompt that writes the messages (`pnpm commit`), use the `spellbookx-cz-config` skill.

---

## 1. Rules

`commitlint-config-spellbookx` extends `@commitlint/config-conventional`, parses with `conventional-changelog-conventionalcommits`, and adds these rules (all errors):

| Rule                     | Value                                                                          |
| :----------------------- | :----------------------------------------------------------------------------- |
| `type-enum`              | The 11 types listed below                                                      |
| `scope-enum`             | `workspace`, `release`, and the discovered packages; only `,` separates scopes |
| `subject-empty`          | The subject is required                                                        |
| `subject-full-stop`      | The subject must not end with `.`                                              |
| `header-max-length`      | 72 characters                                                                  |
| `body-max-line-length`   | 100 characters                                                                 |
| `footer-max-line-length` | 100 characters                                                                 |

**Scopes**: `@spellbookx/recipes/git` finds the Git root and reads the package names from the workspace globs in `package.json` (`workspaces`), `pnpm-workspace.yaml` (`packages`), and `lerna.json` (`packages`). Two scopes are always allowed:

- `workspace`: root-level changes (configs, CI, monorepo maintenance).
- `release`: version bumps and changelogs.

The scope is optional, but when present it must be one of these. Separate multiple scopes with `,` (a space after it is allowed), for example `fix(cspell-config-spellbookx,@spellbookx/recipes): …`. Only `,` is a separator: the `/` in a scoped package name such as `@spellbookx/recipes` is part of the name. Outside a Git repository, only `workspace` and `release` are allowed.

The package exports `config` (also the default export), `rules`, `prompt`, and `packageJson`. Subpaths: `commitlint-config-spellbookx/rules` and `commitlint-config-spellbookx/prompt`. `prompt` is the commitlint prompt configuration (`@commitlint/prompt-cli`); for czg, use `cz-config-spellbookx`.

---

## 2. Commit Types

| Type           | Use for                                                       |
| :------------- | :------------------------------------------------------------ |
| **`feat`**     | A new feature                                                 |
| **`fix`**      | A bug fix                                                     |
| **`docs`**     | Documentation only changes                                    |
| **`style`**    | Changes that do not affect the meaning of the code            |
| **`refactor`** | A code change that neither fixes a bug nor adds a feature     |
| **`perf`**     | A code change that improves performance                       |
| **`test`**     | Adding missing tests or correcting existing tests             |
| **`build`**    | Changes that affect the build system or external dependencies |
| **`ci`**       | Changes to the CI configuration files and scripts             |
| **`chore`**    | Other changes that don't modify src or test files             |
| **`revert`**   | Reverts a previous commit                                     |

---

## 3. Setup

### A. Install

```bash
pnpm add -D commitlint-config-spellbookx @commitlint/cli
```

### B. Configuration (`.config/commitlint.mjs`)

Ask the user which file they want. The name decides the location (Spellbookx naming rule):

- **`commitlint.config.mjs`**, an official name from the [commitlint docs](https://commitlint.js.org/reference/configuration.html): it has `.config.` in the name, so it goes in the **repository root**, and commitlint finds it without flags.
- **`.config/commitlint.mjs`**: a name that is only the tool name goes in **`.config/`**, and every command passes `--config ./.config/commitlint.mjs`. This is the Spellbookx default, used below.

```javascript
export { default } from 'commitlint-config-spellbookx';
```

To change a rule, spread the preset:

```javascript
import config from 'commitlint-config-spellbookx';

export default {
  ...config,
  rules: {
    ...config.rules,
    'header-max-length': [2, 'always', 100],
  },
};
```

commitlint does not look for `commitlint.mjs` in `.config/`, so every command below passes it with `--config`.

### C. Script in `package.json`

```json
{
  "scripts": {
    "lint:commits": "commitlint --config ./.config/commitlint.mjs --from=HEAD~1 --verbose"
  }
}
```

### D. Git Hook (`.config/lefthook.yml`)

Lefthook finds `.config/lefthook.yml` on its own:

```yaml
commit-msg:
  jobs:
    - name: commitlint
      run: pnpm exec commitlint --config ./.config/commitlint.mjs --edit {1} --verbose
      fail_text: 'Use Conventional Commits, for example "feat(cspell): add a word list". Run "pnpm commit" for a guided prompt.'
```

### E. CI (GitHub Actions)

Check every commit of a pull request. The checkout needs the full history:

```yaml
- uses: actions/checkout@v4
  with:
    fetch-depth: 0

# ... install dependencies ...

- name: Commit messages
  if: github.event_name == 'pull_request'
  run: >-
    pnpm exec commitlint
    --config ./.config/commitlint.mjs
    --from ${{ github.event.pull_request.base.sha }}
    --to ${{ github.event.pull_request.head.sha }}
    --verbose
```

---

## 4. Commands

1. **Check the last commit**:
   ```bash
   pnpm lint:commits
   ```
2. **Check a message before committing**:
   ```bash
   echo "feat(workspace): add lefthook" | pnpm exec commitlint --config ./.config/commitlint.mjs
   ```
3. **Valid examples**:
   ```text
   feat(eslint-plugin-spellbookx): add the astro flat config
   fix(@spellbookx/recipes): ignore bun.lock
   fix(cspell-config-spellbookx,@spellbookx/recipes): share ignore globs
   chore(release): bump to v1.4.0
   docs: fix typos
   ```
