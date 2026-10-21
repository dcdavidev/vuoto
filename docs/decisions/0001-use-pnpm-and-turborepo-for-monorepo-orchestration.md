# 1. Use pnpm Workspaces and Turborepo for Monorepo Orchestration

Date: 2026-10-21

## Status

Accepted

## Context

Vuoto is a multi-package repository comprising the core normalizer library and CLI (`vuoto`) and an ESLint plugin (`eslint-plugin-vuoto`). We needed a package manager and build orchestrator capable of managing inter-package workspace dependencies, executing topological build pipelines, and caching artifacts reliably.

We evaluated:

- **npm / Yarn workspaces**: Common, but slower install times and prone to phantom dependency leaks due to flat `node_modules` hoisting.
- **Lerna**: Legacy and largely deprecated for modern pipeline management.
- **Nx**: Highly capable, but excessively heavy with substantial configuration overhead and invasive scaffolding for our lightweight toolchain needs.

## Decision

We chose **pnpm** as our workspace package manager and **Turborepo** as our monorepo build orchestrator:

1. **pnpm**: Fast, reliable, and uses hard links with content-addressable storage. It guarantees strict dependency resolution, preventing phantom dependencies.
2. **Turborepo**: Fast, lightweight, and requires minimal configuration. It provides clear topological dependency execution (`dependsOn: ["^build"]`) and parallel task pipelines.

## Consequences

### Positive

- Fast dependency installation and minimal disk footprint.
- Strict isolation between packages with no hidden undeclared dependencies.
- Simple, declarative `turbo.json` managing the build, lint, test, and release task lifecycle.
- Zero boilerplate compared to heavyweight enterprise monorepo tools.

### Negative or Trade-offs

- Contributors and CI environments must use `pnpm` rather than `npm` or `yarn`.
