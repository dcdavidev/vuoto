# spellbookx turbo-morepo-template

This is a starter template for a monorepo using [Turborepo](https://turbo.build/). It comes pre-configured with the excellent [Spellbookx](https://github.com/spellbookx/spellbookx) configurations for linting, formatting, and more, allowing you to bootstrap a new project quickly with solid defaults.

## Getting Started

To create a new repository based on this template, you can use the `create-turbo` command with the `--example` flag, pointing to this GitHub repository.

```bash
npx create-turbo@latest --example https://github.com/spellbookx/turbo-monorepo-template
```

This will scaffold a new project in a directory of your choice.

## What's Inside?

This template sets up a Turborepo monorepo with:

- [ESLint](https://eslint.org/) configured using `@spellbookx/eslint-config`.
- [Prettier](https://prettier.io/) configured using `@spellbookx/prettier-config`.
- [TypeScript](https://www.typescriptlang.org/) configs based on `@spellbookx/typescript-config`.
- Commit linting with [Commitlint](https://commitlint.js.org/) and `@spellbookx/commitlint-config`.
- [CSpell](https://cspell.org/) for spell checking.
- [Lefthook](https://github.com/evilmartians/lefthook) as a Git hooks manager.
- [Release It!](https://github.com/release-it/release-it) for automated releases.

## License

This project is licensed under the MIT License.

**Copyright (c) 2026 Davide Di Criscito**

For the full details, see the [LICENSE](LICENSE) file.
