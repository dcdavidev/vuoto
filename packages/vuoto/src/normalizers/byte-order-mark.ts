import { BYTE_ORDER_MARK } from '../consts.js';

/**
 * Removes byte order mark (U+FEFF).
 * @param input The string to normalize.
 *
 * @returns The normalized string.
 *
 * @example
 *
 * ```ts
 * const normalized = normalizeByteOrderMark('\uFEFFHello'); // 'Hello'
 * ```
 */
export function normalizeByteOrderMark(input: string): string {
  return input.replaceAll(BYTE_ORDER_MARK, '');
}
