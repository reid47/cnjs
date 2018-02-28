import { prefix } from './prefix';

const makeRule = (selector, defs, wrapper) => {
  const d = [];
  defs.forEach(def => {
    const prefixed = prefix(def[0], def[1]);
    prefixed.forEach(pair => {
      d.push(`${pair[0]}:${pair[1]};`);
    });
  });

  let rule = `${selector}{${d.join('')}}`;
  if (wrapper) {
    rule = `${wrapper}{${rule}}`;
  }

  return rule;
};

const preprocess = (selector, css) => {
  const rules = [];
  const nestedDefs = { '': [] };

  let currentRule = '';
  let newLine = true;
  let nestStack = [];
  let inProperty = false;
  let inValue = false;
  let anticipateValue = false;
  let propertyChars = [];
  let valueChars = [];
  let inSpecialLine = false;
  let inLineComment = false;

  for (let i = 0; i < css.length; i++) {
    const char = css.charAt(i);

    if (inLineComment && char !== '\n') continue;

    switch (char) {
      case '/':
        if (css.charAt(i + 1) === '/') {
          inLineComment = true;
        }
        break;

      case '\n':
        newLine = true;
        inSpecialLine = false;
        inLineComment = false;
        break;

      case ':':
        if (inSpecialLine) {
          propertyChars.push(char);
        } else if (inProperty) {
          inProperty = false;
          anticipateValue = true;
        }
        break;

      case ';':
        if (inValue) {
          nestedDefs[currentRule].push([
            propertyChars.join(''),
            valueChars.join('')
          ]);
          valueChars = [];
          propertyChars = [];
          inValue = false;
        }
        break;

      case ' ':
      case '\t':
        if (inProperty) propertyChars.push(' ');
        else if (inValue) valueChars.push(' ');
        break;

      case '\r':
        break;

      case '{':
        nestStack.push(currentRule);

        let newRule = propertyChars.join('').trim();

        if (newRule.charAt(0) === '@') {
          currentRule = newRule;
        } else {
          currentRule = (
            currentRule +
            newRule.replace(/&:/g, ':').replace(/&(?!:)/g, selector)
          ).replace(/^:/, selector + ':');
        }

        nestedDefs[currentRule] = [];
        propertyChars = [];
        inProperty = false;
        break;

      case '}':
        currentRule = nestStack.pop();
        break;

      case '&':
      case '@':
        inSpecialLine = true;
      default:
        if (newLine) {
          inProperty = true;
          newLine = false;
        }

        if (anticipateValue) {
          anticipateValue = false;
          inValue = true;
        }

        if (inValue) valueChars.push(char);
        else if (inProperty) propertyChars.push(char);
    }
  }

  Object.keys(nestedDefs).forEach(key => {
    if (!nestedDefs[key].length) return;
    const isAtRule = key.charAt(0) === '@';
    const ruleName = key && !isAtRule ? key.replace(/&/, selector) : selector;
    rules.push(makeRule(ruleName, nestedDefs[key], isAtRule ? key : ''));
  });

  return rules;
};

export { preprocess };
