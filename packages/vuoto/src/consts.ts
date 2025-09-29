/**
 * Default ignores:
 * - node_modules and .git
 * - common binary media files (images, audio, video, archives)
 */
export const DEFAULT_IGNORES = [
  'node_modules',
  '.git',
  '**/*.png',
  '**/*.jpg',
  '**/*.jpeg',
  '**/*.gif',
  '**/*.bmp',
  '**/*.webp',
  '**/*.svg',
  '**/*.ico',
  '**/*.mp3',
  '**/*.wav',
  '**/*.ogg',
  '**/*.flac',
  '**/*.mp4',
  '**/*.mkv',
  '**/*.avi',
  '**/*.mov',
  '**/*.wmv',
  '**/*.webm',
  '**/*.zip',
  '**/*.tar',
  '**/*.gz',
  '**/*.rar',
];
