import { preprocess } from './preprocess';
import { get, set, clear } from './cache';
import { addRule, clearRules, newClassName, css } from './rules';

const buildRule = (parts, args) => {
  const isDynamic = args.length && args.some(arg => typeof arg === 'function');

  const fn = props => {
    const s = [];

    for (let i = 0; i < parts.length; i++) {
      s.push(parts[i]);

      if (i < args.length) {
        if (typeof args[i] === 'function') {
          s.push(args[i](props));
        } else {
          s.push(args[i]);
        }
      }
    }

    const cacheKey = s.join('');
    if (!cacheKey) return '';

    const cacheEntry = get(cacheKey);
    if (cacheEntry) return cacheEntry;

    const cn = newClassName();
    set(cacheKey, cn);
    addRule(preprocess('.' + cn, cacheKey));

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

const reset = () => {
  clearRules();
  clear();
};

export { rule, css, reset };

// const global = (selector, obj) => {
//   if (!obj) return '';
//   const defs = collectDefs(obj, {}, '');

//   for (let key in defs) {
//     const values = defs[key].join('');
//     addRule(formatRule(key, selector, values));
//   }
// };

// export { rule, global, reset, css };
