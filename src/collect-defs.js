import { prefix } from './prefix';

const mergeKey = (oldKey, newKey) =>
  oldKey +
  (oldKey.indexOf('@media') > -1
    ? newKey.replace('@media', ' and')
    : newKey.replace(/&/g, ''));

const collectDefs = (obj, defs, level) => {
  defs[level] = defs[level] || [];

  for (let key in obj) {
    const val = obj[key];
    const cssKey = key.replace(/[A-Z]/g, '-$&').toLowerCase();
    const prefixed = prefix(cssKey, val);

    for (let i = 0; i < prefixed.length; i++) {
      const pKey = prefixed[i][0];
      const pVal = prefixed[i][1];
      if (!pKey) continue;

      if (typeof pVal === 'object') {
        collectDefs(pVal, defs, mergeKey(level, pKey));
      } else {
        defs[level].push(pKey + ':' + pVal + ';');
      }
    }
  }

  return defs;
};

export { collectDefs };
