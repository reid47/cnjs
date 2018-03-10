import React from 'react';
import { buildRule } from './build-rule';

const withStyle = component => (parts, ...args) => {
  const rule = buildRule(parts, args);
  const isDynamic = typeof rule === 'function';

  return ({ className, ...props }) => {
    className =
      (className ? className + ' ' : '') + isDynamic ? rule(props) : rule;

    return React.createElement(component, {
      ...props,
      className
    });
  };
};

export { withStyle };
export { rule, global, rehydrate } from './index';
