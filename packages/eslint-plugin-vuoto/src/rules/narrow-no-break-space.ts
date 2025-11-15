import type { Rule } from 'eslint';
import { NARROW_NO_BREAK_SPACE } from 'vuoto/consts';

const rule: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'disallow narrow no-break space (U+202F) and replace with a normal space',
      recommended: true,
    },
    fixable: 'code',
    schema: [],
    messages: {
      unexpected:
        'Unexpected narrow no-break space (U+202F) character. Use a normal space instead.',
    },
  },
  create(context) {
    const sourceCode = context.sourceCode;
    const text = sourceCode.text;

    return {
      Program() {
        let match: RegExpExecArray | null;

        while ((match = NARROW_NO_BREAK_SPACE.exec(text)) !== null) {
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
