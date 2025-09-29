import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

import fg from 'fast-glob';

import { DEFAULT_IGNORES } from '../consts.js';
import { collectGitignores } from '../helpers/collect-gitignores.js';
import { resolveConfig } from '../helpers/resolve-config.js';
import { normalize } from '../normalize.js';
import { RunNormalizeOptions } from '../types/normalize-options.js';

/**
 * Main logic: load config, collect files, run normalize.
 */
export async function runNormalize(
  options: RunNormalizeOptions
): Promise<void> {
  // load config and ignores
  const config = await resolveConfig();
  const gitignorePatterns = await collectGitignores(process.cwd());
  const ignore = [
    ...DEFAULT_IGNORES,
    ...gitignorePatterns,
    ...(config.exclude ?? []),
    ...(options.exclude ?? []),
  ];

  const files = await fg(options.patterns, {
    cwd: process.cwd(),
    absolute: true,
    ignore,
    dot: true,
    onlyFiles: true,
  });

  if (files.length === 0) {
    console.error('No files matched the given patterns');
    process.exitCode = 1;
    return;
  }

  let hadIssues = false;
  for (const file of files) {
    const relPath = path.relative(process.cwd(), file);
    const source = await fs.readFile(file, 'utf8');
    const fixed = normalize(source);

    if (options.fix) {
      if (source !== fixed) {
        await fs.writeFile(file, fixed, 'utf8');
        console.log(`👌 fixed ${relPath}`);
      }
    } else {
      if (source !== fixed) {
        hadIssues = true;
        console.log(`💀 ${relPath} has whitespace issues`);
      }
    }
  }

  if (hadIssues) {
    process.exitCode = 1;
  }
}
