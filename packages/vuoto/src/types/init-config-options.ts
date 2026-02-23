/**
 * Options for initializing configuration.
 * @property silent Suppress all output.
 * @property verbose Show detailed information.
 * @example
 * ```ts
 * await initConfig({ silent: false });
 * ```
 */
export type InitConfigOptions = {
  silent?: boolean;
  verbose?: boolean;
};
