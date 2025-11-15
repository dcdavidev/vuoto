import type { Rule } from 'eslint';
import { EN_SPACE } from 'vuoto/consts';

const rule: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'disallow en space (U+2002) characters and replace with a normal space',
      recommended: true,
    },
    fixable: 'code',
    schema: [],
    messages: {
      unexpected:
        'Unexpected en space (U+2002) character. Use a normal space instead.',
    },
  },
  create(context) {
    const sourceCode = context.sourceCode;
    const text = sourceCode.text;

    return {
      Program() {
        let match: RegExpExecArray | null;
        while ((match = EN_SPACE.exec(text)) !== null) {
          const index = match.index;
          context.report({
            loc: sourceCode.getLocFromIndex(index),
            messageId: 'unexpected',
            fix(fixer) {
              return fixer.replaceTextRange(
                [index, index + match![0].length],
                ' '
              );
            },
          });
        }
      },
    };
  },
};

export default rule;
