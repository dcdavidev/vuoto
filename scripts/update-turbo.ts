/**
 * @file Checks for a newer Turborepo release on npm, updates `turbo`
 * via pnpm, and runs `@turbo/codemod` to apply configuration migrations.
 */

import { execFileSync } from 'node:child_process';
import { appendFileSync, existsSync, readFileSync } from 'node:fs';

interface NpmRegistryLatest {
  version: string;
}

interface PackageJson {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
}

/**
 * Type guard verifying that an unknown payload contains a string version field.
 */
function isNpmRegistryLatest(data: unknown): data is NpmRegistryLatest {
  return (
    typeof data === 'object' &&
    data !== null &&
    'version' in data &&
    typeof data.version === 'string'
  );
}

/**
 * Fetches the latest published version of `turbo` from the npm registry.
 */
async function fetchLatestTurboVersion(): Promise<string> {
  const response = await fetch('https://registry.npmjs.org/turbo/latest');
  if (!response.ok) {
    throw new Error(
      `Failed to fetch turbo metadata: ${response.status} ${response.statusText}`
    );
  }

  const data: unknown = await response.json();
  if (!isNpmRegistryLatest(data)) {
    throw new Error(
      'Unexpected response structure from npm registry for turbo.'
    );
  }

  return data.version;
}

/**
 * Reads the currently declared version range of `turbo` from `package.json`.
 */
function readCurrentTurboSpec(): string | undefined {
  const pkg = JSON.parse(readFileSync('package.json', 'utf8')) as PackageJson;
  return pkg.devDependencies?.turbo ?? pkg.dependencies?.turbo;
}

/**
 * Emits outputs for GitHub Actions or logs the status to standard output.
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
      ? `Updated turbo to ${version} and ran @turbo/codemod.\n`
      : 'Turborepo is already up to date.\n'
  );
}

/**
 * Entry point coordinating the `turbo` version check, upgrade, and codemod execution.
 */
async function main(): Promise<void> {
  if (!existsSync('package.json')) {
    throw new Error(
      'package.json must exist in the current working directory.'
    );
  }

  const currentSpec = readCurrentTurboSpec();
  if (!currentSpec) {
    throw new Error(
      'turbo is not listed in dependencies or devDependencies of package.json.'
    );
  }

  const latestVersion = await fetchLatestTurboVersion();
  const currentCleanVersion = currentSpec.replace(/^[\^~>=<]+/, '');

  if (currentCleanVersion === latestVersion) {
    reportResult(false);
    return;
  }

  // Upgrade turbo in package.json and pnpm-lock.yaml
  execFileSync('pnpm', ['up', `turbo@${latestVersion}`], {
    stdio: 'inherit',
  });

  // Execute Turborepo codemod migrations on the repository root
  execFileSync('pnx', ['@turbo/codemod@latest', 'update', '--force', '.'], {
    stdio: 'inherit',
  });

  reportResult(true, latestVersion);
}

try {
  await main();
} catch (error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  process.stderr.write(`Error: ${message}\n`);
  process.exit(1);
}
