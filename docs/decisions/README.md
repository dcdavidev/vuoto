# Architecture Decision Records (ADRs)

This directory documents the key architectural decisions made in the Vuoto monorepo.

## What is an Architecture Decision Record?

An Architecture Decision Record (ADR) captures a significant architectural decision along with its context, considered alternatives, and consequences.

## Decision Record Format

Each ADR is written in Markdown and named following the pattern:
`NNNN-title-in-kebab-case.md` (e.g., `0001-use-pnpm-and-turborepo-for-monorepo-orchestration.md`).

### ADR Template

```markdown
# [Number]. [Short title of solved problem and decision]

Date: YYYY-MM-DD

## Status

[Proposed | Accepted | Superseded | Deprecated]

## Context

What is the problem or architectural requirement being addressed? What constraints or limitations exist?

## Decision

What is the change or architecture being adopted? What options were considered and why was this chosen?

## Consequences

### Positive

- Positive outcome or benefit 1
- Positive outcome or benefit 2

### Negative or Trade-offs

- Downside, limitation, or operational overhead
```

## Index of Decisions

| ADR                                                                             | Title                                                        | Status   | Date       |
| :------------------------------------------------------------------------------ | :----------------------------------------------------------- | :------- | :--------- |
| [**ADR-0001**](./0001-use-pnpm-and-turborepo-for-monorepo-orchestration.md)     | Use pnpm Workspaces and Turborepo for Monorepo Orchestration | Accepted | 2026-10-21 |
| [**ADR-0002**](./0002-adopt-changesets-for-monorepo-versioning-and-releases.md) | Adopt Changesets for Monorepo Versioning and Publishing      | Accepted | 2026-10-21 |
| [**ADR-0003**](./0003-use-rolldown-and-tsc-for-package-builds.md)               | Use Rolldown and TypeScript for Package Builds               | Accepted | 2026-10-21 |
| [**ADR-0004**](./0004-use-lefthook-for-cross-platform-git-hooks.md)             | Use Lefthook for Cross-Platform Git Hooks                    | Accepted | 2026-10-21 |
| [**ADR-0005**](./0005-use-vitest-for-testing.md)                                | Use Vitest for Testing                                       | Accepted | 2026-10-21 |
| [**ADR-0006**](./0006-adopt-eslint-9-flat-configs-for-linting.md)               | Adopt ESLint 9+ Flat Configs for Linting                     | Accepted | 2026-10-21 |
| [**ADR-0007**](./0007-centralize-unicode-definitions-in-vuoto-consts.md)        | Centralize Unicode Definitions in vuoto/consts               | Accepted | 2026-10-21 |
