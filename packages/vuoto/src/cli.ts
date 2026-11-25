#!/usr/bin/env node
import path from 'node:path';
import process from 'node:process';

import { run } from './command.js';

const entrypoint = process.argv[1] ? path.basename(process.argv[1]) : '';
const isDirectExecution = ['vuoto', 'vuoto.cmd', 'cli.js', 'cli.ts'].includes(
  entrypoint
);

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
