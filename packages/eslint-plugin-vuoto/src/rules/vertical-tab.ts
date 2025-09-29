import type { Rule } from 'eslint';

const VERTICAL_TAB = new RegExp(String.raw`\x0B`, 'g');

const rule: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'disallow vertical tab (U+000B) characters and remove them',
      recommended: true,
    },
    fixable: 'code',
    schema: [],
    messages: {
      unexpected: 'Unexpected vertical tab (U+000B) character.',
    },
  },
  create(context) {
    const sourceCode = context.sourceCode;
    const text = sourceCode.text;

    return {
      Program() {
        let match: RegExpExecArray | null;
        while ((match = VERTICAL_TAB.exec(text)) !== null) {
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
