import fs from 'node:fs/promises';
import path from 'node:path';

/**
 * Read .gitignore file in a directory, if present.
 */
export async function readGitignoreFile(dir: string): Promise<string[]> {
  const gitignorePath = path.join(dir, '.gitignore');
  try {
    const content = await fs.readFile(gitignorePath, 'utf8');
    return content
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith('#'));
  } catch {
    return [];
  }
}
