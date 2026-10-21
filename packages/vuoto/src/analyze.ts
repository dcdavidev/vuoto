import { ALL_PROBLEMATIC_WHITESPACE, UNICODE_NAME_MAP } from './consts.js';

/**
 * Detailed diagnostic information for a detected problematic whitespace character.
 */
export interface WhitespaceIssue {
  /**
  The matched character.
  */
  char: string;
  /**
  The Unicode code point formatted as hexadecimal (e.g. U+200B).
  */
  codePoint: string;
  /**
  Human-readable Unicode character name.
  */
  name: string;
  /**
  0-based character offset in the input string.
  */
  index: number;
  /**
  1-based line number.
  */
  line: number;
  /**
  1-based column number.
  */
  column: number;
}

/**
 * Checks whether a given string contains any problematic whitespace characters.
 * @param input The string to check.
 * @returns True if problematic whitespace was found.
 * @example
 * ```ts
 * if (hasWhitespaceIssues(fileContent)) {
 *   console.log('Issues found');
 * }
 * ```
 */
export function hasWhitespaceIssues(input: string): boolean {
  if (!input) {
    return false;
  }
  ALL_PROBLEMATIC_WHITESPACE.lastIndex = 0;
  return ALL_PROBLEMATIC_WHITESPACE.test(input);
}

/**
 * Finds all problematic whitespace characters and their exact locations in a string.
 * @param input The string to analyze.
 * @returns Array of whitespace issues found, with line and column coordinates.
 * @example
 * ```ts
 * const issues = findWhitespaceIssues('Hello\u200BWorld');
 * console.log(issues[0].name); // 'ZERO WIDTH SPACE'
 * ```
 */
export function findWhitespaceIssues(input: string): WhitespaceIssue[] {
  if (!input) {
    return [];
  }

  const issues: WhitespaceIssue[] = [];
  const regex = new RegExp(ALL_PROBLEMATIC_WHITESPACE.source, 'g');
  let match: RegExpExecArray | null;

  // Build index of line start offsets for efficient coordinate calculation
  const lineStarts = [0];
  for (let i = 0; i < input.length; i++) {
    if (input.charCodeAt(i) === 10) {
      lineStarts.push(i + 1);
    }
  }

  /**
   * Translates a character offset index into 1-based line and column coordinates.
   * @param index Character offset index.
   * @returns Line and column coordinates.
   */
  function getCoordinates(index: number): { line: number; column: number } {
    let low = 0;
    let high = lineStarts.length - 1;
    let lineIndex = 0;

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      if (lineStarts[mid] <= index) {
        lineIndex = mid;
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }

    return {
      line: lineIndex + 1,
      column: index - lineStarts[lineIndex] + 1,
    };
  }

  while ((match = regex.exec(input)) !== null) {
    const char = match[0];
    const index = match.index;
    const { line, column } = getCoordinates(index);
    const codePointNum = char.codePointAt(0);
    const codePoint = codePointNum
      ? `U+${codePointNum.toString(16).toUpperCase().padStart(4, '0')}`
      : 'Unknown';
    const name = UNICODE_NAME_MAP[char] || 'UNKNOWN WHITESPACE';

    issues.push({
      char,
      codePoint,
      name,
      index,
      line,
      column,
    });
  }

  return issues;
}
