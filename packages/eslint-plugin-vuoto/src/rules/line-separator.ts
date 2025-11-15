import type { Rule } from 'eslint';
import { LINE_SEPARATOR } from 'vuoto/consts';

const rule: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: String.raw`disallow line separator (U+2028) characters and replace with a standard newline (\n)`,
      recommended: true,
    },
    fixable: 'code',
    schema: [],
    messages: {
      unexpected: String.raw`Unexpected line separator (U+2028) character. Use a standard newline (\n) instead.`,
    },
  },
  create(context) {
    const sourceCode = context.sourceCode;
    const text = sourceCode.text;

    return {
      Program() {
        let match: RegExpExecArray | null;
        while ((match = LINE_SEPARATOR.exec(text)) !== null) {
          const index = match.index;
          context.report({
            loc: sourceCode.getLocFromIndex(index),
            messageId: 'unexpected',
            fix(fixer) {
              return fixer.replaceTextRange(
                [index, index + match![0].length],
                '\n'
              );
            },
          });
        }
      },
    };
  },
};

export default rule;
