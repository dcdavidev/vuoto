#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { Command } from 'commander';

import { expandPatterns } from './actions/expand-patterns.js';
import { initConfig } from './actions/init-config.js';
import { runNormalize } from './actions/run-normalize.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pkg = JSON.parse(
  readFileSync(path.resolve(__dirname, '../package.json'), 'utf8')
);

const program = new Command();

program
  .name('vuoto')
  .description('Whitespace normalizer CLI')
  .version(pkg.version)
  .argument('[patterns...]', 'files or globs to normalize (default: .)')
  .option('--fix', 'apply fixes to the files')
  .option(
    '--exclude <globs...>',
    'glob patterns to exclude (like in .gitignore)'
  )
  .option('--init', 'generate a default vuoto.config')
  .action(async (patterns: string[], options) => {
    if (options.init) {
      await initConfig();
      return;
    }

    if (!patterns || patterns.length === 0) patterns = ['.'];
    const expanded = await expandPatterns(patterns);

    await runNormalize({
      patterns: expanded,
      fix: options.fix,
      exclude: options.exclude,
    });
  });

program.parse();
