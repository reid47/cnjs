import { collectDefs } from './collect-defs';
import { get, set, clear } from './cache';
import { addRule, clearRules, newClassName } from './rules';
import { formatRule } from './format-rule';

const generateClasses = obj => {
  const defs = collectDefs(obj, {}, '');
  const cns = [];

  for (let key in defs) {
    const values = defs[key].join('');
    if (!values.length) continue;

    const cacheKey = key + values;
    const cacheEntry = get(cacheKey);
    if (cacheEntry) return cacheEntry;

    const cn = newClassName();
    set(cacheKey, cn);
    addRule(formatRule(key, '.' + cn, values));
    cns.push(cn);
  }

  return cns.join(' ');
};

// const rule = ruleDef => {
//   if (!ruleDef) return '';
//   if (typeof ruleDef !== 'function') return generateClasses(ruleDef);
//   return props => generateClasses(ruleDef(props));
// };
const buildRule = (at, pseudo, parts, args) => {
  parts = parts.map(p => p.split(/\s+/).join(' '));
  const isDynamic = args.length && args.some(arg => typeof arg === 'function');
  console.log({ isDynamic });

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

    return s.join('');
  };

  if (isDynamic) return fn;
  const rendered = fn();
  return () => rendered;
};

const rule = (parts, ...args) => {
  return buildRule('', '', parts, args);
};

const global = (selector, obj) => {
  if (!obj) return '';
  const defs = collectDefs(obj, {}, '');

  for (let key in defs) {
    const values = defs[key].join('');
    addRule(formatRule(key, selector, values));
  }
};

export { rule, global };
