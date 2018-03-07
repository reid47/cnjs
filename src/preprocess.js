const { prefix } = require('./prefix');
// import { prefix } from './prefix';

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
    } else {
      return `${newSelector}{${parentSelector}`;
    }
  } else if (!parentSelector) {
    return `${topLevelSelector} ${newSelector}`;
  }

  return `${parentSelector ? parentSelector + ' ' : ''}${newSelector}`;
};

const preprocess = (selector, css) => {
  const rules = [];
  const definitions = { '': [] };
  const definitionKeys = [''];
  const chars = css.split('');
  const length = chars.length;

  let char, lastChar;
  let currentRule = '';
  let nestedRules = [];
  let inLineComment = 0;
  let inBlockComment = 0;
  let inSingleQuotedString = 0;
  let inDoubleQuotedString = 0;
  let buffer = [];
  let bufferComma = 0;
  let bufferColonIndex = -1;

  for (let i = 0; i < length; i++) {
    lastChar = char;
    char = chars[i];

    if (
      (inLineComment > 0 && char !== '\n') ||
      (inBlockComment > 0 && char !== '/')
    )
      continue;

    if (
      (inSingleQuotedString > 0 && char !== "'") ||
      (inDoubleQuotedString > 0 && char !== '"')
    ) {
      buffer.push(char);
      continue;
    }

    switch (char) {
      case '/':
        if (inBlockComment > 0) {
          if (lastChar === '*') inBlockComment = 0;
          break;
        }

        const nextChar = chars[i + 1];
        if (nextChar === '/') {
          inLineComment = 1;
        } else if (nextChar === '*') {
          inBlockComment = 1;
        }
        break;

      case '\n':
        inLineComment = 0;
        break;

      case ';':
        const declaration = buffer.join('');
        if (bufferColonIndex < 0) {
          rules.push(declaration.trim() + ';');
        } else {
          const prop = declaration.substring(0, bufferColonIndex).trim();
          const val = declaration.substring(bufferColonIndex + 1).trim();
          definitions[currentRule].push([prop, val]);
        }

        buffer = [];
        bufferComma = 0;
        bufferColonIndex = -1;
        break;

      case '{':
        nestedRules.push(currentRule);

        if (bufferComma > 0) {
          currentRule = buffer
            .join('')
            .split(',')
            .map(part =>
              joinNestedSelectors(selector, currentRule, part.trim())
            )
            .join(',');
        } else {
          currentRule = joinNestedSelectors(
            selector,
            currentRule,
            buffer.join('').trim()
          );
        }

        if (!definitions[currentRule]) {
          definitions[currentRule] = [];
          definitionKeys.push(currentRule);
        }

        buffer = [];
        bufferComma = 0;
        bufferColonIndex = -1;
        break;

      case '}':
        currentRule = nestedRules.pop();
        break;

      case ',':
        bufferComma = 1;
        buffer.push(char);
        break;

      case ':':
        if (bufferColonIndex < 0) bufferColonIndex = buffer.length;
        buffer.push(char);
        break;

      case "'":
        inSingleQuotedString = !inSingleQuotedString;
        buffer.push(char);
        break;

      case '"':
        inDoubleQuotedString = !inDoubleQuotedString;
        buffer.push(char);
        break;

      case ' ':
        if (lastChar === ' ') break;

      default:
        buffer.push(char);
    }
  }

  for (let k = 0; k < definitionKeys.length; k++) {
    if (definitions[definitionKeys[k]].length > 0) {
      rules.push(
        makeRule(selector, definitionKeys[k], definitions[definitionKeys[k]])
      );
    }
  }

  return rules;
};

// export { preprocess };
module.exports = { preprocess };
