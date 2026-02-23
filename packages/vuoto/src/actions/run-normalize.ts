import fsp from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

import chalk from 'chalk';
import fg from 'fast-glob';

import { resolveIgnores } from '../helpers/index.js';
import { normalize } from '../normalize.js';
import { RunNormalizeOptions } from '../types/index.js';

/**
 * Main logic: load .vuotoignore, collect files, run normalize with enhanced output.
 * @param options The options for running the normalization.
 * @example
 * await runNormalize({ patterns: ['*.ts'] });
 */
export async function runNormalize(
  options: RunNormalizeOptions
): Promise<void> {
  const { silent = false, verbose = false } = options;

  if (verbose && !silent) {
    console.log(chalk.dim('Loading .vuotoignore patterns...'));
  }

  // load ignore patterns from .vuotoignore and defaults
  const ignore = [
    ...(await resolveIgnores(process.cwd())),
    ...(options.exclude ?? []),
  ];

  if (verbose && !silent) {
    console.log(chalk.dim(`Scanning patterns: ${options.patterns.join(', ')}`));
    console.log(chalk.dim(`Ignoring ${ignore.length} patterns`));
  }

  const files = await fg(options.patterns, {
    cwd: process.cwd(),
    absolute: true,
    ignore,
    dot: true,
    onlyFiles: true,
  });

  if (files.length === 0) {
    if (!silent) {
      console.error(chalk.yellow('⚠'), 'No files matched the given patterns');
    }
    process.exitCode = 1;
    return;
  }

  if (verbose && !silent) {
    console.log(chalk.dim(`Found ${files.length} file(s) to process\n`));
  }

  let hadIssues = false;
  let fixedCount = 0;
  let checkedCount = 0;

  for (const file of files) {
    const relPath = path.relative(process.cwd(), file);
    const source = await fsp.readFile(file, 'utf8');
    const fixed = normalize(source);

    if (options.fix) {
      if (source !== fixed) {
        await fsp.writeFile(file, fixed, 'utf8');
        fixedCount++;
        if (!silent) {
          console.log(
            chalk.greenBright('✓'),
            chalk.dim('fixed'),
            chalk.cyanBright(relPath)
          );
        }
      } else if (verbose && !silent) {
        console.log(chalk.dim('·'), chalk.dim('clean'), chalk.dim(relPath));
      }
    } else {
      checkedCount++;
      if (source !== fixed) {
        hadIssues = true;
        if (!silent) {
          console.log(
            chalk.redBright('✗'),
            chalk.dim('issues'),
            chalk.yellowBright(relPath)
          );
        }
      } else if (verbose && !silent) {
        console.log(chalk.dim('·'), chalk.dim('clean'), chalk.dim(relPath));
      }
    }
  }

  // Summary
  if (!silent) {
    console.log(); // blank line
    if (options.fix) {
      if (fixedCount > 0) {
        console.log(
          chalk.greenBright.bold('✨ Success:'),
          `Fixed ${chalk.bold(fixedCount)} file(s)`
        );
      } else {
        console.log(
          chalk.greenBright.bold('✨ Success:'),
          `All ${chalk.bold(files.length)} file(s) are already clean!`
        );
      }
    } else {
      if (hadIssues) {
        console.log(
          chalk.redBright.bold('✗ Issues:'),
          `Found whitespace issues in ${chalk.bold(files.length - checkedCount)} file(s)`,
          chalk.dim('\n  (run with --fix to resolve)')
        );
      } else {
        console.log(
          chalk.greenBright.bold('✨ Success:'),
          `All ${chalk.bold(checkedCount)} file(s) are clean!`
        );
      }
    }
  }

  if (hadIssues && !options.fix) {
    process.exitCode = 1;
  }
}
