import React from 'react';
import { buildRule } from './build-rule';
import { renderStatic } from './render-static';

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

const renderStaticComponents = () =>
  renderStatic({
    renderCss: css =>
      React.createElement('style', {
        key: 'turnstyle-css',
        dangerouslySetInnerHTML: { __html: css }
      }),
    renderJs: js =>
      React.createElement('script', {
        key: 'turnstyle-js',
        dangerouslySetInnerHTML: { __html: js }
      })
  });

export { withStyle, renderStaticComponents };
export * from './index';
