import { rule, css, reset } from './src2';

const expectCss = (...rules) => {
  expect(css()).toBe(rules.join('\n'));
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
    fontSize: p => (p.size * 2) + 'px'
  });

  expect(typeof rule0).toBe('function');
  expectCss('');

  const cn0 = rule0({ size: 10 });
  const cn1 = rule0({ size: 20 });
  const cn2 = rule0({ size: 10 });

  expect(cn0).toBe('cls_0');
  expect(cn1).toBe('cls_1');
  expect(cn2).toBe('cls_0');

  expectCss(
    '.cls_0{color:green;font-size:20px;}',
    '.cls_1{color:green;font-size:40px;}'
  );
});

test('nested rules w/pseudoselectors', () => {
  const cn0 = rule({
    color: 'red',
    '&:hover': {
      color: 'green'
    }
  });

  expect(cn0).toBe('cls_0');
  expectCss(
    '.cls_0{color:red;}',
    '.cls_0:hover{color:green;}'
  );
});
