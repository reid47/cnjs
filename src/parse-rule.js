const basicRuleRegex = /^()\.([a-z0-9_-]+)([\:a-z\[\]]*)[ ]*{(.*)}/i;
const atRuleRegex = /^(.*){\.([a-z0-9_-]+)([\:a-z\[\]]*)[ ]*{(.*)}}/i;

const parseRule = (ruleString, ruleType = 1) => {
  const parts = ruleString.match(ruleType === 1 ? basicRuleRegex : atRuleRegex);
  if (!ruleString || !parts) return { valid: false };

  return {
    valid: true,
    at: parts[1].trim(),
    className: parts[2],
    pseudo: parts[3],
    ruleText: parts[4].replace(/; /g, ';').replace(/: /g, ':')
  };
};

export { parseRule };
