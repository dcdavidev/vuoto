import type { Rule } from 'eslint';
import { INVISIBLE_SEPARATORS } from 'vuoto/consts';

const rule: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'disallow invisible Unicode separators (U+2060, U+FEFF) and replace them with a normal space',
      recommended: true,
    },
    fixable: 'code',
    schema: [],
    messages: {
      unexpected:
        'Unexpected invisible separator ({{ charName }}). Use a normal space instead.',
    },
  },
  create(context) {
    const sourceCode = context.sourceCode;
    const text = sourceCode.text;

    return {
      Program() {
        let match: RegExpExecArray | null;

        while ((match = INVISIBLE_SEPARATORS.exec(text)) !== null) {
          const index = match.index;
          const char = match[0];
          const charName =
            char === '\u2060'
              ? 'WORD JOINER (U+2060)'
              : 'ZERO WIDTH NO-BREAK SPACE (U+FEFF)';

          context.report({
            loc: sourceCode.getLocFromIndex(index),
            messageId: 'unexpected',
            data: { charName },
            fix(fixer) {
              return fixer.replaceTextRange([index, index + char.length], ' ');
            },
          });
        }
      },
    };
  },
};

export default rule;
