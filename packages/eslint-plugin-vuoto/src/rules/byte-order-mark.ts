import type { Rule } from 'eslint';
import { BYTE_ORDER_MARK } from 'vuoto/consts';

const rule: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'disallow byte order mark (U+FEFF) characters',
      recommended: true,
    },
    fixable: 'code',
    schema: [],
    messages: {
      unexpected: 'Unexpected byte order mark (U+FEFF) character.',
    },
  },
  create(context) {
    const sourceCode = context.sourceCode;
    const text = sourceCode.text;

    return {
      Program() {
        let match: RegExpExecArray | null;
        while ((match = BYTE_ORDER_MARK.exec(text)) !== null) {
          const index = match.index;
          context.report({
            loc: sourceCode.getLocFromIndex(index),
            messageId: 'unexpected',
            fix(fixer) {
              return fixer.removeRange([index, index + match![0].length]);
            },
          });
        }
      },
    };
  },
};

export default rule;
