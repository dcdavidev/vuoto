---
name: spellbookx-commitlint
description: Configures Conventional Commits enforcement and interactive cz-git commit prompts with commitlint-config-spellbookx. Covers dynamic monorepo scope detection, custom types, and git hooks.
---

# Spellbookx Commitlint Skill

This skill guides an AI agent through setting up, configuring, and validating commit message hygiene using **`commitlint-config-spellbookx`**.

---

## 1. Features & Rules

`commitlint-config-spellbookx` enforces strict [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) with out-of-the-box monorepo awareness:

1. **Header Max Length**: 72 characters.
2. **Body & Footer Line Length**: 100 characters max per line.
3. **No Trailing Periods**: Header subjects must not end with `.`.
4. **Dynamic Monorepo Scopes**: Automatically discovers all package names from `pnpm-workspace.yaml`, `package.json`, and `lerna.json`.
5. **Standard Built-in Scopes**:
   - `workspace`: Used for root-level changes (configs, CI, monorepo maintenance).
   - `release`: Used for version bump and changelog commits.
6. **Interactive `cz-git` Prompt**: Out-of-the-box Commitizen configuration with emojis and descriptions.

---

## 2. Commit Types Reference

| Type           | Emoji | Purpose                                                   |
| :------------- | :---: | :-------------------------------------------------------- |
| **`feat`**     |  ✨   | New feature or functionality                              |
| **`fix`**      |  🐛   | Bug fix                                                   |
| **`docs`**     |  📚   | Documentation updates                                     |
| **`style`**    |  💎   | Code style, formatting, whitespace (no functional change) |
| **`refactor`** |  📦   | Code change that neither fixes a bug nor adds a feature   |
| **`perf`**     |  🚀   | Performance improvement                                   |
| **`test`**     |  🚨   | Adding or updating unit/integration tests                 |
| **`build`**    |  🛠   | Build system or dependency updates                        |
| **`ci`**       |  ⚙️   | Continuous integration and deployment scripts             |
| **`chore`**    |  ♻️   | General maintenance or housekeeping                       |
| **`revert`**   |  🗑   | Reverting a previous commit                               |

---

## 3. Setup Recipes

### A. Commitlint Configuration (`commitlint.config.mjs`)

```javascript
export { default } from 'commitlint-config-spellbookx';
```

### B. Commitizen Setup in `package.json`

```json
{
  "scripts": {
    "commit": "cz",
    "commit:lint": "commitlint --from=HEAD~1"
  },
  "config": {
    "commitizen": {
      "path": "cz-git"
    }
  }
}
```

### C. Git Hook via Lefthook (`lefthook.yml`)

```yaml
commit-msg:
  commands:
    commitlint:
      run: pnpm exec commitlint --edit {1}
```

---

## 4. Best Practices & Commands

1. **Creating commits interactively**:
   ```bash
   pnpm run commit
   ```
2. **Validating recent commits in CI**:
   ```bash
   pnpm exec commitlint --from=HEAD~1
   ```
3. **Format example**:
   ```text
   feat(eslint-plugin-spellbookx): add support for astro flat config
   ```
