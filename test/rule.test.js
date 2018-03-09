import { rule } from '../src/index';
import { rules } from '../src/rules';

const expectCss = (...rules) => {
  rules.forEach(rule => {
    expect(rules.join('')).toContain(rule);
  });
};

beforeEach(() => {
  while (rules.length) rules.pop();
});

test('static rules', () => {
  const cn0 = rule`
    color: green;
    font-size: 47px;
  `;

  const cn1 = rule`
    border: 2px solid red;
    margin-left: 16px;
    display: inline;
  `;

  const cn2 = rule`
    color: green;
    font-size: 47px;
  `;

  expect(cn0()).toBe('_13outeh');
  expect(cn1()).toBe('_1wmojm0');
  expect(cn2()).toBe('_13outeh');

  expectCss(
    '._13outeh{color:green;font-size:47px;}',
    '._1wmojm0{border:2px solid red;margin-left:16px;display:inline;}'
  );
});

test('dynamic rules', () => {
  const rule0 = rule`
    color: green;
    width: ${p => p.width}%;
  `;

  const rule1 = rule`
    left: 47px;
    background-color: ${p => p.color};
  `;

  const rule2 = rule`
    left: 47px;
    background-color: red;
  `;

  expectCss('');

  const cn0 = rule0({ width: 47 });
  const cn1 = rule1({ color: 'red' });
  const cn2 = rule0({ width: 100 });
  const cn3 = rule1({ color: 'red' });
  const cn4 = rule2();

  expect(cn0).toBe('_1bjm10p');
  expect(cn1).toBe('_1ivo976');
  expect(cn2).toBe('_154vs2j');
  expect(cn3).toBe('_1ivo976');
  expect(cn4).toBe('_1ivo976');
});

test('static nested rules w/pseudoselectors', () => {
  const cn0 = rule`
    color: red;
    &:hover {
      color: green;
    }
    &:focus {
      &:before {
        color: blue;
      }
    }
  `;

  expect(cn0()).toBe('_12k1qna');
  expectCss(
    '._12k1qna{color:red;}',
    '._12k1qna:hover{color:green;}',
    '._12k1qna:focus:before{color:blue;}'
  );
});

test('dynamic nested rules w/pseudoselectors', () => {
  const rule0 = rule`
    color: red;
    width: ${props => props.size}%;
    &:hover {
      color: green;
    }
    &:focus {
      &:before {
        color: blue;
        background: ${props => props.bg};
      }
    }
  `;

  const cn0 = rule0({
    bg: 'purple',
    size: 47
  });

  expect(cn0).toBe('_5zypvq');
  expectCss(
    '._5zypvq{color:red;width:47%;}',
    '._5zypvq:hover{color:green;}',
    '._5zypvq:focus:before{color:blue;background:purple;}'
  );
});

test('static nested rules w/ media queries', () => {
  const cn0 = rule`
    color: green;
    font-size: 10px;

    @media (max-width: 99px) {
      color: blue;
      width: 47%;
    }

    @media print {
      color: red;
    }
  `;

  expect(cn0()).toBe('_hrf9cw');

  expectCss(
    '._hrf9cw{color:green;font-size:10px;}',
    '@media (max-width: 99px){._hrf9cw{color:blue;width:47%;}}',
    '@media print{._hrf9cw{color:red;}}'
  );
});

test('dynamic nested rules w/ media queries', () => {
  const rule0 = rule`
    color: ${props => props.defaultColor};
    font-size: 10px;

    @media (max-width: 99px) {
      color: ${props => props.minWidthColor};
      width: 47%;
    }

    @media print {
      color: red;

      &:hover {
        color: ${props => props.smallWidthColor};
      }
    }
  `;

  const cn0 = rule0({
    defaultColor: 'purple',
    minWidthColor: 'orange',
    smallWidthColor: 'teal'
  });

  expect(cn0).toBe('_kb885j');

  expectCss(
    '._kb885j{color:purple;font-size:10px;}',
    '@media (max-width: 99px){._kb885j{color:orange;width:47%;}}',
    '@media print{._kb885j{color:red;}}',
    '@media print{._kb885j:hover{color:teal;}}'
  );
});

test('attribute selectors', () => {
  const cn = rule`
    color: purple;

    &[disabled] {
      color: yellow;
    }

    &[type="text"] {
      color: green;
    }
  `;

  expect(cn()).toBe('_fbvjfk');
  expectCss(
    '._fbvjfk{color:purple;}',
    '._fbvjfk[disabled]{color:yellow;}',
    '._fbvjfk[type="text"]{color:green;}'
  );
});

describe('edge cases', () => {
  test('nothing passed to rule function', () => {
    const noRuleGiven = rule();
    expect(noRuleGiven()).toBe('');
    expectCss('');
  });

  test('empty string passed to rule function', () => {
    const emptyRuleGiven = rule``;
    expect(emptyRuleGiven()).toBe('');
    expectCss('');
  });
});
