import fsp from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { expandPatterns } from './expand-patterns.js';

describe('expandPatterns', () => {
  const cwd = process.cwd();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return a glob if the pattern is already a glob', async () => {
    const result = await expandPatterns(['*.ts']);
    expect(result).toEqual(['*.ts']);
  });

  it('should expand a directory path to include all files', async () => {
    // mock fsp.stat to simulate a directory
    vi.spyOn(fsp, 'stat').mockResolvedValue({ isDirectory: () => true } as any);
    vi.spyOn(path, 'resolve').mockReturnValue('/abs/path/src');
    vi.spyOn(path, 'relative').mockReturnValue('src');

    const result = await expandPatterns(['src']);
    expect(result).toEqual(['src/**/*']);
  });

  it('should expand current directory "." to "**/*"', async () => {
    vi.spyOn(fsp, 'stat').mockResolvedValue({ isDirectory: () => true } as any);
    vi.spyOn(path, 'resolve').mockReturnValue(cwd);
    vi.spyOn(path, 'relative').mockReturnValue('');

    const result = await expandPatterns(['.']);
    expect(result).toEqual(['**/*']);
  });

  it('should return the original pattern if it is not a directory and not a glob', async () => {
    vi.spyOn(fsp, 'stat').mockRejectedValue(new Error('File not found'));
    const result = await expandPatterns(['file.txt']);
    expect(result).toEqual(['file.txt']);
  });
});
