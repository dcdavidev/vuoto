import fsp from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import chalk from 'chalk';

import { VUOTO_IGNORE_FILENAME } from '../consts.js';
import type { InitConfigOptions } from '../types/index.js';

/**
 * Result returned by initConfig.
 */
export interface InitConfigResult {
  /**
  Whether a new file was created.
  */
  created: boolean;
  /**
  Full path to the resolved configuration file.
  */
  path: string;
}

const DEFAULT_VUOTOIGNORE_TEMPLATE = `# Vuoto Ignore File
# Add patterns here to exclude files from whitespace normalization
# One pattern per line, like .gitignore

# Build outputs
dist/**
build/**
.next/**
.nuxt/**
out/**

# Dependencies
node_modules/

# Compiled files
*.min.js
*.min.css
*.bundle.js

# Lock files
package-lock.json
pnpm-lock.yaml
yarn.lock
bun.lockb

# Logs
*.log
`;

/**
 * Initialize a .vuotoignore file in the target directory.
 * @param cwd Current working directory (defaults to process.cwd()).
 * @param options Configuration options.
 * @returns Object indicating if created and file path.
 * @example
 * ```ts
 * await initConfig();
 * ```
 */
export async function initConfig(
  cwd: string = process.cwd(),
  options: InitConfigOptions = {}
): Promise<InitConfigResult> {
  const targetPath = path.join(cwd, VUOTO_IGNORE_FILENAME);
  const { silent = false, force = false } = options;

  let exists = false;
  try {
    await fsp.access(targetPath);
    exists = true;
  } catch {
    // File does not exist
  }

  if (exists && !force) {
    if (!silent) {
      console.log(
        chalk.yellow('ℹ'),
        `${chalk.cyanBright(VUOTO_IGNORE_FILENAME)} already exists at ${chalk.dim(targetPath)}`
      );
    }
    return { created: false, path: targetPath };
  }

  let content = DEFAULT_VUOTOIGNORE_TEMPLATE;
  try {
    const currentDir = path.dirname(fileURLToPath(import.meta.url));
    const assetPath = path.resolve(currentDir, '../../assets/.vuotoignore');
    content = await fsp.readFile(assetPath, 'utf8');
  } catch {
    // Fall back to template string if asset file is unavailable
  }

  await fsp.writeFile(targetPath, content, 'utf8');

  if (!silent) {
    console.log(
      chalk.greenBright('✨ Created'),
      chalk.cyanBright(VUOTO_IGNORE_FILENAME),
      chalk.dim(`at ${targetPath}`)
    );
  }

  return { created: true, path: targetPath };
}
