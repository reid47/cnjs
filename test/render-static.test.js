import { renderStatic } from '../src/render-static';
import { rule } from '../src/index';
import { rules } from '../src/rule-cache';

describe('renderStatic', () => {
  beforeEach(() => {
    while (rules.length) rules.pop();
  });

  test('renders CSS/JS strings', () => {
    rule`
      color: green;
    `;

    rule`
      color: blue;
      &:hover {
        color: red;
      }
    `;

    const rendered = renderStatic();

    expect(rendered.css).toEqual(
      '._dt1o82{color:green;}' +
        '._awvwfy{color:blue;}' +
        '._awvwfy:hover{color:red;}'
    );

    expect(rendered.classes).toEqual(['_dt1o82', '_awvwfy']);

    expect(rendered.script).toEqual(
      '<script>' +
        'window.Turnstyle.rehydrate(["_dt1o82","_awvwfy"]);' +
        '</script>'
    );

    expect(rendered.style).toEqual(
      '<style>' +
        '._dt1o82{color:green;}' +
        '._awvwfy{color:blue;}' +
        '._awvwfy:hover{color:red;}' +
        '</style>'
    );
  });
});
