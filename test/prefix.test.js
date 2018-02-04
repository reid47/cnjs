import { rule, css, reset } from '../src/turnstyle';

const expectCss = (...rules) => {
  rules.forEach(rule => {
    expect(css()).toContain(
      rule.replace(/[ ]*\n[ ]*/g, '')
        .replace(/[ ]\{/g, '{')
        .replace(/:[ ]/g, ':'));
  })
};

beforeEach(() => {
  reset();
});

describe('vendor prefixing', () => {
  test('display: flex / inline-flex', () => {
    rule({ display: 'flex' });
    rule({ display: 'inline-flex' });
    rule({ display: 'block' });

    expectCss(
      `.cls_0 {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
      }`,
      `.cls_1 {
        display: -webkit-inline-box;
        display: -ms-inline-flexbox;
        display: inline-flex;
      }`,
      `.cls_2 {
        display: block;
      }`);
  });

  test('box-sizing', () => {
    rule({ boxSizing: 'border-box' });
    rule({ boxSizing: 'content-box' });

    expectCss(
      `.cls_0 {
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
      }`,
      `.cls_1 {
        -webkit-box-sizing: content-box;
        box-sizing: content-box;
      }`);
  });

  test('flex', () => {
    rule({ flex: '0 1 auto' });
    rule({ flex: '1 1 0' });
    rule({ flex: '0 2px' });
    rule({ flex: '1' });
    rule({ flex: 'auto' });
    rule({ flex: 'none' });
    rule({ flex: 'initial' });

    expectCss(
      `.cls_0 {
        -webkit-box-flex: 0;
        -ms-flex: 0 1 auto;
        flex: 0 1 auto;
      }`,
      `.cls_1 {
        -webkit-box-flex: 1;
        -ms-flex: 1 1 0px;
        flex: 1 1 0;
      }`,
      `.cls_2 {
        -webkit-box-flex: 0;
        -ms-flex: 0 2px;
        flex: 0 2px;
      }`,
      `.cls_3 {
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
      }`,
      `.cls_4 {
        -webkit-box-flex: 1;
        -ms-flex: auto;
        flex: auto;
      }`,
      `.cls_5 {
        -webkit-box-flex: 0;
        -ms-flex: none;
        flex: none;
      }`,
      `.cls_6 {
        -webkit-box-flex: initial;
        -ms-flex: initial;
        flex: initial;
      }`);
  });

  test('align-content', () => {
    rule({ alignContent: 'flex-end' });
    rule({ alignContent: 'flex-start' });
    rule({ alignContent: 'space-between' });
    rule({ alignContent: 'space-around' });
    rule({ alignContent: 'center' });

    expectCss(
      `.cls_0 {
        -ms-flex-line-pack: end;
        align-content: flex-end;
      }`,
      `.cls_1 {
        -ms-flex-line-pack: start;
        align-content: flex-start;
      }`,
      `.cls_2 {
        -ms-flex-line-pack: justify;
        align-content: space-between;
      }`,
      `.cls_3 {
        -ms-flex-line-pack: distribute;
        align-content: space-around;
      }`,
      `.cls_4 {
        -ms-flex-line-pack: center;
        align-content: center;
      }`);
  });

  test('justify-content', () => {
    rule({ justifyContent: 'flex-end' });
    rule({ justifyContent: 'flex-start' });
    rule({ justifyContent: 'space-between' });
    rule({ justifyContent: 'space-around' });
    rule({ justifyContent: 'center' });

    expectCss(
      `.cls_0 {
        -webkit-box-pack: end;
        -ms-flex-pack: end;
        justify-content: flex-end;
      }`,
      `.cls_1 {
        -webkit-box-pack: start;
        -ms-flex-pack: start;
        justify-content: flex-start;
      }`,
      `.cls_2 {
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
      }`,
      `.cls_3 {
        -ms-flex-pack: distribute;
        justify-content: space-around;
      }`,
      `.cls_4 {
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
      }`);
  });

  test('align-self', () => {
    rule({ alignSelf: 'flex-start' });
    rule({ alignSelf: 'flex-end' });
    rule({ alignSelf: 'baseline' });
    rule({ alignSelf: 'stretch' });
    rule({ alignSelf: 'auto' });

    expectCss(
      `.cls_0 {
        -ms-flex-item-align: start;
        align-self: flex-start;
      }`,
      `.cls_1 {
        -ms-flex-item-align: end;
        align-self: flex-end;
      }`,
      `.cls_2 {
        -ms-flex-item-align: baseline;
        align-self: baseline;
      }`,
      `.cls_3 {
        -ms-flex-item-align: stretch;
        -ms-grid-row-align: stretch;
        align-self: stretch;
      }`,
      `.cls_4 {
        -ms-flex-item-align: auto;
        -ms-grid-row-align: auto;
        align-self: auto;
      }`);
  });

  test('align-items', () => {
    rule({ alignItems: 'flex-start' });
    rule({ alignItems: 'flex-end' });
    rule({ alignItems: 'baseline' });
    rule({ alignItems: 'stretch' });
    rule({ alignItems: 'center' });

    expectCss(
      `.cls_0 {
        -webkit-box-align: start;
        -ms-flex-align: start;
        align-items: flex-start;
      }`,
      `.cls_1 {
        -webkit-box-align: end;
        -ms-flex-align: end;
        align-items: flex-end;
      }`,
      `.cls_2 {
        -webkit-box-align: baseline;
        -ms-flex-align: baseline;
        align-items: baseline;
      }`,
      `.cls_3 {
        -webkit-box-align: stretch;
        -ms-flex-align: stretch;
        align-items: stretch;
      }`,
      `.cls_4 {
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
      }`);
  });

  test('flex-basis', () => {
    rule({ flexBasis: 'auto' });
    rule({ flexBasis: '0' });
    rule({ flexBasis: '47px' });

    expectCss(
      `.cls_0 {
        -ms-flex-preferred-size: auto;
        flex-basis: auto;
      }`,
      `.cls_1 {
        -ms-flex-preferred-size: 0;
        flex-basis: 0;
      }`,
      `.cls_2 {
        -ms-flex-preferred-size: 47px;
        flex-basis: 47px;
      }`);
  });

  test('flex-direction', () => {
    rule({ flexDirection: 'auto' });
    rule({ flexDirection: 'row' });
    rule({ flexDirection: 'column' });
    rule({ flexDirection: 'row-reverse' });
    rule({ flexDirection: 'column-reverse' });

    expectCss(
      `.cls_0 {
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: auto;
        flex-direction: auto;
      }`,
      `.cls_1 {
        -webkit-box-orient: horizontal;
        -webkit-box-direction: normal;
        -ms-flex-direction: row;
        flex-direction: row;
      }`,
      `.cls_2 {
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
      }`,
      `.cls_3 {
        -webkit-box-orient: horizontal;
        -webkit-box-direction: reverse;
        -ms-flex-direction: row-reverse;
        flex-direction: row-reverse;
      }`,
      `.cls_4 {
        -webkit-box-orient: vertical;
        -webkit-box-direction: reverse;
        -ms-flex-direction: column-reverse;
        flex-direction: column-reverse;
      }`);
  });

  test('flex-wrap', () => {
    rule({ flexWrap: 'nowrap' });
    rule({ flexWrap: 'wrap' });
    rule({ flexWrap: 'wrap-reverse' });

    expectCss(
      `.cls_0 {
        -ms-flex-wrap: nowrap;
        flex-wrap: nowrap;
      }`,
      `.cls_1 {
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
      }`,
      `.cls_2 {
        -ms-flex-wrap: wrap-reverse;
        flex-wrap: wrap-reverse;
      }`);
  });

  test('flex-grow', () => {
    rule({ flexGrow: 0 });
    rule({ flexGrow: '1' });

    expectCss(
      `.cls_0 {
        -webkit-box-flex: 0;
        -ms-flex-positive: 0;
        flex-grow: 0;
      }`,
      `.cls_1 {
        -webkit-box-flex: 1;
        -ms-flex-positive: 1;
        flex-grow: 1;
      }`);
  });

  test('flex-shrink', () => {
    rule({ flexShrink: 0 });
    rule({ flexShrink: '1' });

    expectCss(
      `.cls_0 {
        -ms-flex-negative: 0;
        flex-shrink: 0;
      }`,
      `.cls_1 {
        -ms-flex-negative: 1;
        flex-shrink: 1;
      }`);
  });

  test('flex-flow', () => {
    rule({ flexFlow: 'row nowrap' });
    rule({ flexFlow: 'row wrap' });
    rule({ flexFlow: 'row wrap-reverse' });
    rule({ flexFlow: 'column nowrap' });
    rule({ flexFlow: 'column wrap' });
    rule({ flexFlow: 'column wrap-reverse' });
    rule({ flexFlow: 'row-reverse nowrap' });
    rule({ flexFlow: 'row-reverse wrap' });
    rule({ flexFlow: 'row-reverse wrap-reverse' });
    rule({ flexFlow: 'column-reverse nowrap' });
    rule({ flexFlow: 'column-reverse wrap' });
    rule({ flexFlow: 'column-reverse wrap-reverse' });

    expectCss(
      `.cls_0 {
        -webkit-box-orient: horizontal;
        -webkit-box-direction: normal;
        -ms-flex-flow: row nowrap;
        flex-flow: row nowrap;
      }`,
      `.cls_1 {
        -webkit-box-orient: horizontal;
        -webkit-box-direction: normal;
        -ms-flex-flow: row wrap;
        flex-flow: row wrap;
      }`,
      `.cls_2 {
        -webkit-box-orient: horizontal;
        -webkit-box-direction: normal;
        -ms-flex-flow: row wrap-reverse;
        flex-flow: row wrap-reverse;
      }`,
      `.cls_3 {
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-flow: column nowrap;
        flex-flow: column nowrap;
      }`,
      `.cls_4 {
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-flow: column wrap;
        flex-flow: column wrap;
      }`,
      `.cls_5 {
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-flow: column wrap-reverse;
        flex-flow: column wrap-reverse;
      }`,
      `.cls_6 {
        -webkit-box-orient: horizontal;
        -webkit-box-direction: reverse;
        -ms-flex-flow: row-reverse nowrap;
        flex-flow: row-reverse nowrap;
      }`,
      `.cls_7 {
        -webkit-box-orient: horizontal;
        -webkit-box-direction: reverse;
        -ms-flex-flow: row-reverse wrap;
        flex-flow: row-reverse wrap;
      }`,
      `.cls_8 {
        -webkit-box-orient: horizontal;
        -webkit-box-direction: reverse;
        -ms-flex-flow: row-reverse wrap-reverse;
        flex-flow: row-reverse wrap-reverse;
      }`,
      `.cls_9 {
        -webkit-box-orient: vertical;
        -webkit-box-direction: reverse;
        -ms-flex-flow: column-reverse nowrap;
        flex-flow: column-reverse nowrap;
      }`,
      `.cls_a {
        -webkit-box-orient: vertical;
        -webkit-box-direction: reverse;
        -ms-flex-flow: column-reverse wrap;
        flex-flow: column-reverse wrap;
      }`,
      `.cls_b {
        -webkit-box-orient: vertical;
        -webkit-box-direction: reverse;
        -ms-flex-flow: column-reverse wrap-reverse;
        flex-flow: column-reverse wrap-reverse;
      }`);
  });

  test('order', () => {
    rule({ order: 0 });
    rule({ order: '1' });
    rule({ order: 'initial' });

    expectCss(
      `.cls_0 {
        -webkit-box-ordinal-group: 1;
        -ms-flex-order: 0;
        order: 0;
      }`,
      `.cls_1 {
      -webkit-box-ordinal-group: 2;
        -ms-flex-order: 1;
        order: 1;
      }`,
      `.cls_2 {
        -webkit-box-ordinal-group: initial;
        -ms-flex-order: initial;
        order: initial;
      }`);
  });

  test('appearance', () => {
    rule({ appearance: 'none' });
    rule({ appearance: 'text-field' });

    expectCss(
      `.cls_0 {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
      }`,
      `.cls_1 {
        -webkit-appearance: text-field;
        -moz-appearance: text-field;
        appearance: text-field;
      }`);
  });

  test('writing-mode', () => {
    rule({ writingMode: 'horizontal-tb' });
    rule({ writingMode: 'vertical-lr' });
    rule({ writingMode: 'vertical-rl' });

    expectCss(
      `.cls_0 {
        -webkit-writing-mode: horizontal-tb;
        -ms-writing-mode: lr-tb;
        writing-mode: horizontal-tb;
      }`,
      `.cls_1 {
        -webkit-writing-mode: vertical-lr;
        -ms-writing-mode: tb-lr;
        writing-mode: vertical-lr;
      }`,
      `.cls_2 {
        -webkit-writing-mode: vertical-rl;
        -ms-writing-mode: tb-rl;
        writing-mode: vertical-rl;
      }`);
  });

  test('animation-*', () => {
    rule({
      animation: 'myanimation 5s infinite'
    });

    rule({
      animationDelay: '2s',
      animationDirection: 'alternate',
      animationDuration: '3s',
      animationFillMode: 'forwards',
      animationIterationCount: 2,
      animationName: 'someanimation',
      animationPlayState: 'paused',
      animationTimingFunction: 'linear'
    });

    expectCss(
      `.cls_0 {
        -webkit-animation: myanimation 5s infinite;
        animation: myanimation 5s infinite;
      }`,
      `.cls_1 {
        -webkit-animation-delay: 2s;
        animation-delay: 2s;
        -webkit-animation-direction: alternate;
        animation-direction: alternate;
        -webkit-animation-duration: 3s;
        animation-duration: 3s;
        -webkit-animation-fill-mode: forwards;
        animation-fill-mode: forwards;
        -webkit-animation-iteration-count: 2;
        animation-iteration-count: 2;
        -webkit-animation-name: someanimation;
        animation-name: someanimation;
        -webkit-animation-play-state: paused;
        animation-play-state: paused;
        -webkit-animation-timing-function: linear;
        animation-timing-function: linear;
      }`);
  });

  test('text-emphasis-*', () => {
    rule({
      textEmphasis: 'filled purple'
    });

    rule({
      textEmphasisStyle: 'filled',
      textEmphasisColor: 'purple',
      textEmphasisPosition: 'over right'
    });

    expectCss(
      `.cls_0 {
        -webkit-text-emphasis: filled purple;
        text-emphasis: filled purple;
      }`,
      `.cls_1 {
        -webkit-text-emphasis-style: filled;
        text-emphasis-style: filled;
        -webkit-text-emphasis-color: purple;
        text-emphasis-color: purple;
        -webkit-text-emphasis-position: over right;
        text-emphasis-position: over right;
      }`);
  });

  test('mask-border-*', () => {
    rule({
      maskBorder: 'none'
    });

    rule({
      maskBorderOutset: 'none',
      maskBorderSource: 'none',
      maskBorderMode: 'none',
      maskBorderSlice: 'none',
      maskBorderWidth: 'none',
      maskBorderRepeat: 'none'
    });

    expectCss(
      `.cls_0 {
        -webkit-mask-box-image: none;
        mask-border: none;
      }`,
      `.cls_1 {
        -webkit-mask-box-image-outset: none;
        mask-border-outset: none;
        -webkit-mask-box-image-source: none;
        mask-border-source: none;
        -webkit-mask-box-image-mode: none;
        mask-border-mode: none;
        -webkit-mask-box-image-slice: none;
        mask-border-slice: none;
        -webkit-mask-box-image-width: none;
        mask-border-width: none;
        -webkit-mask-box-image-repeat: none;
        mask-border-repeat: none;
      }`);
  });

  test('mask-*', () => {
    rule({
      mask: 'none'
    });

    rule({
      maskImage: 'none',
      maskMode: 'none',
      maskRepeat: 'none',
      maskPosition: 'none',
      maskClip: 'none',
      maskOrigin: 'none',
      maskSize: 'none',
      maskComposite: 'none',
      maskType: 'none'
    });

    expectCss(
      `.cls_0 {
        -webkit-mask: none;
        mask: none;
      }`,
      `.cls_1 {
        -webkit-mask-image: none;
        mask-image: none;
        -webkit-mask-mode: none;
        mask-mode: none;
        -webkit-mask-repeat: none;
        mask-repeat: none;
        -webkit-mask-position: none;
        mask-position: none;
        -webkit-mask-clip: none;
        mask-clip: none;
        -webkit-mask-origin: none;
        mask-origin: none;
        -webkit-mask-size: none;
        mask-size: none;
        -webkit-mask-composite: none;
        mask-composite: none;
        -webkit-mask-type: none;
        mask-type: none;
      }`);
  });

  test(':fullscreen', () => {
    rule({
      '&:fullscreen': {
        color: 'green'
      }
    });

    expectCss(
      `.cls_0:-webkit-full-screen {
        color: green;
      }`,
      `.cls_0:-moz-full-screen {
        color: green;
      }`,
      `.cls_0:-ms-fullscreen {
        color: green;
      }`,
      `.cls_0:fullscreen {
        color: green;
      }`);
  });

  test('::placeholder', () => {
    rule({
      '&::placeholder': {
        color: 'purple'
      }
    });

    expectCss(
      `.cls_0::-webkit-input-placeholder {
        color: purple;
      }`,
      `.cls_0:-ms-input-placeholder {
        color: purple;
      }`,
      `.cls_0::-ms-input-placeholder {
        color: purple;
      }`,
      `.cls_0::placeholder {
        color: purple;
      }`);
  });
});
