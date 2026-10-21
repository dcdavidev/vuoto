import type { WhitespaceIssue } from '../analyze.js';

/**
 * Normalization result for a single processed file.
 */
export interface FileNormalizeResult {
  /**
  Absolute file path.
  */
  filePath: string;
  /**
  Relative path from current working directory.
  */
  relativeFilePath: string;
  /**
  Whether the file was modified and fixed on disk.
  */
  fixed: boolean;
  /**
  Whether the file contained problematic whitespace issues.
  */
  hasIssues: boolean;
  /**
  Count of whitespace issues found.
  */
  issuesCount: number;
  /**
  Optional detailed list of whitespace issues (populated in verbose mode or diagnostics).
  */
  issues?: WhitespaceIssue[];
  /**
  Error object if file read or write failed.
  */
  error?: Error;
}

/**
 * Summary result returned by runNormalize.
 */
export interface RunNormalizeResult {
  /**
  Total number of files matched and scanned.
  */
  totalFiles: number;
  /**
  Number of files checked.
  */
  checkedCount: number;
  /**
  Number of files modified and fixed.
  */
  fixedCount: number;
  /**
  Number of files containing whitespace issues.
  */
  issuesCount: number;
  /**
  Number of clean files.
  */
  cleanCount: number;
  /**
  True if any file had whitespace issues.
  */
  hasIssues: boolean;
  /**
  Per-file results.
  */
  files: FileNormalizeResult[];
}
