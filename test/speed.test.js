import { rule, css, reset } from '../src/cnjs';

xdescribe('speed', () => {
  beforeEach(() => {
    reset();
  });

  test('speed of creating many static rules', () => {
    const start = performance.now();

    for (let i = 0; i < 10000; i++) {
      rule({
        color: 'blue',
        fontSize: '16px',
        width: i + 'px',
        height: '10px'
      });
    }

    const end = performance.now();
    console.log(`time: ${end - start}ms`);
  });

  test('speed of creating many dynamic rules', () => {
    const start = performance.now();

    for (let i = 0; i < 10000; i++) {
      rule({
        color: 'blue',
        fontSize: '16px',
        width: i + 'px',
        height: p => p.height + 'px'
      });
    }

    const end = performance.now();
    console.log(`time: ${end - start}ms`);
  });

  test('speed of rendering a dynamic rule many times with different props', () => {
    const start = performance.now();

    const r = rule({
      color: 'blue',
      fontSize: '16px',
      width: '10px',
      height: p => p.height + 'px'
    });

    for (let i = 0; i < 10000; i++) {
      r({height: i});
    }

    const end = performance.now();
    console.log(`time: ${end - start}ms`);
  });
});
