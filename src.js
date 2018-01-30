// let rules = [];
// let cache = {};
// let onNewRule = rule => rules.push(rule);

// const options = {
//   prefix: 'sc',
//   unit: 'px'
// };

// const insertRule = (rule, stylesheet) =>
//   stylesheet.insertRule(rule, stylesheet.cssRules.length)

// const objectToCss = (styleObj = {}, ruleSuffix = '', ruleWrapper = '') => {
//   return Object.entries(styleObj).map(([key, val]) => {
//     if (val == null) return '';

//     switch (typeof val) {
//       case 'object':
//         const c0 = key.charAt(0);
//         return objectToCss(
//           val,
//           ruleSuffix + (c0 === '&' ? key.substr(1) : ''),
//           ruleWrapper + (c0 !== '@' ? '' :
//             (ruleWrapper && ruleWrapper.indexOf('@media') > -1)
//               ? key.replace('@media', ' and')
//               : key));

//       case 'number':
//         val = val ? val + options.unit : val;
//     }

//     const cacheKey = ruleWrapper + ruleSuffix + key + ':' + val;

//     if (cache[cacheKey]) return cache[cacheKey];

//     const className = options.prefix + rules.length;
//     onNewRule((ruleWrapper ? ruleWrapper + '{' : '') +
//       `.${className}${ruleSuffix}{${key}:${val};}` +
//       (ruleWrapper ? '}' : ''));

//     return cache[cacheKey] = className;
//   }).join(' ');
// };

// export const classify = styleObj => objectToCss(styleObj);

// export const configure = ({ prefix, unit }) => {
//   options.prefix = prefix || options.prefix;
//   options.unit = unit || options.unit;
// };

// export const css = () => rules.join('\n');

// export const reset = () => {
//   rules = [];
//   cache = {};
// };

// if (typeof document !== 'undefined') {
//   const style = document.head.appendChild(document.createElement('style'));
//   style.id = 'stilo';

//   onNewRule = rule => {
//     rules.push(rule);
//     insertRule(rule, style.sheet);
//   };
// }
