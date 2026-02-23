import type { Rule } from 'eslint';
import { UNICODE_NAME_MAP } from 'vuoto/consts';

/**
 * Create a rule that disallows a set of characters.
 * @param regex The regex pattern to match.
 * @param description The rule description.
 * @param replacement The string to replace the match with.
 * @param messageId The message ID.
 * @returns The rule module.
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
      schema: [],
      messages: {
        [messageId]: `Unexpected {{name}} character {{code}}.`,
      },
    },

    create(context) {
      const sourceCode = context.sourceCode;
      const text = sourceCode.text;

      return {
        Program() {
          let match: RegExpExecArray | null;
          // Ensure regex is global
          const globalRegex = new RegExp(regex.source, regex.flags.includes('g') ? regex.flags : regex.flags + 'g');
          
          while ((match = globalRegex.exec(text)) !== null) {
            const index = match.index;
            const char = match[0];

            context.report({
              loc: sourceCode.getLocFromIndex(index),
              messageId,
              data: {
                code: `U+${char.codePointAt(0)!.toString(16).toUpperCase().padStart(4, '0')}`,
                name: UNICODE_NAME_MAP[char] || 'Unknown whitespace',
              },
              fix(fixer) {
                return fixer.replaceTextRange([index, index + char.length], replacement);
              },
            });
          }
        },
      };
    },
  };
}
