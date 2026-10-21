import { describe, it } from 'vitest';

import { RuleTester } from 'eslint';

import { createWhitespaceRule } from '../src/rules/factory.js';

describe('createWhitespaceRule', () => {
  const ruleTester = new RuleTester({
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
    },
  });

  const zeroWidthRule = createWhitespaceRule(
    /\u200B/,
    'Disallow zero-width space',
    ''
  );

  it('reports and removes zero-width space in comments', () => {
    ruleTester.run('zero-width-rule', zeroWidthRule, {
      valid: [{ code: '// const x = 1;' }],
      invalid: [
        {
          code: '// const x\u{200B} = 1;',
          output: '// const x = 1;',
          errors: [
            {
              messageId: 'unexpected',
              data: {
                name: 'ZERO WIDTH SPACE',
                code: 'U+200B',
              },
              line: 1,
              column: 11,
              endLine: 1,
              endColumn: 12,
            },
          ],
        },
      ],
    });
  });

  it('fixes multiple occurrences across lines', () => {
    ruleTester.run('multiple-occurrences', zeroWidthRule, {
      valid: [],
      invalid: [
        {
          code: '// a\u{200B}\n// b\u{200B}',
          output: '// a\n// b',
          errors: [
            {
              messageId: 'unexpected',
              line: 1,
              column: 5,
              endLine: 1,
              endColumn: 6,
            },
            {
              messageId: 'unexpected',
              line: 2,
              column: 5,
              endLine: 2,
              endColumn: 6,
            },
          ],
        },
      ],
    });
  });

  const nbspRule = createWhitespaceRule(/\u00A0/g, 'Disallow NBSP', ' ');

  it('replaces non-breaking space with a regular space', () => {
    ruleTester.run('nbsp-rule', nbspRule, {
      valid: [{ code: 'const x = 1;' }],
      invalid: [
        {
          code: 'const x\u{A0}= 1;',
          output: 'const x = 1;',
          errors: [
            {
              messageId: 'unexpected',
              data: {
                name: 'NON-BREAKING SPACE',
                code: 'U+00A0',
              },
            },
          ],
        },
      ],
    });
  });

  describe('rule options', () => {
    it('respects skipComments option', () => {
      ruleTester.run('skip-comments', zeroWidthRule, {
        valid: [
          {
            code: '// comment with \u{200B} zero-width space\n/* block with \u{200B} */',
            options: [{ skipComments: true }],
          },
        ],
        invalid: [
          {
            code: '// comment with \u{200B}\nconst x = "has \u{200B} zero-width";',
            output: '// comment with \u{200B}\nconst x = "has  zero-width";',
            options: [{ skipComments: true }],
            errors: [
              {
                messageId: 'unexpected',
                line: 2,
                column: 16,
              },
            ],
          },
        ],
      });
    });

    it('respects skipStrings option', () => {
      ruleTester.run('skip-strings', zeroWidthRule, {
        valid: [
          {
            code: 'const greeting = "hello\u{200B}world";',
            options: [{ skipStrings: true }],
          },
        ],
        invalid: [
          {
            code: '// comment with \u{200B}\nconst greeting = "hello\u{200B}world";',
            output: '// comment with \nconst greeting = "hello\u{200B}world";',
            options: [{ skipStrings: true }],
            errors: [
              {
                messageId: 'unexpected',
                line: 1,
                column: 17,
              },
            ],
          },
        ],
      });
    });

    it('respects skipTemplates option', () => {
      ruleTester.run('skip-templates', zeroWidthRule, {
        valid: [
          {
            code: 'const text = `template with \u{200B} zero-width`;',
            options: [{ skipTemplates: true }],
          },
        ],
        invalid: [
          {
            code: '// comment with \u{200B}\nconst text = `template with \u{200B} zero-width`;',
            output:
              '// comment with \nconst text = `template with \u{200B} zero-width`;',
            options: [{ skipTemplates: true }],
            errors: [
              {
                messageId: 'unexpected',
                line: 1,
                column: 17,
              },
            ],
          },
        ],
      });
    });
  });
});
