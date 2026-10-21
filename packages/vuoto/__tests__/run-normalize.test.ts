import fsp from 'node:fs/promises';
import process from 'node:process';

import { beforeEach, describe, expect, it, vi } from 'vitest';

import fg from 'fast-glob';

import { runNormalize } from '../src/actions/run-normalize.js';

vi.mock('fast-glob');

describe('runNormalize', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.exitCode = undefined;
  });

  it('should return empty result if no files matched', async () => {
    vi.mocked(fg).mockResolvedValue([] as never);

    const result = await runNormalize({
      patterns: ['non-existent/**/*'],
      silent: true,
    });

    expect(result.totalFiles).toBe(0);
    expect(result.hasIssues).toBe(false);
  });

  it('should detect whitespace issues in check mode without writing files', async () => {
    vi.mocked(fg).mockResolvedValue(['/workspace/test.txt'] as never);
    vi.spyOn(fsp, 'readFile').mockResolvedValue('Hello\u{200B}World');
    const writeSpy = vi.spyOn(fsp, 'writeFile').mockResolvedValue();

    const result = await runNormalize({
      patterns: ['**/*'],
      fix: false,
      silent: true,
    });

    expect(result.totalFiles).toBe(1);
    expect(result.hasIssues).toBe(true);
    expect(result.issuesCount).toBe(1);
    expect(result.fixedCount).toBe(0);
    expect(writeSpy).not.toHaveBeenCalled();
  });

  it('should fix whitespace issues in fix mode and write to disk', async () => {
    vi.mocked(fg).mockResolvedValue(['/workspace/test.txt'] as never);
    vi.spyOn(fsp, 'readFile').mockResolvedValue('Hello\u{200B}World');
    const writeSpy = vi.spyOn(fsp, 'writeFile').mockResolvedValue();

    const result = await runNormalize({
      patterns: ['**/*'],
      fix: true,
      silent: true,
    });

    expect(result.totalFiles).toBe(1);
    expect(result.hasIssues).toBe(true);
    expect(result.fixedCount).toBe(1);
    expect(writeSpy).toHaveBeenCalledWith(
      '/workspace/test.txt',
      'HelloWorld',
      'utf8'
    );
  });

  it('should correctly report clean files without modifications', async () => {
    vi.mocked(fg).mockResolvedValue(['/workspace/clean.txt'] as never);
    vi.spyOn(fsp, 'readFile').mockResolvedValue('Clean file without issues');
    const writeSpy = vi.spyOn(fsp, 'writeFile').mockResolvedValue();

    const result = await runNormalize({
      patterns: ['**/*'],
      fix: true,
      silent: true,
    });

    expect(result.totalFiles).toBe(1);
    expect(result.hasIssues).toBe(false);
    expect(result.cleanCount).toBe(1);
    expect(result.fixedCount).toBe(0);
    expect(writeSpy).not.toHaveBeenCalled();
  });

  it('should handle read errors gracefully without throwing', async () => {
    vi.mocked(fg).mockResolvedValue(['/workspace/error.txt'] as never);
    vi.spyOn(fsp, 'readFile').mockRejectedValue(new Error('Permission denied'));

    const result = await runNormalize({
      patterns: ['**/*'],
      silent: true,
    });

    expect(result.totalFiles).toBe(1);
    expect(result.files[0].error).toBeDefined();
    expect(result.files[0].error?.message).toBe('Permission denied');
  });

  it('should set process.exitCode = 1 when exitOnError is true and issues exist', async () => {
    vi.mocked(fg).mockResolvedValue(['/workspace/test.txt'] as never);
    vi.spyOn(fsp, 'readFile').mockResolvedValue('Hello\u{200B}World');

    await runNormalize({
      patterns: ['**/*'],
      fix: false,
      exitOnError: true,
      silent: true,
    });

    expect(process.exitCode).toBe(1);
  });
});
