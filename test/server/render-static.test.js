import { renderStatic } from '../../src/server/render-static';
import { rule, reset } from '../../src/index';

describe('static rendering', () => {
  beforeEach(() => {
    reset();
  });

  test('renders a style tag', () => {
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

    expect(rendered).toEqual({
      script:
        '<script>window.Turnstyle.rehydrate(["_dt1o82","_awvwfy"]);</script>',
      css:
        '._dt1o82{color:green;}' +
        '._awvwfy{color:blue;}' +
        '._awvwfy:hover{color:red;}',
      style:
        '<style type="text/css">' +
        '._dt1o82{color:green;}' +
        '._awvwfy{color:blue;}' +
        '._awvwfy:hover{color:red;}' +
        '</style>',
      classes: ['_dt1o82', '_awvwfy']
    });
  });
});
