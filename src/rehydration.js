const rehydrate = elId => {
  if (typeof document === 'undefined') return;
  const el = document.getElementById(elId);
  if (!el || el.tagName !== 'STYLE' || !el.sheet) return;

  const rules = el.sheet.cssRules.map(rule => ({
    cssText: rule.cssText
  }));
  console.log({ rules });
};

export { rehydrate };
