import React from 'react';
import { renderStatic } from '../render-static';

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

export { renderStaticComponents };
