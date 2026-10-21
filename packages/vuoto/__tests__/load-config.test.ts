import fsp from 'node:fs/promises';

import { beforeEach, describe, expect, it, vi } from 'vitest';

import {
  loadVuotoIgnore,
  readGitignoreFile,
  resolveIgnores,
} from '../src/helpers/index.js';

describe('load-config and resolve-config', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('loadVuotoIgnore', () => {
    it('should return an empty array if .vuotoignore does not exist', async () => {
      vi.spyOn(fsp, 'readFile').mockRejectedValue(new Error('File not found'));
      const result = await loadVuotoIgnore('/some/path');
      expect(result).toEqual([]);
    });

    it('should return patterns from .vuotoignore file with CRLF or LF', async () => {
      const content = 'dist/**\r\n# Comment\r\nbuild/**\nnode_modules\n';
      vi.spyOn(fsp, 'readFile').mockResolvedValue(content);
      const result = await loadVuotoIgnore('/some/path');
      expect(result).toEqual(['dist/**', 'build/**', 'node_modules']);
    });
  });

  describe('readGitignoreFile', () => {
    it('should return empty array if .gitignore does not exist', async () => {
      vi.spyOn(fsp, 'readFile').mockRejectedValue(new Error('File not found'));
      const result = await readGitignoreFile('/some/path');
      expect(result).toEqual([]);
    });

    it('should read and parse .gitignore file patterns', async () => {
      const content = '*.log\n# A comment\ncoverage/\n';
      vi.spyOn(fsp, 'readFile').mockResolvedValue(content);
      const result = await readGitignoreFile('/some/path');
      expect(result).toEqual(['*.log', 'coverage/']);
    });
  });

  describe('resolveIgnores', () => {
    it('should combine default ignores with vuotoignore and gitignore', async () => {
      vi.spyOn(fsp, 'readFile').mockImplementation(async (filePath) => {
        const pathStr = String(filePath);
        if (pathStr.includes('.vuotoignore')) {
          return 'custom-ignore/**\n';
        }
        if (pathStr.includes('.gitignore')) {
          return 'git-ignore/**\n';
        }
        throw new Error('Not found');
      });

      const result = await resolveIgnores('/some/path', {
        includeGitignore: true,
      });

      expect(result).toContain('custom-ignore/**');
      expect(result).toContain('git-ignore/**');
      expect(result).toContain('**/node_modules/**');
    });

    it('should skip gitignore when includeGitignore is false', async () => {
      vi.spyOn(fsp, 'readFile').mockImplementation(async (filePath) => {
        const pathStr = String(filePath);
        if (pathStr.includes('.vuotoignore')) {
          return 'custom-ignore/**\n';
        }
        if (pathStr.includes('.gitignore')) {
          return 'git-ignore/**\n';
        }
        throw new Error('Not found');
      });

      const result = await resolveIgnores('/some/path', {
        includeGitignore: false,
      });

      expect(result).toContain('custom-ignore/**');
      expect(result).not.toContain('git-ignore/**');
    });
  });
});
