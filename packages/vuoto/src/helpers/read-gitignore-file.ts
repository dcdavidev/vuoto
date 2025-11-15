import fsp from 'node:fs/promises';
import path from 'node:path';

/**
 * Read .gitignore file in a directory, if present.
 * @param dir The directory to read the .gitignore file from.
 *
 * @returns The patterns from the .gitignore file.
 *
 * @example
 *
 * ```ts
 * const patterns = await readGitignoreFile(process.cwd());
 * ```
 */
export async function readGitignoreFile(dir: string): Promise<string[]> {
  const gitignorePath = path.join(dir, '.gitignore');
  try {
    const content = await fsp.readFile(gitignorePath, 'utf8');
    return content
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith('#'));
  } catch {
    return [];
  }
}
