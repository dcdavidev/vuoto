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
