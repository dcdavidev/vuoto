/**
 * @file Fetches the latest Node.js LTS release, updates `.nvmrc`
 * and `devEngines.runtime` in `package.json`, and upgrades `@types/node`.
 */

import { execFileSync } from 'node:child_process';
import {
  appendFileSync,
  existsSync,
  readFileSync,
  writeFileSync,
} from 'node:fs';

interface NodeRelease {
  version: string;
  lts: string | boolean;
}

interface DevEngineEntry {
  name: string;
  version?: string;
  onFail?: string;
}

interface PackageJson {
  devEngines?: {
    runtime?: DevEngineEntry | DevEngineEntry[];
  };
  [key: string]: unknown;
}

/**
 * Type guard verifying that an unknown payload is an array of NodeRelease objects.
 */
function isNodeReleaseArray(data: unknown): data is NodeRelease[] {
  return (
    Array.isArray(data) &&
    data.every(
      (item) =>
        typeof item === 'object' &&
        item !== null &&
        'version' in item &&
        typeof item.version === 'string' &&
        'lts' in item &&
        (typeof item.lts === 'string' || typeof item.lts === 'boolean')
    )
  );
}

/**
 * Fetches the latest Node.js LTS version string without the leading "v".
 */
async function fetchLatestLtsVersion(): Promise<string> {
  const response = await fetch('https://nodejs.org/dist/index.json');
  if (!response.ok) {
    throw new Error(
      `Failed to fetch Node.js release index: ${response.status} ${response.statusText}`
    );
  }

  const data: unknown = await response.json();
  if (!isNodeReleaseArray(data)) {
    throw new Error(
      'Unexpected response structure from Node.js release index.'
    );
  }

  const latestLts = data.find((release) => release.lts !== false);
  if (!latestLts) {
    throw new Error('Unable to find an active Node.js LTS release.');
  }

  return latestLts.version.replace(/^v/, '');
}

/**
 * Updates a single devEngines runtime entry if it targets Node.js.
 */
function didUpdateRuntimeEntry(
  entry: DevEngineEntry,
  isMajorOnly: boolean,
  latestMajor: string,
  latestFull: string
): boolean {
  if (entry.name !== 'node' || typeof entry.version !== 'string') {
    return false;
  }

  // Extract leading semver range operator if present
  const prefixMatch = entry.version.match(/^(\^|~|>=|>)?/);
  const prefix = prefixMatch?.[0] ?? '';
  const targetVersion = isMajorOnly
    ? `${prefix}${latestMajor}.0.0`
    : `${prefix}${latestFull}`;

  if (entry.version === targetVersion) {
    return false;
  }

  entry.version = targetVersion;
  return true;
}

/**
 * Emits outputs for GitHub Actions or logs the result to standard output.
 */
function reportResult(isUpdated: boolean, version?: string): void {
  const githubOutput = process.env.GITHUB_OUTPUT;

  if (githubOutput) {
    const lines =
      isUpdated && version
        ? `updated=true\nversion=${version}\n`
        : 'updated=false\n';
    appendFileSync(githubOutput, lines, 'utf8');
    return;
  }

  process.stdout.write(
    isUpdated && version
      ? `Updated Node.js version to ${version}\n`
      : 'Node.js version is already up to date.\n'
  );
}

/**
 * Entry point coordinating `.nvmrc` and `package.json` updates.
 */
async function main(): Promise<void> {
  if (!existsSync('.nvmrc') || !existsSync('package.json')) {
    throw new Error(
      'Both .nvmrc and package.json must exist in the current working directory.'
    );
  }

  const latestFull = await fetchLatestLtsVersion();
  const latestMajor = latestFull.split('.', 1)[0] ?? '';

  const currentNvmrc = readFileSync('.nvmrc', 'utf8').trim();
  const isMajorOnly = /^\d+$/.test(currentNvmrc);
  const targetNvmrc = isMajorOnly ? latestMajor : latestFull;

  let isChanged = false;

  // Update .nvmrc when target version differs
  if (currentNvmrc !== targetNvmrc) {
    writeFileSync('.nvmrc', `${targetNvmrc}\n`, 'utf8');
    isChanged = true;
  }

  // Parse package.json and update devEngines.runtime entries
  const pkg = JSON.parse(readFileSync('package.json', 'utf8')) as PackageJson;
  const runtime = pkg.devEngines?.runtime;

  if (Array.isArray(runtime)) {
    for (const entry of runtime) {
      if (didUpdateRuntimeEntry(entry, isMajorOnly, latestMajor, latestFull)) {
        isChanged = true;
      }
    }
  } else if (
    runtime &&
    didUpdateRuntimeEntry(runtime, isMajorOnly, latestMajor, latestFull)
  ) {
    isChanged = true;
  }

  if (isChanged) {
    writeFileSync('package.json', `${JSON.stringify(pkg, null, 2)}\n`, 'utf8');

    // Upgrade @types/node across the workspace and pnpm-lock.yaml
    execFileSync('pnpm', ['up', '-r', '@types/node'], { stdio: 'inherit' });

    reportResult(true, targetNvmrc);
  } else {
    reportResult(false);
  }
}

try {
  await main();
} catch (error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  process.stderr.write(`Error: ${message}\n`);
  process.exit(1);
}
