let cache = {};
let rules = [];

// we can determine the classname much earlier
// (outside of props->) by just using a counter
// of calls to rule() instead of rules.legth.
// Since one call to rule() can result in multiple
// rules, but the class name should be the same
// for all (e.g. ".cn", ".cn:hover", "@media{.cn}")

// wait can we? wat about diff props?

export const rule = obj => {
  const defs = [];
  let isStatic = true;
  let staticDefs;

  Object.keys(obj).map(key => {
    const val = obj[key];
    const cssKey = key.replace(/[A-Z]/g, '-$&').toLowerCase();

    const type = typeof val;
    if (type === 'function') {
      isStatic = false;
      defs.push(props => cssKey + ':' + val(props) + ';');
    } else if (type === 'object') {

    } else {
      defs.push(cssKey + ':' + val + ';');
    }
  });

  if (isStatic) {
    staticDefs = defs.join('');
  }

  const func = props => {
    const ruleDefs = isStatic ? staticDefs :
      defs.map(def =>
        typeof def === 'function' ? def(props) : def)
          .join('');

    if (cache[ruleDefs]) return cache[ruleDefs];

    const className = 'cls_' + rules.length;
    rules.push(`.${className}{${ruleDefs}}`);

    return cache[ruleDefs] = className;
  };

  return isStatic ? func() : func;
};

export const css = () => rules.sort().join('\n');

export const reset = () => {
  rules = [];
  cache = {};
}
