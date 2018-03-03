// import { prefix } from './prefix';
const { prefix } = require('./prefix');

const closingBraces = str => {
  const closing = [];
  for (let i = 0; i < str.length; i++) {
    if (str[i] === '{') closing.push('}');
  }
  return closing.join('');
};

const makeRule = (topLevelSelector, selector, defs) => {
  const d = [];

  for (let i = 0; i < defs.length; i++) {
    const prefixed = prefix(defs[i][0], defs[i][1]);
    for (let j = 0; j < prefixed.length; j++) {
      d.push(`${prefixed[j][0]}:${prefixed[j][1]};`);
    }
  }

  const suffix = selector ? closingBraces(selector) : '';
  return `${selector || topLevelSelector}{${d.join('')}}${suffix}`;
};

const joinNestedSelectors = (topLevelSelector, parentSelector, newSelector) => {
  const hasAmpersand = newSelector.indexOf('&') > -1;
  const isAtRule = newSelector[0] === '@';

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

    if (parentSelector[0] === '@') {
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
  const rules = [];
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
          rules.push(propertyChars.join('') + ';');
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

  const keys = Object.keys(definitions);
  for (let k = 0; k < keys.length; k++) {
    if (definitions[keys[k]].length) {
      rules.push(makeRule(selector, keys[k], definitions[keys[k]]));
    }
  }

  return rules;
};

// export { preprocess2 };
module.exports = { preprocess2 };
