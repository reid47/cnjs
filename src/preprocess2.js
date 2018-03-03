// import { prefix } from './prefix';
const { prefix } = require('./prefix');

const closingBraces = str => {
  const closing = [];
  for (let i = 0; i < str.length; i++) {
    if (str.charAt(i) === '{') closing.push('}');
  }
  return closing.join('');
};

const makeRule = (topLevelSelector, selector, defs) => {
  const d = [];

  defs.forEach(def => {
    if (def.length === 1) {
      d.push(def[0]);
      return;
    }

    const prefixed = prefix(def[0], def[1]);
    prefixed.forEach(pair => {
      d.push(`${pair[0]}:${pair[1]};`);
    });
  });

  const suffix = selector ? closingBraces(selector) : '';
  return `${selector || topLevelSelector}{${d.join('')}}${suffix}`;
};

const joinNestedSelectors = (topLevelSelector, parentSelector, newSelector) => {
  const isAtRule = newSelector.charAt(0) === '@';
  const hasAmpersand = newSelector.indexOf('&') > -1;

  if (!parentSelector && !isAtRule) {
    if (hasAmpersand) return newSelector.replace(/&/g, topLevelSelector);
    return topLevelSelector + ' ' + newSelector;
  }

  if (hasAmpersand)
    return (
      parentSelector +
      newSelector.replace(/^&/, '').replace(/&/g, topLevelSelector)
    );

  if (isAtRule && !parentSelector) return newSelector + '{' + topLevelSelector;

  if (isAtRule && parentSelector.charAt(0) === '@') {
    return (
      parentSelector.substr(
        0,
        parentSelector.length - topLevelSelector.length - 1
      ) +
      '{' +
      newSelector +
      '{' +
      topLevelSelector
    );
  }

  return (parentSelector ? parentSelector + ' ' : '') + newSelector;
};

const preprocess2 = (selector, css) => {
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

  for (let i = 0, len = css.length; i < len; i++) {
    const char = css.charAt(i);

    if (inLineComment && char !== '\n') continue;

    switch (char) {
      case '/':
        if (css.charAt(i + 1) === '/') {
          inLineComment = true;
        }
        break;

      case '\n':
        if (!inValue) {
          newLine = true;
          inLineComment = false;
        }
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
        } else if (inProperty && propertyChars[0] === '@') {
          nestedDefs[propertyChars.join('') + ';'] = false;
          inProperty = false;
          propertyChars = [];
        }
        break;

      case ' ':
      case '\t':
        if (inProperty && propertyChars[propertyChars.length - 1] !== ' ') {
          propertyChars.push(' ');
        } else if (inValue && valueChars[valueChars.length - 1] !== ' ') {
          valueChars.push(' ');
        }
        break;

      case '\r':
        break;

      case '{':
        nestStack.push(currentRule);
        currentRule = propertyChars
          .join('')
          .trim()
          .split(/,[\s]*/)
          .map(part => joinNestedSelectors(selector, currentRule, part))
          .join(',');
        nestedDefs[currentRule] = nestedDefs[currentRule] || [];
        propertyChars = [];
        inSpecialLine = false;
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

  const atRules = [];
  const otherRules = [];

  Object.keys(nestedDefs).forEach(key => {
    if (!nestedDefs[key]) return atRules.push(key);
    if (!nestedDefs[key].length) return;
    otherRules.push(makeRule(selector, key, nestedDefs[key]));
  });

  return atRules.concat(otherRules);
};

// export { preprocess2 };
module.exports = { preprocess2 };
