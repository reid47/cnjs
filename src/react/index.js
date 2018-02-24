import React from 'react';
import { rule } from '../index';

const styled = (component, ruleDefinition) => {
  const styleRule = rule(ruleDefinition);

  return props => {
    const { className, ...rest } = props;

    const styleClass =
      typeof styleRule === 'function' ? styleRule(props) : styleRule;

    return React.createElement(component, {
      ...rest,
      className: className + ' ' + styleClass,
      ref: el => (this.innerRef = el)
    });
  };
};

export { styled };
