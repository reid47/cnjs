import { renderedCache } from '../core/rule-cache';
import { RULE_SEPARATOR } from '../core/constants';
import { addRule } from '../rules';

const rehydrate = () => {
  if (typeof document === 'undefined') return;

  const tags = document.querySelectorAll('[data-tstyle-rendered]');

  for (let i = 0; i < tags.length; i++) {
    const tag = tags[i];
    const rules = tag.innerHTML.split(RULE_SEPARATOR);
    for (let j = 0; j < rules.length; j++) {
      const match = rules[j].match(/^\/\*~(.*)~\*\/(.*)$/);
      if (match) {
        const className = match[1];
        const rule = match[2];
        renderedCache[rule] = className;
        addRule(rule);
      }
    }
  }
};

export { rehydrate };
