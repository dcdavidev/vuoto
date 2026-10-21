import { describe, expect, it } from 'vitest';

import { normalize } from '../src/normalize.js';

describe('normalize', () => {
  it('should remove zero-width space', () => {
    expect(normalize('Hello\u{200B}World')).toBe('HelloWorld');
  });

  it('should remove zero-width non-joiner', () => {
    expect(normalize('Hello\u{200C}World')).toBe('HelloWorld');
  });

  it('should remove zero-width joiner', () => {
    expect(normalize('Hello\u{200D}World')).toBe('HelloWorld');
  });

  it('should remove byte order mark', () => {
    expect(normalize('\u{FEFF}Hello')).toBe('Hello');
  });

  it('should replace non-breaking space with a normal space', () => {
    expect(normalize('Hello\u{A0}World')).toBe('Hello World');
  });

  it('should replace narrow no-break space with a normal space', () => {
    expect(normalize('Hello\u{202F}World')).toBe('Hello World');
  });

  it('should replace em space with a normal space', () => {
    expect(normalize('Hello\u{2003}World')).toBe('Hello World');
  });

  it('should replace en space with a normal space', () => {
    expect(normalize('Hello\u{2002}World')).toBe('Hello World');
  });

  it('should replace ideographic space with a normal space', () => {
    expect(normalize('Hello\u{3000}World')).toBe('Hello World');
  });

  it('should replace line separator with a newline', () => {
    expect(normalize('Hello' + String.fromCharCode(0x20_28) + 'World')).toBe(
      'Hello\nWorld'
    );
  });

  it('should replace paragraph separator with double newline', () => {
    expect(normalize('Hello' + String.fromCharCode(0x20_29) + 'World')).toBe(
      'Hello\n\nWorld'
    );
  });

  it('should replace form feed with a newline', () => {
    expect(normalize('Hello\fWorld')).toBe('Hello\nWorld');
  });

  it('should replace vertical tab with a newline', () => {
    expect(normalize('Hello\vWorld')).toBe('Hello\nWorld');
  });

  it('should handle multiple whitespace issues', () => {
    expect(
      normalize(
        '\u{FEFF}Hello\u{200B} \u{A0}World' + String.fromCharCode(0x20_28)
      )
    ).toBe('Hello  World\n');
  });
});
