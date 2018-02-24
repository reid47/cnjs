import { parseRule } from './parse-rule';
import { set } from './cache';
import { addRule } from './rules';
import { formatRule } from './format-rule';

const rehydrate = elId => {
  if (typeof document === 'undefined') return;
  const el = document.getElementById(elId);
  if (!el || el.tagName !== 'STYLE' || !el.sheet) return;

  el.sheet.cssRules.forEach(rule => {
    const { valid, at, pseudo, ruleText, className } = parseRule(
      rule.cssText,
      rule.type
    );

    if (!valid) return;

    const cacheKey = at + pseudo + ruleText;
    set(cacheKey, className);

    addRule(formatRule(at, '.' + className + pseudo, ruleText));
  });
};

export { rehydrate };
