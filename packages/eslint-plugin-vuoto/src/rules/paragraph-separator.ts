import type { Rule } from 'eslint';

const PARAGRAPH_SEPARATOR = new RegExp(String.raw`\u2029`, 'g'); // U+2029 paragraph separator

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
