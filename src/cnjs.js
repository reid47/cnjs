let rules = [];
let cache = {};

const mergeKey = (oldKey, newKey) =>
  oldKey + (oldKey.indexOf('@media') > -1
    ? newKey.replace('@media', ' and')
    : newKey.replace(/&:/g, ':'));

const newClassName = () =>
  'cls_' + rules.length;

const sortedKeys = obj =>
  Object.keys(obj).sort((a, b) => a.length - b.length);

const collectDefs = (obj, defs, level = '', cacheKey = '') => {
  let isStatic = true;

  Object.keys(obj).map(key => {
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
  });

  return { defs, isStatic, cacheKey };
};

export const rule = obj => {
  const { defs, isStatic, cacheKey } = collectDefs(obj, {});

  if (isStatic) {
    if (cache[cacheKey]) return cache[cacheKey];
    const cn = cache[cacheKey] = newClassName();

    sortedKeys(defs).forEach(key => {
      const values = defs[key].join('');

      const formattedRule = key.indexOf('@') > -1
        ? `${key}{.${cn}{${values}}}`
        : `.${cn}${key}{${values}}`

      rules.push(formattedRule);
    });

    return cn;
  }

  const ruleGenerators = sortedKeys(defs).map(key => {
    const vals = defs[key];

    if (key.indexOf('@') > -1) {
      return (cn, props) => `${key}{.${cn}{${vals.map(val =>
        typeof val === 'function' ? val(props) : val).join('')
      }}}`;
    }

    return (cn, props) => `.${cn}${key}{${vals.map(val =>
      typeof val === 'function' ? val(props) : val).join('')
    }}`;
  });

  return props => {
    const dynamicCacheKey = cacheKey + JSON.stringify(props);
    if (cache[dynamicCacheKey]) return cache[dynamicCacheKey];

    const cn = cache[dynamicCacheKey] = newClassName();

    ruleGenerators.forEach(f => {
      rules.push(f(cn, props));
    });

    return cn;
  };
};

export const css = () =>
  rules.join('\n');

export const reset = () => {
  rules = [];
  cache = {};
}
