const m = '@media';

const mergeKey = (oldKey, newKey) =>
  oldKey + (oldKey.indexOf(m) > -1
    ? newKey.replace(m, ' and')
    : newKey.replace(/&:/g, ':'));

export const collectDefs = (obj, defs, level) => {
  defs[level] = defs[level] || [];
  let st = true, ck = '';

  for (let key in obj) {
    const val = obj[key];
    const cssKey = key.replace(/[A-Z]/g, '-$&').toLowerCase();

    const type = typeof val;
    if (type === 'function') {
      st = false;
      defs[level].push(props => cssKey + ':' + val(props) + ';');
      ck += key + ':<fn>;';
    } else if (type === 'object') {
      const { st: st2, ck: ck2 } = collectDefs(val, defs, mergeKey(level, key));
      st = st && st2;
      ck += ck2;
    } else {
      defs[level].push(cssKey + ':' + val + ';');
      ck += defs[level];
    }

    if (!defs[level].length) delete defs[level];
  }

  return { defs, st, ck };
};
