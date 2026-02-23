import fsp from 'node:fs/promises';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { loadVuotoIgnore } from './load-config.js';

describe('loadVuotoIgnore', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return an empty array if .vuotoignore does not exist', async () => {
    vi.spyOn(fsp, 'readFile').mockRejectedValue(new Error('File not found'));
    const result = await loadVuotoIgnore('/some/path');
    expect(result).toEqual([]);
  });

  it('should return patterns from .vuotoignore file', async () => {
    const content = `node_modules
# This is a comment

dist/**
`;
    vi.spyOn(fsp, 'readFile').mockResolvedValue(content);
    const result = await loadVuotoIgnore('/some/path');
    expect(result).toEqual(['node_modules', 'dist/**']);
  });
});
