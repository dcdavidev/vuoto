# 6. Adopt ESLint 9+ Flat Configs for Linting

Date: 2026-10-21

## Status

Accepted

## Context

ESLint introduced the Flat Config system (`eslint.config.js` / `eslint.config.mjs`) in version 9 as the modern standard, deprecating legacy `.eslintrc.*` formats.

We needed our linting architecture to:

- Dogfood ESLint 9+ internally using modern flat configs.
- Provide first-class flat config presets from `eslint-plugin-vuoto`.
- Ensure rules are easily composable without requiring users to manually register `plugins: { vuoto }` boilerplate.

## Decision

We fully adopted **ESLint 9+ Flat Configs**:

1. **Dogfooding with Spellbookx**: Root linting uses `eslint-plugin-spellbookx` (`recommended-spellcheck`) with `defineConfig` from `eslint/config`.
2. **Self-Registering Plugin Presets**: `eslint-plugin-vuoto` presets (`recommended`, `strict`, `all`, `off`) bind `plugins: { vuoto: plugin }` directly inside config objects, allowing consumers to simply spread `...vuoto.configs.recommended`.
3. **AST Skip Options**: Enhanced `createWhitespaceRule` with `skipComments`, `skipStrings`, `skipTemplates`, and `skipJSXText` for granular rule customization.

## Consequences

### Positive

- Clean, type-safe configuration without legacy plugin loading magic.
- Simplified onboarding for users on ESLint 9+.
- Future-proof linting pipeline aligned with ESLint's long-term roadmap.

### Negative or Trade-offs

- Projects still using legacy ESLint 8 `.eslintrc.*` must migrate to flat config or manually configure rule mappings.
