import { describe, expect, it } from 'vitest';

import {
  baseRules,
  configAll,
  configOff,
  configRecommended,
  configs,
  configStrict,
  offRules,
} from '../src/configs/index.js';
import { ALL_RULE_NAMES } from '../src/constants/index.js';
import { plugin } from '../src/plugin.js';

describe('eslint configs', () => {
  it('contains all 13 rules in baseRules', () => {
    expect(Object.keys(baseRules)).toHaveLength(ALL_RULE_NAMES.length);
    for (const rule of ALL_RULE_NAMES) {
      expect(baseRules[`vuoto/${rule}`]).toBe('error');
    }
  });

  it('contains all 13 rules disabled in offRules', () => {
    expect(Object.keys(offRules)).toHaveLength(ALL_RULE_NAMES.length);
    for (const rule of ALL_RULE_NAMES) {
      expect(offRules[`vuoto/${rule}`]).toBe('off');
    }
  });

  it('recommended config includes plugin and baseRules', () => {
    expect(configRecommended).toHaveLength(1);
    const cfg = configRecommended[0]!;
    expect(cfg.name).toBe('vuoto/recommended');
    expect(cfg.plugins?.vuoto).toBe(plugin);
    expect(cfg.rules).toEqual(baseRules);
  });

  it('strict config includes plugin and baseRules', () => {
    expect(configStrict).toHaveLength(1);
    const cfg = configStrict[0]!;
    expect(cfg.name).toBe('vuoto/strict');
    expect(cfg.plugins?.vuoto).toBe(plugin);
    expect(cfg.rules).toEqual(baseRules);
  });

  it('all config includes plugin and baseRules', () => {
    expect(configAll).toHaveLength(1);
    const cfg = configAll[0]!;
    expect(cfg.name).toBe('vuoto/all');
    expect(cfg.plugins?.vuoto).toBe(plugin);
    expect(cfg.rules).toEqual(baseRules);
  });

  it('off config includes plugin and offRules', () => {
    expect(configOff).toHaveLength(1);
    const cfg = configOff[0]!;
    expect(cfg.name).toBe('vuoto/off');
    expect(cfg.plugins?.vuoto).toBe(plugin);
    expect(cfg.rules).toEqual(offRules);
  });

  it('configs dictionary maps all 4 presets', () => {
    expect(configs.recommended).toBe(configRecommended);
    expect(configs.strict).toBe(configStrict);
    expect(configs.all).toBe(configAll);
    expect(configs.off).toBe(configOff);
  });
});
