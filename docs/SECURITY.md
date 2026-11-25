# Security Policy

## Supported Versions

Only the latest published release of the affected Vuoto package receives security updates.

| Package               | Version  | Supported          |
| :-------------------- | :------- | :----------------- |
| `vuoto`               | `latest` | :white_check_mark: |
| `eslint-plugin-vuoto` | `latest` | :white_check_mark: |
| Both packages         | Older    | :x:                |

## Reporting a Vulnerability

**Do not report security vulnerabilities through public GitHub issues, discussions, or pull requests.**

Instead, please report them privately using one of the following channels:

1. **GitHub Security Advisories (preferred)**: open a private report at [github.com/dcdavidev/vuoto/security/advisories/new](https://github.com/dcdavidev/vuoto/security/advisories/new).
2. **Email**: send details to `info@dcdavidev.me`.

### What to Include

To help us investigate and resolve the issue quickly, please include:

- A clear description of the vulnerability and its potential impact.
- Affected package(s), version(s), Node.js version, and pnpm version.
- Minimal steps to reproduce or a proof-of-concept.
- Any suggested fix or mitigation, if you have one.

## Response Process

- **Acknowledgment**: we aim to acknowledge receipt of your report within **3 business days**.
- **Assessment**: we will investigate the report, confirm the scope and severity, and keep you updated on progress.
- **Resolution & Disclosure**: once a fix is ready, we will publish a patched release and coordinate public disclosure (such as a GitHub Security Advisory) with you.

## Scope

This policy covers the `vuoto` and `eslint-plugin-vuoto` packages, their configuration files, and the maintenance scripts in this repository. For vulnerabilities in upstream dependencies (such as ESLint, Prettier, Turborepo, or `spellbookx` preset packages), please also consider reporting them directly to the respective upstream project.
