# 4. Use Lefthook for Cross-Platform Git Hooks

Date: 2026-10-21

## Status

Accepted

## Context

Maintaining code quality across a monorepo requires automated pre-commit and commit-message checks. Tools like Husky combined with `lint-staged` introduce substantial JavaScript runtime overhead, require multiple configuration files, and can be fragile in cross-platform (Linux/macOS/Windows) environments.

## Decision

We chose **Lefthook** as our Git hook manager:

1. **Native Speed**: Compiled in Go with zero Node.js startup penalty for hook dispatch.
2. **Parallel Task Execution**: Runs formatting, ESLint validation, and CSpell checks concurrently on staged files.
3. **Unified Configuration**: Configured via a single root [`lefthook.yml`](../../lefthook.yml) file.
4. **Commitlint Integration**: Dispatches `commitlint` on the `commit-msg` hook to validate Conventional Commits.

## Consequences

### Positive

- Fast pre-commit execution without stalling local Git workflow.
- Guarantees no broken formatting, lint violations, or unrecognized spelling reach the repository.
- Automatic installation on `pnpm install` via the `prepare` script.

### Negative or Trade-offs

- Requires contributors to use standard Git CLI or Git clients that properly invoke standard repository hooks.
