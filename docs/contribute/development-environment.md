# Development Environment

This guide explains how to set up a local development environment for Vuoto: install the required tools, clone your fork, build the workspace packages, and configure your editor.

## Step 1: Install Node.js and pnpm

### Install Node.js

Vuoto requires **Node.js `26.x`**. The major version is pinned in [`.nvmrc`](../../.nvmrc) and enforced by pnpm's `engineStrict: true` setting in [`pnpm-workspace.yaml`](../../pnpm-workspace.yaml).

You can download Node.js from the [official website](https://nodejs.org/) or follow the [Node.js download guide](https://nodejs.org/en/download).

On macOS, Linux, and Windows (WSL), we recommend [nvm](https://github.com/nvm-sh/nvm). It reads `.nvmrc` directly, so after cloning the repository (Step 2) you can run:

```bash
nvm install
```

```bash
nvm use
```

### Install pnpm

This repository uses **pnpm `12.23.0`**, pinned in the `packageManager` field of [`package.json`](../../package.json).

Install the pinned version using the [pnpm installation guide](https://pnpm.io/installation), for example:

```bash
npm install --global pnpm@12.23.0
```

Keep pnpm up to date with:

```bash
pnpm self-update
```

## Step 2: Fork and Clone the Repository

1. Go to [github.com/dcdavidev/vuoto](https://github.com/dcdavidev/vuoto) and click **Fork** to create a copy in your GitHub account.

2. Clone your fork, replacing `<your-username>` with your GitHub username:

   ```bash
   git clone https://github.com/YOUR_USERNAME/vuoto.git
   ```

   ```bash
   cd vuoto
   ```

3. Install the dependencies:

   ```bash
   pnpm install
   ```

   This command installs dependencies for the root workspace and all packages under `packages/*`, and runs the `prepare` lifecycle script to install the Git hooks via [Lefthook](https://github.com/evilmartians/lefthook) using [`.config/lefthook.yml`](../../.config/lefthook.yml).

4. Build all workspace packages:

   ```bash
   pnpm build
   ```

   This runs `turbo run build` and compiles each package's `src/` into `dist/` (JavaScript, type declarations, and source maps) using its `tsconfig.build.json`.

## Step 3: Add the Upstream Remote

The _upstream_ remote points to the main repository that receives contributions. Add it so you can pull the latest changes:

```bash
git remote add upstream https://github.com/dcdavidev/vuoto.git
```

Before starting new work, update your local `main` branch:

```bash
git checkout main
```

```bash
git pull upstream main
```

Then create a topic branch from `main` for your changes.

## Step 4: Run the Checks

Verify that everything passes before making changes:

```bash
pnpm check
```

`pnpm check` type-checks root `scripts/` and runs `build`, `lint:code`, `lint:spelling`, `lint:types`, `fmt:check`, and `test` through Turborepo. CI runs the same checks on every pull request. For details on running and writing tests, see [Tests](./tests.md).

## Step 5: Configure Your Editor

The repository includes settings for [Visual Studio Code](https://code.visualstudio.com/) in `.vscode/`:

- **Recommended extensions** ([`.vscode/extensions.json`](../../.vscode/extensions.json)): ESLint, EditorConfig, Prettier, GitHub Actions, Commitlint, YAML, Code Spell Checker, and Turborepo. VS Code prompts you to install them when you open the workspace.
- **Workspace settings** ([`.vscode/settings.json`](../../.vscode/settings.json)): format on save with Prettier, ESLint auto-fix on explicit save, CSpell enabled, workspace TypeScript SDK (`node_modules/typescript/lib`), automatic ESLint working directories for workspace packages, and search/watcher exclusions for `node_modules/`, `.turbo/`, and `dist/`.

When VS Code asks which TypeScript version to use, select **Use Workspace Version**. If the editor reports missing modules after `pnpm install`, run **TypeScript: Restart TS Server** from the command palette.

If you use another editor, enable its EditorConfig, ESLint, Prettier, and CSpell integrations. Shared editor settings are defined in [`.editorconfig`](../../.editorconfig).

## Reference Information

### Directory Structure

- `packages/*/`: workspace packages, each with `src/` (compiled to `dist/`, not committed) and `tests/` (coverage written to `coverage/`, not committed).
- `scripts/`: TypeScript maintenance scripts executed with `tsx` (`update-node.ts`, `update-turbo.ts`).
- `.config/`: tool configurations for CSpell (`.config/cspell.yml`, `.config/cspell/custom.txt`) and Lefthook (`.config/lefthook.yml`).
- `.changeset/`: Changesets configuration and pending changeset files for releases.
- `.github/`: CI workflows, scheduled update workflows, and Dependabot configuration.
- `.vscode/`: workspace settings and recommended extensions for VS Code.
- `.agents/skills/`: skills for AI coding assistants.
- `schemas/`: JSON and YAML schemas for Vuoto configuration.
- `docs/`: contributing guide, contributor documentation, and the [security policy](../SECURITY.md).

For a deeper look at how the configuration, build pipeline, and tooling fit together, see [Architecture](./architecture.md).

### Workflow

Run all commands from the repository root (or target a single package with `pnpm --filter <package> <script>`). For the complete list of scripts and their naming convention, see [Package.json Scripts Naming Conventions](./package-json-scripts-naming-conventions.md).
