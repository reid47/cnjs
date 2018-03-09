import { JSDOM } from 'jsdom';
import fs from 'fs';
const turnstyle = fs.readFileSync('./dist/turnstyle.js', 'UTF-8');

describe('browser', () => {
  let window;

  beforeEach(() => {
    window = new JSDOM('', { runScripts: 'dangerously' }).window;
    const scriptEl = window.document.createElement('script');
    scriptEl.textContent = turnstyle;
    window.document.body.appendChild(scriptEl);
  });

  test('library added to browser context', () => {
    expect(window.Turnstyle).toBeDefined();
    expect(typeof window.Turnstyle.rule).toBe('function');
    expect(typeof window.Turnstyle.css).toBe('function');
    expect(typeof window.Turnstyle.reset).toBe('function');
  });

  test('creates an empty style tag in the document head', () => {
    const styleTag = window.document.head.querySelector('style');
    expect(styleTag).toBeTruthy();
    expect(styleTag.sheet.cssRules).toHaveLength(0);
  });

  test('static rules insert CSS into stylesheet', () => {
    const cn0 = window.Turnstyle.rule`
      color: green;
      font-size: 48px;
    `;

    const cn1 = window.Turnstyle.rule`
      position: absolute;
      left: 47px;
      top: 470px;
    `;

    expect(cn0()).toBe('_gneqt2');
    expect(cn1()).toBe('_1bw4rre');

    const styleTag = window.document.head.querySelector('style');
    expect(styleTag.sheet.cssRules).toHaveLength(2);
    expect(styleTag.sheet.cssRules[0].cssText).toBe(
      '._gneqt2 {color: green; font-size: 48px;}'
    );
    expect(styleTag.sheet.cssRules[1].cssText).toBe(
      '._1bw4rre {position: absolute; left: 47px; top: 470px;}'
    );
  });

  test('dynamic rules insert CSS into stylesheet', () => {
    const rule0 = window.Turnstyle.rule`
      color: green;
      width: ${p => p.width}%;
    `;

    const rule1 = window.Turnstyle.rule`
      left: 47px;
      background-color: ${p => p.color};
    `;

    expect(typeof rule0).toBe('function');
    expect(typeof rule1).toBe('function');

    const styleTag = window.document.head.querySelector('style');
    expect(styleTag.sheet.cssRules).toHaveLength(0);

    const cn0 = rule0({ width: 47 });
    const cn1 = rule1({ color: 'red' });
    const cn2 = rule0({ width: 100 });
    const cn3 = rule1({ color: 'red' });

    expect(cn0).toBe('_1a663s9');
    expect(cn1).toBe('_19kl76a');
    expect(cn2).toBe('_5xs40r');
    expect(cn3).toBe('_19kl76a');

    expect(styleTag.sheet.cssRules).toHaveLength(3);
    expect(styleTag.sheet.cssRules[0].cssText).toBe(
      '._1a663s9 {color: green; width: 47%;}'
    );
    expect(styleTag.sheet.cssRules[1].cssText).toBe(
      '._19kl76a {left: 47px; background-color: red;}'
    );
    expect(styleTag.sheet.cssRules[2].cssText).toBe(
      '._5xs40r {color: green; width: 100%;}'
    );
  });
});
