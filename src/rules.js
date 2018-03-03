let rules = [];

const newClassName = () => 'cls_' + rules.length.toString(36);

const clearRules = () => (rules = []);

const css = () => rules.sort().join('\n');

let addRule = rule => rules.push(rule);

// if (typeof document !== 'undefined') {
//   const { sheet } = document.head.appendChild(document.createElement('style'));
//   addRule = rule => {
//     rules.push(rule);
//     sheet.insertRule(rule, sheet.cssRules.length);
//   };
// }

export { addRule, clearRules, newClassName, css };
