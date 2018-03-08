import { RULE_SEPARATOR } from '../core/constants';

const renderStatic = (rules, renderedRuleCache) => {
  return (
    '<style type="text/css" data-tstyle-rendered>' +
    rules
      .map(rule => `/*~${renderedRuleCache[rule]}~*/${rule}`)
      .join(RULE_SEPARATOR) +
    '</style>'
  );
};

export { renderStatic };
