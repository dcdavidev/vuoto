import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: [
    'src/helpers/index.ts',
    'src/normalizers/index.ts',
    'src/index.ts',
    'src/vuoto.ts',
  ],
  platform: 'node',
  format: ['esm', 'cjs'],
  dts: { build: true },
  clean: true,
  outDir: 'dist',
  sourcemap: true,
});
