import fsp from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

/**
 * Expand given patterns into globs.
 * @param patterns The patterns to expand.
 * @returns The expanded globs.
 * @example
 * await expandPatterns(['src', '*.ts']); // ['*.ts']
 */
export async function expandPatterns(patterns: string[]): Promise<string[]> {
  const expanded: string[] = [];

  for (const p of patterns) {
    // already a glob
    if (/[*?[\\]{}()!+@]/.test(p)) {
      expanded.push(p);
      continue;
    }

    try {
      const abs = path.resolve(process.cwd(), p);
      const st = await fsp.stat(abs);
      if (st.isDirectory()) {
        const rel = path.relative(process.cwd(), abs) || '.';
        expanded.push(
          rel === '.' ? '**/*' : `${rel.replaceAll('\\', '/')}` + '/**/*'
        );
        continue;
      }
    } catch {
      // not a real path → keep as-is
    }

    expanded.push(p);
  }

  return expanded;
}
