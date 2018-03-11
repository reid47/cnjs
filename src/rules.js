let rules = [];

let addRule = rule => rules.push(rule);

if (typeof document !== 'undefined') {
  const { sheet } = document.head.appendChild(document.createElement('style'));

  addRule = rule => {
    rules.push(rule);

    sheet.insertRule(rule, sheet.cssRules.length);
  };
}

export { addRule, rules };
