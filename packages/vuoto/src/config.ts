import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

/**
 * @property {string[]} [exclude] Glob patterns to exclude from processing.
 */
export type Config = {
  exclude?: string[];
};

/**
 * Default built-in ignore patterns.
 * These are always applied in addition to user config.
 */
const BUILTIN_IGNORES: string[] = [
  'node_modules/**',
  '**/*.{png,jpg,jpeg,gif,svg,webp,avif}',
  '**/*.{mp4,mov,avi,mkv}',
  '**/*.{mp3,wav,ogg,flac}',
];

/**
 * Load user configuration file if present.
 */
export async function loadConfig(): Promise<Partial<Config>> {
  const roots = [
    path.resolve(process.cwd(), 'vuoto.config.js'),
    path.resolve(process.cwd(), '.config/vuoto.config.js'),
  ];

  for (const p of roots) {
    try {
      await fs.access(p);
      const mod = await import(pathToFileURL(p).href);
      return mod.default ?? mod;
    } catch {
      // ignore not found or import errors
    }
  }
  return {};
}

/**
 * Merge built-in and user config.
 */
export async function resolveConfig(): Promise<Config> {
  const user = await loadConfig();
  return {
    exclude: [...BUILTIN_IGNORES, ...(user.exclude ?? [])],
  };
}
