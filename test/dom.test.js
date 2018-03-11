import { insertRule } from '../src/dom';

describe('insertRule', () => {
  test('no style tags at first', () => {
    expect(document.head.querySelector('style')).toBe(null);
  });

  describe('in development', () => {
    let style;

    beforeEach(() => {
      process.env.NODE_ENV = 'development';
    });

    afterEach(() => {
      style.textContent = '';
    });

    test('after inserting rules', () => {
      insertRule('.test{color:green;}');
      insertRule('.test1{color:red;}');

      style = document.head.querySelector('style');
      expect(style).not.toBeNull();
      expect(style.sheet.cssRules.length).toBe(2);
      expect(style.textContent).toBe('.test{color:green;}.test1{color:red;}');
    });
  });

  describe('in production', () => {
    let style;

    beforeEach(() => {
      process.env.NODE_ENV = 'production';
    });

    afterEach(() => {
      style.textContent = '';
    });

    test('after inserting rules', () => {
      insertRule('.test{color:green;}');
      insertRule('.test1{color:red;}');

      style = document.head.querySelector('style');
      expect(style).not.toBeNull();
      expect(style.sheet.cssRules.length).toBe(2);
      expect(style.textContent).toBe('');
    });
  });
});
