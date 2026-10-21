# 2. Adopt Changesets for Monorepo Versioning and Publishing

Date: 2026-10-21

## Status

Accepted

## Context

Managing version bumps, changelog generation, and npm publishing across multiple interdependent packages in a monorepo is error-prone when performed manually or via monolithic single-package release tools (such as `release-it` with `.release-it.json`).

We needed a tool that:

- Manages release intent directly in version control alongside PRs and commits.
- Accurately tracks workspace dependencies (`workspace:*`).
- Integrates with Conventional Commits to automatically generate changelogs.
- Coordinates with Turborepo for safe, parallelized npm publishing.

## Decision

We migrated from `release-it` to **Changesets** (`@changesets/cli`) combined with `changeset-conventional-commits`:

1. **Explicit Release Intent**: Developers declare version increments using `pnpm run changeset` or generate them from Conventional Commits via `pnpm run changeset:conventional`.
2. **Automated Versioning**: `pnpm run version` updates versions and formats changelogs per package.
3. **Decoupled Publishing**: `pnpm run release` invokes Turborepo's `release` pipeline (`turbo run release`), which executes `pnpm publish --access public --no-git-checks` across packages with fresh builds.

## Consequences

### Positive

- Replaces rigid `.release-it.json` configuration with flexible, monorepo-native versioning.
- Full support for Conventional Commits in changelog generation.
- Clear separation between version bumping (`pnpm run version`) and package publishing (`pnpm run release`).
- Direct integration into CI/CD workflows for automated releases.

### Negative or Trade-offs

- Requires contributors or maintainers to generate changeset files before triggering release builds.
