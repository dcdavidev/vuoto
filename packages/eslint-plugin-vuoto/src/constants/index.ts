import { getPackageMeta } from '../utils/package-meta.js';

const packageMeta = getPackageMeta();

/**
 * Plugin identifier name retrieved from package.json.
 */
export const PLUGIN_NAME = packageMeta.name;

/**
 * Package version retrieved from package.json.
 */
export const PLUGIN_VERSION = packageMeta.version;

/**
 * All rule identifiers supported by eslint-plugin-vuoto without plugin prefix.
 */
export const ALL_RULE_NAMES = [
  'byte-order-mark',
  'em-space',
  'en-space',
  'form-feed',
  'ideographic-space',
  'invisible-separators',
  'line-separator',
  'narrow-no-break-space',
  'non-breaking-space',
  'paragraph-separator',
  'vertical-tab',
  'visible-misc-spaces',
  'zero-width',
] as const;

/**
 * Union type of all valid rule names without prefix.
 */
export type VuotoRuleName = (typeof ALL_RULE_NAMES)[number];
