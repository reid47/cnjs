import { preprocess } from './preprocess';
import { get, set, clear } from './cache';
import { addRule, clearRules, newClassName, css } from './rules';

const buildRule = (parts, args, global) => {
  const isDynamic = args.length && args.some(arg => typeof arg === 'function');

  const fn = (props, context) => {
    const s = [];

    for (let i = 0; i < parts.length; i++) {
      s.push(parts[i]);

      if (i < args.length) {
        if (typeof args[i] === 'function') {
          s.push(args[i](props, context));
        } else {
          s.push(args[i]);
        }
      }
    }

    const cssText = s.join('');
    if (!cssText) return '';

    if (global) {
      const rules = preprocess('', cssText);
      for (let r = 0; r < rules.length; r++) {
        addRule(rules[r]);
      }
      return '';
    }

    const cacheEntry = get(cssText);
    if (cacheEntry) return cacheEntry;

    const cn = newClassName();
    set(cssText, cn);

    const rules = preprocess('.' + cn, cssText);
    for (let r = 0; r < rules.length; r++) {
      addRule(rules[r]);
    }

    return cn;
  };

  if (isDynamic) return fn;
  const rendered = fn();
  return () => rendered;
};

const rule = (parts, ...args) => {
  if (!parts) return () => '';
  return buildRule(parts, args);
};

const global = (parts, ...args) => {
  if (!parts) return () => '';
  return buildRule(parts, args, true);
};

const reset = () => {
  clearRules();
  clear();
};

export { rule, global, reset, css };
