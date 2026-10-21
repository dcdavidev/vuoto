# 3. Use Rolldown and TypeScript for Package Builds

Date: 2026-10-21

## Status

Accepted

## Context

Building JavaScript and TypeScript libraries for distribution requires fast bundling, support for pure ECMAScript Modules (`"type": "module"`), tree-shaking, and accurate type definition (`.d.ts`) generation.

Traditional bundlers (Webpack, standard Rollup) are either slow or require extensive Babel/SWC plugins. Monolithic TypeScript compilation (`tsc`) alone lacks sophisticated bundle chunking and external dependency resolution.

## Decision

We chose **Rolldown** for code bundling paired with **TypeScript (`tsc`)** for type declarations:

1. **Rolldown**: A high-performance, Rust-based bundler with Rollup-compatible configuration API. It produces lean ESM distributions in milliseconds.
2. **`tsc -p tsconfig.json`**: Emits declaration files (`emitDeclarationOnly: true`) alongside `.d.ts.map` source maps without bundling overhead.
3. **Dedicated `__tests__/` Isolation**: Test files are placed outside `src/`, ensuring `tsc` declaration emit only produces clean production types in `dist/`.

## Consequences

### Positive

- Sub-50ms package compilation across the monorepo.
- Clean ESM output targeting Node.js and modern runtimes.
- Zero test declaration artifacts in published npm packages.
- Native `with { type: "json" }` import support.

### Negative or Trade-offs

- Rolldown is in active release-candidate development (`1.0.0-rc.x`), requiring occasional dependency tracking.
