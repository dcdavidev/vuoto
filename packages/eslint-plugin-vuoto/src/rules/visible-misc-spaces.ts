import type { Rule } from 'eslint';

// Match: U+1680, U+180E, U+2000–U+200A, U+205F, U+3000
const VISIBLE_MISC_SPACES = new RegExp(
  String.raw`[\u1680\u180E\u2000-\u200A\u205F\u3000]`,
  'g'
);

const rule: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'disallow miscellaneous visible Unicode space characters (U+1680, U+180E, U+2000–U+200A, U+205F, U+3000) and replace with a normal space',
      recommended: true,
    },
    fixable: 'code',
    schema: [],
    messages: {
      unexpected:
        'Unexpected miscellaneous visible space character. Use a normal space (U+0020) instead.',
    },
  },
  create(context) {
    const sourceCode = context.sourceCode;
    const text = sourceCode.text;

    return {
      Program() {
        let match: RegExpExecArray | null;
        while ((match = VISIBLE_MISC_SPACES.exec(text)) !== null) {
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
