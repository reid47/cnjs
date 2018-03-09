let rules = [];

const clearRules = () => (rules = []);

const css = () => rules.join('');

let addRule = rule => rules.push(rule);

if (typeof document !== 'undefined') {
  const { sheet } = document.head.appendChild(document.createElement('style'));
  addRule = rule => {
    rules.push(rule);
    sheet.insertRule(rule, sheet.cssRules.length);
  };
}

export { addRule, clearRules, css, rules };
