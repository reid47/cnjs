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

const rule = ruleDef => {
  if (!ruleDef) return '';
  if (typeof ruleDef !== 'function') return generateClasses(ruleDef);
  return props => generateClasses(ruleDef(props));
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
