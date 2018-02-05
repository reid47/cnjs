import { rule, css, reset } from '../src/turnstyle';

const expectCss = (...rules) => {
  rules.forEach(rule => {
    expect(css()).toContain(rule);
  });
};

beforeEach(() => {
  reset();
});

test('static rules', () => {
  const cn0 = rule({
    color: 'green',
    fontSize: '47px'
  });

  const cn1 = rule({
    border: '2px solid red',
    marginLeft: '16px',
    display: 'inline'
  });

  const cn2 = rule({
    color: 'green',
    fontSize: '47px'
  });

  expect(cn0).toBe('cls_0');
  expect(cn1).toBe('cls_1');
  expect(cn2).toBe('cls_0');

  expectCss(
    '.cls_0{color:green;font-size:47px;}',
    '.cls_1{border:2px solid red;margin-left:16px;display:inline;}'
  );
});

test('dynamic rules', () => {
  const rule0 = rule({
    color: 'green',
    width: p => p.width + '%'
  });

  const rule1 = rule({
    left: '47px',
    backgroundColor: p => p.color
  });

  expect(typeof rule0).toBe('function');
  expect(typeof rule1).toBe('function');
  expectCss('');

  const cn0 = rule0({ width: 47 });
  const cn1 = rule1({ color: 'red' });
  const cn2 = rule0({ width: 100 });
  const cn3 = rule1({ color: 'red' });

  expect(cn0).toBe('cls_0');
  expect(cn1).toBe('cls_1');
  expect(cn2).toBe('cls_2');
  expect(cn3).toBe('cls_1');
});

test('static nested rules w/pseudoselectors', () => {
  const cn0 = rule({
    color: 'red',
    '&:hover': { color: 'green' },
    '&:focus': { '&:before': { color: 'blue' } }
  });

  expect(cn0).toBe('cls_0');
  expectCss(
    '.cls_0{color:red;}',
    '.cls_0:hover{color:green;}',
    '.cls_0:focus:before{color:blue;}'
  );
});

test('dynamic nested rules w/pseudoselectors', () => {
  const rule0 = rule({
    color: 'red',
    width: props => props.size + '%',
    '&:hover': { color: 'green' },
    '&:focus': {
      '&:before': {
        color: 'blue',
        background: props => props.bg
      }
    }
  });

  const cn0 = rule0({
    bg: 'purple',
    size: 47
  });

  expect(cn0).toBe('cls_0');
  expectCss(
    '.cls_0{color:red;width:47%;}',
    '.cls_0:hover{color:green;}',
    '.cls_0:focus:before{color:blue;background:purple;}'
  );
});

test('static nested rules w/ media queries', () => {
  const cn0 = rule({
    color: 'green',
    fontSize: '10px',
    '@media (max-width: 99px)': {
      color: 'blue',
      width: '47%'
    },
    '@media print': {
      color: 'red',
      '@media (max-width: 28px)': { color: 'yellow' }
    }
  });

  expect(cn0).toBe('cls_0');

  expectCss(
    '.cls_0{color:green;font-size:10px;}',
    '@media print{.cls_0{color:red;}}',
    '@media (max-width: 99px){.cls_0{color:blue;width:47%;}}',
    '@media print and (max-width: 28px){.cls_0{color:yellow;}}'
  );
});

test('dynamic nested rules w/ media queries', () => {
  const rule0 = rule({
    color: props => props.defaultColor,
    fontSize: '10px',
    '@media (max-width: 99px)': {
      color: props => props.minWidthColor,
      width: '47%'
    },
    '@media print': {
      color: 'red',
      '@media (max-width: 28px)': { color: props => props.smallWidthColor }
    }
  });

  const cn0 = rule0({
    defaultColor: 'purple',
    minWidthColor: 'orange',
    smallWidthColor: 'teal'
  });

  expect(cn0).toBe('cls_0');

  expectCss(
    '.cls_0{color:purple;font-size:10px;}',
    '@media print{.cls_0{color:red;}}',
    '@media (max-width: 99px){.cls_0{color:orange;width:47%;}}',
    '@media print and (max-width: 28px){.cls_0{color:teal;}}'
  );
});

test('attribute selectors', () => {
  const cn = rule({
    color: 'purple',
    '&[disabled]': { color: 'yellow' },
    '&[type="text"]': { color: 'green' }
  });

  expect(cn).toBe('cls_0');
  expectCss(
    '.cls_0{color:purple;}',
    '.cls_0[disabled]{color:yellow;}',
    '.cls_0[type="text"]{color:green;}'
  );
});

describe('edge cases', () => {
  test('nothing passed to rule function', () => {
    const noRuleGiven = rule();
    expect(noRuleGiven).toBe('');
    expectCss('');
  });

  test('empty object passed to rule function', () => {
    const emptyRuleGiven = rule();
    expect(emptyRuleGiven).toBe('');
    expectCss('');
  });
});
