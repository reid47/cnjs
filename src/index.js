import { clear } from './cache';
import { clearRules } from './rules';

const reset = () => {
  clearRules();
  clear();
};

export { css } from './rules';
export { reset };
export { rule, global } from './turnstyle';
export { rehydrate } from './rehydrate';
