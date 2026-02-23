import { describe, expect, it } from 'vitest';
import { normalize } from './normalize.js';

describe('normalize', () => {
  it('should remove zero-width space', () => {
    expect(normalize('Hello\u200BWorld')).toBe('HelloWorld');
  });

  it('should remove zero-width non-joiner', () => {
    expect(normalize('Hello\u200CWorld')).toBe('HelloWorld');
  });

  it('should remove zero-width joiner', () => {
    expect(normalize('Hello\u200DWorld')).toBe('HelloWorld');
  });

  it('should remove byte order mark', () => {
    expect(normalize('\uFEFFHello')).toBe('Hello');
  });

  it('should replace non-breaking space with a normal space', () => {
    expect(normalize('Hello\u00A0World')).toBe('Hello World');
  });

  it('should replace narrow no-break space with a normal space', () => {
    expect(normalize('Hello\u202FWorld')).toBe('Hello World');
  });

  it('should replace em space with a normal space', () => {
    expect(normalize('Hello\u2003World')).toBe('Hello World');
  });

  it('should replace en space with a normal space', () => {
    expect(normalize('Hello\u2002World')).toBe('Hello World');
  });

  it('should replace ideographic space with a normal space', () => {
    expect(normalize('Hello\u3000World')).toBe('Hello World');
  });

  it('should replace line separator with a newline', () => {
    expect(normalize('Hello' + String.fromCharCode(0x2028) + 'World')).toBe('Hello\nWorld');
  });

  it('should replace paragraph separator with double newline', () => {
    expect(normalize('Hello' + String.fromCharCode(0x2029) + 'World')).toBe('Hello\n\nWorld');
  });

  it('should replace form feed with a newline', () => {
    expect(normalize('Hello\fWorld')).toBe('Hello\nWorld');
  });

  it('should replace vertical tab with a newline', () => {
    expect(normalize('Hello\vWorld')).toBe('Hello\nWorld');
  });

  it('should handle multiple whitespace issues', () => {
    expect(normalize('\uFEFFHello\u200B \u00A0World' + String.fromCharCode(0x2028))).toBe('Hello  World\n');
  });
});
