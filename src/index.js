import { buildRule } from './build-rule';

const rule = (parts, ...args) => buildRule(parts, args);

const global = (parts, ...args) => buildRule(parts, args, true);

export { rule, global };
export { rehydrate } from './rehydrate';
export { renderStatic } from './render-static';
