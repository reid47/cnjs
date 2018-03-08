import { rehydrate } from '../../src/client/rehydrate';
import { RULE_SEPARATOR } from '../../src/core/constants';
import { rule, css, reset } from '../../src/index';

describe('rehydration', () => {
  let styleTag;

  beforeEach(() => {
    styleTag = document.createElement('style');
    styleTag.setAttribute('data-tstyle-rendered', null);
    styleTag.innerHTML = [
      '/*~cls_0~*/.cls_0{color:green;}',
      RULE_SEPARATOR,
      '/*~cls_1~*/.cls_1{color:blue;}',
      RULE_SEPARATOR,
      '/*~cls_1~*/.cls_1:hover{color:red;}'
    ].join('');

    document.head.appendChild(styleTag);
    reset();
  });

  afterEach(() => {
    document.head.removeChild(styleTag);
  });

  test('rehydrates without failing', () => {
    rehydrate();

    expect(css()).toBe(
      [
        '.cls_0{color:green;}',
        '.cls_1{color:blue;}',
        '.cls_1:hover{color:red;}'
      ].join('')
    );
  });

  test('repopulates the cache', () => {
    rehydrate();

    const cn = rule`
      color: green;
    `;

    expect(cn()).toBe('cls_0');
    expect(css()).toBe(
      [
        '.cls_0{color:green;}',
        '.cls_1{color:blue;}',
        '.cls_1:hover{color:red;}'
      ].join('')
    );
  });
});
