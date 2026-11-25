import fsp from 'node:fs/promises';
import path from 'node:path';

import chalk from 'chalk';

import { VUOTO_CONFIG_FILENAME } from '../consts.js';
import { isNodeError } from '../helpers/instance-of-node-error.js';
import { loadVuotoConfig } from '../helpers/load-config.js';
import type { InitConfigOptions } from '../types/index.js';

/* eslint-disable unicorn/prefer-options-parameter -- Preserve the existing public API. */
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

const DEFAULT_VUOTO_CONFIG_TEMPLATE = `{
  "ignore": []
}
`;

/**
 * Initialize a Vuoto JSON config file in the target directory.
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
  const targetPath = path.join(cwd, VUOTO_CONFIG_FILENAME);
  const { silent = false, force = false } = options;
  const existingConfig = await loadVuotoConfig(cwd);

  let hasTarget = false;
  try {
    await fsp.access(targetPath);
    hasTarget = true;
  } catch (error) {
    if (!isNodeError(error) || error.code !== 'ENOENT') {
      throw error;
    }
  }

  if (!force && (existingConfig || hasTarget)) {
    const existingPath = existingConfig?.filepath ?? targetPath;
    if (!silent) {
      console.log(
        chalk.yellow('ℹ'),
        `Vuoto config already exists at ${chalk.dim(existingPath)}`
      );
    }
    return { created: false, path: existingPath };
  }

  await fsp.writeFile(targetPath, DEFAULT_VUOTO_CONFIG_TEMPLATE, 'utf8');

  if (!silent) {
    console.log(
      chalk.greenBright('✨ Created'),
      chalk.cyanBright(VUOTO_CONFIG_FILENAME),
      chalk.dim(`at ${targetPath}`)
    );
  }

  return { created: true, path: targetPath };
}
/* eslint-enable unicorn/prefer-options-parameter */
