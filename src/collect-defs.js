import { prefix } from './prefix';

const m = '@media';

const mergeKey = (oldKey, newKey) =>
  oldKey +
  (oldKey.indexOf(m) > -1
    ? newKey.replace(m, ' and')
    : newKey.replace(/&/g, ''));

const collectDefs = (obj, defs, level) => {
  defs[level] = defs[level] || [];
  let st = true,
    ck = '';

  for (let key in obj) {
    const val = obj[key];
    const cssKey = key.replace(/[A-Z]/g, '-$&').toLowerCase();
    const prefixed = prefix(cssKey, val);

    for (let i = 0; i < prefixed.length; i++) {
      const pKey = prefixed[i][0],
        pVal = prefixed[i][1];
      if (!pKey) {
        continue;
      }

      const type = typeof pVal;
      if (type === 'function') {
        st = false;
        defs[level].push(props => {
          const dynamicPrefixed = prefix(cssKey, pVal(props));
          return dynamicPrefixed.map(pair => pair.join(':')).join(';') + ';';
        });
        ck += key + ':<fn>;';
      } else if (type === 'object') {
        const { st: st2, ck: ck2 } = collectDefs(
          pVal,
          defs,
          mergeKey(level, pKey)
        );
        st = st && st2;
        ck += ck2;
      } else {
        defs[level].push(pKey + ':' + pVal + ';');
        ck += defs[level];
      }
    }
  }

  return {
    defs,
    st,
    ck
  };
};

export { collectDefs };
