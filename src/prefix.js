const webkit = '-webkit-';
const moz = '-moz-';
const ms = '-ms-';
const full = 'full';
const screen = 'screen';
const placeholder = 'placeholder';

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
  if (key === 'box-sizing') {
    return [
      [webkit + key, val],
      [key, val]
    ];
  }

  if (key === 'display' && val === 'flex') {
    return [
      [key, webkit + 'box'],
      [key, ms + 'flexbox'],
      [key, val]
    ];
  }

  if (key === 'flex') {
    const parts = (''+val).split(' ');
    const wkFlex = parts[0] === 'none' ? 0 : parts[0] === 'auto' ? 1 : parts[0];
    const msFlex = (parts.length === 3 && parts[2] === '0') ? val + 'px' : val;
    return [
      [webkit + 'box-' + key, wkFlex],
      [ms + key, msFlex],
      [key, val]
    ];
  }

  if (key === 'align-content') {
    return [
      [ms + 'flex-line-pack', oldFlexAlignment[val] || val],
      [key, val]
    ];
  }

  if (key === 'justify-content') {
    return [
      val !== 'space-around' && [webkit + 'box-pack', oldFlexAlignment[val] || val],
      [ms + 'flex-pack', oldFlexAlignment[val] || val],
      [key, val]
    ];
  }

  if (key === 'align-self') {
    return [
      [ms + 'flex-item-align', oldFlexAlignment[val] || val],
      val !== 'flex-start' && val !== 'flex-end' && val !== 'baseline'
        && [ms + 'grid-row-align', oldFlexAlignment[val] || val],
      [key, val]
    ];
  }

  if (key === 'align-items') {
    return [
      [webkit + 'box-align', oldFlexAlignment[val] || val],
      [ms + 'flex-align', oldFlexAlignment[val] || val],
      [key, val]
    ];
  }

  if (key === 'flex-basis') {
    return [
      [ms + 'flex-preferred-size', val],
      [key, val]
    ];
  }

  if (key === 'flex-direction') {
    return [
      [webkit + 'box-orient', val.indexOf('row') > -1 ? 'horizontal' : 'vertical'],
      [webkit + 'box-direction', val.indexOf('reverse') > -1 ? 'reverse' : 'normal'],
      [ms + key, val],
      [key, val]
    ];
  }

  if (key === 'flex-wrap') {
    return [
      [ms + key, val],
      [key, val]
    ];
  }

  if (key === 'flex-grow') {
    return [
      [webkit + 'box-flex', val],
      [ms + 'flex-positive', val],
      [key, val]
    ];
  }

  if (key === 'flex-shrink') {
    return [
      [ms + 'flex-negative', val],
      [key, val]
    ];
  }

  if (key === 'flex-flow') {
    const v0 = (val+'').split(' ')[0] || '';
    return [
      [webkit + 'box-orient', v0.indexOf('row') > -1 ? 'horizontal' : 'vertical'],
      [webkit + 'box-direction', v0.indexOf('reverse') > -1 ? 'reverse' : 'normal'],
      [ms + key, val],
      [key, val]
    ];
  }

  if (key === 'order') {
    const v0 = /[0-9]/.test(val) ? (+val || 0) + 1 : val;
    return [
      [webkit + 'box-ordinal-group', v0],
      [ms + 'flex-order', val],
      [key, val]
    ];
  }

  if (key === 'appearance') {
    return [
      [webkit + key, val],
      [moz + key, val],
      [key, val]
    ];
  }

  if (key === 'writing-mode') {
    return [
      [webkit + key, val],
      [ms + key, writingMode[val] || val],
      [key, val]
    ];
  }

  if (/^animation/.test(key)) {
    return [
      [webkit + key, val],
      [key, val]
    ];
  }

  if (key === '&:' + full + screen) {
    return [
      ['&:' + webkit + full + '-' + screen, val],
      ['&:' + moz + full + '-' + screen, val],
      ['&:' + ms + full + screen, val],
      [key, val]
    ];
  }

  if (key === '&::' + placeholder) {
    return [
      ['&::' + webkit + 'input-' + placeholder, val],
      ['&:' + ms + 'input-' + placeholder, val],
      ['&::' + ms + 'input-' + placeholder, val],
      [key, val]
    ];
  }

  return [ [key, val] ];
}
