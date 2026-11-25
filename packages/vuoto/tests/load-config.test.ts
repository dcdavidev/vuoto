import fsp from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import {
  loadVuotoConfig,
  loadVuotoIgnore,
  readGitignoreFile,
  resolveIgnores,
} from '../src/helpers/index.js';

const configFiles = [
  {
    filename: 'vuoto.config.json',
    content: '{"ignore":["dist/**","build/**"]}',
  },
  {
    filename: 'vuoto.config.jsonc',
    content:
      '{\n  // JSONC comments and trailing commas are supported.\n  "ignore": ["dist/**",],\n}',
  },
  {
    filename: 'vuoto.config.js',
    content: 'module.exports = { ignore: ["dist/**"] };',
  },
  {
    filename: 'vuoto.config.cjs',
    content: 'module.exports = { ignore: ["dist/**"] };',
  },
  {
    filename: 'vuoto.config.mjs',
    content: 'export default { ignore: ["dist/**"] };',
  },
  {
    filename: 'vuoto.config.yaml',
    content: 'ignore:\n  - dist/**\n',
  },
  {
    filename: 'vuoto.config.yml',
    content: 'ignore:\n  - dist/**\n',
  },
  {
    filename: 'vuoto.config.toml',
    content: 'ignore = ["dist/**"]\n',
  },
];

describe('load-config and resolve-config', () => {
  let cwd: string;

  beforeEach(async () => {
    cwd = await fsp.mkdtemp(path.join(os.tmpdir(), 'vuoto-config-'));
  });

  afterEach(async () => {
    await fsp.rm(cwd, { force: true, recursive: true });
  });

  describe('loadVuotoConfig', () => {
    it.each(configFiles)('loads $filename', async ({ filename, content }) => {
      await fsp.writeFile(path.join(cwd, filename), content, 'utf8');

      await expect(loadVuotoConfig(cwd)).resolves.toEqual({
        filepath: path.join(cwd, filename),
        ignore: filename.endsWith('.json')
          ? ['dist/**', 'build/**']
          : ['dist/**'],
      });
    });

    it('loads a config from the .config directory', async () => {
      const configDir = path.join(cwd, '.config');
      await fsp.mkdir(configDir);
      await fsp.writeFile(
        path.join(configDir, 'vuoto.toml'),
        'ignore = ["dist/**"]\n',
        'utf8'
      );

      await expect(loadVuotoConfig(cwd)).resolves.toEqual({
        filepath: path.join(configDir, 'vuoto.toml'),
        ignore: ['dist/**'],
      });
    });

    it('prefers a root config over a config in .config', async () => {
      await fsp.mkdir(path.join(cwd, '.config'));
      await fsp.writeFile(
        path.join(cwd, '.config', 'vuoto.json'),
        '{"ignore":["nested/**"]}',
        'utf8'
      );
      await fsp.writeFile(
        path.join(cwd, 'vuoto.config.json'),
        '{"ignore":["root/**"]}',
        'utf8'
      );

      await expect(loadVuotoIgnore(cwd)).resolves.toEqual(['root/**']);
    });

    it('returns null when no config file exists', async () => {
      await expect(loadVuotoConfig(cwd)).resolves.toBeNull();
      await expect(loadVuotoIgnore(cwd)).resolves.toEqual([]);
    });

    it('rejects invalid ignore property values', async () => {
      await fsp.writeFile(
        path.join(cwd, 'vuoto.config.json'),
        '{"ignore":["dist/**", 42]}',
        'utf8'
      );

      await expect(loadVuotoConfig(cwd)).rejects.toThrow('"ignore" property');
    });

    it('reports malformed JSONC instead of silently ignoring it', async () => {
      await fsp.writeFile(
        path.join(cwd, 'vuoto.config.jsonc'),
        '{"ignore": [}',
        'utf8'
      );

      await expect(loadVuotoConfig(cwd)).rejects.toThrow('Invalid JSONC');
    });
  });

  describe('readGitignoreFile', () => {
    it('returns an empty array if .gitignore does not exist', async () => {
      await expect(readGitignoreFile(cwd)).resolves.toEqual([]);
    });

    it('reads and parses .gitignore file patterns', async () => {
      await fsp.writeFile(
        path.join(cwd, '.gitignore'),
        '*.log\n# A comment\ncoverage/\n',
        'utf8'
      );

      await expect(readGitignoreFile(cwd)).resolves.toEqual([
        '*.log',
        'coverage/',
      ]);
    });
  });

  describe('resolveIgnores', () => {
    it('combines defaults, config, and gitignore patterns', async () => {
      await fsp.writeFile(
        path.join(cwd, 'vuoto.config.json'),
        '{"ignore":["custom-ignore/**"]}',
        'utf8'
      );
      await fsp.writeFile(
        path.join(cwd, '.gitignore'),
        'git-ignore/**\n',
        'utf8'
      );

      const result = await resolveIgnores(cwd, { includeGitignore: true });

      expect(result).toContain('custom-ignore/**');
      expect(result).toContain('git-ignore/**');
      expect(result).toContain('**/node_modules/**');
    });

    it('skips gitignore when includeGitignore is false', async () => {
      await fsp.writeFile(
        path.join(cwd, 'vuoto.config.json'),
        '{"ignore":["custom-ignore/**"]}',
        'utf8'
      );
      await fsp.writeFile(
        path.join(cwd, '.gitignore'),
        'git-ignore/**\n',
        'utf8'
      );

      const result = await resolveIgnores(cwd, { includeGitignore: false });

      expect(result).toContain('custom-ignore/**');
      expect(result).not.toContain('git-ignore/**');
    });
  });
});
