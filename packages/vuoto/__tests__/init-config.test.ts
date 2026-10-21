import fsp from 'node:fs/promises';

import { beforeEach, describe, expect, it, vi } from 'vitest';

import { initConfig } from '../src/actions/init-config.js';

describe('initConfig', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create .vuotoignore when it does not exist', async () => {
    vi.spyOn(fsp, 'access').mockRejectedValue(new Error('ENOENT'));
    const writeSpy = vi.spyOn(fsp, 'writeFile').mockResolvedValue();

    const result = await initConfig('/test/dir', { silent: true });

    expect(result.created).toBe(true);
    expect(result.path).toContain('.vuotoignore');
    expect(writeSpy).toHaveBeenCalledTimes(1);
  });

  it('should not overwrite existing file when force is false', async () => {
    vi.spyOn(fsp, 'access').mockResolvedValue();
    const writeSpy = vi.spyOn(fsp, 'writeFile').mockResolvedValue();

    const result = await initConfig('/test/dir', {
      force: false,
      silent: true,
    });

    expect(result.created).toBe(false);
    expect(writeSpy).not.toHaveBeenCalled();
  });

  it('should overwrite existing file when force is true', async () => {
    vi.spyOn(fsp, 'access').mockResolvedValue();
    const writeSpy = vi.spyOn(fsp, 'writeFile').mockResolvedValue();

    const result = await initConfig('/test/dir', { force: true, silent: true });

    expect(result.created).toBe(true);
    expect(writeSpy).toHaveBeenCalledTimes(1);
  });
});
