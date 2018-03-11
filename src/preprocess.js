// @flow

import { prefix } from './prefix';

const closingBraces = str => {
  let closing = '';
  for (let i = 0; i < str.length; i++) {
    if (str[i] === '{') closing += '}';
  }
  return closing;
};

const selectorCache = {};
const joinNestedSelectors = (topLevelSelector, parentSelector, newSelector) => {
  const cacheKey = `${topLevelSelector}|${parentSelector}|${newSelector}`;
  const cached = selectorCache[cacheKey];
  if (cached) return cached;

  const hasAmpersand = newSelector.indexOf('&') > -1;
  const isAtRule = newSelector[0] === '@';

  let returned;
  if (hasAmpersand) {
    if (!parentSelector && !isAtRule) {
      returned = newSelector.replace(/&/g, topLevelSelector);
    } else {
      returned =
        parentSelector +
        newSelector.replace(/^&/, '').replace(/&/g, topLevelSelector);
    }
  } else if (isAtRule) {
    if (!parentSelector) {
      returned = `${newSelector}{${topLevelSelector}`;
    } else if (parentSelector[0] === '@') {
      returned = `${parentSelector.substr(
        0,
        parentSelector.length - topLevelSelector.length - 1
      )}{${newSelector}{${topLevelSelector}`;
    } else {
      returned = `${newSelector}{${parentSelector}`;
    }
  } else if (!parentSelector) {
    returned = `${topLevelSelector} ${newSelector}`;
  } else {
    returned = `${parentSelector} ${newSelector}`;
  }

  selectorCache[cacheKey] = returned;
  return returned;
};

const preprocess = (selector, css) => {
  const rules = [];
  const definitions = { '': [] };
  const definitionKeys = [''];
  const nestedRules = [];

  let char, lastChar;
  let currentRule = '';
  let inLineComment = 0;
  let inBlockComment = 0;
  let inSingleQuotedString = 0;
  let inDoubleQuotedString = 0;
  let buffer = '';
  let bufferComma = 0;
  let bufferColonIndex = -1;

  for (let i = 0, length = css.length; i < length; i++) {
    lastChar = char;
    char = css[i];

    if ((inLineComment && char !== '\n') || (inBlockComment && char !== '/'))
      continue;

    if (
      (inSingleQuotedString && char !== "'") ||
      (inDoubleQuotedString && char !== '"')
    ) {
      buffer += char;
      continue;
    }

    switch (char) {
      case '/':
        if (inBlockComment) {
          if (lastChar === '*') inBlockComment = 0;
          break;
        }

        const nextChar = css[i + 1];
        if (nextChar === '/') inLineComment = 1;
        else if (nextChar === '*') inBlockComment = 1;
        break;

      case '\n':
        inLineComment = 0;
        break;

      case ';':
        if (bufferColonIndex < 0) {
          rules.push(buffer.trim() + ';');
        } else {
          const prop = buffer.substring(0, bufferColonIndex).trim();
          const val = buffer.substring(bufferColonIndex + 1).trim();
          const prefixed = prefix(prop, val);
          for (let j = 0; j < prefixed.length; j++) {
            definitions[currentRule].push(
              `${prefixed[j][0]}:${prefixed[j][1]};`
            );
          }
        }

        buffer = '';
        bufferComma = 0;
        bufferColonIndex = -1;
        break;

      case '{':
        nestedRules.push(currentRule);

        if (bufferComma) {
          currentRule = buffer
            .split(',')
            .map(part =>
              joinNestedSelectors(selector, currentRule, part.trim())
            )
            .join(',');
        } else {
          currentRule = joinNestedSelectors(
            selector,
            currentRule,
            buffer.trim()
          );
        }

        if (!definitions[currentRule]) {
          definitions[currentRule] = [];
          definitionKeys.push(currentRule);
        }

        buffer = '';
        bufferComma = 0;
        bufferColonIndex = -1;
        break;

      case '}':
        currentRule = nestedRules.pop();
        break;

      case ',':
        bufferComma = 1;
        buffer += char;
        break;

      case ':':
        if (bufferColonIndex < 0) bufferColonIndex = buffer.length;
        buffer += char;
        break;

      case "'":
        inSingleQuotedString = +!inSingleQuotedString;
        buffer += char;
        break;

      case '"':
        inDoubleQuotedString = +!inDoubleQuotedString;
        buffer += char;
        break;

      case ' ':
        if (lastChar === ' ') break;

      default:
        buffer += char;
    }
  }

  for (let k = 0; k < definitionKeys.length; k++) {
    const defKey = definitionKeys[k];
    const defs = definitions[defKey];
    if (defs.length > 0) {
      const suffix = defKey ? closingBraces(defKey) : '';
      rules.push(`${defKey || selector}{${defs.join('')}}${suffix}`);
    }
  }

  return rules;
};

export { preprocess };
