import { defineConfig } from 'rolldown'
import pkg from './package.json' with { type: 'json' }

const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
  /^node:/
]

export default defineConfig({
  input: {
    index: 'src/index.ts',
    'bin/setup': 'src/bin/setup.ts'
  },
  output: {
    dir: 'dist',
    format: 'esm',
    entryFileNames: '[name].js',
    chunkFileNames: 'chunks/[name]-[hash].js'
  },
  external,
  resolve: {
    conditionNames: ['import']
  }
})
