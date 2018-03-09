import { preprocess } from './core/preprocess';
import { addRule, clearRules, newClassName, css } from './rules';
import { cache, renderedCache, clearCache } from './core/rule-cache';
import { hash } from './core/hash';

const noop = () => '';

const buildRule = (parts, args, global) => {
  const isDynamic = args.length && args.some(arg => typeof arg === 'function');

  const fn = (props, context) => {
    let rawText = '';

    for (let i = 0; i < parts.length; i++) {
      rawText += parts[i];

      if (i < args.length) {
        if (typeof args[i] === 'function') {
          rawText += args[i](props, context);
        } else {
          rawText += args[i];
        }
      }
    }

    if (!rawText) return '';

    if (global) {
      const rules = preprocess('', rawText);
      for (let r = 0; r < rules.length; r++) {
        addRule(rules[r]);
      }
      return '';
    }

    const cacheEntry = cache[rawText];
    if (cacheEntry) return cacheEntry;

    const className = hash(rawText);
    cache[rawText] = className;

    if (!renderedCache[className]) {
      const rules = preprocess('.' + className, rawText);
      for (let r = 0; r < rules.length; r++) {
        addRule(rules[r]);
      }
    }

    return className;
  };

  if (isDynamic) return fn;
  const rendered = fn();
  return () => rendered;
};

const rule = (parts, ...args) => {
  if (!parts) return noop;
  return buildRule(parts, args);
};

const global = (parts, ...args) => {
  if (!parts) return noop;
  return buildRule(parts, args, true);
};

const reset = () => {
  clearRules();
  clearCache();
};

export { rule, global, reset, css };
