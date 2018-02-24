import { parseRule } from '../src/parse-rule';

test('parses simple rules', () => {
  const ruleText = '.cls_0 {font-size: 47px; color: purple;}';
  expect(parseRule(ruleText)).toEqual({
    valid: true,
    className: 'cls_0',
    at: '',
    pseudo: '',
    ruleText: 'font-size: 47px;color: purple;'
  });
});

test('parses simple rules 2', () => {
  const ruleText = '.cls_1 {width: 100px; box-sizing: border-box;}';
  expect(parseRule(ruleText)).toEqual({
    valid: true,
    className: 'cls_1',
    at: '',
    pseudo: '',
    ruleText: 'width: 100px;box-sizing: border-box;'
  });
});

test('parses rules with a pseudoselector', () => {
  const ruleText = '.cls_4:hover {color: red;}';
  expect(parseRule(ruleText)).toEqual({
    valid: true,
    className: 'cls_4',
    at: '',
    pseudo: ':hover',
    ruleText: 'color: red;'
  });
});

test('parses rules with multiple pseudoselectors', () => {
  const ruleText = '.cls_5:hover:focus {color: orange;}';
  expect(parseRule(ruleText)).toEqual({
    valid: true,
    className: 'cls_5',
    at: '',
    pseudo: ':hover:focus',
    ruleText: 'color: orange;'
  });
});

test('parses rules with media queries', () => {
  const ruleText = '@media (max-width: 1000px) {.cls_2 {width: 50%;}}';
  expect(parseRule(ruleText)).toEqual({
    valid: true,
    className: 'cls_2',
    at: '@media (max-width: 1000px)',
    pseudo: '',
    ruleText: 'width: 50%;'
  });
});

test('parses rules with media queries and pseudoselectors', () => {
  const ruleText =
    '@media (max-width: 1000px) {.cls_6:hover {font-size: 50px;}}';
  expect(parseRule(ruleText)).toEqual({
    valid: true,
    className: 'cls_6',
    at: '@media (max-width: 1000px)',
    pseudo: ':hover',
    ruleText: 'font-size: 50px;'
  });
});
