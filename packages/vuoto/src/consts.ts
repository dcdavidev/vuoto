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
