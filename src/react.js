import React from 'react';
import { buildRule } from './build-rule';

const withStyle = component => (parts, ...args) => {
  const rule = buildRule(parts, args);
  const isDynamic = typeof rule === 'function';

  return ({ className, ...props }) => {
    return React.createElement(component, {
      ...props,
      className: `${className ? className + ' ' : ''}${
        isDynamic ? rule(props) : rule
      }`
    });
  };
};

export { withStyle };
export * from './index';
