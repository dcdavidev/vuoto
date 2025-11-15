import { FORM_FEED } from '../consts.js';

/**
 * Replaces form feed (U+000C) with a newline.
 * @param input The string to normalize.
 *
 * @returns The normalized string.
 *
 * @example
 *
 * ```ts
 * const normalized = normalizeFormFeed('Hello\fWorld'); // 'Hello\nWorld'
 * ```
 */
export function normalizeFormFeed(input: string): string {
  return input.replaceAll(FORM_FEED, '\n');
}
