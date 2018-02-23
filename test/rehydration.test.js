import { rule, rehydrate, css, reset } from '../src/turnstyle';

beforeEach(() => {
  reset();
});

test('rehydration', () => {
  const cn0 = rule({
    fontSize: '47px',
    color: 'purple'
  });

  const cn1 = rule({
    width: '100px',
    boxSizing: 'border-box'
  });

  const cn2 = rule({
    fontSize: '47px',
    color: 'purple'
  });

  const cssString = css();
  expect(cssString).toBe(
    [
      '.cls_0{font-size:47px;color:purple;}',
      '.cls_1{width:100px;box-sizing:border-box;}'
    ].join('\n')
  );

  const styleTag = document.createElement('style');
  styleTag.id = '_turnstyle_';
  styleTag.innerHTML = cssString;
  document.head.appendChild(styleTag);

  reset();
  rehydrate('_turnstyle_');

  const cn3 = rule({
    width: '100px',
    boxSizing: 'border-box'
  });

  const cssString2 = css();
  expect(cssString2).toBe(
    [
      '.cls_0{font-size:47px;color:purple;}',
      '.cls_1{width:100px;box-sizing:border-box;}'
    ].join('\n')
  );
});
