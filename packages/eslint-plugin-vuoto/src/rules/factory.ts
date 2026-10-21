import type { Rule } from 'eslint';
import { UNICODE_NAME_MAP } from 'vuoto/consts';

import { type RangeTuple, shouldSkipMatch } from '../utils/ast.js';

/**
 * Configuration options for whitespace rules in eslint-plugin-vuoto.
 */
export interface WhitespaceRuleOptions {
  /**
   * Whether to skip checking whitespace inside code comments.
   * @default false
   */
  skipComments?: boolean;

  /**
   * Whether to skip checking whitespace inside string literals.
   * @default false
   */
  skipStrings?: boolean;

  /**
   * Whether to skip checking whitespace inside template literals.
   * @default false
   */
  skipTemplates?: boolean;

  /**
   * Whether to skip checking whitespace inside JSX text and JSX attributes.
   * @default false
   */
  skipJSXText?: boolean;
}

/**
 * Creates an ESLint rule module that disallows a set of Unicode whitespace characters.
 *
 * @param regex The regex pattern matching the disallowed characters.
 * @param description A concise description of what the rule detects.
 * @param replacement The string replacement to use during auto-fixing (empty string to delete).
 * @param messageId The message identifier for reporting violations.
 * @returns An ESLint rule module.
 */
export function createWhitespaceRule(
  regex: RegExp,
  description: string,
  replacement: string = '',
  messageId: string = 'unexpected'
): Rule.RuleModule {
  return {
    meta: {
      type: 'problem',
      docs: {
        description,
        recommended: true,
      },
      fixable: 'code',
      schema: [
        {
          type: 'object',
          properties: {
            skipComments: {
              type: 'boolean',
              description:
                'Skip checking whitespace characters inside comments.',
            },
            skipStrings: {
              type: 'boolean',
              description:
                'Skip checking whitespace characters inside string literals.',
            },
            skipTemplates: {
              type: 'boolean',
              description:
                'Skip checking whitespace characters inside template literals.',
            },
            skipJSXText: {
              type: 'boolean',
              description:
                'Skip checking whitespace characters inside JSX text and attributes.',
            },
          },
          additionalProperties: false,
        },
      ],
      messages: {
        [messageId]: 'Unexpected {{name}} character {{code}}.',
      },
    },

    create(context) {
      const sourceCode = context.sourceCode;
      const text = sourceCode.text;
      const options = (context.options[0] ?? {}) as WhitespaceRuleOptions;
      const hasAnySkip =
        Boolean(options.skipComments) ||
        Boolean(options.skipStrings) ||
        Boolean(options.skipTemplates) ||
        Boolean(options.skipJSXText);

      return {
        Program() {
          const globalRegex = new RegExp(
            regex.source,
            regex.flags.includes('g') ? regex.flags : `${regex.flags}g`
          );

          const commentRanges: RangeTuple[] = options.skipComments
            ? (sourceCode
                .getAllComments()
                .map((comment) => comment.range)
                .filter(
                  (range): range is [number, number] =>
                    Array.isArray(range) && range.length === 2
                ) as RangeTuple[])
            : [];

          let match: RegExpExecArray | null;

          while ((match = globalRegex.exec(text)) !== null) {
            const index = match.index;
            const char = match[0];

            if (char.length === 0) {
              globalRegex.lastIndex++;
              continue;
            }

            if (
              hasAnySkip &&
              shouldSkipMatch(index, sourceCode, options, commentRanges)
            ) {
              continue;
            }

            const codePoint = char.codePointAt(0);
            const hexCode =
              codePoint === undefined
                ? 'U+0000'
                : `U+${codePoint.toString(16).toUpperCase().padStart(4, '0')}`;
            const charName = UNICODE_NAME_MAP[char] ?? 'Unknown whitespace';

            context.report({
              loc: {
                start: sourceCode.getLocFromIndex(index),
                end: sourceCode.getLocFromIndex(index + char.length),
              },
              messageId,
              data: {
                code: hexCode,
                name: charName,
              },
              fix(fixer) {
                return fixer.replaceTextRange(
                  [index, index + char.length],
                  replacement
                );
              },
            });
          }
        },
      };
    },
  };
}
