import type { Rule } from 'eslint';

import type { WhitespaceRuleOptions } from '../rules/factory.js';

export type RangeTuple = readonly [number, number];

/**
 * Checks whether a given character index falls inside any of the provided ranges.
 */
export function isIndexInRange(index: number, ranges: RangeTuple[]): boolean {
  for (const [start, end] of ranges) {
    if (index >= start && index < end) {
      return true;
    }
  }
  return false;
}

/**
 * Determines whether a matched whitespace character at index should be skipped
 * based on user-provided options.
 *
 * @param index Character offset in the source text.
 * @param sourceCode ESLint SourceCode object.
 * @param options User options configuring skip behavior.
 * @param commentRanges Cached comment ranges for the file.
 * @returns True if the match should be ignored.
 */
export function shouldSkipMatch(
  index: number,
  sourceCode: Rule.RuleContext['sourceCode'],
  options: WhitespaceRuleOptions,
  commentRanges: RangeTuple[] = []
): boolean {
  if (options.skipComments && isIndexInRange(index, commentRanges)) {
    return true;
  }

  if (options.skipStrings || options.skipTemplates || options.skipJSXText) {
    const node = sourceCode.getNodeByRangeIndex(index) as {
      type?: string;
      value?: unknown;
    } | null;

    if (node) {
      if (
        options.skipStrings &&
        node.type === 'Literal' &&
        typeof node.value === 'string'
      ) {
        return true;
      }

      if (
        options.skipTemplates &&
        (node.type === 'TemplateElement' || node.type === 'TemplateLiteral')
      ) {
        return true;
      }

      if (
        options.skipJSXText &&
        (node.type === 'JSXText' ||
          (node.type === 'JSXAttribute' &&
            (node.value as { type?: string } | undefined)?.type === 'Literal'))
      ) {
        return true;
      }
    }
  }

  return false;
}
