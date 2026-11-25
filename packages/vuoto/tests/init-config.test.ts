import fsp from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { initConfig } from '../src/actions/init-config.js';

describe('initConfig', () => {
  let cwd: string;

  beforeEach(async () => {
    cwd = await fsp.mkdtemp(path.join(os.tmpdir(), 'vuoto-init-'));
  });

  afterEach(async () => {
    await fsp.rm(cwd, { force: true, recursive: true });
  });

  it('creates vuoto.config.json when no config exists', async () => {
    const result = await initConfig(cwd, { silent: true });

    expect(result).toEqual({
      created: true,
      path: path.join(cwd, 'vuoto.config.json'),
    });
    const configContent = await fsp.readFile(result.path, 'utf8');
    expect(JSON.parse(configContent)).toEqual({ ignore: [] });
  });

  it('does not overwrite an existing supported config when force is false', async () => {
    const existingPath = path.join(cwd, '.config');
    await fsp.mkdir(existingPath);
    await fsp.writeFile(
      path.join(existingPath, 'vuoto.toml'),
      'ignore = ["existing/**"]\n',
      'utf8'
    );

    const result = await initConfig(cwd, { force: false, silent: true });

    expect(result).toEqual({
      created: false,
      path: path.join(existingPath, 'vuoto.toml'),
    });
    await expect(
      fsp.access(path.join(cwd, 'vuoto.config.json'))
    ).rejects.toThrow();
  });

  it('overwrites the root config when force is true', async () => {
    const configPath = path.join(cwd, 'vuoto.config.json');
    await fsp.writeFile(configPath, '{"ignore":["existing/**"]}', 'utf8');

    const result = await initConfig(cwd, { force: true, silent: true });

    expect(result).toEqual({ created: true, path: configPath });
    const configContent = await fsp.readFile(configPath, 'utf8');
    expect(JSON.parse(configContent)).toEqual({ ignore: [] });
  });
});
