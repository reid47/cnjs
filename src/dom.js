let styleTag;

const insertRule = rule => {
  if (typeof document === 'undefined') return;

  if (!styleTag) {
    styleTag = document.head.appendChild(document.createElement('style'));
  }

  if (process.env.NODE_ENV === 'production') {
    styleTag.sheet.insertRule(rule, styleTag.sheet.cssRules.length);
  } else {
    styleTag.textContent += rule;
  }
};

export { insertRule };
