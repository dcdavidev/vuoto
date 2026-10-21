import { describe, expect, it } from 'vitest';

import { ALL_RULE_NAMES, PLUGIN_NAME } from '../src/constants/index.js';
import plugin, {
  configs,
  createWhitespaceRule,
  plugin as namedPlugin,
  rules,
} from '../src/index.js';
import { getPackageMeta } from '../src/utils/package-meta.js';

describe('eslint-plugin-vuoto plugin', () => {
  it('exports plugin as default and named export', () => {
    expect(plugin).toBe(namedPlugin);
    expect(plugin.meta?.name).toBe(PLUGIN_NAME);
    expect(typeof plugin.meta?.version).toBe('string');
  });

  it('exposes all 13 rules in plugin.rules and rules export', () => {
    expect(plugin.rules).toBe(rules);
    expect(Object.keys(rules)).toHaveLength(ALL_RULE_NAMES.length);

    for (const name of ALL_RULE_NAMES) {
      expect(rules[name]).toBeDefined();
      expect(rules[name].meta?.type).toBe('problem');
      expect(rules[name].meta?.fixable).toBe('code');
      expect(rules[name].meta?.messages?.unexpected).toBeDefined();
      expect(typeof rules[name].create).toBe('function');
    }
  });

  it('exposes configs on plugin and via named export', () => {
    expect(plugin.configs).toBe(configs);
    expect(configs.recommended).toBeDefined();
    expect(configs.strict).toBeDefined();
    expect(configs.all).toBeDefined();
    expect(configs.off).toBeDefined();
  });

  it('exports createWhitespaceRule factory function', () => {
    expect(typeof createWhitespaceRule).toBe('function');
    const dummyRule = createWhitespaceRule(/test/, 'test rule');
    expect(dummyRule.meta?.docs?.description).toBe('test rule');
  });

  it('getPackageMeta returns valid package name and version', () => {
    const meta = getPackageMeta();
    expect(meta.name).toBe(PLUGIN_NAME);
    expect(meta.version).toMatch(/^\d+\.\d+\.\d+/);
  });
});
