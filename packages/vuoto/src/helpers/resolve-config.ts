import { DEFAULT_IGNORES } from '../consts.js';
import type { Config } from '../types/config.js';
import { loadConfig } from './load-config.js';

/**
 * Merge built-in ignores with user config.
 */
export async function resolveConfig(): Promise<Config> {
  const user = await loadConfig();
  return {
    exclude: [...DEFAULT_IGNORES, ...(user.exclude ?? [])],
  };
}
