import fsp from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

import chalk from 'chalk';
import fg from 'fast-glob';

import { findWhitespaceIssues } from '../analyze.js';
import { resolveIgnores } from '../helpers/index.js';
import { normalize } from '../normalize.js';
import type {
  FileNormalizeResult,
  RunNormalizeOptions,
  RunNormalizeResult,
} from '../types/index.js';

/**
 * Main logic: load .vuotoignore, collect files, run normalize with enhanced output.
 * @param options The options for running the normalization.
 * @returns The structured execution result.
 * @example
 * ```ts
 * const result = await runNormalize({ patterns: ['*.ts'] });
 * console.log(`Issues found: ${result.issuesCount}`);
 * ```
 */
export async function runNormalize(
  options: RunNormalizeOptions
): Promise<RunNormalizeResult> {
  const {
    silent = false,
    verbose = false,
    fix = false,
    gitignore = true,
    exitOnError = false,
    normalizeOptions,
  } = options;

  if (verbose && !silent) {
    console.log(chalk.dim('Resolving ignore patterns...'));
  }

  // Load ignore patterns from .vuotoignore, .gitignore, and defaults
  const resolvedIgnores = await resolveIgnores(process.cwd(), {
    includeGitignore: gitignore,
  });
  const ignore = [...resolvedIgnores, ...(options.exclude ?? [])];

  if (verbose && !silent) {
    console.log(chalk.dim(`Scanning patterns: ${options.patterns.join(', ')}`));
    console.log(chalk.dim(`Active ignore patterns: ${ignore.length}`));
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
    if (exitOnError) {
      process.exitCode = 1;
    }
    return {
      totalFiles: 0,
      checkedCount: 0,
      fixedCount: 0,
      issuesCount: 0,
      cleanCount: 0,
      hasIssues: false,
      files: [],
    };
  }

  if (verbose && !silent) {
    console.log(chalk.dim(`Found ${files.length} file(s) to process\n`));
  }

  const fileResults: FileNormalizeResult[] = [];
  let fixedCount = 0;
  let issuesCount = 0;
  let cleanCount = 0;

  for (const file of files) {
    const relPath = path.relative(process.cwd(), file) || file;
    try {
      const source = await fsp.readFile(file, 'utf8');
      const fixed = normalize(source, normalizeOptions);
      const fileHasIssues = source !== fixed;

      if (fileHasIssues) {
        issuesCount++;
        const issues =
          verbose || !fix ? findWhitespaceIssues(source) : undefined;

        if (fix) {
          await fsp.writeFile(file, fixed, 'utf8');
          fixedCount++;

          if (!silent) {
            console.log(
              chalk.greenBright('✓'),
              chalk.dim('fixed'),
              chalk.cyanBright(relPath)
            );
          }

          fileResults.push({
            filePath: file,
            relativeFilePath: relPath,
            fixed: true,
            hasIssues: true,
            issuesCount: issues?.length ?? 1,
            issues,
          });
        } else {
          if (!silent) {
            console.log(
              chalk.redBright('✗'),
              chalk.dim('issues'),
              chalk.yellowBright(relPath)
            );

            if (verbose && issues && issues.length > 0) {
              for (const issue of issues) {
                console.log(
                  chalk.dim(
                    `    Line ${issue.line}:${issue.column} - ${issue.name} (${issue.codePoint})`
                  )
                );
              }
            }
          }

          fileResults.push({
            filePath: file,
            relativeFilePath: relPath,
            fixed: false,
            hasIssues: true,
            issuesCount: issues?.length ?? 1,
            issues,
          });
        }
      } else {
        cleanCount++;
        if (verbose && !silent) {
          console.log(chalk.dim('·'), chalk.dim('clean'), chalk.dim(relPath));
        }

        fileResults.push({
          filePath: file,
          relativeFilePath: relPath,
          fixed: false,
          hasIssues: false,
          issuesCount: 0,
        });
      }
    } catch (error_) {
      const error =
        error_ instanceof Error ? error_ : new Error(String(error_));
      if (!silent) {
        console.error(
          chalk.red('✗'),
          chalk.dim('error reading'),
          chalk.redBright(relPath),
          chalk.dim(`(${error.message})`)
        );
      }
      fileResults.push({
        filePath: file,
        relativeFilePath: relPath,
        fixed: false,
        hasIssues: false,
        issuesCount: 0,
        error,
      });
    }
  }

  // Summary
  if (!silent) {
    console.log(); // Blank line separator
    if (fix) {
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
      if (issuesCount > 0) {
        console.log(
          chalk.redBright.bold('✗ Issues:'),
          `Found whitespace issues in ${chalk.bold(issuesCount)} file(s)`,
          chalk.dim('\n  (run with --fix to resolve)')
        );
      } else {
        console.log(
          chalk.greenBright.bold('✨ Success:'),
          `All ${chalk.bold(cleanCount)} file(s) are clean!`
        );
      }
    }
  }

  const result: RunNormalizeResult = {
    totalFiles: files.length,
    checkedCount: files.length,
    fixedCount,
    issuesCount,
    cleanCount,
    hasIssues: issuesCount > 0,
    files: fileResults,
  };

  if (!fix && exitOnError && result.hasIssues) {
    process.exitCode = 1;
  }

  return result;
}
