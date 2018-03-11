import React from 'react';
import { mount } from 'enzyme';
import { renderStaticComponents } from '../../src/react';
import { rule } from '../../src/index';
import { rules, cache } from '../../src/rule-cache';

describe('renderStaticComponents', () => {
  beforeEach(() => {
    while (rules.length) rules.pop();
    for (let key in cache) {
      if (cache.hasOwnProperty(key)) {
        delete cache[key];
      }
    }
  });

  test('renders React components', () => {
    rule`
      color: green;
    `;

    rule`
      color: blue;
      &:hover {
        color: red;
      }
    `;

    const rendered = renderStaticComponents();

    expect(rendered.css).toEqual(
      '._dt1o82{color:green;}' +
        '._awvwfy{color:blue;}' +
        '._awvwfy:hover{color:red;}'
    );

    expect(rendered.classes).toEqual(['_dt1o82', '_awvwfy']);

    expect(rendered.script).toEqual(
      React.createElement('script', {
        key: 'turnstyle-js',
        dangerouslySetInnerHTML: {
          __html: 'window.Turnstyle.rehydrate(["_dt1o82","_awvwfy"]);'
        }
      })
    );

    expect(rendered.style).toEqual(
      React.createElement('style', {
        key: 'turnstyle-css',
        dangerouslySetInnerHTML: {
          __html:
            '._dt1o82{color:green;}' +
            '._awvwfy{color:blue;}' +
            '._awvwfy:hover{color:red;}'
        }
      })
    );
  });
});
