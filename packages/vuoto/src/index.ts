#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

import { Command } from 'commander';
import fg from 'fast-glob';

import pkg from '../package.json' with { type: 'json' };
import { resolveConfig } from './config.js';
import { normalize } from './normalize.js';
import { instanceOfNodeError } from './helpers/instance-of-node-error.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const program = new Command();

program
  .name('vuoto')
  .description('Whitespace normalizer CLI')
  .version(pkg.version)
  .argument('[patterns...]', 'files or globs to normalize (default: .)')
  .option('--fix', 'apply fixes to the files')
  .option('--check', 'exit with code 1 if issues are found')
  .option(
    '--exclude <globs...>',
    'glob patterns to exclude (like in .gitignore)'
  )
  .option('--init', 'generate a default vuoto.config.js')
  .action(async (patterns: string[], options) => {
    // init mode: copy template
    if (options.init) {
      const configPath = path.resolve(process.cwd(), 'vuoto.config.js');
      const templatePath = path.join(__dirname, '../templates/vuoto.config.js');

      try {
        const content = await fs.readFile(templatePath, 'utf8');
        await fs.writeFile(configPath, content, { flag: 'wx' });
        console.log(`👌 Created ${path.relative(process.cwd(), configPath)}`);
      } catch (err: unknown) {
        if (instanceOfNodeError(err, Error) && err.code === 'EEXIST') {
          console.error(`🤦‍♂️ vuoto.config.js already exists`);
        } else {
          throw err;
        }
      }
      return;
    }

    // default to current directory
    if (!patterns || patterns.length === 0) patterns = ['.'];

    // expand directories into globs
    const expanded: string[] = [];
    for (const p of patterns) {
      if (/[*?[\]{}()!+@]/.test(p)) {
        expanded.push(p);
        continue;
      }
      try {
        const abs = path.resolve(process.cwd(), p);
        const st = await fs.stat(abs);
        if (st.isDirectory()) {
          const rel = path.relative(process.cwd(), abs) || '.';
          expanded.push(
            rel === '.' ? '**/*' : `${rel.replaceAll('\\', '/')}/**/*`
          );
          continue;
        }
      } catch {
        // not a real path, keep original
      }
      expanded.push(p);
    }

    // load config
    const config = await resolveConfig();
    const ignore = [...(config.exclude ?? []), ...(options.exclude ?? [])];

    const files = await fg(expanded, {
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
        await fs.writeFile(file, fixed, 'utf8');
        console.log(`👌 fixed ${relPath}`);
      } else if (source !== fixed) {
        hadIssues = true;
        console.log(`💀 ${relPath} has whitespace issues`);
      } else {
        console.log(`👌 ${relPath} is clean`);
      }
    }

    if (options.check && hadIssues) {
      process.exitCode = 1;
    }
  });

program.parse();
