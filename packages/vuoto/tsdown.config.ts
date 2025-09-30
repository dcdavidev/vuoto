import { defineConfig } from 'tsdown';

export default defineConfig([
  // Build libreria core (actions, helpers, normalizers, ecc.)
  {
    entry: [
      'src/actions/index.ts',
      'src/helpers/index.ts',
      'src/normalizers/index.ts',
      'src/types/index.ts',
      'src/consts.ts',
      'src/normalize.ts',
      'src/index.ts',
    ],
    platform: 'node',
    format: ['esm', 'cjs'],
    dts: false,
    clean: true,
    outDir: 'dist',
    sourcemap: true,
  },
  {
    entry: 'src/vuoto.ts',
    platform: 'node',
    format: ['esm'],
    dts: false,
    clean: true,
    outDir: 'bin',
    sourcemap: true,
  },
]);
