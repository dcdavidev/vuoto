import { describe, it } from 'vitest';

import { RuleTester } from 'eslint';

import { rules } from '../src/rules/index.js';

describe('all 13 vuoto rules', () => {
  const ruleTester = new RuleTester({
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
    },
  });

  it('byte-order-mark detects and removes BOM', () => {
    ruleTester.run('byte-order-mark', rules['byte-order-mark'], {
      valid: [{ code: 'const valid = true;' }],
      invalid: [
        {
          code: 'const x = "\u{FEFF}";',
          output: 'const x = "";',
          errors: [
            {
              messageId: 'unexpected',
              data: {
                name: 'ZERO WIDTH NO-BREAK SPACE (BOM)',
                code: 'U+FEFF',
              },
            },
          ],
        },
      ],
    });
  });

  it('em-space detects and normalizes to standard space', () => {
    ruleTester.run('em-space', rules['em-space'], {
      valid: [{ code: 'const a = 1;' }],
      invalid: [
        {
          code: 'const a = "hello\u{2003}world";',
          output: 'const a = "hello world";',
          errors: [
            {
              messageId: 'unexpected',
              data: {
                name: 'EM SPACE',
                code: 'U+2003',
              },
            },
          ],
        },
      ],
    });
  });

  it('en-space detects and normalizes to standard space', () => {
    ruleTester.run('en-space', rules['en-space'], {
      valid: [{ code: 'const a = 1;' }],
      invalid: [
        {
          code: 'const a = "hello\u{2002}world";',
          output: 'const a = "hello world";',
          errors: [
            {
              messageId: 'unexpected',
              data: {
                name: 'EN SPACE',
                code: 'U+2002',
              },
            },
          ],
        },
      ],
    });
  });

  it('form-feed detects and replaces with newline', () => {
    ruleTester.run('form-feed', rules['form-feed'], {
      valid: [{ code: 'const a = 1;\nconst b = 2;' }],
      invalid: [
        {
          code: 'const a = 1;\fconst b = 2;',
          output: 'const a = 1;\nconst b = 2;',
          errors: [
            {
              messageId: 'unexpected',
              data: {
                name: 'FORM FEED',
                code: 'U+000C',
              },
            },
          ],
        },
      ],
    });
  });

  it('ideographic-space detects and normalizes to standard space', () => {
    ruleTester.run('ideographic-space', rules['ideographic-space'], {
      valid: [{ code: 'const a = 1;' }],
      invalid: [
        {
          code: 'const a = "hello\u{3000}world";',
          output: 'const a = "hello world";',
          errors: [
            {
              messageId: 'unexpected',
              data: {
                name: 'IDEOGRAPHIC SPACE',
                code: 'U+3000',
              },
            },
          ],
        },
      ],
    });
  });

  it('invisible-separators detects and removes U+2060 and U+FEFF', () => {
    ruleTester.run('invisible-separators', rules['invisible-separators'], {
      valid: [{ code: 'const word = "test";' }],
      invalid: [
        {
          code: 'const word = "te\u{2060}st";',
          output: 'const word = "test";',
          errors: [
            {
              messageId: 'unexpected',
              data: {
                name: 'WORD JOINER',
                code: 'U+2060',
              },
            },
          ],
        },
      ],
    });
  });

  it('line-separator detects and replaces with newline', () => {
    ruleTester.run('line-separator', rules['line-separator'], {
      valid: [{ code: 'const a = 1;\nconst b = 2;' }],
      invalid: [
        {
          code: 'const a = 1;\u{2028}const b = 2;',
          output: 'const a = 1;\nconst b = 2;',
          errors: [
            {
              messageId: 'unexpected',
              data: {
                name: 'LINE SEPARATOR',
                code: 'U+2028',
              },
            },
          ],
        },
      ],
    });
  });

  it('narrow-no-break-space detects and normalizes to standard space', () => {
    ruleTester.run('narrow-no-break-space', rules['narrow-no-break-space'], {
      valid: [{ code: 'const a = 1;' }],
      invalid: [
        {
          code: 'const a = "hello\u{202F}world";',
          output: 'const a = "hello world";',
          errors: [
            {
              messageId: 'unexpected',
              data: {
                name: 'NARROW NO-BREAK SPACE',
                code: 'U+202F',
              },
            },
          ],
        },
      ],
    });
  });

  it('non-breaking-space detects and normalizes to standard space', () => {
    ruleTester.run('non-breaking-space', rules['non-breaking-space'], {
      valid: [{ code: 'const a = 1;' }],
      invalid: [
        {
          code: 'const a\u{A0}= 1;',
          output: 'const a = 1;',
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

  it('paragraph-separator detects and replaces with double newline', () => {
    ruleTester.run('paragraph-separator', rules['paragraph-separator'], {
      valid: [{ code: 'const a = 1;\n\nconst b = 2;' }],
      invalid: [
        {
          code: 'const a = 1;\u{2029}const b = 2;',
          output: 'const a = 1;\n\nconst b = 2;',
          errors: [
            {
              messageId: 'unexpected',
              data: {
                name: 'PARAGRAPH_SEPARATOR',
                code: 'U+2029',
              },
            },
          ],
        },
      ],
    });
  });

  it('vertical-tab detects and replaces with newline', () => {
    ruleTester.run('vertical-tab', rules['vertical-tab'], {
      valid: [{ code: 'const a = 1;\nconst b = 2;' }],
      invalid: [
        {
          code: 'const a = 1;\vconst b = 2;',
          output: 'const a = 1;\nconst b = 2;',
          errors: [
            {
              messageId: 'unexpected',
              data: {
                name: 'VERTICAL TAB',
                code: 'U+000B',
              },
            },
          ],
        },
      ],
    });
  });

  it('visible-misc-spaces detects and normalizes other Unicode spaces', () => {
    ruleTester.run('visible-misc-spaces', rules['visible-misc-spaces'], {
      valid: [{ code: 'const a = 1;' }],
      invalid: [
        {
          code: 'const a\u{2004}= 1;',
          output: 'const a = 1;',
          errors: [
            {
              messageId: 'unexpected',
              data: {
                name: 'THREE-PER-EM SPACE',
                code: 'U+2004',
              },
            },
          ],
        },
      ],
    });
  });

  it('zero-width detects and removes zero-width characters', () => {
    ruleTester.run('zero-width', rules['zero-width'], {
      valid: [{ code: 'const clean = true;' }],
      invalid: [
        {
          code: 'const clean = "cl\u{200B}ean";',
          output: 'const clean = "clean";',
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
});
