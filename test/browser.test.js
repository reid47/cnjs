import { JSDOM } from 'jsdom';
import fs from 'fs';
const turnstyle = fs.readFileSync('./dist/turnstyle.js', 'UTF-8');

describe('browser', () => {
  let window;
  beforeEach(() => {
    window = (new JSDOM(``, { runScripts: 'dangerously' })).window;
    const scriptEl = window.document.createElement('script');
    scriptEl.textContent = turnstyle;
    window.document.body.appendChild(scriptEl);
  });

  test('library added to browser context', () => {
    expect(window.turnstyle).toBeDefined();
    expect(typeof window.turnstyle.rule).toBe('function');
    expect(typeof window.turnstyle.css).toBe('function');
    expect(typeof window.turnstyle.reset).toBe('function');
  });

  test('creates an empty style tag in the document head', () => {
    const styleTag = window.document.head.querySelector('style');
    expect(styleTag).toBeTruthy();
    expect(styleTag.sheet.cssRules.length).toBe(0);
  });

  test('static rules insert CSS into stylesheet', () => {
    const cn0 = window.turnstyle.rule({
      color: 'green',
      fontSize: '48px'
    });

    const cn1 = window.turnstyle.rule({
      position: 'absolute',
      left: '47px',
      top: '470px'
    });

    expect(cn0).toBe('cls_0');
    expect(cn1).toBe('cls_1');

    const styleTag = window.document.head.querySelector('style');
    expect(styleTag.sheet.cssRules.length).toBe(2);
    expect(styleTag.sheet.cssRules[0].cssText)
      .toBe('.cls_0 {color: green; font-size: 48px;}');
    expect(styleTag.sheet.cssRules[1].cssText)
      .toBe('.cls_1 {position: absolute; left: 47px; top: 470px;}');
  });

  test('dynamic rules insert CSS into stylesheet', () => {
    const rule0 = window.turnstyle.rule({
      color: 'green',
      width: p => p.width + '%'
    });

    const rule1 = window.turnstyle.rule({
      left: '47px',
      backgroundColor: p => p.color
    });

    expect(typeof rule0).toBe('function');
    expect(typeof rule1).toBe('function');

    const styleTag = window.document.head.querySelector('style');
    expect(styleTag.sheet.cssRules.length).toBe(0);

    const cn0 = rule0({ width: 47 });
    const cn1 = rule1({ color: 'red' });
    const cn2 = rule0({ width: 100 });
    const cn3 = rule1({ color: 'red' });

    expect(cn0).toBe('cls_0');
    expect(cn1).toBe('cls_1');
    expect(cn2).toBe('cls_2');
    expect(cn3).toBe('cls_1');

    expect(styleTag.sheet.cssRules.length).toBe(3);
    expect(styleTag.sheet.cssRules[0].cssText)
      .toBe('.cls_0 {color: green; width: 47%;}');
    expect(styleTag.sheet.cssRules[1].cssText)
      .toBe('.cls_1 {left: 47px; background-color: red;}');
    expect(styleTag.sheet.cssRules[2].cssText)
      .toBe('.cls_2 {color: green; width: 100%;}');
  });
});
