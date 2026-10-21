import { describe, it } from 'vitest';

import { RuleTester } from 'eslint';

import { rules } from './index.js';

describe('rules index', () => {
  const ruleTester = new RuleTester({
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
    },
  });

  it('byte-order-mark rule should work', () => {
    ruleTester.run('byte-order-mark', rules['byte-order-mark'] as any, {
      valid: ['const x = 1;'],
      invalid: [
        {
          code: 'const x = "\u{FEFF}";',
          output: 'const x = "";',
          errors: [{ messageId: 'unexpected' }],
        },
      ],
    });
  });

  it('non-breaking-space rule should work', () => {
    ruleTester.run('non-breaking-space', rules['non-breaking-space'] as any, {
      valid: ['const x = 1;'],
      invalid: [
        {
          code: 'const x\u{A0}= 1;',
          output: 'const x = 1;',
          errors: [{ messageId: 'unexpected' }],
        },
      ],
    });
  });

  it('zero-width rule should work in strings', () => {
    ruleTester.run('zero-width', rules['zero-width'] as any, {
      valid: ['const x = 1;'],
      invalid: [
        {
          code: 'const x = "a\u{200B}b";',
          output: 'const x = "ab";',
          errors: [{ messageId: 'unexpected' }],
        },
      ],
    });
  });
});
