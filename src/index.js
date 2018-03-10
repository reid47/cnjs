import { buildRule } from './build-rule';
import { rehydrate } from './rehydrate';

const rule = (parts, ...args) => buildRule(parts, args);

const global = (parts, ...args) => buildRule(parts, args, true);

export { rule, global, rehydrate };
