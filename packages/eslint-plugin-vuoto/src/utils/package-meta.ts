import fs from 'node:fs';

export interface PackageMeta {
  name: string;
  version: string;
}

/**
 * Resolves package name and version directly from the nearest package.json.
 */
function resolvePackageMeta(): PackageMeta {
  const candidateUrls = [
    new URL('../package.json', import.meta.url),
    new URL('../../package.json', import.meta.url),
  ];

  for (const url of candidateUrls) {
    if (!fs.existsSync(url)) {
      continue;
    }

    try {
      const content = fs.readFileSync(url, 'utf8');
      const parsed = JSON.parse(content) as {
        name?: string;
        version?: string;
      };

      if (parsed.name && parsed.version) {
        return {
          name: parsed.name,
          version: parsed.version,
        };
      }
    } catch {
      // Continue to next candidate URL
    }
  }

  throw new Error('Failed to locate package.json for eslint-plugin-vuoto');
}

const packageMeta: PackageMeta = resolvePackageMeta();

/**
 * Retrieves the package name and version parsed from package.json.
 */
export function getPackageMeta(): PackageMeta {
  return packageMeta;
}
