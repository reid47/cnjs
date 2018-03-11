import React from 'react';
import { buildRule } from '../build-rule';

const withStyle = (component, interceptedProps) => (parts, ...args) => {
  const rule = buildRule(parts, args);
  const isDynamic = typeof rule === 'function';

  return ({ className, ...props }) => {
    const styleClass = isDynamic ? rule(props) : rule;

    if (interceptedProps) {
      for (let i = 0; i < interceptedProps.length; i++) {
        delete props[interceptedProps[i]];
      }
    }

    return React.createElement(component, {
      ...props,
      className: `${className ? className + ' ' : ''}${styleClass}`
    });
  };
};

export { withStyle };
