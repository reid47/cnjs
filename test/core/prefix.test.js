import { prefix } from '../../src/core/prefix';

describe('vendor prefixing', () => {
  test('display: flex / inline-flex', () => {
    expect(prefix('display', 'flex')).toEqual([
      ['display', '-webkit-box'],
      ['display', '-ms-flexbox'],
      ['display', 'flex']
    ]);

    expect(prefix('display', 'inline-flex')).toEqual([
      ['display', '-webkit-inline-box'],
      ['display', '-ms-inline-flexbox'],
      ['display', 'inline-flex']
    ]);

    expect(prefix('display', 'block')).toEqual([['display', 'block']]);
  });

  test('flex', () => {
    expect(prefix('flex', '0 1 auto')).toEqual([
      ['-webkit-box-flex', '0'],
      ['-ms-flex', '0 1 auto'],
      ['flex', '0 1 auto']
    ]);

    expect(prefix('flex', '1 1 0')).toEqual([
      ['-webkit-box-flex', '1'],
      ['-ms-flex', '1 1 0px'],
      ['flex', '1 1 0']
    ]);

    expect(prefix('flex', '0 2px')).toEqual([
      ['-webkit-box-flex', '0'],
      ['-ms-flex', '0 2px'],
      ['flex', '0 2px']
    ]);

    expect(prefix('flex', '1')).toEqual([
      ['-webkit-box-flex', '1'],
      ['-ms-flex', '1'],
      ['flex', '1']
    ]);

    expect(prefix('flex', 'auto')).toEqual([
      ['-webkit-box-flex', 1],
      ['-ms-flex', 'auto'],
      ['flex', 'auto']
    ]);

    expect(prefix('flex', 'none')).toEqual([
      ['-webkit-box-flex', 0],
      ['-ms-flex', 'none'],
      ['flex', 'none']
    ]);

    expect(prefix('flex', 'initial')).toEqual([
      ['-webkit-box-flex', 'initial'],
      ['-ms-flex', 'initial'],
      ['flex', 'initial']
    ]);
  });

  test('align-content', () => {
    expect(prefix('align-content', 'flex-end')).toEqual([
      ['-ms-flex-line-pack', 'end'],
      ['align-content', 'flex-end']
    ]);

    expect(prefix('align-content', 'flex-start')).toEqual([
      ['-ms-flex-line-pack', 'start'],
      ['align-content', 'flex-start']
    ]);

    expect(prefix('align-content', 'space-between')).toEqual([
      ['-ms-flex-line-pack', 'justify'],
      ['align-content', 'space-between']
    ]);

    expect(prefix('align-content', 'space-around')).toEqual([
      ['-ms-flex-line-pack', 'distribute'],
      ['align-content', 'space-around']
    ]);

    expect(prefix('align-content', 'center')).toEqual([
      ['-ms-flex-line-pack', 'center'],
      ['align-content', 'center']
    ]);
  });

  test('justify-content', () => {
    expect(prefix('justify-content', 'flex-end')).toEqual([
      ['-webkit-box-pack', 'end'],
      ['-ms-flex-pack', 'end'],
      ['justify-content', 'flex-end']
    ]);

    expect(prefix('justify-content', 'flex-start')).toEqual([
      ['-webkit-box-pack', 'start'],
      ['-ms-flex-pack', 'start'],
      ['justify-content', 'flex-start']
    ]);

    expect(prefix('justify-content', 'space-between')).toEqual([
      ['-webkit-box-pack', 'justify'],
      ['-ms-flex-pack', 'justify'],
      ['justify-content', 'space-between']
    ]);

    expect(prefix('justify-content', 'space-around')).toEqual([
      ['-ms-flex-pack', 'distribute'],
      ['justify-content', 'space-around']
    ]);

    expect(prefix('justify-content', 'center')).toEqual([
      ['-webkit-box-pack', 'center'],
      ['-ms-flex-pack', 'center'],
      ['justify-content', 'center']
    ]);
  });

  test('align-self', () => {
    expect(prefix('align-self', 'flex-start')).toEqual([
      ['-ms-flex-item-align', 'start'],
      ['align-self', 'flex-start']
    ]);

    expect(prefix('align-self', 'flex-end')).toEqual([
      ['-ms-flex-item-align', 'end'],
      ['align-self', 'flex-end']
    ]);

    expect(prefix('align-self', 'baseline')).toEqual([
      ['-ms-flex-item-align', 'baseline'],
      ['align-self', 'baseline']
    ]);

    expect(prefix('align-self', 'stretch')).toEqual([
      ['-ms-flex-item-align', 'stretch'],
      ['-ms-grid-row-align', 'stretch'],
      ['align-self', 'stretch']
    ]);

    expect(prefix('align-self', 'auto')).toEqual([
      ['-ms-flex-item-align', 'auto'],
      ['-ms-grid-row-align', 'auto'],
      ['align-self', 'auto']
    ]);
  });

  test('align-items', () => {
    expect(prefix('align-items', 'flex-start')).toEqual([
      ['-webkit-box-align', 'start'],
      ['-ms-flex-align', 'start'],
      ['align-items', 'flex-start']
    ]);

    expect(prefix('align-items', 'flex-end')).toEqual([
      ['-webkit-box-align', 'end'],
      ['-ms-flex-align', 'end'],
      ['align-items', 'flex-end']
    ]);

    expect(prefix('align-items', 'baseline')).toEqual([
      ['-webkit-box-align', 'baseline'],
      ['-ms-flex-align', 'baseline'],
      ['align-items', 'baseline']
    ]);

    expect(prefix('align-items', 'stretch')).toEqual([
      ['-webkit-box-align', 'stretch'],
      ['-ms-flex-align', 'stretch'],
      ['align-items', 'stretch']
    ]);

    expect(prefix('align-items', 'center')).toEqual([
      ['-webkit-box-align', 'center'],
      ['-ms-flex-align', 'center'],
      ['align-items', 'center']
    ]);
  });

  test('flex-basis', () => {
    expect(prefix('flex-basis', 'auto')).toEqual([
      ['-ms-flex-preferred-size', 'auto'],
      ['flex-basis', 'auto']
    ]);

    expect(prefix('flex-basis', '0')).toEqual([
      ['-ms-flex-preferred-size', '0'],
      ['flex-basis', '0']
    ]);

    expect(prefix('flex-basis', '47px')).toEqual([
      ['-ms-flex-preferred-size', '47px'],
      ['flex-basis', '47px']
    ]);
  });

  test('flex-direction', () => {
    expect(prefix('flex-direction', 'auto')).toEqual([
      ['-webkit-box-orient', 'vertical'],
      ['-webkit-box-direction', 'normal'],
      ['-ms-flex-direction', 'auto'],
      ['flex-direction', 'auto']
    ]);

    expect(prefix('flex-direction', 'row')).toEqual([
      ['-webkit-box-orient', 'horizontal'],
      ['-webkit-box-direction', 'normal'],
      ['-ms-flex-direction', 'row'],
      ['flex-direction', 'row']
    ]);

    expect(prefix('flex-direction', 'column')).toEqual([
      ['-webkit-box-orient', 'vertical'],
      ['-webkit-box-direction', 'normal'],
      ['-ms-flex-direction', 'column'],
      ['flex-direction', 'column']
    ]);

    expect(prefix('flex-direction', 'row-reverse')).toEqual([
      ['-webkit-box-orient', 'horizontal'],
      ['-webkit-box-direction', 'reverse'],
      ['-ms-flex-direction', 'row-reverse'],
      ['flex-direction', 'row-reverse']
    ]);

    expect(prefix('flex-direction', 'column-reverse')).toEqual([
      ['-webkit-box-orient', 'vertical'],
      ['-webkit-box-direction', 'reverse'],
      ['-ms-flex-direction', 'column-reverse'],
      ['flex-direction', 'column-reverse']
    ]);
  });

  test('flex-wrap', () => {
    expect(prefix('flex-wrap', 'nowrap')).toEqual([
      ['-ms-flex-wrap', 'nowrap'],
      ['flex-wrap', 'nowrap']
    ]);

    expect(prefix('flex-wrap', 'wrap')).toEqual([
      ['-ms-flex-wrap', 'wrap'],
      ['flex-wrap', 'wrap']
    ]);

    expect(prefix('flex-wrap', 'wrap-reverse')).toEqual([
      ['-ms-flex-wrap', 'wrap-reverse'],
      ['flex-wrap', 'wrap-reverse']
    ]);
  });

  test('flex-grow', () => {
    expect(prefix('flex-grow', 0)).toEqual([
      ['-webkit-box-flex', 0],
      ['-ms-flex-positive', 0],
      ['flex-grow', 0]
    ]);

    expect(prefix('flex-grow', '1')).toEqual([
      ['-webkit-box-flex', '1'],
      ['-ms-flex-positive', '1'],
      ['flex-grow', '1']
    ]);
  });

  test('flex-shrink', () => {
    expect(prefix('flex-shrink', 0)).toEqual([
      ['-ms-flex-negative', 0],
      ['flex-shrink', 0]
    ]);

    expect(prefix('flex-shrink', '1')).toEqual([
      ['-ms-flex-negative', '1'],
      ['flex-shrink', '1']
    ]);
  });

  test('flex-flow', () => {
    expect(prefix('flex-flow', 'row nowrap')).toEqual([
      ['-webkit-box-orient', 'horizontal'],
      ['-webkit-box-direction', 'normal'],
      ['-ms-flex-flow', 'row nowrap'],
      ['flex-flow', 'row nowrap']
    ]);

    expect(prefix('flex-flow', 'row wrap')).toEqual([
      ['-webkit-box-orient', 'horizontal'],
      ['-webkit-box-direction', 'normal'],
      ['-ms-flex-flow', 'row wrap'],
      ['flex-flow', 'row wrap']
    ]);

    expect(prefix('flex-flow', 'row wrap-reverse')).toEqual([
      ['-webkit-box-orient', 'horizontal'],
      ['-webkit-box-direction', 'normal'],
      ['-ms-flex-flow', 'row wrap-reverse'],
      ['flex-flow', 'row wrap-reverse']
    ]);

    expect(prefix('flex-flow', 'column nowrap')).toEqual([
      ['-webkit-box-orient', 'vertical'],
      ['-webkit-box-direction', 'normal'],
      ['-ms-flex-flow', 'column nowrap'],
      ['flex-flow', 'column nowrap']
    ]);

    expect(prefix('flex-flow', 'column wrap')).toEqual([
      ['-webkit-box-orient', 'vertical'],
      ['-webkit-box-direction', 'normal'],
      ['-ms-flex-flow', 'column wrap'],
      ['flex-flow', 'column wrap']
    ]);

    expect(prefix('flex-flow', 'column wrap-reverse')).toEqual([
      ['-webkit-box-orient', 'vertical'],
      ['-webkit-box-direction', 'normal'],
      ['-ms-flex-flow', 'column wrap-reverse'],
      ['flex-flow', 'column wrap-reverse']
    ]);

    expect(prefix('flex-flow', 'row-reverse nowrap')).toEqual([
      ['-webkit-box-orient', 'horizontal'],
      ['-webkit-box-direction', 'reverse'],
      ['-ms-flex-flow', 'row-reverse nowrap'],
      ['flex-flow', 'row-reverse nowrap']
    ]);

    expect(prefix('flex-flow', 'row-reverse wrap')).toEqual([
      ['-webkit-box-orient', 'horizontal'],
      ['-webkit-box-direction', 'reverse'],
      ['-ms-flex-flow', 'row-reverse wrap'],
      ['flex-flow', 'row-reverse wrap']
    ]);

    expect(prefix('flex-flow', 'row-reverse wrap-reverse')).toEqual([
      ['-webkit-box-orient', 'horizontal'],
      ['-webkit-box-direction', 'reverse'],
      ['-ms-flex-flow', 'row-reverse wrap-reverse'],
      ['flex-flow', 'row-reverse wrap-reverse']
    ]);

    expect(prefix('flex-flow', 'column-reverse nowrap')).toEqual([
      ['-webkit-box-orient', 'vertical'],
      ['-webkit-box-direction', 'reverse'],
      ['-ms-flex-flow', 'column-reverse nowrap'],
      ['flex-flow', 'column-reverse nowrap']
    ]);

    expect(prefix('flex-flow', 'column-reverse wrap')).toEqual([
      ['-webkit-box-orient', 'vertical'],
      ['-webkit-box-direction', 'reverse'],
      ['-ms-flex-flow', 'column-reverse wrap'],
      ['flex-flow', 'column-reverse wrap']
    ]);

    expect(prefix('flex-flow', 'column-reverse wrap-reverse')).toEqual([
      ['-webkit-box-orient', 'vertical'],
      ['-webkit-box-direction', 'reverse'],
      ['-ms-flex-flow', 'column-reverse wrap-reverse'],
      ['flex-flow', 'column-reverse wrap-reverse']
    ]);
  });

  test('order', () => {
    expect(prefix('order', 0)).toEqual([
      ['-webkit-box-ordinal-group', 1],
      ['-ms-flex-order', 0],
      ['order', 0]
    ]);

    expect(prefix('order', '1')).toEqual([
      ['-webkit-box-ordinal-group', 2],
      ['-ms-flex-order', '1'],
      ['order', '1']
    ]);

    expect(prefix('order', 'initial')).toEqual([
      ['-webkit-box-ordinal-group', 'initial'],
      ['-ms-flex-order', 'initial'],
      ['order', 'initial']
    ]);
  });

  test('appearance', () => {
    expect(prefix('appearance', 'none')).toEqual([
      ['-webkit-appearance', 'none'],
      ['-moz-appearance', 'none'],
      ['appearance', 'none']
    ]);

    expect(prefix('appearance', 'text-field')).toEqual([
      ['-webkit-appearance', 'text-field'],
      ['-moz-appearance', 'text-field'],
      ['appearance', 'text-field']
    ]);
  });

  test('writing-mode', () => {
    expect(prefix('writing-mode', 'horizontal-tb')).toEqual([
      ['-webkit-writing-mode', 'horizontal-tb'],
      ['-ms-writing-mode', 'lr-tb'],
      ['writing-mode', 'horizontal-tb']
    ]);

    expect(prefix('writing-mode', 'vertical-lr')).toEqual([
      ['-webkit-writing-mode', 'vertical-lr'],
      ['-ms-writing-mode', 'tb-lr'],
      ['writing-mode', 'vertical-lr']
    ]);

    expect(prefix('writing-mode', 'vertical-rl')).toEqual([
      ['-webkit-writing-mode', 'vertical-rl'],
      ['-ms-writing-mode', 'tb-rl'],
      ['writing-mode', 'vertical-rl']
    ]);
  });

  test('animation-*', () => {
    expect(prefix('animation', 'myanimation 5s infinite')).toEqual([
      ['-webkit-animation', 'myanimation 5s infinite'],
      ['animation', 'myanimation 5s infinite']
    ]);

    expect(prefix('animation-delay', '2s')).toEqual([
      ['-webkit-animation-delay', '2s'],
      ['animation-delay', '2s']
    ]);

    expect(prefix('animation-direction', 'alternate')).toEqual([
      ['-webkit-animation-direction', 'alternate'],
      ['animation-direction', 'alternate']
    ]);

    expect(prefix('animation-duration', '3s')).toEqual([
      ['-webkit-animation-duration', '3s'],
      ['animation-duration', '3s']
    ]);

    expect(prefix('animation-fill-mode', 'forwards')).toEqual([
      ['-webkit-animation-fill-mode', 'forwards'],
      ['animation-fill-mode', 'forwards']
    ]);

    expect(prefix('animation-iteration-count', '2')).toEqual([
      ['-webkit-animation-iteration-count', '2'],
      ['animation-iteration-count', '2']
    ]);

    expect(prefix('animation-name', 'someanimation')).toEqual([
      ['-webkit-animation-name', 'someanimation'],
      ['animation-name', 'someanimation']
    ]);

    expect(prefix('animation-play-state', 'paused')).toEqual([
      ['-webkit-animation-play-state', 'paused'],
      ['animation-play-state', 'paused']
    ]);

    expect(prefix('animation-timing-function', 'linear')).toEqual([
      ['-webkit-animation-timing-function', 'linear'],
      ['animation-timing-function', 'linear']
    ]);
  });

  test('text-emphasis-*', () => {
    expect(prefix('text-emphasis', 'filled purple')).toEqual([
      ['-webkit-text-emphasis', 'filled purple'],
      ['text-emphasis', 'filled purple']
    ]);

    expect(prefix('text-emphasis-style', 'filled')).toEqual([
      ['-webkit-text-emphasis-style', 'filled'],
      ['text-emphasis-style', 'filled']
    ]);

    expect(prefix('text-emphasis-color', 'purple')).toEqual([
      ['-webkit-text-emphasis-color', 'purple'],
      ['text-emphasis-color', 'purple']
    ]);

    expect(prefix('text-emphasis-position', 'over right')).toEqual([
      ['-webkit-text-emphasis-position', 'over right'],
      ['text-emphasis-position', 'over right']
    ]);
  });

  test('mask-border-*', () => {
    expect(prefix('mask-border', 'none')).toEqual([
      ['-webkit-mask-box-image', 'none'],
      ['mask-border', 'none']
    ]);

    expect(prefix('mask-border-outset', 'none')).toEqual([
      ['-webkit-mask-box-image-outset', 'none'],
      ['mask-border-outset', 'none']
    ]);

    expect(prefix('mask-border-source', 'none')).toEqual([
      ['-webkit-mask-box-image-source', 'none'],
      ['mask-border-source', 'none']
    ]);

    expect(prefix('mask-border-mode', 'none')).toEqual([
      ['-webkit-mask-box-image-mode', 'none'],
      ['mask-border-mode', 'none']
    ]);

    expect(prefix('mask-border-slice', 'none')).toEqual([
      ['-webkit-mask-box-image-slice', 'none'],
      ['mask-border-slice', 'none']
    ]);

    expect(prefix('mask-border-width', 'none')).toEqual([
      ['-webkit-mask-box-image-width', 'none'],
      ['mask-border-width', 'none']
    ]);

    expect(prefix('mask-border-repeat', 'none')).toEqual([
      ['-webkit-mask-box-image-repeat', 'none'],
      ['mask-border-repeat', 'none']
    ]);
  });

  test('mask-*', () => {
    expect(prefix('mask', 'none')).toEqual([
      ['-webkit-mask', 'none'],
      ['mask', 'none']
    ]);

    expect(prefix('mask-image', 'none')).toEqual([
      ['-webkit-mask-image', 'none'],
      ['mask-image', 'none']
    ]);

    expect(prefix('mask-mode', 'none')).toEqual([
      ['-webkit-mask-mode', 'none'],
      ['mask-mode', 'none']
    ]);

    expect(prefix('mask-repeat', 'none')).toEqual([
      ['-webkit-mask-repeat', 'none'],
      ['mask-repeat', 'none']
    ]);

    expect(prefix('mask-position', 'none')).toEqual([
      ['-webkit-mask-position', 'none'],
      ['mask-position', 'none']
    ]);

    expect(prefix('mask-clip', 'none')).toEqual([
      ['-webkit-mask-clip', 'none'],
      ['mask-clip', 'none']
    ]);

    expect(prefix('mask-origin', 'none')).toEqual([
      ['-webkit-mask-origin', 'none'],
      ['mask-origin', 'none']
    ]);

    expect(prefix('mask-size', 'none')).toEqual([
      ['-webkit-mask-size', 'none'],
      ['mask-size', 'none']
    ]);

    expect(prefix('mask-composite', 'none')).toEqual([
      ['-webkit-mask-composite', 'none'],
      ['mask-composite', 'none']
    ]);

    expect(prefix('mask-type', 'none')).toEqual([
      ['-webkit-mask-type', 'none'],
      ['mask-type', 'none']
    ]);
  });

  test('2D/3D transforms', () => {
    expect(prefix('transform', 'rotate(47deg)')).toEqual([
      ['-webkit-transform', 'rotate(47deg)'],
      ['transform', 'rotate(47deg)']
    ]);

    expect(prefix('transform-origin', '10% 20%')).toEqual([
      ['-webkit-transform-origin', '10% 20%'],
      ['transform-origin', '10% 20%']
    ]);

    expect(prefix('transform-origin-x', '10%')).toEqual([
      ['-webkit-transform-origin-x', '10%'],
      ['transform-origin-x', '10%']
    ]);

    expect(prefix('transform-origin-y', '20%')).toEqual([
      ['-webkit-transform-origin-y', '20%'],
      ['transform-origin-y', '20%']
    ]);

    expect(prefix('backface-visibility', 'visible')).toEqual([
      ['-webkit-backface-visibility', 'visible'],
      ['backface-visibility', 'visible']
    ]);

    expect(prefix('perspective', '500px')).toEqual([
      ['-webkit-perspective', '500px'],
      ['perspective', '500px']
    ]);

    expect(prefix('perspective-origin', '10% 20%')).toEqual([
      ['-webkit-perspective-origin', '10% 20%'],
      ['perspective-origin', '10% 20%']
    ]);

    expect(prefix('transform-style', 'preserve-3d')).toEqual([
      ['-webkit-transform-style', 'preserve-3d'],
      ['transform-style', 'preserve-3d']
    ]);

    expect(prefix('transform-origin-z', '30%')).toEqual([
      ['-webkit-transform-origin-z', '30%'],
      ['transform-origin-z', '30%']
    ]);
  });

  test('box-decoration-break', () => {
    expect(prefix('box-decoration-break', 'slice')).toEqual([
      ['-webkit-box-decoration-break', 'slice'],
      ['box-decoration-break', 'slice']
    ]);
  });

  test('text-decoration-*', () => {
    expect(prefix('text-decoration-line', 'overline')).toEqual([
      ['-webkit-text-decoration-line', 'overline'],
      ['text-decoration-line', 'overline']
    ]);

    expect(prefix('text-decoration-style', 'wavy')).toEqual([
      ['-webkit-text-decoration-style', 'wavy'],
      ['text-decoration-style', 'wavy']
    ]);

    expect(prefix('text-decoration-color', 'red')).toEqual([
      ['-webkit-text-decoration-color', 'red'],
      ['text-decoration-color', 'red']
    ]);

    expect(prefix('text-decoration-skip', 'ink')).toEqual([
      ['-webkit-text-decoration-skip', 'ink'],
      ['text-decoration-skip', 'ink']
    ]);
  });

  test('user-select', () => {
    expect(prefix('user-select', 'none')).toEqual([
      ['-webkit-user-select', 'none'],
      ['-moz-user-select', 'none'],
      ['-ms-user-select', 'none'],
      ['user-select', 'none']
    ]);
  });

  test('shape-image-*', () => {
    expect(prefix('shape-image-threshold', '0.7')).toEqual([
      ['-webkit-shape-image-threshold', '0.7'],
      ['shape-image-threshold', '0.7']
    ]);
  });

  test('font-feature-settings', () => {
    expect(prefix('font-feature-settings', '"smcp" on')).toEqual([
      ['-webkit-font-feature-settings', '"smcp" on'],
      ['font-feature-settings', '"smcp" on']
    ]);
  });

  test('columns', () => {
    expect(prefix('columns', '12em auto')).toEqual([
      ['-webkit-columns', '12em auto'],
      ['columns', '12em auto']
    ]);

    expect(prefix('column-rule', '1em solid black')).toEqual([
      ['-webkit-column-rule', '1em solid black'],
      ['column-rule', '1em solid black']
    ]);

    expect(prefix('column-width', '45px')).toEqual([
      ['-webkit-column-width', '45px'],
      ['column-width', '45px']
    ]);

    expect(prefix('column-gap', '0')).toEqual([
      ['-webkit-column-gap', '0'],
      ['column-gap', '0']
    ]);

    expect(prefix('column-count', '3')).toEqual([
      ['-webkit-column-count', '3'],
      ['column-count', '3']
    ]);

    expect(prefix('column-rule-width', '1em')).toEqual([
      ['-webkit-column-rule-width', '1em'],
      ['column-rule-width', '1em']
    ]);

    expect(prefix('column-rule-style', 'solid')).toEqual([
      ['-webkit-column-rule-style', 'solid'],
      ['column-rule-style', 'solid']
    ]);

    expect(prefix('column-rule-color', 'black')).toEqual([
      ['-webkit-column-rule-color', 'black'],
      ['column-rule-color', 'black']
    ]);

    expect(prefix('column-fill', 'balance')).toEqual([
      ['-webkit-column-fill', 'balance'],
      ['column-fill', 'balance']
    ]);

    expect(prefix('column-span', 'all')).toEqual([
      ['-webkit-column-span', 'all'],
      ['column-span', 'all']
    ]);
  });

  test('tab-size', () => {
    expect(prefix('tab-size', '16')).toEqual([
      ['-moz-tab-size', '16'],
      ['tab-size', '16']
    ]);
  });

  test('hyphens', () => {
    expect(prefix('hyphens', 'auto')).toEqual([
      ['-webkit-hyphens', 'auto'],
      ['-ms-hyphens', 'auto'],
      ['hyphens', 'auto']
    ]);
  });

  test('text-orientation', () => {
    expect(prefix('text-orientation', 'mixed')).toEqual([
      ['-webkit-text-orientation', 'mixed'],
      ['text-orientation', 'mixed']
    ]);
  });

  test('regions', () => {
    expect(prefix('flow-into', 'main')).toEqual([
      ['-webkit-flow-into', 'main'],
      ['-ms-flow-into', 'main'],
      ['flow-into', 'main']
    ]);

    expect(prefix('flow-from', 'main')).toEqual([
      ['-webkit-flow-from', 'main'],
      ['-ms-flow-from', 'main'],
      ['flow-from', 'main']
    ]);

    expect(prefix('break-before', 'always')).toEqual([
      ['-webkit-break-before', 'always'],
      ['-ms-break-before', 'always'],
      ['break-before', 'always']
    ]);

    expect(prefix('break-after', 'left')).toEqual([
      ['-webkit-break-after', 'left'],
      ['-ms-break-after', 'left'],
      ['break-after', 'left']
    ]);

    expect(prefix('break-inside', 'avoid')).toEqual([
      ['-webkit-break-inside', 'avoid'],
      ['-ms-break-inside', 'avoid'],
      ['break-inside', 'avoid']
    ]);

    expect(prefix('region-fragment', 'break')).toEqual([
      ['-webkit-region-fragment', 'break'],
      ['-ms-region-fragment', 'break'],
      ['region-fragment', 'break']
    ]);
  });

  test('exclusions', () => {
    expect(prefix('wrap-flow', 'both')).toEqual([
      ['-webkit-wrap-flow', 'both'],
      ['wrap-flow', 'both']
    ]);

    expect(prefix('wrap-through', 'wrap')).toEqual([
      ['-webkit-wrap-through', 'wrap'],
      ['wrap-through', 'wrap']
    ]);

    expect(prefix('wrap-margin', '10px')).toEqual([
      ['-webkit-wrap-margin', '10px'],
      ['wrap-margin', '10px']
    ]);
  });

  test('text-size-adjust', () => {
    expect(prefix('text-size-adjust', 'none')).toEqual([
      ['-webkit-text-size-adjust', 'none'],
      ['-moz-text-size-adjust', 'none'],
      ['-ms-text-size-adjust', 'none'],
      ['text-size-adjust', 'none']
    ]);
  });

  test('clip-path', () => {
    expect(prefix('clip-path', 'none')).toEqual([
      ['-webkit-clip-path', 'none'],
      ['clip-path', 'none']
    ]);
  });

  test('filter', () => {
    expect(prefix('filter', 'blur(10px)')).toEqual([
      ['-webkit-filter', 'blur(10px)'],
      ['filter', 'blur(10px)']
    ]);
  });

  test('scroll-snap-*', () => {
    expect(prefix('scroll-snap-type', 'mandatory')).toEqual([
      ['-webkit-scroll-snap-type', 'mandatory'],
      ['-ms-scroll-snap-type', 'mandatory'],
      ['scroll-snap-type', 'mandatory']
    ]);
  });

  test('backdrop-filter', () => {
    expect(prefix('backdrop-filter', 'grayscale')).toEqual([
      ['-webkit-backdrop-filter', 'grayscale'],
      ['backdrop-filter', 'grayscale']
    ]);
  });

  test('font-kerning', () => {
    expect(prefix('font-kerning', 'normal')).toEqual([
      ['-webkit-font-kerning', 'normal'],
      ['font-kerning', 'normal']
    ]);
  });

  test('cross-fade', () => {
    expect(prefix('background', 'cross-fade(url(test.png))')).toEqual([
      ['background', '-webkit-cross-fade(url(test.png), 0.5)'],
      ['background', 'cross-fade(url(test.png))']
    ]);

    expect(prefix('background', 'cross-fade(47% url(test.png))')).toEqual([
      ['background', '-webkit-cross-fade(url(test.png), 47%)'],
      ['background', 'cross-fade(47% url(test.png))']
    ]);

    expect(
      prefix('background', 'cross-fade(47% url(test.png) url(test2.png))')
    ).toEqual([
      ['background', '-webkit-cross-fade(url(test.png) url(test2.png), 47%)'],
      ['background', 'cross-fade(47% url(test.png) url(test2.png))']
    ]);
  });

  test('cursor', () => {
    expect(prefix('cursor', 'pointer')).toEqual([['cursor', 'pointer']]);

    expect(prefix('cursor', 'grab')).toEqual([
      ['cursor', '-webkit-grab'],
      ['cursor', 'grab']
    ]);

    expect(prefix('cursor', 'grabbing')).toEqual([
      ['cursor', '-webkit-grabbing'],
      ['cursor', 'grabbing']
    ]);

    expect(prefix('cursor', 'zoom-in')).toEqual([
      ['cursor', '-webkit-zoom-in'],
      ['cursor', 'zoom-in']
    ]);

    expect(prefix('cursor', 'zoom-out')).toEqual([
      ['cursor', '-webkit-zoom-out'],
      ['cursor', 'zoom-out']
    ]);
  });

  test('image-set', () => {
    expect(
      prefix('background', 'image-set(url(test.jpg) 1x, url(test2.jpg) 2x)')
    ).toEqual([
      ['background', '-webkit-image-set(url(test.jpg) 1x, url(test2.jpg) 2x)'],
      ['background', 'image-set(url(test.jpg) 1x, url(test2.jpg) 2x)']
    ]);
  });

  test('position: sticky', () => {
    expect(prefix('position', 'sticky')).toEqual([
      ['position', '-webkit-sticky'],
      ['position', 'sticky']
    ]);
  });

  test('intrinsic sizing', () => {
    expect(prefix('width', 'min-content')).toEqual([
      ['width', '-webkit-min-content'],
      ['width', '-moz-min-content'],
      ['width', 'min-content']
    ]);

    expect(prefix('height', 'max-content')).toEqual([
      ['height', '-webkit-max-content'],
      ['height', '-moz-max-content'],
      ['height', 'max-content']
    ]);

    expect(prefix('max-width', 'fill-available')).toEqual([
      ['max-width', '-webkit-fill-available'],
      ['max-width', '-moz-fill-available'],
      ['max-width', 'fill-available']
    ]);

    expect(prefix('max-height', 'fit-content')).toEqual([
      ['max-height', '-webkit-fit-content'],
      ['max-height', '-moz-fit-content'],
      ['max-height', 'fit-content']
    ]);

    expect(prefix('min-height', 'initial')).toEqual([
      ['min-height', 'initial']
    ]);
  });

  test(':fullscreen', () => {
    expect(prefix('&:fullscreen', null)).toEqual([
      ['&:-webkit-full-screen', null],
      ['&:-moz-full-screen', null],
      ['&:-ms-fullscreen', null],
      ['&:fullscreen', null]
    ]);
  });

  test('::placeholder', () => {
    expect(prefix('&::placeholder', null)).toEqual([
      ['&::-webkit-input-placeholder', null],
      ['&:-ms-input-placeholder', null],
      ['&::-ms-input-placeholder', null],
      ['&::placeholder', null]
    ]);
  });
});
