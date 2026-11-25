import { cosmiconfig } from 'cosmiconfig';
import { parse as parseJsonc, type ParseError } from 'jsonc-parser';
import { parse as parseToml } from 'smol-toml';

const configExtensions = [
  'json',
  'jsonc',
  'js',
  'cjs',
  'mjs',
  'yaml',
  'yml',
  'toml',
];

const explorer = cosmiconfig('vuoto', {
  searchStrategy: 'none',
  searchPlaces: [
    ...configExtensions.map((extension) => `vuoto.config.${extension}`),
    ...configExtensions.map((extension) => `.config/vuoto.${extension}`),
  ],
  loaders: {
    '.jsonc': (filepath, content) => {
      const errors: ParseError[] = [];
      const config = parseJsonc(content, errors, { allowTrailingComma: true });

      if (errors.length > 0) {
        throw new SyntaxError(
          `Invalid JSONC in ${filepath} at offset ${errors[0]?.offset ?? 0}.`
        );
      }

      return config;
    },
    '.toml': (_filepath, content) => parseToml(content),
  },
});

export interface LoadedVuotoConfig {
  filepath: string;
  ignore: string[];
}

/**
 * Load and validate the Vuoto config file from the working directory.
 * @param cwd Directory to search for Vuoto configuration.
 * @returns The config file path and ignore patterns, or null if no config exists.
 */
export async function loadVuotoConfig(
  cwd: string
): Promise<LoadedVuotoConfig | null> {
  const result = await explorer.search(cwd);

  if (!result) {
    return null;
  }

  if (
    typeof result.config !== 'object' ||
    result.config === null ||
    Array.isArray(result.config)
  ) {
    throw new TypeError(
      `Vuoto config at ${result.filepath} must export an object.`
    );
  }

  const config = result.config as Record<string, unknown>;
  const ignore = config.ignore;

  if (ignore === undefined) {
    return { filepath: result.filepath, ignore: [] };
  }

  if (
    !Array.isArray(ignore) ||
    !ignore.every((pattern): pattern is string => typeof pattern === 'string')
  ) {
    throw new TypeError(
      `The "ignore" property in ${result.filepath} must be an array of strings.`
    );
  }

  return { filepath: result.filepath, ignore: [...ignore] };
}

/**
 * Load ignore paths from the discovered Vuoto configuration file.
 * @param cwd Directory to search for Vuoto configuration.
 * @returns Configured ignore patterns, or an empty array if no config exists.
 */
export async function loadVuotoIgnore(cwd: string): Promise<string[]> {
  const config = await loadVuotoConfig(cwd);
  return config?.ignore ?? [];
}
