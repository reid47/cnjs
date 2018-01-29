import { classify, css, configure, reset } from './index';

const expectCss = (...rules) => {
  expect(css()).toBe(rules.join('\n'));
};

beforeEach(() => {
  reset();
  configure({
    prefix: 'sc'
  });
});

test('simple cases', () => {
  expect(
    classify({
      color: 'green'
    })
  ).toBe('sc0');

  expect(
    classify({
      color: 'blue'
    })
  ).toBe('sc1');

  expect(
    classify({
      color: 'red',
      'background-color': 'yellow'
    })
  ).toBe('sc2 sc3');

  expectCss(
    '.sc0{color:green;}',
    '.sc1{color:blue;}',
    '.sc2{color:red;}',
    '.sc3{background-color:yellow;}');
});

test('pseudoselectors', () => {
  expect(
    classify({
      color: 'green',
      '&:hover': {
        color: 'blue'
      },
      '&:focus': {
        color: 'red',
        border: '2px solid yellow'
      }
    })
  ).toBe('sc0 sc1 sc2 sc3');

  expectCss(
    '.sc0{color:green;}',
    '.sc1:hover{color:blue;}',
    '.sc2:focus{color:red;}',
    '.sc3:focus{border:2px solid yellow;}');
});

test('nested pseudoselectors', () => {
  expect(classify({
    '&:focus': {
      color: 'yellow',
      '&:hover': {
        background: 'blue'
      },
      '&:first-child:last-child': {
        '&:before': {
          content: '""'
        }
      }
    }
  })).toBe('sc0 sc1 sc2');

  expectCss(
    '.sc0:focus{color:yellow;}',
    '.sc1:focus:hover{background:blue;}',
    '.sc2:focus:first-child:last-child:before{content:"";}'
  );
});

test('media queries', () => {
  expect(
    classify({
      color: 'green',
      '@media print': {
        color: 'blue'
      },
      '@media (max-width: 700px)': {
        color: 'red',
        'text-transform': 'uppercase'
      }
    })
  ).toBe('sc0 sc1 sc2 sc3');

  expectCss(
    '.sc0{color:green;}',
    '@media print{.sc1{color:blue;}}',
    '@media (max-width: 700px){.sc2{color:red;}}',
    '@media (max-width: 700px){.sc3{text-transform:uppercase;}}'
  );
});

test('nested media queries', () => {
  expect(classify({
    width: 10,
    '@media (max-width: 1000px)': {
      width: 47,
      '@media (max-width: 2000px)': {
        width: 100
      }
    }
  })).toBe('sc0 sc1 sc2');

  expectCss(
    '.sc0{width:10px;}',
    '@media (max-width: 1000px){.sc1{width:47px;}}',
    '@media (max-width: 1000px) and (max-width: 2000px){.sc2{width:100px;}}'
  );
});

test('pseudoselectors within media queries', () => {
  expect(classify({
    width: 10,
    '@media (max-width: 1000px)': {
      background: 'green',
      '&:hover': {
        background: 'purple'
      }
    }
  })).toBe('sc0 sc1 sc2');

  expectCss(
    '.sc0{width:10px;}',
    '@media (max-width: 1000px){.sc1{background:green;}}',
    '@media (max-width: 1000px){.sc2:hover{background:purple;}}'
  );
});

test('default number units', () => {
  classify({ 'font-size': 2, width: 0 });
  expectCss(
    '.sc0{font-size:2px;}',
    '.sc1{width:0;}');
});

test('identical class deduplication', () => {
  expect(
    classify({
      color: 'green'
    })
  ).toBe('sc0');

  expect(classify({
    color: 'green',
    width: '100px',
    '@media (max-width: 500px)': {
      width: '50px'
    }
  })).toBe('sc0 sc1 sc2');

  expect(classify({
    width: '470px',
    '@media (max-width: 500px)': {
      width: '50px'
    },
    '@media (max-width: 400px)': {
      color: 'green'
    }
  })).toBe('sc3 sc2 sc4');

  expectCss(
    '.sc0{color:green;}',
    '.sc1{width:100px;}',
    '@media (max-width: 500px){.sc2{width:50px;}}',
    '.sc3{width:470px;}',
    '@media (max-width: 400px){.sc4{color:green;}}');
});

describe('weird edge cases', () => {
  test('undefined value', () => {
    expect(classify({
      color: undefined
    })).toBe('');
    expectCss('')
  });

  test('null value', () => {
    expect(classify({
      color: null
    })).toBe('');
    expectCss('')
  });

  test('empty style object', () => {
    expect(classify({})).toBe('');
    expectCss('');
  });

  test('undefined style object', () => {
    expect(classify()).toBe('');
    expectCss('');
  });
});

describe('configuration', () => {
  test('setting a class prefix', () => {
    configure({ prefix: 'test-' });
    const cn = classify({ color: 'green' });
    expect(cn).toBe('test-0');
  });

  test('setting a different default unit', () => {
    configure({ unit: 'em' });
    classify({ 'font-size': 2 });
    expectCss('.sc0{font-size:2em;}');
  });
});
