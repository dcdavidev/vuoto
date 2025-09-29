import { VISIBLE_MISC_SPACES } from '../consts.js';

/**
 * Normalizes miscellaneous *visible* Unicode space characters
 * into a standard ASCII space (U+0020).
 *
 * Includes: U+1680, U+180E, U+2000–U+200A, U+205F, U+3000.
 */
export function normalizeVisibleMiscSpaces(input: string): string {
  return input.replaceAll(VISIBLE_MISC_SPACES, ' ');
}
