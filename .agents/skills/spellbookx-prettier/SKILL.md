---
name: spellbookx-prettier
description: Configures and composes Prettier formatting setups using prettier-config-spellbookx. Covers presets (tailwind, astro, svelte, prisma, sql, nginx, multiline-arrays) and the defineSbxConfig composer.
---

# Spellbookx Prettier Skill

This skill guides an AI agent through selecting, composing, and customizing Prettier formatting configurations using **`prettier-config-spellbookx`**.

---

## 1. Available Configurations

`prettier-config-spellbookx` provides 19 presets for web frameworks, database schemas, and configuration formats:

| Preset                        | Description                        | Key Plugins Included                                                     |
| :---------------------------- | :--------------------------------- | :----------------------------------------------------------------------- |
| **`recommended`** _(default)_ | Standard web development setup     | `sh`, `toml`, `ini`, `packagejson`, `properties`, `xml`, `tailwindcss`   |
| **`base`**                    | Multi-language base config         | `sh`, `toml`, `ini`, `packagejson`, `properties`, `@prettier/plugin-xml` |
| **`tailwind`**                | Base + Tailwind CSS class sorting  | `base` + `prettier-plugin-tailwindcss`                                   |
| **`astro`**                   | Base + Astro component formatting  | `base` + `prettier-plugin-astro`                                         |
| **`astro-tailwind`**          | Base + Astro + Tailwind CSS        | `astro` + `prettier-plugin-tailwindcss`                                  |
| **`astro-prisma-tailwind`**   | Full-stack Astro preset            | `astro` + `prisma` + `tailwindcss`                                       |
| **`svelte`**                  | Base + Svelte component formatting | `base` + `prettier-plugin-svelte`                                        |
| **`svelte-tailwind`**         | Base + Svelte + Tailwind CSS       | `svelte` + `prettier-plugin-tailwindcss`                                 |
| **`svelte-prisma-tailwind`**  | Full-stack Svelte preset           | `svelte` + `prisma` + `tailwindcss`                                      |
| **`prisma`**                  | Base + Prisma schema formatting    | `base` + `prettier-plugin-prisma`                                        |
| **`prisma-tailwind`**         | Base + Prisma + Tailwind CSS       | `prisma` + `prettier-plugin-tailwindcss`                                 |
| **`sql`**                     | Base + SQL query/migration format  | `base` + `prettier-plugin-sql`                                           |
| **`nginx`**                   | Base + Nginx config files          | `base` + `prettier-plugin-nginx`                                         |
| **`embed`**                   | Base + embedded template languages | `base` + `prettier-plugin-embed`                                         |
| **`sort-imports`**            | Base + import sorting              | `base` + `@ianvs/prettier-plugin-sort-imports`                           |
| **`multiline-arrays`**        | Base + multiline array formatting  | `base` + `prettier-plugin-multiline-arrays`                              |
| **`all`**                     | Comprehensive setup                | All 15 supported plugins combined                                        |

---

## 2. Quick Setup Recipes

### Default Recommended (Web + Tailwind CSS)

```javascript
// prettier.config.mjs
export { default } from 'prettier-config-spellbookx';
```

### Direct Subpath Export (Framework-Specific)

```javascript
// prettier.config.mjs
export { default } from 'prettier-config-spellbookx/astro-tailwind';
// or:
// export { default } from 'prettier-config-spellbookx/svelte-tailwind';
// export { default } from 'prettier-config-spellbookx/base';
```

---

## 3. Deep Customization with `defineSbxConfig`

When a project requires custom overrides or a specific combination of plugins, use the `defineSbxConfig` composer. It automatically orders plugins by priority to prevent parse conflicts:

```javascript
// prettier.config.mjs
import { defineSbxConfig } from 'prettier-config-spellbookx';

export default defineSbxConfig({
  baseConfig: 'astro-tailwind',
  rules: {
    singleQuote: true,
    semi: true,
    printWidth: 100,
    tabWidth: 2,
  },
  overrides: [
    {
      files: '*.json5',
      options: {
        parser: 'json5',
      },
    },
  ],
});
```

---

## 4. Best Practices & Commands

1. **Format checking in CI**:
   ```bash
   pnpm exec prettier --ignore-unknown --check .
   ```
2. **Auto-formatting in pre-commit / local**:
   ```bash
   pnpm exec prettier --ignore-unknown --write .
   ```
3. **Plugin Ordering**:
   Always let `prettier-config-spellbookx` manage plugin order. Plugins like `prettier-plugin-tailwindcss` must execute at the end of the parser chain; the internal `plugin-priority` utility guarantees this automatically.
