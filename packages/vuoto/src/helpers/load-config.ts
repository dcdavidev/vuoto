import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { VUOTO_CONFIG_PATHS } from '../consts.js';
import type { Config } from '../types/config.js';

/**
 * Try to load the first existing user config file.
 */
export async function loadConfig(): Promise<Partial<Config>> {
  for (const candidate of VUOTO_CONFIG_PATHS) {
    const absPath = path.resolve(process.cwd(), candidate);
    try {
      await fs.access(absPath);
      const mod = await import(pathToFileURL(absPath).href);
      return mod.default ?? mod;
    } catch {
      // ignore errors, keep searching
    }
  }
  return {};
}
