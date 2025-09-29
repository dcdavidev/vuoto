export { expandPatterns } from './actions/expand-patterns.js';
export { initConfig } from './actions/init-config.js';
export { runNormalize } from './actions/run-normalize.js';
export {
  BYTE_ORDER_MARK,
  DEFAULT_IGNORES,
  EM_SPACE,
  EN_SPACE,
  FORM_FEED,
  IDEOGRAPHIC_SPACE,
  INVISIBLE_SEPARATORS,
  LINE_SEPARATOR,
  NARROW_NO_BREAK_SPACE,
  NON_BREAKING_SPACE,
  PARAGRAPH_SEPARATOR,
  VERTICAL_TAB,
  VISIBLE_MISC_SPACES,
  VUOTO_CONFIG_BASENAME,
  VUOTO_CONFIG_EXTENSIONS,
  VUOTO_CONFIG_PATHS,
  VUOTO_CONFIG_TEMPLATE_EXT,
  ZERO_WIDTH,
} from './consts.js';
export { collectGitignores } from './helpers/collect-gitignores.js';
export { instanceOfNodeError } from './helpers/instance-of-node-error.js';
export { loadConfig } from './helpers/load-config.js';
export { readGitignoreFile } from './helpers/read-gitignore-file.js';
export { resolveConfig } from './helpers/resolve-config.js';
export { normalize } from './normalize.js';
export { normalizeByteOrderMark } from './normalizers/byte-order-mark.js';
export { normalizeEmSpace } from './normalizers/em-space.js';
export { normalizeEnSpace } from './normalizers/en-space.js';
export { normalizeFormFeed } from './normalizers/form-feed.js';
export { normalizeIdeographicSpace } from './normalizers/ideographic-space.js';
export { normalizeInvisibleSeparators } from './normalizers/invisible-separators.js';
export { normalizeLineSeparator } from './normalizers/line-separator.js';
export { normalizeNarrowNoBreakSpace } from './normalizers/narrow-no-break-space.js';
export { normalizeNonBreakingSpace } from './normalizers/non-breaking-space.js';
export { normalizeParagraphSeparator } from './normalizers/paragraph-separator.js';
export { normalizeVerticalTab } from './normalizers/vertical-tab.js';
export { normalizeVisibleMiscSpaces } from './normalizers/visible-misc-spaces.js';
export { normalizeZeroWidth } from './normalizers/zero-width.js';
export type { Config } from './types/config.js';
export type { RunNormalizeOptions } from './types/normalize-options.js';
