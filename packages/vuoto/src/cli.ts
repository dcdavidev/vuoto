#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

import chalk from 'chalk';
import { Command } from 'commander';

import { expandPatterns, initConfig, runNormalize } from './actions/index.js';

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const pkg = JSON.parse(
  readFileSync(path.resolve(currentDir, '../package.json'), 'utf8')
);

const program = new Command();

program
  .name('vuoto')
  .description(
    chalk.cyanBright.bold(
      '✨ Modern whitespace normalizer for cleaner codebases'
    )
  )
  .version(pkg.version, '-v, --version', 'output the current version')
  .helpOption('-h, --help', 'display help for command');

// Subcommand: init
program
  .command('init')
  .description('create a .vuotoignore configuration file with smart defaults')
  .option('-f, --force', 'overwrite existing .vuotoignore if it exists')
  .option('--silent', 'suppress all output')
  .action(async (options: { force?: boolean; silent?: boolean }) => {
    try {
      await initConfig(process.cwd(), {
        force: options.force,
        silent: options.silent,
      });
    } catch (error) {
      console.error(
        chalk.red('✗ Error initializing config:'),
        error instanceof Error ? error.message : String(error)
      );
      process.exitCode = 1;
    }
  });

// Main check / fix action
program
  .argument('[patterns...]', 'files or globs to normalize (default: .)')
  .option('--fix', 'apply fixes to the files')
  .option('-c, --check', 'check files for issues without modifying (default)')
  .option(
    '--exclude <globs...>',
    'glob patterns to exclude (like in .gitignore)'
  )
  .option('--no-gitignore', 'do not read ignore patterns from .gitignore')
  .option('--verbose', 'show detailed output with line/col coordinates')
  .option('--silent', 'suppress all output except errors')
  .addHelpText(
    'after',
    `
${chalk.bold('Examples:')}
  ${chalk.gray('# Check all files in current directory')}
  ${chalk.cyanBright('$ vuoto')}

  ${chalk.gray('# Fix all files in current directory')}
  ${chalk.cyanBright('$ vuoto --fix')}

  ${chalk.gray('# Fix all TypeScript files')}
  ${chalk.cyanBright('$ vuoto "src/**/*.ts" --fix')}

  ${chalk.gray('# Check files with detailed issue coordinates')}
  ${chalk.cyanBright('$ vuoto --verbose')}

  ${chalk.gray('# Check specific files excluding tests')}
  ${chalk.cyanBright('$ vuoto src/ --exclude "**/*.test.ts"')}

  ${chalk.gray('# Scaffold a .vuotoignore file')}
  ${chalk.cyanBright('$ vuoto init')}

${chalk.bold('Configuration:')}
  Create a ${chalk.cyanBright('.vuotoignore')} file with patterns to exclude (one per line).
  Vuoto also automatically respects root ${chalk.cyanBright('.gitignore')} files.

${chalk.bold('Learn more:')} ${chalk.blueBright('https://github.com/dcdavidev/vuoto')}
`
  )
  .action(
    async (
      patterns: string[],
      options: {
        fix?: boolean;
        check?: boolean;
        exclude?: string[];
        gitignore?: boolean;
        verbose?: boolean;
        silent?: boolean;
      }
    ) => {
      try {
        let targets = patterns;
        if (!targets || targets.length === 0) {
          targets = ['.'];
        }

        if (options.verbose && !options.silent) {
          console.log(chalk.dim(`Expanding patterns: ${targets.join(', ')}`));
        }

        const expanded = await expandPatterns(targets);

        if (options.verbose && !options.silent) {
          console.log(chalk.dim(`Resolved to: ${expanded.join(', ')}`));
        }

        const result = await runNormalize({
          patterns: expanded,
          fix: options.fix,
          exclude: options.exclude,
          gitignore: options.gitignore,
          verbose: options.verbose,
          silent: options.silent,
        });

        if (result.hasIssues && !options.fix) {
          process.exitCode = 1;
        }
      } catch (error) {
        console.error(
          chalk.red('✗ Error:'),
          error instanceof Error ? error.message : String(error)
        );
        process.exitCode = 1;
      }
    }
  );

// Add custom error handling
program.exitOverride((err) => {
  throw err;
});

/**
 * Run the vuoto CLI program.
 * @param argv Command line arguments to parse (defaults to process.argv).
 * @example
 * ```ts
 * run();
 * ```
 */
export function run(argv?: readonly string[]): void {
  program.parse(argv ? [...argv] : process.argv);
}

// Check if directly executed
const isDirectExecution =
  process.argv[1] &&
  (process.argv[1].endsWith('/vuoto') ||
    process.argv[1].endsWith('/cli.js') ||
    process.argv[1].endsWith('/cli.ts') ||
    process.argv[1].includes('node_modules/.bin/vuoto'));

if (isDirectExecution) {
  try {
    run();
  } catch (error_) {
    const error = error_ as { code?: string };
    if (error.code === 'commander.help' || error.code === 'commander.version') {
      // clean exit
    } else {
      process.exitCode = 1;
    }
  }
}
