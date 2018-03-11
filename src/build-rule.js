import { preprocess } from './preprocess';
import { addRule } from './rules';
import { cache, renderedCache } from './rule-cache';
import { hash } from './hash';

const buildRule = (parts, args, global) => {
  if (!parts) return '';

  const isDynamic = args.length && args.some(arg => typeof arg === 'function');

  const fn = props => {
    let rawText = '';

    for (let i = 0; i < parts.length; i++) {
      rawText += parts[i];

      if (i < args.length) {
        if (typeof args[i] === 'function') {
          rawText += args[i](props);
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

  return isDynamic ? fn : fn();
};

export { buildRule };
