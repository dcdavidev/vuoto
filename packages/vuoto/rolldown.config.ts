import { defineConfig } from 'rolldown';

import pkg from './package.json' with { type: 'json' };

interface PackageJson {
  dependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
}

const packageJson = pkg as PackageJson;

const external = [
  ...Object.keys(packageJson.dependencies ?? {}),
  ...Object.keys(packageJson.peerDependencies ?? {}),
  /^node:/,
];

export default defineConfig({
  input: {
    index: 'src/index.ts',
    cli: 'src/cli.ts',
    consts: 'src/consts.ts',
  },
  output: {
    dir: 'dist',
    format: 'esm',
    entryFileNames: '[name].js',
    chunkFileNames: 'chunks/[name]-[hash].js',
  },
  external,
  resolve: {
    conditionNames: ['import'],
  },
});
