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
    const prefixed = prefix(def[0], def[1]);
    prefixed.forEach(pair => {
      d.push(`${pair[0]}:${pair[1]};`);
    });
  });

  const suffix = selector ? closingBraces(selector) : '';
  return `${selector || topLevelSelector}{${d.join('')}}${suffix}`;
};

const joinNestedSelectors = (topLevelSelector, parentSelector, newSelector) => {
  const hasAmpersand = newSelector.indexOf('&') > -1;
  const isAtRule = newSelector.charAt(0) === '@';

  if (hasAmpersand) {
    if (!parentSelector && !isAtRule) {
      return newSelector.replace(/&/g, topLevelSelector);
    }

    return (
      parentSelector +
      newSelector.replace(/^&/, '').replace(/&/g, topLevelSelector)
    );
  }

  if (isAtRule) {
    if (!parentSelector) return `${newSelector}{${topLevelSelector}`;

    if (parentSelector.charAt(0) === '@') {
      return `${parentSelector.substr(
        0,
        parentSelector.length - topLevelSelector.length - 1
      )}{${newSelector}{${topLevelSelector}`;
    }
  } else if (!parentSelector) {
    return `${topLevelSelector} ${newSelector}`;
  }

  return `${parentSelector ? parentSelector + ' ' : ''}${newSelector}`;
};

const preprocess2 = (selector, css) => {
  const definitions = { '': [] };
  const chars = css.split('');
  const length = chars.length;

  let currentRule = '';
  let newLine = true;
  let nestedRules = [];
  let inProperty = false;
  let inValue = false;
  let anticipateValue = false;
  let propertyChars = [];
  let valueChars = [];
  let inSpecialLine = false;
  let inLineComment = false;
  let char, lastChar;

  for (let i = 0; i < length; i++) {
    lastChar = char;
    char = chars[i];

    if (inLineComment && char !== '\n') continue;

    switch (char) {
      case '/':
        if (chars[i + 1] === '/') {
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
          definitions[currentRule].push([
            propertyChars.join(''),
            valueChars.join('')
          ]);
          valueChars = [];
          propertyChars = [];
          inValue = false;
        } else if (inProperty && propertyChars[0] === '@') {
          definitions[propertyChars.join('') + ';'] = null;
          inProperty = false;
          propertyChars = [];
        }
        break;

      case ' ':
      case '\t':
        if (inProperty && lastChar !== ' ') {
          propertyChars.push(' ');
        } else if (inValue && lastChar !== ' ') {
          valueChars.push(' ');
        }
        break;

      case '\r':
        break;

      case '{':
        nestedRules.push(currentRule);
        currentRule = propertyChars
          .join('')
          .trim()
          .split(/,[\s]*/)
          .map(part => joinNestedSelectors(selector, currentRule, part))
          .join(',');
        definitions[currentRule] = definitions[currentRule] || [];
        propertyChars = [];
        inSpecialLine = false;
        inProperty = false;
        break;

      case '}':
        currentRule = nestedRules.pop();
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

  Object.keys(definitions).forEach(key => {
    if (!definitions[key]) return atRules.push(key);
    if (!definitions[key].length) return;
    otherRules.push(makeRule(selector, key, definitions[key]));
  });

  return atRules.concat(otherRules);
};

// export { preprocess2 };
module.exports = { preprocess2 };
