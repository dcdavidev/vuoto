/**
 * Options for initializing the .vuotoignore configuration file.
 * @property force Overwrite existing configuration file if present.
 * @property silent Suppress all console output.
 * @property verbose Show detailed information.
 * @example
 * ```ts
 * await initConfig(process.cwd(), { force: false });
 * ```
 */
export interface InitConfigOptions {
  force?: boolean;
  silent?: boolean;
  verbose?: boolean;
}
