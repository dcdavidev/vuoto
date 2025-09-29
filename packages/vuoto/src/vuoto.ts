#!/usr/bin/env node
import { Command } from 'commander';

import pkg from '../package.json' with { type: 'json' };
import { initConfig } from './actions/init-config.js';
import { expandPatterns } from './actions/expand-patterns.js';
import { runNormalize } from './actions/run-normalize.js';

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
