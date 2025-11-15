import type { Rule } from 'eslint';
import { ZERO_WIDTH } from 'vuoto/consts';

const rule: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'disallow zero-width characters (U+200B, U+200C, U+200D, U+FEFF, U+2060)',
      recommended: true,
    },
    fixable: 'code',
    schema: [],
    messages: {
      unexpected: 'Unexpected zero-width character {{code}} ({{name}}).',
    },
  },

  create(context) {
    const sourceCode = context.sourceCode;
    const text = sourceCode.text;

    return {
      Program() {
        let match: RegExpExecArray | null;
        while ((match = ZERO_WIDTH.exec(text)) !== null) {
          const index = match.index;
          const char = match[0];

          const charMap: Record<string, string> = {
            '\u200B': 'ZERO WIDTH SPACE',
            '\u200C': 'ZERO WIDTH NON-JOINER',
            '\u200D': 'ZERO WIDTH JOINER',
            '\uFEFF': 'ZERO WIDTH NO-BREAK SPACE (BOM)',
            '\u2060': 'WORD JOINER',
          };

          context.report({
            loc: sourceCode.getLocFromIndex(index),
            messageId: 'unexpected',
            data: {
              code: `U+${char.codePointAt(0)!.toString(16).toUpperCase().padStart(4, '0')}`,
              name: charMap[char] || 'Unknown',
            },
            fix(fixer) {
              return fixer.removeRange([index, index + char.length]);
            },
          });
        }
      },
    };
  },
};

export default rule;
