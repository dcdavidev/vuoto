# Commit Message Style

This guide explains how to write commit messages for the Vuoto monorepo. Every commit message must follow the [Conventional Commits](https://www.conventionalcommits.org/) specification. Validation rules come from `commitlint-config-spellbookx` ([`commitlint.config.mjs`](../../commitlint.config.mjs)), and the interactive prompt comes from `cz-config-spellbookx` ([`cz.config.mjs`](../../cz.config.mjs)). Both share the same commit types and dynamically discovered workspace scopes.

## Use the `czg` Prompt

The easiest way to write a valid commit message is the interactive [czg](https://cz-git.qbb.sh/cli/) prompt. `czg` is installed as a `devDependency`, so no global setup is required. Stage your changes, then run:

```bash
pnpm commit
```

The command automatically loads the root [`cz.config.mjs`](../../cz.config.mjs) configuration.

The prompt asks for these values, in order:

1. The **type** of change.
2. One or more **scopes** (optional).
3. A short **subject**, in the imperative mood.
4. A longer **body** (optional). Type `|` to start a new line.
5. **Breaking changes** (optional, prompted only for `feat` and `fix`).
6. The **issues** that the commit closes (optional).

The prompt then displays the full commit message and asks for confirmation.

You can also use the built-in `fd` alias to quickly commit typo fixes (`docs: fix typos`):

```bash
pnpm commit -- :fd
```

### Install `czg` Globally (Optional)

If you prefer to invoke `czg` directly instead of `pnpm commit`, install it globally with pnpm:

```bash
pnpm add -g czg
```

or with npm:

```bash
npm install -g czg
```

Because [`cz.config.mjs`](../../cz.config.mjs) lives in the repository root, running `czg` from the root discovers the configuration automatically without a `--config` flag:

```bash
czg
```

## Message Format

```text
<type>(<scope>): <subject>

[optional body]

[optional footer(s)]
```

The scope is optional, so `<type>: <subject>` is also valid. For example:

```text
docs(workspace): update contributor documentation
```

```text
feat(vuoto): add normalization option
```

By default, [`cz.config.mjs`](../../cz.config.mjs) uses the `cz-config-spellbookx` default (`useEmoji: false`): emojis are shown in the interactive type picker for readability, but are not inserted into the final commit header.

### Types

| Type       | Emoji | Use it for                                                     |
| :--------- | :---: | :------------------------------------------------------------- |
| `feat`     |  ✨   | A new feature.                                                 |
| `fix`      |  🐛   | A bug fix.                                                     |
| `docs`     |  📖   | Documentation only changes.                                    |
| `style`    |  🎨   | Changes that do not affect the meaning of the code.            |
| `refactor` |  🧹   | A code change that neither fixes a bug nor adds a feature.     |
| `perf`     |  🚀   | A code change that improves performance.                       |
| `test`     |  🧪   | Adding missing tests or correcting existing tests.             |
| `build`    |  📦   | Changes that affect the build system or external dependencies. |
| `ci`       |  🤖   | Changes to the CI configuration files and scripts.             |
| `chore`    |  ♻️   | Other changes that do not modify source or test files.         |
| `revert`   |  🔙   | Reverts a previous commit.                                     |

### Scopes

The scope is optional. When provided, it must be one of the scopes allowed by `commitlint-config-spellbookx` for this monorepo:

- **Workspace package names** (discovered automatically from [`pnpm-workspace.yaml`](../../pnpm-workspace.yaml), currently `vuoto` and `eslint-plugin-vuoto`): changes to a package's source code (`src/`), tests (`tests/`), or exports. Adding a new package under `packages/` registers its `name` as a valid scope automatically.
- `workspace`: repository-level changes such as root configuration files, scripts, documentation, and CI workflows.
- `release`: reserved for release and versioning commits.

If a commit spans multiple scopes, separate them with `,` (without spaces):

```text
chore(workspace,vuoto): update build configuration
```

### Rules

Commitlint enforces the following rules:

- The **type** must be one of the 11 types in the table above.
- Each **scope** (when present) must be one of the valid scopes listed above.
- The **subject** must not be empty and must not end with a period (`.`).
- The **header** (first line) has a maximum length of **72 characters**.
- Each line of the **body** and **footer** has a maximum length of **100 characters**.

Also follow these writing guidelines:

- Write the subject in the imperative mood: "add", not "added" or "adds".
- Use the body to explain _what_ changed and _why_, rather than _how_.
- To mark a breaking change, add a `BREAKING CHANGE:` footer explaining the breaking change and migration steps.
- To close an issue, add a footer such as `Closes #31`.

## Validation

Commit messages are validated automatically:

- The Lefthook `commit-msg` hook ([`.config/lefthook.yml`](../../.config/lefthook.yml)) runs Commitlint on every commit and rejects invalid messages.
- CI checks every commit in a pull request in [`.github/workflows/code-quality-tests-build.yml`](../../.github/workflows/code-quality-tests-build.yml).

To check the most recent commit message manually, run:

```bash
pnpm lint:commits
```

To test a candidate message before committing:

```bash
echo "docs(workspace): update commit style guide" | pnpm exec commitlint
```

## Commits and Releases

Commit types drive semantic versioning when generating changesets. Running `pnpm changeset:commits` turns the Conventional Commits on your branch into Changeset files: `feat` commits produce a minor bump, `fix` commits produce a patch bump, and breaking changes produce a major bump. For details, see the [Release Process](../CONTRIBUTING.md#release-process).
