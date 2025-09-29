import { INVISIBLE_SEPARATORS } from '../consts.js';

/**
 * Normalizes *invisible* separators and joiners
 * (characters that act as whitespace/control but are not visible).
 *
 * Includes: U+2060 (word joiner), U+FEFF (zero width no-break space).
 */
export function normalizeInvisibleSeparators(input: string): string {
  return input.replaceAll(INVISIBLE_SEPARATORS, ' ');
}
