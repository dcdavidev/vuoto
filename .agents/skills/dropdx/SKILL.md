---
name: dropdx
description: Guides automated package releasing, SemVer version bumping, Conventional Commits changelog generation, npm registry resolution, and npm or JSR publishing for single packages and monorepos using the @dcdavidev/dropdx CLI and programmatic TypeScript API.
---

# dropdx Skill

This skill guides an AI agent through configuring, testing (dry-running), troubleshooting, and executing automated package releases and publications for standalone packages and monorepos using **`@dcdavidev/dropdx`** (`dropdx`).

---

## 1. When to Use This Skill

Activate this skill when:

- Releasing and publishing a single npm package or a multi-package monorepo (`pnpm`, `npm`, `yarn`, or `lerna`).
- Publishing packages to both npm and JSR with `--jsr` or `publishToJsr: true`.
- Running safe pre-release simulations (`--dry-run`) to verify version bumps, build scripts, git tags, and registry permissions.
- Automating SemVer version calculations (`patch`, `minor`, `major`, `prerelease`) based on Conventional Commits and live npm registry versions.
- Configuring `package.json` release scripts or GitHub Actions CI/CD release workflows with npm provenance.
- Orchestrating releases across repositories that use `@changesets/cli`, `release-it`, or `dropdx`'s zero-dependency built-in release engine.
- Building custom release scripts using `dropdx`'s programmatic TypeScript API.

---

## 2. CLI Usage & Runbooks

`dropdx` can be invoked directly via a package runner (`pnpm dlx`, `npx`, `yarn dlx`) or installed locally as a development dependency.

### Installation

```bash
# Install locally in a project (recommended)
pnpm add -D @dcdavidev/dropdx
# or
npm install --save-dev @dcdavidev/dropdx

# Ad-hoc execution without installing
pnpm dlx @dcdavidev/dropdx [options]
npx @dcdavidev/dropdx [options]
```

### Common Command Runbooks

| Goal                                                     | Command                                               |
| :------------------------------------------------------- | :---------------------------------------------------- |
| **Scaffold a `.config/dropdx.json` file**                | `pnpm exec dropdx init`                               |
| **Regenerate/overwrite an existing config file**         | `pnpm exec dropdx init --force`                       |
| **Simulate full release pipeline (safe dry-run)**        | `pnpm exec dropdx --dry-run`                          |
| **Auto-detect bump from Conventional Commits & release** | `pnpm exec dropdx`                                    |
| **Explicit patch release (`x.y.Z`)**                     | `pnpm exec dropdx --patch`                            |
| **Explicit minor release (`x.Y.0`)**                     | `pnpm exec dropdx --minor`                            |
| **Explicit major release (`X.0.0`)**                     | `pnpm exec dropdx --major`                            |
| **Explicit prerelease (`x.y.z-rc.0`)**                   | `pnpm exec dropdx --prerelease`                       |
| **Force bump even if local version > registry version**  | `pnpm exec dropdx --force-bump`                       |
| **Release with custom commit & changelog summary**       | `pnpm exec dropdx -m "feat: add new API endpoints"`   |
| **Publish to a specific dist-tag (e.g. `beta`, `next`)** | `pnpm exec dropdx --prerelease --tag next`            |
| **Publish to a custom registry URL**                     | `pnpm exec dropdx --registry https://npm.my-org.com/` |
| **Publish to npm and JSR**                               | `pnpm exec dropdx --jsr`                              |
| **Publish with 2FA One-Time Password (OTP)**             | `pnpm exec dropdx --otp 123456`                       |
| **Stage publish for 2FA approval (`npm stage publish`)** | `pnpm exec dropdx --stage`                            |
| **Publish in CI with npm provenance attestation**        | `pnpm exec dropdx --provenance`                       |
| **Force built-in engine (bypass Changesets/Release-It)** | `pnpm exec dropdx --engine internal`                  |
| **Bump & build locally without git or npm publish**      | `pnpm exec dropdx --skip-git --skip-publish`          |

### CLI Options Reference

| Option             | Shorthand | Description                                                               | Default                      |
| :----------------- | :-------- | :------------------------------------------------------------------------ | :--------------------------- |
| `--bump <type>`    |           | SemVer increment level: `patch`, `minor`, `major`, or `prerelease`        | Auto-detected (or `patch`)   |
| `--patch`          |           | Shortcut for `--bump patch`                                               |                              |
| `--minor`          |           | Shortcut for `--bump minor`                                               |                              |
| `--major`          |           | Shortcut for `--bump major`                                               |                              |
| `--prerelease`     |           | Shortcut for `--bump prerelease`                                          |                              |
| `--force-bump`     |           | Force version bump even when local `package.json` version > registry      | `false`                      |
| `--summary <text>` | `-m`      | Release summary note (used in commit message & changelog fallback)        | Auto-generated               |
| `--registry <url>` |           | Target npm registry URL override                                          | From `.npmrc` or `npmjs.org` |
| `--jsr`            |           | Also publish packages to JSR                                              | `false`                      |
| `--no-jsr`         |           | Disable JSR publishing enabled in config                                  |                              |
| `--tag <name>`     |           | npm distribution tag (e.g., `latest`, `beta`, `next`)                     | `latest`                     |
| `--access <level>` |           | Package access level: `public` or `restricted`                            | `public`                     |
| `--otp <code>`     |           | Two-factor authentication (2FA) one-time password                         |                              |
| `--stage`          |           | Stage release via `npm stage publish` (auto-fallback when 2FA required)   | `false`                      |
| `--provenance`     |           | Generate npm provenance attestation (enabled automatically in GH Actions) | `false` (`true` in GHA)      |
| `--config <path>`  | `-c`      | Path to configuration file                                                | `.config/dropdx.json`        |
| `init`             |           | Generate `.config/dropdx.json` stamped with the current CLI version       |                              |
| `--force`          | `-f`      | Overwrite an existing configuration file (with `init`)                    | `false`                      |
| `--engine <name>`  |           | Release engine: `auto`, `changeset`, `release-it`, `internal`             | `auto`                       |
| `--dry-run`        | `-d`      | Simulate validations, bumps, build, git, and publish without side effects | `false`                      |
| `--skip-build`     |           | Skip running package build scripts                                        | `false`                      |
| `--skip-git`       |           | Skip git commit, annotated tag, and remote push steps                     | `false`                      |
| `--skip-publish`   |           | Skip publishing packages to npm and JSR                                   | `false`                      |
| `--allow-dirty`    |           | Allow running with uncommitted changes in the git working tree            | `false`                      |
| `--version`        | `-v`      | Print the installed `dropdx` version                                      |                              |
| `--help`           | `-h`      | Display CLI help and usage reference                                      |                              |

---

## Publishing to JSR

JSR publishing is opt-in and runs alongside npm publishing. Every package included in JSR publishing needs a `jsr.json`, `jsr.jsonc`, `deno.json`, or `deno.jsonc` file declaring a scoped `name`, SemVer `version`, and `exports`. dropdx checks the latest versions on both registries and synchronizes the JSR manifest to the calculated release version.

The JSR CLI handles local authentication interactively. GitHub Actions can use OIDC after the JSR package is linked to the repository; grant the workflow `id-token: write`. See the [JSR publishing guide](https://jsr.io/docs/publishing-packages).

JSR dual publishing supports the built-in engine and version-only engines. Full-lifecycle delegated engines (`release-it`, `semantic-release`, and `np`) are incompatible because they publish to npm themselves.

---

## 3. The 7-Step Release Pipeline

When invoked, `dropdx` executes a deterministic 7-step release pipeline:

1. **`[1/7]` Pre-Flight Environment Validations**:
   - Verifies Node.js version is `>= 20.0.0`.
   - Verifies the working directory is inside a Git repository and has a clean working tree (unless `--allow-dirty` is passed).
   - Verifies remote `origin` connectivity and ensures the local branch is not behind `origin/<branch>`.
2. **`[2/7]` Registry & Authentication Verification**:
   - Resolves the target registry URL from CLI flags, `.npmrc`, `NPM_CONFIG_REGISTRY`, or `https://registry.npmjs.org/`.
   - Verifies registry authentication via `npm whoami --registry <url>`.
   - Discovers all workspace packages and filters for publishable packages (`"private": false` or `"publishConfig": { "access": "public" }`), sorted topologically.
3. **`[3/7]` Release Engine Selection**:
   - Auto-detects `@changesets/cli` (`changeset`), `release-it` (`release-it`), or selects the built-in zero-dependency engine (`internal`).
4. **`[4/7]` Version Resolution & Registry Inspection**:
   - Inspects Git history since the latest tag to determine whether the repository uses **Conventional Commits** (`feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`) or **non-conventional commits**:
     - **Conventional History**: Auto-detects `major` (`BREAKING CHANGE` / `!:`), `minor` (`feat`), or `patch` (fixes/chores/maintenance), generates categorized emoji sections in `CHANGELOG.md`, and formats release commits as `chore(release): bump to vX.Y.Z` (auto-prefixing custom `--summary` strings if needed).
     - **Non-Conventional History**: Defaults safely to `patch` (unless an explicit breaking change note is found), writes a clean flat commit list in `CHANGELOG.md`, and formats release commits as `Release vX.Y.Z`.
   - Queries the npm registry and, when `--jsr` is enabled, JSR for each package's latest version; npm maintainer ownership is checked as before.
   - Calculates the next version ensuring it exceeds the latest version on either registry (and forces a bump if a local git tag `v<version>` already exists or `--force-bump` / explicit bump is set).
   - Updates `package.json` versions, internal workspace dependency ranges (`^`, `~`, exact), `CHANGELOG.md`, and enabled JSR manifest versions.
5. **`[5/7]` Building Packages**:
   - Runs root `pnpm run build` / `npm run build` if present, or iterates through each publishable package's `build` script in topological order (unless `--skip-build` is set).
6. **`[6/7]` Git Commit, Tag & Push**:
   - Stages changes (`git add .`) and commits (`chore(release): bump to vX.Y.Z` or custom `--summary`).
   - Creates an annotated Git tag `vX.Y.Z` after verifying the tag does not already exist locally or on remote `origin`.
   - Pushes the branch and annotated tag to `origin` (unless `--skip-git` or `--dry-run` is active).
7. **`[7/7]` Publishing Packages to Registries**:
   - Publishes each package to npm in topological order using `pnpm publish` or `npm publish` with `--registry`, `--access`, `--no-git-checks`, `--tag`, and optional `--otp` / `--provenance` / `--dry-run`.
   - When `--jsr` is enabled and npm publishing succeeds, publishes each package to JSR using `pnpm dlx jsr publish` or `npx jsr publish`. JSR handles authentication through local login or GitHub Actions OIDC.
   - When `--stage` (`stage: true` in config) is passed, or when direct publishing fails due to a Two-Factor Authentication (`EOTP` / 2FA) requirement, `dropdx` stages the release via `npm stage publish` / `pnpm stage publish`. In interactive TTY environments, `dropdx` prompts for an OTP and runs `npm stage approve <stage-id>` automatically; in CI/non-TTY environments, it prints the `npm stage approve` command for human approval.
   - Prints a final summary table of published/staged packages and versions.

---

## 4. Engine Auto-Detection & Monorepo Behavior

### Engine Selection Rules (`--engine auto`)

| Engine                 | Detection Trigger                                                                                                   | Execution Behavior                                                                                                                               |
| :--------------------- | :------------------------------------------------------------------------------------------------------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------- |
| **`changeset`**        | `.changeset/config.json` exists or `@changesets/cli` is listed in `dependencies`/`devDependencies`                  | Uses pending `.changeset/*.md` files (or generates an automated changeset if none exist), runs `changeset version`, then continues the pipeline. |
| **`release-it`**       | `.release-it.*` config file exists, `release-it` is in dependencies, or `"release-it"` key exists in `package.json` | Delegates the release workflow directly to `release-it <bump> --ci` with mapped flags (`--dry-run`, `--npm.tag`, `--npm.otp`).                   |
| **`semantic-release`** | `.releaserc*` / `release.config.*` exists, `semantic-release` is in dependencies, or `"release"` in `package.json`  | Delegates the release workflow directly to `semantic-release` (`--dry-run`, `--no-ci`).                                                          |
| **`lerna`**            | `lerna.json` exists or `lerna` is listed in `dependencies`/`devDependencies`                                        | Runs `lerna version <bump> --yes --no-git-tag-version --no-push`, then continues with `dropdx` build, git tag/push, and publish steps.           |
| **`bumpp`**            | `bump.config.*` exists or `bumpp` is listed in `dependencies`/`devDependencies`                                     | Runs `bumpp <bump> --yes --no-commit --no-tag --no-push` and updates `CHANGELOG.md`, then continues with build, git tag/push, and publish.       |
| **`standard-version`** | `.versionrc*` exists or `commit-and-tag-version` / `standard-version` is in dependencies                            | Runs `commit-and-tag-version` (or `standard-version`) `--release-as <bump> --skip.commit --skip.tag`, then continues the pipeline.               |
| **`np`**               | `.np-config.*` exists, `np` is in dependencies, or `"np"` key exists in `package.json`                              | Delegates the release workflow to `np <bump> --yolo`.                                                                                            |
| **`internal`**         | Default when no external release tool is detected, or when `--engine internal` is passed                            | Uses `dropdx`'s built-in SemVer bumper, Conventional Commits changelog generator, topological builder, git tagger, and package publisher.        |

### Workspace Discovery & Topological Sorting

`dropdx` natively discovers packages across:

1. **pnpm workspaces**: Parses `packages` globs from `pnpm-workspace.yaml`.
2. **npm / Yarn workspaces**: Parses `workspaces` array or `workspaces.packages` from root `package.json`.
3. **Lerna**: Parses `packages` globs from `lerna.json`.
4. **Standalone package**: Falls back to root `package.json` when no workspace globs match.

Internal dependencies (`dependencies` and `devDependencies`) are analyzed via depth-first topological sort so foundational packages are always versioned, built, and published before dependent packages. Cross-package version ranges (`^1.0.0`, `~1.0.0`, `1.0.0`) are updated automatically while `workspace:*` protocol specifiers are preserved for `pnpm publish`.

### Registry Resolution Priority (`.npmrc`)

For every package, `resolveRegistry(pkgName, options, rootDir)` resolves the target registry in order:

1. `--registry <url>` CLI flag.
2. Project `.npmrc` scoped registry (`@scope:registry=<url>`).
3. Project `.npmrc` default registry (`registry=<url>`).
4. `NPM_CONFIG_REGISTRY` environment variable.
5. User `~/.npmrc` scoped registry (`@scope:registry=<url>`).
6. User `~/.npmrc` default registry (`registry=<url>`).
7. Fallback: `https://registry.npmjs.org/`.

---

## 5. Programmatic TypeScript API

`@dcdavidev/dropdx` exports its CLI runner, utilities, and TypeScript interfaces for custom release scripts.

```typescript
import {
  bumpVersion,
  checkNpmWhoami,
  cli,
  compareSemVer,
  DEFAULT_OPTIONS,
  detectBumpFromCommits,
  detectEngine,
  fetchNpmRegistryInfo,
  findPackages,
  formatConventionalChangelog,
  getConventionalCommits,
  getLatestTag,
  isSemVerGreaterThan,
  parseArgs,
  parseConventionalCommit,
  parseSemVer,
  resolveRegistry,
  resolveTargetVersion,
  sortPackagesTopologically,
  updateChangelog,
} from '@dcdavidev/dropdx';

// 1. Run the CLI pipeline programmatically
await cli(['--dry-run', '--minor']);

// 2. Discover and topologically sort publishable workspace packages
const packages = sortPackagesTopologically(
  findPackages(process.cwd()).filter((pkg) => pkg.isPublishable)
);

// 3. Detect recommended bump from Conventional Commits since last tag
const bumpInfo = detectBumpFromCommits(process.cwd());
console.log(`Recommended bump: ${bumpInfo.bump} (${bumpInfo.reason})`);

// 4. Inspect registry and calculate target version
for (const pkg of packages) {
  const registry = resolveRegistry(pkg.name, {}, process.cwd());
  const regInfo = await fetchNpmRegistryInfo(pkg.name, registry);
  const { targetVersion, bumpNeeded, reason } = resolveTargetVersion(
    pkg.version,
    regInfo.latestVersion,
    bumpInfo.bump
  );
  console.log(`${pkg.name}: ${pkg.version} -> ${targetVersion} (${reason})`);
}
```

---

## 6. Project & CI/CD Integration Recipes

### Configuration File Discovery

`dropdx` uses cosmiconfig to search from the workspace root in this order:

1. `.config/dropdx.json` _(default)_
2. `.config/dropdx.jsonc`
3. `.config/dropdx.yml`
4. `.config/dropdx.toml`
5. `dropdx.config.json`
6. `dropdx.config.jsonc`
7. `dropdx.config.yml`
8. `dropdx.config.toml`

The `.config/dropdx.*` paths take precedence over root-level `dropdx.config.*` files. Use `--config <path>` to load a custom path.

Note that package access level (`"public"` or `"restricted"`) is configured in `package.json` under `"publishConfig": { "access": "public" }`, and per-release options like `--bump` or `--tag` are passed via CLI flags, while workflow options belong in `dropdx.config.*`:

```json
{
  "version": "0.3.0",
  "conventionalCommits": true,
  "engine": "auto",
  "skipBuild": false,
  "skipGit": false,
  "skipPublish": false,
  "allowDirty": false
}
```

Generate the default `.config/dropdx.json` file with `dropdx init` (add `--force` to overwrite an existing one). The `version` property records the `dropdx` version that generated the file; when a loaded config declares a `version` that does not match the running CLI version, `dropdx` prints a warning that the config file was generated by a different version.

### `package.json` Scripts

Add standard release scripts to the root `package.json`:

```json
{
  "scripts": {
    "release": "dropdx",
    "release:dry": "dropdx --dry-run",
    "release:patch": "dropdx --patch",
    "release:minor": "dropdx --minor",
    "release:major": "dropdx --major"
  }
}
```

### GitHub Actions Release Workflow

```yaml
name: Release

on:
  workflow_dispatch:
    inputs:
      bump:
        description: 'SemVer bump level (auto, patch, minor, major, prerelease)'
        required: true
        default: 'auto'
        type: choice
        options:
          - auto
          - patch
          - minor
          - major
          - prerelease

permissions:
  contents: write
  id-token: write # Required for npm provenance attestation

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
        with:
          fetch-depth: 0
          token: ${{ secrets.GITHUB_TOKEN }}

      - name: Install pnpm
        uses: pnpm/action-setup@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: 'pnpm'
          registry-url: 'https://registry.npmjs.org/'

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Configure Git identity
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"

      - name: Run dropdx release
        run: |
          if [ "${{ inputs.bump }}" = "auto" ]; then
            pnpm exec dropdx --provenance
          else
            pnpm exec dropdx --bump ${{ inputs.bump }} --provenance
          fi
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
```

---

## 7. Verification & Troubleshooting

1. **Always Dry-Run First**: Before executing a live release, run `pnpm exec dropdx --dry-run` to validate Node/Git status, registry authentication, package discovery, and target version calculations without mutating files.
2. **Authentication Errors (`ENEEDAUTH` / `npm whoami` failed)**:
   - Ensure `NPM_TOKEN` or `NODE_AUTH_TOKEN` is exported in your environment, or authenticate interactively via `npm login --registry <url>`.
3. **Uncommitted Changes Error**:
   - Commit or stash working tree modifications before running `dropdx`, or pass `--allow-dirty` only when intentional.
4. **No Publishable Packages Found**:
   - Verify that target packages do not have `"private": true` in `package.json`, or explicitly configure `"publishConfig": { "access": "public" }`.
5. **Existing Git Tag Conflict (`Git tag "vX.Y.Z" already exists`)**:
   - If a tag already exists for the current local version, `dropdx` automatically forces a version bump when calculating target versions. If a tag from a partial previous release blocks tagging, pass `--force-bump` or an explicit bump flag (`--patch`, `--minor`, `--major`).
