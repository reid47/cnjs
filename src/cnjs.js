let rules = [];
let cache = {};

let addRule = rule => rules.push(rule);

const mergeKey = (oldKey, newKey) =>
  oldKey + (oldKey.indexOf('@media') > -1
    ? newKey.replace('@media', ' and')
    : newKey.replace(/&:/g, ':'));

const newClassName = () =>
  'cls_' + rules.length;

const callMeMaybe = (f, arg) => typeof f === 'function' ? f(arg) : f;

const collectDefs = (obj, defs, level = '', cacheKey = '') => {
  let isStatic = true;

  for (let key in obj) {
    defs[level] = defs[level] || [];
    const val = obj[key];
    const cssKey = key.replace(/[A-Z]/g, '-$&').toLowerCase();

    const type = typeof val;
    if (type === 'function') {
      isStatic = false;
      defs[level].push(props => cssKey + ':' + val(props) + ';');
      cacheKey += key + ':<func>;';
    } else if (type === 'object') {
      const { isStatic: nestedIsStatic, cacheKey: nestedCacheKey } = collectDefs(val, defs, mergeKey(level, key));
      isStatic = isStatic && nestedIsStatic;
      cacheKey += nestedCacheKey;
    } else {
      defs[level].push(cssKey + ':' + val + ';');
      cacheKey += defs[level];
    }

    if (!defs[level].length) delete defs[level];
  }

  return { defs, isStatic, cacheKey };
};

export const rule = obj => {
  if (!obj) return '';
  const { defs, isStatic, cacheKey } = collectDefs(obj, {});

  if (isStatic) {
    if (cache[cacheKey]) return cache[cacheKey];
    const cn = cache[cacheKey] = newClassName();

    for (let key in defs) {
      const values = defs[key].join('');

      const formattedRule = key.indexOf('@') > -1
        ? `${key}{.${cn}{${values}}}`
        : `.${cn}${key}{${values}}`

      addRule(formattedRule);
    }

    return cn;
  }

  const ruleGenerators = [];
  for (let key in defs) {
    const vals = defs[key];

    if (key.indexOf('@') > -1) {
      ruleGenerators.push((cn, props) => `${key}{.${cn}{${
        vals.map(val => callMeMaybe(val, props)).join('')
      }}}`);
      continue;
    }

    ruleGenerators.push((cn, props) => `.${cn}${key}{${
    vals.map(val => callMeMaybe(val, props)).join('')
    }}`);
  }

  return props => {
    const dynamicCacheKey = cacheKey + JSON.stringify(props);
    if (cache[dynamicCacheKey]) return cache[dynamicCacheKey];

    const cn = cache[dynamicCacheKey] = newClassName();

    ruleGenerators.forEach(f => {
      addRule(f(cn, props));
    });

    return cn;
  };
};

export const css = () =>
  rules.sort().join('\n');

export const reset = () => {
  rules = [];
  cache = {};
}

if (typeof document !== 'undefined') {
  const sheet = document.head.appendChild(document.createElement('style')).sheet;
  addRule = rule => {
    rules.push(rule);
    sheet.insertRule(rule, sheet.cssRules.length);
  };
}
