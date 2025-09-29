import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/config.ts',
    'src/normalize.ts',
    'src/normalizers/index.ts',
  ],
  platform: 'node',
  format: ['esm', 'cjs'],
  dts: { build: true },
  clean: true,
  outDir: 'dist',
  sourcemap: true,
});
