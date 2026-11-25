# Tests

This guide explains how to run the test suite, inspect coverage, and write new tests in the Vuoto monorepo. The `vuoto` and `eslint-plugin-vuoto` packages use [Vitest](https://vitest.dev/) with `@vitest/coverage-v8` for unit and integration tests, orchestrated by Turborepo.

## Run the Tests

Run the full test suite once with coverage across all workspace packages:

```bash
pnpm test
```

Under the hood, `pnpm test` runs `turbo run test`, which executes the following command in every workspace package after building its workspace dependencies:

```bash
vitest run --no-fsModuleCache --passWithNoTests --coverage
```

There is no `vitest.config.*` file by default: packages use Vitest's built-in defaults and transform TypeScript source files directly from `src/`.

Run tests for a single workspace package using pnpm's `--filter` flag:

```bash
pnpm --filter vuoto test
```

Run a single test file inside a package by passing its path:

```bash
pnpm --filter vuoto test tests/normalize.test.ts
```

Filter tests by name using Vitest's `-t` flag:

```bash
pnpm --filter vuoto test -- -t "should remove zero-width space"
```

Run Vitest in watch mode while developing a package:

```bash
pnpm --filter vuoto exec vitest
```

Run tests through Turborepo (as part of the full cached check pipeline), or bypass the Turborepo cache with `--force`:

```bash
pnpm check
```

```bash
pnpm exec turbo run test --force
```

See [`turbo.json`](../../turbo.json) for the cached inputs (`src/**`, `tests/**`, `vitest.config.*`, `tsconfig*.json`, `package.json`) and outputs (`coverage/**`).

## Coverage

`pnpm test` generates V8 coverage reports inside each package's `coverage/` directory (for example `packages/vuoto/coverage/index.html`). All `coverage/` folders are gitignored and excluded from Prettier and ESLint checks.

## Write Tests

- Every new feature, utility function, or bug fix must include tests.
- Place test files in each package's `tests/` directory, mirroring the structure of its `src/` rather than co-locating tests beside source files.
- Name each test file after the module it tests with the `.test.ts` suffix, for example `packages/vuoto/tests/normalize.test.ts` for `packages/vuoto/src/normalize.ts`. Keep each file focused on a single module.
- Name the top-level `describe` block clearly after the function or module under test:

  ```ts
  describe('normalize', () => {
    // ...
  });
  ```

- Import Vitest helpers explicitly; globals are not enabled:

  ```ts
  import { describe, expect, it, vi } from 'vitest';
  ```

- Import the code under test from `../src/` with the `.js` extension (required by `moduleResolution: NodeNext`):

  ```ts
  import { normalize } from '../src/normalize.js';
  ```

- Tests that touch the filesystem must use a temporary directory created under `os.tmpdir()` (for example with `fs.promises.mkdtemp`) and clean it up afterwards. Never write test artifacts into the repository tree.
- Restore spies and mocks after each test, for example by calling `vi.restoreAllMocks()` in `afterEach`.

Each package's `tests/` directory is included in its `tsconfig.json` and type-checked by `pnpm lint:types`, while its `tsconfig.build.json` excludes `tests/` from the published `dist/` output.

## Continuous Integration

CI runs `pnpm test` on every pull request and push to `main` after the build, commitlint, ESLint, Prettier, CSpell, and type-check steps. See [`.github/workflows/code-quality-tests-build.yml`](../../.github/workflows/code-quality-tests-build.yml).
