import { VERTICAL_TAB } from '../consts.js';

/**
 * Replaces vertical tab with a newline.
 * @param input The string to normalize.
 *
 * @returns The normalized string.
 *
 * @example
 *
 * ```ts
 * const normalized = normalizeVerticalTab('Hello\vWorld'); // 'Hello\nWorld'
 * ```
 */
export function normalizeVerticalTab(input: string): string {
  return input.replaceAll(VERTICAL_TAB, '\n');
}
