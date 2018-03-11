import React from 'react';
import { mount } from 'enzyme';
import { withStyle, renderStaticComponents } from '../src/react';
import { rule } from '../src/index';
import { rules } from '../src/rules';
import { cache } from '../src/rule-cache';

describe('withStyle', () => {
  it('passes through props and merges class names', () => {
    while (rules.length) rules.pop();

    const TestComponent = withStyle('div')`
      background: purple;
      color: yellow;
    `;

    const rendered = mount(
      <TestComponent className="some-class" id="some-id">
        some children
      </TestComponent>
    ).childAt(0);

    expect(rendered.props()).toEqual({
      className: 'some-class _1t9a3ti',
      id: 'some-id',
      children: 'some children'
    });

    expect(
      rendered.matchesElement(
        <div className="some-class _1t9a3ti" id="some-id">
          some children
        </div>
      )
    ).toBe(true);
  });

  it('handles dynamic rules correctly', () => {
    while (rules.length) rules.pop();

    const TestComponent = withStyle('button')`
      background: purple;
      color: ${p => (p.type === 'submit' ? 'red' : 'blue')};
    `;

    const rendered = mount(
      <TestComponent type="submit" id="some-id">
        some children
      </TestComponent>
    ).childAt(0);

    expect(rendered.props()).toEqual({
      className: '_3o60ld',
      type: 'submit',
      id: 'some-id',
      children: 'some children'
    });

    expect(
      rendered.matchesElement(
        <button type="submit" className="_3o60ld" id="some-id">
          some children
        </button>
      )
    ).toBe(true);
  });

  it('can filter the props that are passed to children', () => {
    while (rules.length) rules.pop();

    const TestComponent = withStyle('a', ['primary'])`
      color: ${p => (p.primary ? 'red' : 'blue')};
    `;

    const rendered = mount(
      <TestComponent primary href="#">
        some children
      </TestComponent>
    ).childAt(0);

    expect(rendered.props()).toEqual({
      href: '#',
      className: '_7l54bu',
      children: 'some children'
    });

    expect(
      rendered.matchesElement(
        <a href="#" className="_7l54bu">
          some children
        </a>
      )
    ).toBe(true);
  });
});

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
