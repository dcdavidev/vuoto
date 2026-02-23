import { RuleTester } from 'eslint';
import { describe, it } from 'vitest';
import { createWhitespaceRule } from './factory.js';

describe('createWhitespaceRule', () => {
  const ruleTester = new RuleTester({
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
    },
  });

  const rule = createWhitespaceRule(/\u200B/g, 'disallow zero-width space', '');

  it('should report zero-width space in comments', () => {
    ruleTester.run('zero-width-rule', rule, {
      valid: [
        {
          code: '// const x = 1;',
        },
      ],
      invalid: [
        {
          code: '// const x\u200B = 1;',
          output: '// const x = 1;',
          errors: [
            {
              messageId: 'unexpected',
              data: {
                name: 'ZERO WIDTH SPACE',
                code: 'U+200B',
              },
            },
          ],
        },
      ],
    });
  });

  it('should fix multiple zero-width spaces in comments', () => {
    ruleTester.run('zero-width-rule-multiple', rule, {
      valid: [],
      invalid: [
        {
          code: '// const\u200B x\u200B = 1;',
          output: '// const x = 1;',
          errors: [
            { messageId: 'unexpected' },
            { messageId: 'unexpected' },
          ],
        },
      ],
    });
  });

  const ruleWithSpace = createWhitespaceRule(/\u00A0/g, 'disallow NBSP', ' ');

  it('should replace NBSP with a space', () => {
    ruleTester.run('nbsp-rule', ruleWithSpace, {
      valid: [],
      invalid: [
        {
          code: 'const x\u00A0= 1;',
          output: 'const x = 1;',
          errors: [{ messageId: 'unexpected' }],
        },
      ],
    });
  });
});
