/**
 * Default ignore patterns for vuoto
 * (these files/folders are skipped unless explicitly included).
 */
export const DEFAULT_IGNORES: string[] = [
  '**/node_modules/**',
  '.git/**',
  // media files (binary formats unlikely to need normalization)
  '**/*.png',
  '**/*.jpg',
  '**/*.jpeg',
  '**/*.gif',
  '**/*.webp',
  '**/*.avif',
  '**/*.svg',
  '**/*.ico',
  '**/*.mp3',
  '**/*.wav',
  '**/*.ogg',
  '**/*.mp4',
  '**/*.mkv',
  '**/*.avi',
  '**/*.mov',
  '**/*.pdf',
  '**/*.zip',
  '**/*.tar',
  '**/*.gz',
  '**/*.7z',
  '**/*.exe',
  '**/*.dll',
  '**/*.bin',
];

/**
 * Name of the vuoto ignore file.
 */
export const VUOTO_IGNORE_FILENAME = '.vuotoignore';

/**
 * Byte order mark regex pattern.
 */
export const BYTE_ORDER_MARK = new RegExp(String.raw`\uFEFF`, 'g'); // U+FEFF

/**
 * Em space regex pattern.
 */
export const EM_SPACE = new RegExp(String.raw`\u2003`, 'g'); // U+2003 em space

/**
 * En space regex pattern.
 */
export const EN_SPACE = new RegExp(String.raw`\u2002`, 'g'); // U+2002 en space

/**
 * Form feed regex pattern.
 */
export const FORM_FEED = new RegExp(String.raw`\f`, 'g'); // U+000C form feed

/**
 * Ideographic space regex pattern.
 */
export const IDEOGRAPHIC_SPACE = new RegExp(String.raw`\u3000`, 'g'); // U+3000 ideographic space

/**
 * Invisible separators regex pattern.
 */
export const INVISIBLE_SEPARATORS = new RegExp(String.raw`[\u2060\uFEFF]`, 'g'); // word joiner, zero width no-break space

/**
 * Line separator regex pattern.
 */
export const LINE_SEPARATOR = new RegExp(String.raw`\u2028`, 'g'); // U+2028 line separator

/**
 * Narrow no-break space regex pattern.
 */
export const NARROW_NO_BREAK_SPACE = new RegExp(String.raw`\u202F`, 'g'); // U+202F narrow no-break space

/**
 * Non-breaking space regex pattern.
 */
export const NON_BREAKING_SPACE = new RegExp(String.raw`\u00A0`, 'g'); // U+00A0 non-breaking space

/**
 * Paragraph separator regex pattern.
 */
export const PARAGRAPH_SEPARATOR = new RegExp(String.raw`\u2029`, 'g'); // U+2029 paragraph separator

/**
 * Vertical tab regex pattern.
 */
export const VERTICAL_TAB = new RegExp(String.raw`\x0B`, 'g');

/**
 * Visible miscellaneous spaces regex pattern.
 */
export const VISIBLE_MISC_SPACES = new RegExp(
  String.raw`[\u1680\u180E\u2000-\u200A\u205F\u3000]`,
  'g'
);

/**
 * Zero-width characters regex pattern.
 */
export const ZERO_WIDTH = new RegExp(
  String.raw`\u200B|\u200C|\u200D|\uFEFF|\u2060`,
  'g'
);

/**
 * Combined pattern matching all supported problematic whitespace and invisible characters.
 */
export const ALL_PROBLEMATIC_WHITESPACE = new RegExp(
  String.raw`[\u000B\u000C\u00A0\u1680\u180E\u2000-\u200D\u2028\u2029\u202F\u205F\u2060\u3000\uFEFF]`,
  'g'
);

/**
 * Map of Unicode characters to their human-readable names.
 */
export const UNICODE_NAME_MAP: Record<string, string> = {
  '\u{A0}': 'NON-BREAKING SPACE',
  '\u{1680}': 'OGHAM SPACE MARK',
  '\u{180E}': 'MONGOLIAN VOWEL SEPARATOR',
  '\u{2000}': 'EN QUAD',
  '\u{2001}': 'EM QUAD',
  '\u{2002}': 'EN SPACE',
  '\u{2003}': 'EM SPACE',
  '\u{2004}': 'THREE-PER-EM SPACE',
  '\u{2005}': 'FOUR-PER-EM SPACE',
  '\u{2006}': 'SIX-PER-EM SPACE',
  '\u{2007}': 'FIGURE SPACE',
  '\u{2008}': 'PUNCTUATION SPACE',
  '\u{2009}': 'THIN SPACE',
  '\u{200A}': 'HAIR SPACE',
  '\u{200B}': 'ZERO WIDTH SPACE',
  '\u{200C}': 'ZERO WIDTH NON-JOINER',
  '\u{200D}': 'ZERO WIDTH JOINER',
  '\u{202F}': 'NARROW NO-BREAK SPACE',
  '\u{205F}': 'MEDIUM MATHEMATICAL SPACE',
  '\u{2060}': 'WORD JOINER',
  '\u{3000}': 'IDEOGRAPHIC SPACE',
  '\u{FEFF}': 'ZERO WIDTH NO-BREAK SPACE (BOM)',
  '\u{2028}': 'LINE SEPARATOR',
  '\u{2029}': 'PARAGRAPH_SEPARATOR',
  '\f': 'FORM FEED',
  '\v': 'VERTICAL TAB',
};
