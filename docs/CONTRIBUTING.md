# Contributing to Vuoto

Thank you for your interest in contributing to Vuoto! This repository contains the `vuoto` whitespace normalization CLI/API and the `eslint-plugin-vuoto` ESLint plugin, maintained in a pnpm and Turborepo monorepo.

## Contributor Guides

Read these guides before you start working on a change:

| Guide                                                                                              | What it covers                                                             |
| :------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------- |
| [Development Environment](./contribute/development-environment.md)                                 | Required tools (Node.js, pnpm), cloning, installation, and editor setup.   |
| [Architecture](./contribute/architecture.md)                                                       | Repository layout, config placement rules, build pipeline, and automation. |
| [Code Conventions](./contribute/code-conventions.md)                                               | TypeScript, ESM, Prettier formatting, ESLint rules, and spell-checking.    |
| [Commit Message Style](./contribute/commit-style.md)                                               | Conventional Commits format, `czg` prompt, scopes, and commitlint rules.   |
| [Package.json Scripts Naming Conventions](./contribute/package-json-scripts-naming-conventions.md) | Naming grammar and reference for every script in `package.json`.           |
| [Tests](./contribute/tests.md)                                                                     | Running Vitest, coverage reports, and conventions for writing new tests.   |

## Ways to Contribute

- **Report bugs**: open an issue on [GitHub Issues](https://github.com/dcdavidev/vuoto/issues) with clear reproduction steps, expected behavior, actual behavior, and your Node.js / pnpm versions. For security vulnerabilities, see the [Security Policy](./SECURITY.md) instead of opening a public issue.
- **Propose improvements**: open an issue first for larger changes (new tooling, config changes, or structural updates) so we can agree on the approach before you write code.
- **Submit pull requests**: fix bugs, improve documentation, or add tests and enhancements following the workflow below.

## Pull Request Workflow

1. **Set up your environment** by following the [Development Environment](./contribute/development-environment.md) guide.
2. **Create a branch** from an up-to-date `main` branch:

   ```bash
   git checkout -b feat/short-description
   ```

3. **Make your changes** following the [Code Conventions](./contribute/code-conventions.md).
4. **Add or update tests** for any new behavior or bug fix. See [Tests](./contribute/tests.md).
5. **Run the full verification suite** locally:

   ```bash
   pnpm check
   ```

   This type-checks root `scripts/` and runs `build`, `lint:code`, `lint:spelling`, `lint:types`, `fmt:check`, and `test` through Turborepo.

6. **Commit your changes** using the interactive Conventional Commits prompt:

   ```bash
   pnpm commit
   ```

   Lefthook automatically formats and lints staged files on `pre-commit` and validates commit messages with Commitlint on `commit-msg`. See [Commit Message Style](./contribute/commit-style.md).

7. **Push your branch and open a pull request** against `main`. Keep pull requests focused on a single concern and describe _what_ changed and _why_.

### What CI Checks

Every pull request and push to `main` runs the [Code Quality, Tests, and Build](../.github/workflows/code-quality-tests-build.yml) workflow, which verifies:

- Frozen lockfile installation (`pnpm install --frozen-lockfile`)
- TypeScript build across workspace packages (`pnpm build`)
- Commit message validation for every commit in the pull request (`commitlint`)
- ESLint (`pnpm lint:code`)
- Prettier formatting (`pnpm fmt:check`)
- CSpell spell-checking (`pnpm lint:spelling`)
- TypeScript type-checking (`pnpm lint:types`)
- Vitest test suite and coverage across workspace packages (`pnpm test`)

## Release Process

Versioning and changelog generation are managed with [Changesets](https://github.com/changesets/changesets) (configured in [`.changeset/config.json`](../.changeset/config.json)) and `changeset-conventional-commits`.

1. **Create a changeset** for user-facing package changes, either interactively:

   ```bash
   pnpm changeset
   ```

   or automatically from the Conventional Commits on your branch (`feat` triggers a minor bump, `fix` triggers a patch bump, and `BREAKING CHANGE:` triggers a major bump):

   ```bash
   pnpm changeset:commits
   ```

2. **Apply pending changesets** when preparing a release:

   ```bash
   pnpm changeset:version
   ```

   This consumes the markdown files in `.changeset/`, bumps `version` in affected workspace `package.json` files, updates internal workspace dependencies, and updates each package's `CHANGELOG.md` using `@changesets/changelog-github`.

3. **Verify and publish**: run `pnpm check` to verify the build, lints, types, formatting, and tests before committing the version bump. The root `pnpm release` script runs DropDX.

## Automated Maintenance

The repository uses scheduled automation to keep core tooling up to date:

- **Dependabot** ([`.github/dependabot.yml`](../.github/dependabot.yml)) opens weekly pull requests for grouped npm dependencies (`spellbookx`, `vitest`, `changesets`, and core tools) and GitHub Actions.
- **Node.js LTS updates** ([`.github/workflows/update-node.yml`](../.github/workflows/update-node.yml)) run `pnpm update:node` every Monday to sync `.nvmrc` and `@types/node` across the workspace with the latest active Node.js LTS release.
- **Turborepo updates** ([`.github/workflows/update-turbo.yml`](../.github/workflows/update-turbo.yml)) run `pnpm update:turbo` every Monday to upgrade `turbo` and apply `@turbo/codemod` migrations.

## License

By contributing to this repository, you agree that your contributions will be licensed under the [MIT License](../LICENSE).
