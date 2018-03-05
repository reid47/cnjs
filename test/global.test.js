import { global, css, reset } from '../src/index';

const expectCss = (...rules) => {
  rules.forEach(rule => {
    expect(css()).toContain(
      rule.replace(/[ ]*\n[ ]*/g, '').replace(/[ ]\{/g, '{')
    );
  });
};

beforeEach(() => {
  reset();
});

test('global rules', () => {
  global`
    body, html {
      color: green;
      font-size: 47px;
    }
  `;

  global`
    *, *:before, *:after {
      box-sizing: border-box;
    }
  `;

  expectCss(
    'body, html{color:green;font-size:47px;}',
    '*, *:before, *:after{box-sizing:border-box;}'
  );
});

test('global rules with class names', () => {
  global`
    .some-global-class {
      color: green;
      font-size: 47px;
    }
  `;

  expectCss('.some-global-class{color:green;font-size:47px;}');
});

test('global rules with media queries', () => {
  global`
    .some-global-class {
      font-size: 47px;
      @media (max-width: 700px) {
        font-size: 100px;
      }
    }
  `;

  expectCss(
    '.some-global-class{font-size:47px;}',
    '@media (max-width: 700px){ .some-global-class{font-size:100px;}}'
  );
});
