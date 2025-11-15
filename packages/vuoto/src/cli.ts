import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import chalk from 'chalk';
import { Command } from 'commander';

import { expandPatterns, runNormalize } from './actions/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pkg = JSON.parse(
  readFileSync(path.resolve(__dirname, '../package.json'), 'utf8')
);

const program = new Command();

program
  .name('vuoto')
  .description(
    chalk.cyan('✨ Modern whitespace normalizer for cleaner codebases')
  )
  .version(pkg.version, '-v, --version', 'output the current version')
  .helpOption('-h, --help', 'display help for command')
  .argument('[patterns...]', 'files or globs to normalize (default: .)')
  .option('--fix', 'apply fixes to the files')
  .option(
    '--exclude <globs...>',
    'glob patterns to exclude (like in .gitignore)'
  )
  .option('--verbose', 'show detailed output')
  .option('--silent', 'suppress all output except errors')
  .addHelpText(
    'after',
    `
${chalk.bold('Examples:')}
  ${chalk.gray('# Check all files in current directory')}
  ${chalk.green('$ vuoto')}

  ${chalk.gray('# Fix all TypeScript files')}
  ${chalk.green('$ vuoto src/**/*.ts --fix')}

  ${chalk.gray('# Check specific files excluding tests')}
  ${chalk.green('$ vuoto src/ --exclude "**/*.test.ts"')}

${chalk.bold('Configuration:')}
  Create a ${chalk.cyan('.vuotoignore')} file with patterns to exclude (one per line)
  ${chalk.dim('# Example .vuotoignore')}
  ${chalk.dim('dist/**')}
  ${chalk.dim('build/**')}
  ${chalk.dim('*.min.js')}

${chalk.bold('Learn more:')} ${chalk.blue('https://github.com/dcdavidev/vuoto')}
`
  )
  .action(
    async (
      patterns: string[],
      options: {
        fix?: boolean;
        exclude?: string[];
        verbose?: boolean;
        silent?: boolean;
      }
    ) => {
      try {
        if (!patterns || patterns.length === 0) patterns = ['.'];

        if (options.verbose && !options.silent) {
          console.log(chalk.dim(`Expanding patterns: ${patterns.join(', ')}`));
        }

        const expanded = await expandPatterns(patterns);

        if (options.verbose && !options.silent) {
          console.log(chalk.dim(`Resolved to: ${expanded.join(', ')}`));
        }

        await runNormalize({
          patterns: expanded,
          fix: options.fix,
          exclude: options.exclude,
          verbose: options.verbose,
          silent: options.silent,
        });
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
 * @example
 *
 * ```ts
 * run();
 * ```
 */
export function run() {
  program.parse();
}
try {
  run();
} catch (error_) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const error = error_ as any;
  if (error.code === 'commander.help' || error.code === 'commander.version') {
    // clean exit
  } else {
    process.exitCode = 1;
  }
}
