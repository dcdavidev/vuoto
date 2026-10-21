# 5. Use Vitest for Testing

Date: 2026-10-21

## Status

Accepted

## Context

We required a fast, ESM-native test runner capable of executing unit and integration tests across both the core library (`vuoto`) and the ESLint plugin (`eslint-plugin-vuoto`).

Jest requires complex transformer configurations (`ts-jest`, `@swc/jest`, or Babel) and has historical friction with native ES Modules, NodeNext resolution, and ESM-only packages.

## Decision

We chose **Vitest** as the unified test runner:

1. **Native ESM & TypeScript**: Runs TypeScript files out of the box with zero compilation step or transformer configuration.
2. **ESLint Rule Testing Support**: Seamlessly executes ESLint's `RuleTester` in `__tests__/` suites.
3. **Speed & Watch Mode**: Instant test execution and hot module reloading during development.
4. **Turborepo Integration**: Coordinated across packages via `turbo run test` with caching.

## Consequences

### Positive

- Identical module resolution between runtime code and test suites.
- Simple, zero-config setup per package (`"test": "vitest run"`).
- Fast execution (entire 77-test suite runs in under 1 second).

### Negative or Trade-offs

- Requires Node.js >= 18 for native ESM support.
