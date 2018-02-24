import { rule, rehydrate, css, reset } from '../src/index';

test('temp', () => expect(true).toBeTruthy());
beforeEach(() => {
  reset();
});

test('when given an invalid id', () => {
  rehydrate('_some_nonexistent_id');
  expect(css()).toBe('');
});

test('when given the id of a non-style tag', () => {
  const tag = document.createElement('div');
  tag.id = 'some_div';
  document.body.appendChild(tag);

  rehydrate('some_div');

  expect(css()).toBe('');
});

test('actual rehydration', () => {
  const cn0 = rule({
    fontSize: '47px',
    color: 'purple'
  });

  const cn1 = rule({
    width: '100px',
    boxSizing: 'border-box',
    '@media (max-width: 1000px)': {
      width: '50%'
    }
  });

  const cn2 = rule({
    fontSize: '47px',
    color: 'purple'
  });

  const cn3 = rule({
    color: 'purple',
    '&:hover': {
      color: 'red',
      '&:focus': {
        color: 'orange'
      }
    }
  });

  const cssString = css();
  expect(cssString).toBe(
    [
      '.cls_0{font-size:47px;color:purple;}',
      '.cls_1{width:100px;box-sizing:border-box;}',
      '.cls_3{color:purple;}',
      '.cls_4:hover{color:red;}',
      '.cls_5:hover:focus{color:orange;}',
      '@media (max-width: 1000px){.cls_2{width:50%;}}'
    ].join('\n')
  );

  const styleTag = document.createElement('style');
  styleTag.id = '_turnstyle_';
  styleTag.innerHTML = cssString;
  document.head.appendChild(styleTag);

  reset();
  rehydrate('_turnstyle_');

  const cn4 = rule({
    fontSize: '47px',
    color: 'purple'
  });

  const cssString2 = css();
  expect(cssString2).toBe(
    [
      '.cls_0{font-size:47px;color:purple;}',
      '.cls_1{width:100px;box-sizing:border-box;}',
      '.cls_3{color:purple;}',
      '.cls_4:hover{color:red;}',
      '.cls_5:hover:focus{color:orange;}',
      '@media (max-width: 1000px){.cls_2{width:50%;}}'
    ].join('\n')
  );
});
