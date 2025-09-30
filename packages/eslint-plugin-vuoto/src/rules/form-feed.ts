import type { Rule } from 'eslint';

import { FORM_FEED } from '@dcdavidev/vuoto';

const rule: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'disallow form feed (U+000C) characters',
      recommended: true,
    },
    fixable: 'code',
    schema: [],
    messages: {
      unexpected: 'Unexpected form feed (U+000C) character.',
    },
  },
  create(context) {
    const sourceCode = context.sourceCode;
    const text = sourceCode.text;

    return {
      Program() {
        let match: RegExpExecArray | null;
        while ((match = FORM_FEED.exec(text)) !== null) {
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
