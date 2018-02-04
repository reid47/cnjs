const oldFlexAlignment = {
  'flex-start': 'start',
  'flex-end': 'end',
  'space-between': 'justify',
  'space-around': 'distribute'
};

const writingMode = {
  'horizontal-tb': 'lr-tb',
  'vertical-lr': 'tb-lr',
  'vertical-rl': 'tb-rl'
};

export const prefix = (key, val) => {
  if (key === 'display' && val === 'flex') {
    return [
      ['display', '-webkit-box'],
      ['display', '-ms-flexbox'],
      ['display', 'flex']
    ];
  }

  if (key === 'flex') {
    const parts = (''+val).split(' ');
    const wkFlex = parts[0] === 'none' ? 0 : parts[0] === 'auto' ? 1 : parts[0];
    const msFlex = (parts.length === 3 && parts[2] === '0') ? val + 'px' : val;
    return [
      ['-webkit-box-flex', wkFlex],
      ['-ms-flex', msFlex],
      ['flex', val]
    ];
  }

  if (key === 'align-content') {
    return [
      ['-ms-flex-line-pack', oldFlexAlignment[val] || val],
      ['align-content', val]
    ];
  }

  if (key === 'justify-content') {
    return [
      val !== 'space-around' && ['-webkit-box-pack', oldFlexAlignment[val] || val],
      ['-ms-flex-pack', oldFlexAlignment[val] || val],
      ['justify-content', val]
    ];
  }

  if (key === 'align-self') {
    return [
      ['-ms-flex-item-align', oldFlexAlignment[val] || val],
      val !== 'flex-start' && val !== 'flex-end' && val !== 'baseline'
        && ['-ms-grid-row-align', oldFlexAlignment[val] || val],
      ['align-self', val]
    ];
  }

  if (key === 'align-items') {
    return [
      ['-webkit-box-align', oldFlexAlignment[val] || val],
      ['-ms-flex-align', oldFlexAlignment[val] || val],
      ['align-items', val]
    ];
  }

  if (key === 'flex-basis') {
    return [
      ['-ms-flex-preferred-size', val],
      ['flex-basis', val]
    ];
  }

  if (key === 'flex-direction') {
    return [
      ['-webkit-box-orient', val.indexOf('row') > -1 ? 'horizontal' : 'vertical'],
      ['-webkit-box-direction', val.indexOf('reverse') > -1 ? 'reverse' : 'normal'],
      ['-ms-flex-direction', val],
      ['flex-direction', val]
    ];
  }

  if (key === 'flex-wrap') {
    return [
      ['-ms-flex-wrap', val],
      ['flex-wrap', val]
    ];
  }

  if (key === 'flex-grow') {
    return [
      ['-webkit-box-flex', val],
      ['-ms-flex-positive', val],
      ['flex-grow', val]
    ];
  }

  if (key === 'flex-shrink') {
    return [
      ['-ms-flex-negative', val],
      ['flex-shrink', val]
    ];
  }

  if (key === 'flex-flow') {
    const v0 = (val+'').split(' ')[0] || '';
    return [
      ['-webkit-box-orient', v0.indexOf('row') > -1 ? 'horizontal' : 'vertical'],
      ['-webkit-box-direction', v0.indexOf('reverse') > -1 ? 'reverse' : 'normal'],
      ['-ms-flex-flow', val],
      ['flex-flow', val]
    ];
  }

  if (key === 'order') {
    const v0 = /[0-9]/.test(val) ? (+val || 0) + 1 : val;
    return [
      ['-webkit-box-ordinal-group', v0],
      ['-ms-flex-order', val],
      ['order', val]
    ];
  }

  if (key === 'appearance') {
    return [
      ['-webkit-appearance', val],
      ['-moz-appearance', val],
      ['appearance', val]
    ];
  }

  if (key === 'writing-mode') {
    return [
      ['-webkit-writing-mode', val],
      ['-ms-writing-mode', writingMode[val] || val],
      ['writing-mode', val]
    ];
  }

  if (key === '&:fullscreen') {
    return [
      ['&:-webkit-full-screen', val],
      ['&:-moz-full-screen', val],
      ['&:-ms-fullscreen', val],
      ['&:fullscreen', val]
    ];
  }

  return [ [key, val] ];
}

// TODO?
// animation
// block-logical
// border-image
// break-props
// cross-fade
// filter-value
// filter
// fullscreen
// gradient
// image-rendering
// image-set
// inline-logical
// intrinsic
// mask-border
// pixelated
// placeholder
// text-emphasis-position
// transform-decl

// text-decoration
// display-grid
// grid-area
// grid-column-align
// grid-end
// grid-row-align
// grid-row-column
// grid-rows-columns
// grid-shorthand
// grid-start
// grid-template-areas
// grid-template

// DONE!
// background-size (not needed, supported)
// appearance
// display-flex
// flex
// align-content
// justify-content
// align-items
// align-self
// flex-basis
// flex-direction
// flex-wrap
// flex-grow
// flex-shrink
// flex-flow
// order
// writing-mode
