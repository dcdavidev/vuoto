# 7. Centralize Unicode Definitions in vuoto/consts

Date: 2026-10-21

## Status

Accepted

## Context

Vuoto operates across multiple layers: core string normalizers, file scanners, diagnostic analyzers, and ESLint rule implementations. If regular expression patterns or character mappings were duplicated across packages, inconsistencies would emerge regarding which characters are recognized, fixed, or reported.

## Decision

We established [`packages/vuoto/src/consts.ts`](../../packages/vuoto/src/consts.ts) as the **Single Source of Truth (SSOT)** for all Unicode character definitions:

1. **Named RegExp Constants**: Exported constants for character classes (`BYTE_ORDER_MARK`, `ZERO_WIDTH`, `NON_BREAKING_SPACE`, `ALL_PROBLEMATIC_WHITESPACE`, etc.).
2. **`UNICODE_NAME_MAP`**: Complete mapping of Unicode characters to their human-readable standard names (e.g., `U+200B` -> `ZERO WIDTH SPACE`).
3. **Workspace Consumption**: `eslint-plugin-vuoto` imports constants directly from `vuoto/consts`, ensuring perfect synchronization between CLI and ESLint rule behavior.

## Consequences

### Positive

- Zero divergence between CLI batch fixes and ESLint in-editor diagnostics.
- Adding or updating a character definition updates both tools simultaneously.
- Clear, centralized documentation of all supported Unicode anomalies.

### Negative or Trade-offs

- `eslint-plugin-vuoto` maintains a workspace dependency on `vuoto`.
