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
 * Base name for vuoto config file.
 */
export const VUOTO_CONFIG_BASENAME = 'vuoto.config';

/**
 * Supported extensions for vuoto config file.
 */
export const VUOTO_CONFIG_EXTENSIONS = ['js', 'mjs', 'cjs'] as const;

/**
 * Candidate paths where vuoto config can be found.
 */
export const VUOTO_CONFIG_PATHS: string[] = [
  `./${VUOTO_CONFIG_BASENAME}.js`,
  `./${VUOTO_CONFIG_BASENAME}.mjs`,
  `./${VUOTO_CONFIG_BASENAME}.cjs`,
  `./.config/${VUOTO_CONFIG_BASENAME}.js`,
  `./.config/${VUOTO_CONFIG_BASENAME}.mjs`,
  `./.config/${VUOTO_CONFIG_BASENAME}.cjs`,
];

/**
 * Default config template file extension.
 * By convention we generate `.mjs`.
 */
export const VUOTO_CONFIG_TEMPLATE_EXT = 'mjs';

export const BYTE_ORDER_MARK = new RegExp(String.raw`\uFEFF`, 'g'); // U+FEFF
export const EM_SPACE = new RegExp(String.raw`\u2003`, 'g'); // U+2003 em space
export const EN_SPACE = new RegExp(String.raw`\u2002`, 'g'); // U+2002 en space
export const FORM_FEED = new RegExp(String.raw`\f`, 'g'); // U+000C form feed
export const IDEOGRAPHIC_SPACE = new RegExp(String.raw`\u3000`, 'g'); // U+3000 ideographic space
export const INVISIBLE_SEPARATORS = new RegExp(String.raw`[\u2060\uFEFF]`, 'g'); // word joiner, zero width no-break space
export const LINE_SEPARATOR = new RegExp(String.raw`\u2028`, 'g'); // U+2028 line separator
export const NARROW_NO_BREAK_SPACE = new RegExp(String.raw`\u202F`, 'g'); // U+202F narrow no-break space
export const NON_BREAKING_SPACE = new RegExp(String.raw`\u00A0`, 'g'); // U+00A0 non-breaking space
export const PARAGRAPH_SEPARATOR = new RegExp(String.raw`\u2029`, 'g'); // U+2029 paragraph separator
export const VERTICAL_TAB = new RegExp(String.raw`\x0B`, 'g');
export const VISIBLE_MISC_SPACES = new RegExp(
  String.raw`[\u1680\u180E\u2000-\u200A\u205F\u3000]`,
  'g'
);
export const ZERO_WIDTH = new RegExp(
  String.raw`\u200B|\u200C|\u200D|\uFEFF|\u2060`,
  'g'
);
