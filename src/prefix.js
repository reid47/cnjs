const webkit = '-webkit-';
const moz = '-moz-';
const ms = '-ms-';

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

const prefixedCursors = {
  'zoom-in': 1,
  'zoom-out': 1,
  'grab': 1,
  'grabbing': 1
};

const intrinsicSizingProps = {
  'max-height': true,
  'max-width': true,
  'width': true,
  'height': true,
  'min-width': true,
  'min-height': true
};

const intrinsicSizingVals = {
  "min-content": true,
  "max-content": true,
  "fill-available": true,
  "fit-content": true,
  "contain-floats": true
};

export const prefix = (key, val) => {
  if (key === 'display' && (val === 'flex' || val === 'inline-flex')) {
    const infix = val === 'inline-flex' ? 'inline-' : '';
    return [
      [ key, webkit + infix + 'box' ],
      [ key, ms + infix + 'flexbox' ],
      [ key, val ]
    ];
  }

  if (key === 'flex') {
    const parts = ('' + val).split(' ');
    const wkFlex = parts[0] === 'none' ? 0 : parts[0] === 'auto' ? 1 : parts[0];
    const msFlex = (parts.length === 3 && parts[2] === '0') ? val + 'px' : val;
    return [
      [ webkit + 'box-' + key, wkFlex ],
      [ ms + key, msFlex ],
      [ key, val ]
    ];
  }

  if (key === 'align-content') {
    return [
      [ ms + 'flex-line-pack', oldFlexAlignment[val] || val ],
      [ key, val ]
    ];
  }

  if (key === 'justify-content') {
    return [
      val !== 'space-around' && [ webkit + 'box-pack', oldFlexAlignment[val] || val ],
      [ ms + 'flex-pack', oldFlexAlignment[val] || val ],
      [ key, val ]
    ];
  }

  if (key === 'align-self') {
    return [
      [ ms + 'flex-item-align', oldFlexAlignment[val] || val ],
      val !== 'flex-start' && val !== 'flex-end' && val !== 'baseline'
        && [ ms + 'grid-row-align', oldFlexAlignment[val] || val ],
      [ key, val ]
    ];
  }

  if (key === 'align-items') {
    return [
      [ webkit + 'box-align', oldFlexAlignment[val] || val ],
      [ ms + 'flex-align', oldFlexAlignment[val] || val ],
      [ key, val ]
    ];
  }

  if (key === 'flex-basis') {
    return [
      [ ms + 'flex-preferred-size', val ],
      [ key, val ]
    ];
  }

  if (key === 'flex-direction') {
    return [
      [ webkit + 'box-orient', val.indexOf('row') > -1 ? 'horizontal' : 'vertical' ],
      [ webkit + 'box-direction', val.indexOf('reverse') > -1 ? 'reverse' : 'normal' ],
      [ ms + key, val ],
      [ key, val ]
    ];
  }

  if (key === 'flex-wrap') {
    return [
      [ ms + key, val ],
      [ key, val ]
    ];
  }

  if (key === 'flex-grow') {
    return [
      [ webkit + 'box-flex', val ],
      [ ms + 'flex-positive', val ],
      [ key, val ]
    ];
  }

  if (key === 'flex-shrink') {
    return [
      [ ms + 'flex-negative', val ],
      [ key, val ]
    ];
  }

  if (key === 'flex-flow') {
    const v0 = (val + '').split(' ')[0] || '';
    return [
      [ webkit + 'box-orient', v0.indexOf('row') > -1 ? 'horizontal' : 'vertical' ],
      [ webkit + 'box-direction', v0.indexOf('reverse') > -1 ? 'reverse' : 'normal' ],
      [ ms + key, val ],
      [ key, val ]
    ];
  }

  if (key === 'order') {
    const v0 = /[0-9]/.test(val) ? (+val || 0) + 1 : val;
    return [
      [ webkit + 'box-ordinal-group', v0 ],
      [ ms + 'flex-order', val ],
      [ key, val ]
    ];
  }

  if (key === 'appearance') {
    return [
      [ webkit + key, val ],
      [ moz + key, val ],
      [ key, val ]
    ];
  }

  if (key === 'writing-mode') {
    return [
      [ webkit + key, val ],
      [ ms + key, writingMode[val] || val ],
      [ key, val ]
    ];
  }

  if (/^mask-border/.test(key)) {
    return [
      [ webkit + key.replace('border', 'box-image'), val ],
      [ key, val ]
    ];
  }

  if (/^(box-sizing|font-feature-settings|animation|text-emphasis|mask|transform|backface-visibility|perspective|box-decoration-break|text-decoration-|text-orientation|backdrop-filter|font-kerning|clip-path|filter|shape-image)/.test(key)) {
    return [
      [ webkit + key, val ],
      [ key, val ]
    ];
  }

  if (key === 'columns'
    || key === 'column-rule'
    || key === 'column-count'
    || key === 'column-gap'
    || key === 'column-width'
    || key === 'column-span'
    || key === 'column-fill'
    || key === 'column-rule-width'
    || key === 'column-rule-style'
    || key === 'column-rule-color'
    || key === 'wrap-flow'
    || key === 'wrap-through'
    || key === 'wrap-margin') {
    return [
      [ webkit + key, val ],
      [ key, val ]
    ];
  }

  if (key === 'user-select' || key === 'text-size-adjust') {
    return [
      [ webkit + key, val ],
      [ moz + key, val ],
      [ ms + key, val ],
      [ key, val ]
    ];
  }

  if (key === 'tab-size') {
    return [
      [ moz + key, val ],
      [ key, val ]
    ];
  }

  if (/^(scroll-snap)/.test(key) || key === 'hyphens'
    || key === 'flow-into' || key === 'flow-from' || key === 'break-before'
    || key === 'break-after' || key === 'break-inside' || key === 'region-fragment') {
    return [
      [ webkit + key, val ],
      [ ms + key, val ],
      [ key, val ]
    ];
  }

  if ((''+val).indexOf('cross-fade') === 0) {
    let pct = (val.match(/\(([\d]+\%)/) || [])[1] || '';
    let wkVal = val.replace('cross-fade', '-webkit-cross-fade')
    if (pct) {
      wkVal = wkVal.replace(pct + ' ', '');
    } else {
      pct = '0.5';
    }

    const lastRParen = wkVal.lastIndexOf(')');
    if (lastRParen > -1) {
      wkVal = wkVal.substring(0, lastRParen) + `, ${pct})`;
    }

    return [
      [ key, wkVal ],
      [ key, val ]
    ];
  }

  if ((''+val).indexOf('image-set') > -1) {
    return [
      [ key, val.replace(/image-set/g, webkit + 'image-set') ],
      [ key, val ]
    ];
  }

  if ((key === 'cursor' && prefixedCursors[val])
    || (key === 'position' && val === 'sticky')) {
    return [
      [ key, webkit + val ],
      [ key, val ]
    ];
  }

  if (intrinsicSizingProps[key] && intrinsicSizingVals[val]) {
    return [
      [ key, webkit + val ],
      [ key, moz + val ],
      [ key, val ]
    ];
  }

  if (key === '&:fullscreen') {
    return [
      [ '&:' + webkit + 'full-screen', val ],
      [ '&:' + moz + 'full-screen', val ],
      [ '&:' + ms + 'fullscreen', val ],
      [ key, val ]
    ];
  }

  if (key === '&::placeholder') {
    return [
      [ '&::' + webkit + 'input-placeholder', val ],
      [ '&:' + ms + 'input-placeholder', val ],
      [ '&::' + ms + 'input-placeholder', val ],
      [ key, val ]
    ];
  }

  return [ [ key, val ] ];
};

// sketch of (possibly) faster version
// const cases = {
//   '&::placeholder': (key, val) => {
//     return [
//       ['&::' + webkit + 'input-placeholder', val],
//       ['&:' + ms + 'input-placeholder', val],
//       ['&::' + ms + 'input-placeholder', val],
//       [key, val]
//     ];
//   }
// };

// const prefix2 = (key, val) => {
//   if (typeof cases[key] === 'function') {
//     const ret = cases[key](key, val);
//     if (ret) return ret;
//   }

//   return [[key, val]];
// };
