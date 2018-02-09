import { rule, css, reset } from '../src/turnstyle';

const expectCss = (...rules) => {
  rules.forEach(rule => {
    expect(css()).toContain(rule.replace(/[ ]*\n[ ]*/g, '')
      .replace(/[ ]\{/g, '{')
      .replace(/:[ ]/g, ':'));
  });
};

beforeEach(() => {
  reset();
});

describe('vendor prefixing', () => {
  test('prefixing dynamic rules', () => {
    const r0 = rule({ display: props => props.isFlex ? 'flex' : 'block' });

    r0({ isFlex: true });
    r0({ isFlex: false });

    expectCss(
      `.cls_0 {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
      }`,
      `.cls_1 {
        display: block;
      }`
    );
  });

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
      }`
    );
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
      }`
    );
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
      }`
    );
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
      }`
    );
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
      }`
    );
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
      }`
    );
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
      }`
    );
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
      }`
    );
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
      }`
    );
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
      }`
    );
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
      }`
    );
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
      }`
    );
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
      }`
    );
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
      }`
    );
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
      }`
    );
  });

  test('animation-*', () => {
    rule({ animation: 'myanimation 5s infinite' });

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
      }`
    );
  });

  test('text-emphasis-*', () => {
    rule({ textEmphasis: 'filled purple' });

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
      }`
    );
  });

  test('mask-border-*', () => {
    rule({ maskBorder: 'none' });

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
      }`
    );
  });

  test('mask-*', () => {
    rule({ mask: 'none' });

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
      }`
    );
  });

  test('2D/3D transforms', () => {
    rule({
      transform: 'rotate(47deg)',
      transformOrigin: '10% 20%',
      transformOriginX: '10%',
      transformOriginY: '20%'
    });

    rule({
      backfaceVisibility: 'visible',
      perspective: '500px',
      perspectiveOrigin: '10% 20%',
      transformStyle: 'preserve-3d',
      transformOriginZ: '30%'
    });

    expectCss(
      `.cls_0 {
        -webkit-transform: rotate(47deg);
        transform: rotate(47deg);
        -webkit-transform-origin: 10% 20%;
        transform-origin: 10% 20%;
        -webkit-transform-origin-x: 10%;
        transform-origin-x: 10%;
        -webkit-transform-origin-y: 20%;
        transform-origin-y: 20%;
      }`,
      `.cls_1 {
        -webkit-backface-visibility: visible;
        backface-visibility: visible;
        -webkit-perspective: 500px;
        perspective: 500px;
        -webkit-perspective-origin: 10% 20%;
        perspective-origin: 10% 20%;
        -webkit-transform-style: preserve-3d;
        transform-style: preserve-3d;
        -webkit-transform-origin-z: 30%;
        transform-origin-z: 30%;
      }`
    );
  });

  test('box-decoration-break', () => {
    rule({ 'box-decoration-break': 'slice' });

    expectCss(`.cls_0 {
        -webkit-box-decoration-break: slice;
        box-decoration-break: slice;
      }`);
  });

  test('text-decoration-*', () => {
    rule({
      textDecorationLine: 'overline',
      textDecorationStyle: 'wavy',
      textDecorationColor: 'red',
      textDecorationSkip: 'ink'
    });

    expectCss(`.cls_0 {
        -webkit-text-decoration-line: overline;
        text-decoration-line: overline;
        -webkit-text-decoration-style: wavy;
        text-decoration-style: wavy;
        -webkit-text-decoration-color: red;
        text-decoration-color: red;
        -webkit-text-decoration-skip: ink;
        text-decoration-skip: ink;
      }`);
  });

  test('user-select', () => {
    rule({ userSelect: 'none' });

    expectCss(`.cls_0 {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }`);
  });

  test('shape-image-*', () => {
    rule({ shapeImageThreshold: '0.7' });

    expectCss(`.cls_0 {
        -webkit-shape-image-threshold: 0.7;
        shape-image-threshold: 0.7;
      }`);
  });

  test('font-feature-settings', () => {
    rule({ fontFeatureSettings: '"smcp" on' });

    expectCss(`.cls_0 {
        -webkit-font-feature-settings: "smcp" on;
        font-feature-settings: "smcp" on;
      }`);
  });

  test('columns', () => {
    rule({
      columns: '12em auto',
      columnRule: '1em solid black'
    });

    rule({
      columnWidth: '45px',
      columnGap: 0,
      columnCount: 3,
      columnRuleWidth: '1em',
      columnRuleStyle: 'solid',
      columnRuleColor: 'black',
      columnFill: 'balance',
      columnSpan: 'all'
    });

    expectCss(`.cls_0 {
        -webkit-columns: 12em auto;
        columns: 12em auto;
        -webkit-column-rule: 1em solid black;
        column-rule: 1em solid black;
      }`);

    expectCss(`.cls_1 {
        -webkit-column-width: 45px;
        column-width: 45px;
        -webkit-column-gap: 0;
        column-gap: 0;
        -webkit-column-count: 3;
        column-count: 3;
        -webkit-column-rule-width: 1em;
        column-rule-width: 1em;
        -webkit-column-rule-style: solid;
        column-rule-style: solid;
        -webkit-column-rule-color: black;
        column-rule-color: black;
        -webkit-column-fill: balance;
        column-fill: balance;
        -webkit-column-span: all;
        column-span: all;
      }`);
  });

  test('tab-size', () => {
    rule({ tabSize: '16' });

    expectCss(`.cls_0 {
        -moz-tab-size: 16;
        tab-size: 16;
      }`);
  });

  test('hyphens', () => {
    rule({ hyphens: 'auto' });

    expectCss(`.cls_0 {
        -webkit-hyphens: auto;
        -ms-hyphens: auto;
        hyphens: auto;
      }`);
  });

  test('text-orientation', () => {
    rule({ textOrientation: 'mixed' });

    expectCss(`.cls_0 {
        -webkit-text-orientation: mixed;
        text-orientation: mixed;
      }`);
  });

  test('regions', () => {
    rule({
      flowInto: 'main',
      flowFrom: 'main',
      breakBefore: 'always',
      breakAfter: 'left',
      breakInside: 'avoid',
      regionFragment: 'break'
    });


    expectCss(`.cls_0 {
        -webkit-flow-into: main;
        -ms-flow-into: main;
        flow-into: main;
        -webkit-flow-from: main;
        -ms-flow-from: main;
        flow-from: main;
        -webkit-break-before: always;
        -ms-break-before: always;
        break-before: always;
        -webkit-break-after: left;
        -ms-break-after: left;
        break-after: left;
        -webkit-break-inside: avoid;
        -ms-break-inside: avoid;
        break-inside: avoid;
        -webkit-region-fragment: break;
        -ms-region-fragment: break;
        region-fragment: break;
      }`);
  });

  test('exclusions', () => {
    rule({
      wrapFlow: 'both',
      wrapThrough: 'wrap',
      wrapMargin: '10px'
    });

    expectCss(`
      .cls_0 {
        -webkit-wrap-flow: both;
        wrap-flow: both;
        -webkit-wrap-through: wrap;
        wrap-through: wrap;
        -webkit-wrap-margin: 10px;
        wrap-margin: 10px;
      }`);
  });

  test('text-size-adjust', () => {
    rule({ textSizeAdjust: 'none' });

    expectCss(`.cls_0 {
        -webkit-text-size-adjust: none;
        -moz-text-size-adjust: none;
        -ms-text-size-adjust: none;
        text-size-adjust: none;
      }`);
  });

  test('clip-path', () => {
    rule({ clipPath: 'none' });

    expectCss(`.cls_0 {
        -webkit-clip-path: none;
        clip-path: none;
      }`);
  });

  test('filter', () => {
    rule({ filter: 'blur(10px)' });

    expectCss(`.cls_0 {
        -webkit-filter: blur(10px);
        filter: blur(10px);
      }`);
  });

  test('scroll-snap-*', () => {
    rule({ scrollSnapType: 'mandatory' });

    expectCss(`.cls_0 {
        -webkit-scroll-snap-type: mandatory;
        -ms-scroll-snap-type: mandatory;
        scroll-snap-type: mandatory;
      }`);
  });

  test('backdrop-filter', () => {
    rule({ backdropFilter: 'grayscale' });

    expectCss(`.cls_0 {
        -webkit-backdrop-filter: grayscale;
        backdrop-filter: grayscale;
      }`);
  });

  test('font-kerning', () => {
    rule({ fontKerning: 'normal' });

    expectCss(`.cls_0 {
        -webkit-font-kerning: normal;
        font-kerning: normal;
      }`);
  });

  test('cross-fade', () => {
    rule({ background: 'cross-fade(url(test.png))' });

    rule({ background: 'cross-fade(47% url(test.png))' });

    rule({ background: 'cross-fade(47% url(test.png) url(test2.png))' });

    expectCss(
      `.cls_0 {
        background: -webkit-cross-fade(url(test.png), 0.5);
        background: cross-fade(url(test.png));
      }`,
      `.cls_1 {
        background: -webkit-cross-fade(url(test.png), 47%);
        background: cross-fade(47% url(test.png));
      }`,
      `.cls_2 {
        background: -webkit-cross-fade(url(test.png) url(test2.png), 47%);
        background: cross-fade(47% url(test.png) url(test2.png));
      }`
    );
  });

  test('cursor', () => {
    rule({ cursor: 'pointer' });

    rule({ cursor: 'grab' });

    rule({ cursor: 'grabbing' });

    rule({ cursor: 'zoom-in' });

    rule({ cursor: 'zoom-out' });

    expectCss(
      `.cls_0 {
        cursor: pointer;
      }`,
      `.cls_1 {
        cursor: -webkit-grab;
        cursor: grab;
      }`,
      `.cls_2 {
        cursor: -webkit-grabbing;
        cursor: grabbing;
      }`,
      `.cls_3 {
        cursor: -webkit-zoom-in;
        cursor: zoom-in;
      }`,
      `.cls_4 {
        cursor: -webkit-zoom-out;
        cursor: zoom-out;
      }`
    );
  });

  test('image-set', () => {
    rule({ background: 'image-set(url(test.jpg) 1x, url(test2.jpg) 2x)' });

    expectCss(`
      .cls_0 {
        background: -webkit-image-set(url(test.jpg) 1x, url(test2.jpg) 2x);
        background: image-set(url(test.jpg) 1x, url(test2.jpg) 2x);
      }`);
  });

  test('position: sticky', () => {
    rule({ position: 'sticky' });

    expectCss(`
      .cls_0 {
        position: -webkit-sticky;
        position: sticky;
      }`);
  });

  test('intrinsic sizing', () => {
    rule({
      width: 'min-content',
      height: 'max-content',
      maxWidth: 'fill-available',
      maxHeight: 'fit-content',
      minWidth: 'auto',
      minHeight: 'initial'
    });

    expectCss(`
      .cls_0 {
        width: -webkit-min-content;
        width: -moz-min-content;
        width: min-content;
        height: -webkit-max-content;
        height: -moz-max-content;
        height: max-content;
        max-width: -webkit-fill-available;
        max-width: -moz-fill-available;
        max-width: fill-available;
        max-height: -webkit-fit-content;
        max-height: -moz-fit-content;
        max-height: fit-content;
        min-width: auto;
        min-height: initial;
      }`);
  });

  test(':fullscreen', () => {
    rule({ '&:fullscreen': { color: 'green' } });

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
      }`
    );
  });

  test('::placeholder', () => {
    rule({ '&::placeholder': { color: 'purple' } });

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
      }`
    );
  });
});
