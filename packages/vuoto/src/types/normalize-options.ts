/**
 * Granular options to selectively enable or disable whitespace normalizers.
 */
export interface NormalizeOptions {
  /**
  Remove zero-width characters (U+200B, U+200C, U+200D). Default: true
  */
  zeroWidth?: boolean;
  /**
  Remove byte order mark (U+FEFF). Default: true
  */
  byteOrderMark?: boolean;
  /**
  Remove invisible separators (U+2060, U+FEFF). Default: true
  */
  invisibleSeparators?: boolean;
  /**
  Replace non-breaking spaces (U+00A0) with standard space. Default: true
  */
  nonBreakingSpace?: boolean;
  /**
  Replace narrow no-break space (U+202F) with standard space. Default: true
  */
  narrowNoBreakSpace?: boolean;
  /**
  Replace line separators (U+2028) with \n. Default: true
  */
  lineSeparator?: boolean;
  /**
  Replace paragraph separators (U+2029) with \n\n. Default: true
  */
  paragraphSeparator?: boolean;
  /**
  Replace em space (U+2003) with standard space. Default: true
  */
  emSpace?: boolean;
  /**
  Replace en space (U+2002) with standard space. Default: true
  */
  enSpace?: boolean;
  /**
  Replace ideographic space (U+3000) with standard space. Default: true
  */
  ideographicSpace?: boolean;
  /**
  Replace visible misc spaces with standard space. Default: true
  */
  visibleMiscSpaces?: boolean;
  /**
  Replace form feed (\f) with \n. Default: true
  */
  formFeed?: boolean;
  /**
  Replace vertical tab (\v) with \n. Default: true
  */
  verticalTab?: boolean;
}

/**
 * Options for the runNormalize action.
 * @property patterns File patterns to normalize.
 * @property fix Whether to apply fixes to the files.
 * @property exclude Glob patterns to exclude.
 * @property gitignore Whether to load patterns from .gitignore files. Default: true.
 * @property verbose Show detailed output.
 * @property silent Suppress all output except errors.
 * @property exitOnError Whether to set process.exitCode = 1 when issues are found.
 * @property normalizeOptions Granular normalization options.
 * @example
 * ```ts
 * const options: RunNormalizeOptions = {
 *   patterns: ['src/**\/*.ts'],
 *   fix: true,
 *   exclude: ['**\/*.test.ts']
 * };
 * ```
 */
export interface RunNormalizeOptions {
  patterns: string[];
  fix?: boolean;
  exclude?: string[];
  gitignore?: boolean;
  verbose?: boolean;
  silent?: boolean;
  exitOnError?: boolean;
  normalizeOptions?: NormalizeOptions;
}
