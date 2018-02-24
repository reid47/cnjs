import { collectDefs } from './collect-defs';
import { rehydrate } from './rehydration';

let rules = [];
let cache = {};

let addRule = rule => rules.push(rule);
const newClassName = () => 'cls_' + rules.length.toString(36);

const generateClasses = obj => {
  const defs = collectDefs(obj, {}, '');
  const cns = [];

  for (let key in defs) {
    const values = defs[key].join('');
    if (!values.length) continue;

    const cacheKey = key + values;
    console.log({ cacheKey });
    if (cache[cacheKey]) return cache[values];
    const cn = (cache[cacheKey] = newClassName());

    if (key.indexOf('@') > -1) {
      addRule(`${key}{.${cn}{${values}}}`);
    } else {
      addRule(`.${cn}${key}{${values}}`);
    }

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

    if (key.indexOf('@') > -1) {
      addRule(`${key}{${selector}{${values}}}`);
    } else {
      addRule(`${selector}${key}{${values}}`);
    }
  }
};

const css = () => rules.sort().join('\n');

const reset = () => {
  rules = [];
  cache = {};
};

if (typeof document !== 'undefined') {
  const { sheet } = document.head.appendChild(document.createElement('style'));
  addRule = rule => {
    rules.push(rule);
    sheet.insertRule(rule, sheet.cssRules.length);
  };
}

export { rule, global, rehydrate, css, reset };
