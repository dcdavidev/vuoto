#!/usr/bin/env node
import { Command } from 'commander';
import fs from 'node:fs/promises';
import process from 'node:process';
import fg from 'fast-glob';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { normalize } from './normalize.js';
import pkg from '../package.json' with { type: 'json' };

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const program = new Command();

const BUILTIN_IGNORES = [
  '**/node_modules/**',
  '**/*.{png,jpg,jpeg,gif,svg,webp,avif}',
  '**/*.{mp4,mov,avi,mkv}',
  '**/*.{mp3,wav,ogg,flac}',
];

program
  .name('vuoto')
  .description('Whitespace normalizer CLI')
  .version(pkg.version)
  .argument('[patterns...]', 'files or globs to normalize (default: .)')
  .option('--fix', 'apply fixes to the files')
  .option('--check', 'exit with code 1 if issues are found')
  .option(
    '--exclude <globs...>',
    'glob patterns to exclude (like in .gitignore)',
  )
  .option('--init', 'generate a default vuoto.config.js')
  .action(async (patterns: string[], options) => {
    // init mode
    if (options.init) {
      const configPath = path.resolve(process.cwd(), 'vuoto.config.js');
      const templatePath = path.join(__dirname, '../templates/vuoto.config.js');

      try {
        const content = await fs.readFile(templatePath, 'utf8');
        await fs.writeFile(configPath, content, { flag: 'wx' });
        console.log(`✅ Created ${path.relative(process.cwd(), configPath)}`);
      } catch (err: any) {
        if (err.code === 'EEXIST') {
          console.error(`⚠️ vuoto.config.js already exists`);
        } else {
          throw err;
        }
      }
      return;
    }

    // normal run
    if (patterns.length === 0) patterns = ['.'];

    const files = await fg(patterns, {
      cwd: process.cwd(),
      absolute: true,
      ignore: [...BUILTIN_IGNORES, ...(options.exclude || [])],
      dot: true,
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
