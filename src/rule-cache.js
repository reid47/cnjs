import { insertRule } from './dom';

const rules = [];
const cache = {};
const renderedCache = {};

const addRule = rule => {
  rules.push(rule);
  insertRule(rule);
};

export { addRule, rules, cache, renderedCache };
