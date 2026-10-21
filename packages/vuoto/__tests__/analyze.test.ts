import { describe, expect, it } from 'vitest';

import { findWhitespaceIssues, hasWhitespaceIssues } from '../src/analyze.js';

describe('analyze', () => {
  describe('hasWhitespaceIssues', () => {
    it('should return false for clean text', () => {
      expect(hasWhitespaceIssues('Hello world')).toBe(false);
      expect(hasWhitespaceIssues('')).toBe(false);
      expect(hasWhitespaceIssues('Simple\nmultiline\ttext')).toBe(false);
    });

    it('should return true for zero-width characters', () => {
      expect(hasWhitespaceIssues('Hello\u{200B}World')).toBe(true);
      expect(hasWhitespaceIssues('Hello\u{200C}World')).toBe(true);
      expect(hasWhitespaceIssues('Hello\u{200D}World')).toBe(true);
      expect(hasWhitespaceIssues('\u{FEFF}Hello')).toBe(true);
    });

    it('should return true for non-breaking spaces', () => {
      expect(hasWhitespaceIssues('Hello\u{A0}World')).toBe(true);
      expect(hasWhitespaceIssues('Hello\u{202F}World')).toBe(true);
    });

    it('should return true for wide and ideographic spaces', () => {
      expect(hasWhitespaceIssues('Hello\u{3000}World')).toBe(true);
      expect(hasWhitespaceIssues('Hello\u{2003}World')).toBe(true);
    });

    it('should return true for line and paragraph separators', () => {
      expect(hasWhitespaceIssues('Hello\u{2028}World')).toBe(true);
      expect(hasWhitespaceIssues('Hello\u{2029}World')).toBe(true);
    });

    it('should return true for form feed and vertical tab', () => {
      expect(hasWhitespaceIssues('Hello\fWorld')).toBe(true);
      expect(hasWhitespaceIssues('Hello\vWorld')).toBe(true);
    });
  });

  describe('findWhitespaceIssues', () => {
    it('should return empty array for clean text or empty string', () => {
      expect(findWhitespaceIssues('')).toEqual([]);
      expect(findWhitespaceIssues('Clean text')).toEqual([]);
    });

    it('should pinpoint exact line and column coordinates on a single line', () => {
      const input = 'Hello\u{200B}World';
      const issues = findWhitespaceIssues(input);

      expect(issues).toHaveLength(1);
      expect(issues[0]).toEqual({
        char: '\u{200B}',
        codePoint: 'U+200B',
        name: 'ZERO WIDTH SPACE',
        index: 5,
        line: 1,
        column: 6,
      });
    });

    it('should pinpoint exact line and column across multiple lines', () => {
      const input = 'Line 1\nLine 2 has \u{A0}NBSP\nLine 3';
      const issues = findWhitespaceIssues(input);

      expect(issues).toHaveLength(1);
      expect(issues[0]).toEqual({
        char: '\u{A0}',
        codePoint: 'U+00A0',
        name: 'NON-BREAKING SPACE',
        index: 18,
        line: 2,
        column: 12,
      });
    });

    it('should detect multiple different whitespace issues in one text', () => {
      const input = '\u{FEFF}First line\nSecond\u{2003}line\nThird\u{3000}line';
      const issues = findWhitespaceIssues(input);

      expect(issues).toHaveLength(3);
      expect(issues[0].name).toBe('ZERO WIDTH NO-BREAK SPACE (BOM)');
      expect(issues[0].line).toBe(1);
      expect(issues[0].column).toBe(1);

      expect(issues[1].name).toBe('EM SPACE');
      expect(issues[1].line).toBe(2);

      expect(issues[2].name).toBe('IDEOGRAPHIC SPACE');
      expect(issues[2].line).toBe(3);
    });
  });
});
