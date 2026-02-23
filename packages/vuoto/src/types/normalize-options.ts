/**
 * Options for the runNormalize function.
 * @property patterns File patterns to normalize.
 * @property fix Whether to apply fixes to the files.
 * @property exclude Glob patterns to exclude.
 * @property verbose Show detailed output.
 * @property silent Suppress all output except errors.
 * @example
 * ```ts
 * const options: RunNormalizeOptions = {
 *   patterns: ['src/**\/*.ts'],
 *   fix: true,
 *   exclude: ['**\/*.test.ts']
 * };
 * ```
 */
export type RunNormalizeOptions = {
  patterns: string[];
  fix?: boolean;
  exclude?: string[];
  verbose?: boolean;
  silent?: boolean;
};
