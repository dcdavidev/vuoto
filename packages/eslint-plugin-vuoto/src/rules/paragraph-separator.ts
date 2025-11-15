import type { Rule } from 'eslint';
import { PARAGRAPH_SEPARATOR } from 'vuoto/consts';

const rule: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'disallow paragraph separator (U+2029) characters and replace with two newlines',
      recommended: true,
    },
    fixable: 'code',
    schema: [],
    messages: {
      unexpected:
        'Unexpected paragraph separator (U+2029) character. Use two newlines instead.',
    },
  },
  create(context) {
    const sourceCode = context.sourceCode;
    const text = sourceCode.text;

    return {
      Program() {
        let match: RegExpExecArray | null;

        while ((match = PARAGRAPH_SEPARATOR.exec(text)) !== null) {
          const index = match.index;
          context.report({
            loc: sourceCode.getLocFromIndex(index),
            messageId: 'unexpected',
            fix(fixer) {
              return fixer.replaceTextRange(
                [index, index + match![0].length],
                '\n\n'
              );
            },
          });
        }
      },
    };
  },
};

export default rule;
