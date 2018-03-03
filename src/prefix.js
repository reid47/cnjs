const webkit = '-webkit-';
const moz = '-moz-';
const ms = '-ms-';
const imageSet = 'image-set';

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

const intrinsicSizingProps = {
  'max-height': 1,
  'max-width': 1,
  width: 1,
  height: 1,
  'min-width': 1,
  'min-height': 1
};

const intrinsicSizingVals = {
  'min-content': 1,
  'max-content': 1,
  'fill-available': 1,
  'fit-content': 1,
  'contain-floats': 1
};

const addWebkit = (key, val) => [[webkit + key, val], [key, val]];

const addWebkitVal = (key, val) => [[key, webkit + val], [key, val]];

const addMoz = (key, val) => [[moz + key, val], [key, val]];

const addMs = (key, val) => [[ms + key, val], [key, val]];

const addWebkitMoz = (key, val) => [
  [webkit + key, val],
  [moz + key, val],
  [key, val]
];

const addWebkitMozMs = (key, val) => [
  [webkit + key, val],
  [moz + key, val],
  [ms + key, val],
  [key, val]
];

const addWebkitMs = (key, val) => [
  [webkit + key, val],
  [ms + key, val],
  [key, val]
];

const prefixMaskBorder = (key, val) => [
  [webkit + key.replace('border', 'box-image'), val],
  [key, val]
];

const prefixDisplayFlex = (key, val) => {
  const infix = val === 'inline-flex' ? 'inline-' : '';
  return [
    [key, webkit + infix + 'box'],
    [key, ms + infix + 'flexbox'],
    [key, val]
  ];
};

const cases = {
  'align-content': (key, val) => [
    [ms + 'flex-line-pack', oldFlexAlignment[val] || val],
    [key, val]
  ],
  'align-items': (key, val) => [
    [webkit + 'box-align', oldFlexAlignment[val] || val],
    [ms + 'flex-align', oldFlexAlignment[val] || val],
    [key, val]
  ],
  'align-self': (key, val) => [
    [ms + 'flex-item-align', oldFlexAlignment[val] || val],
    val !== 'flex-start' &&
      val !== 'flex-end' &&
      val !== 'baseline' && [
        ms + 'grid-row-align',
        oldFlexAlignment[val] || val
      ],
    [key, val]
  ],
  appearance: addWebkitMoz,
  cursor: {
    'zoom-in': addWebkitVal,
    'zoom-out': addWebkitVal,
    grab: addWebkitVal,
    grabbing: addWebkitVal
  },
  display: {
    flex: prefixDisplayFlex,
    'inline-flex': prefixDisplayFlex
  },
  flex: (key, val) => {
    const parts = ('' + val).split(' ');
    const wkFlex = parts[0] === 'none' ? 0 : parts[0] === 'auto' ? 1 : parts[0];
    const msFlex = parts.length === 3 && parts[2] === '0' ? val + 'px' : val;
    return [[webkit + 'box-' + key, wkFlex], [ms + key, msFlex], [key, val]];
  },
  'flex-basis': (key, val) => [[ms + 'flex-preferred-size', val], [key, val]],
  'flex-direction': (key, val) => [
    [
      webkit + 'box-orient',
      val.indexOf('row') > -1 ? 'horizontal' : 'vertical'
    ],
    [
      webkit + 'box-direction',
      val.indexOf('reverse') > -1 ? 'reverse' : 'normal'
    ],
    [ms + key, val],
    [key, val]
  ],
  'flex-flow': (key, val) => {
    const v0 = (val + '').split(' ')[0] || '';
    return [
      [
        webkit + 'box-orient',
        v0.indexOf('row') > -1 ? 'horizontal' : 'vertical'
      ],
      [
        webkit + 'box-direction',
        v0.indexOf('reverse') > -1 ? 'reverse' : 'normal'
      ],
      [ms + key, val],
      [key, val]
    ];
  },
  'flex-grow': (key, val) => [
    [webkit + 'box-flex', val],
    [ms + 'flex-positive', val],
    [key, val]
  ],
  'flex-shrink': (key, val) => [[ms + 'flex-negative', val], [key, val]],
  'justify-content': (key, val) => [
    val !== 'space-around' && [
      webkit + 'box-pack',
      oldFlexAlignment[val] || val
    ],
    [ms + 'flex-pack', oldFlexAlignment[val] || val],
    [key, val]
  ],
  'tab-size': addMoz,
  hyphens: addWebkitMs,
  'flex-wrap': addMs,
  'flow-into': addWebkitMs,
  'flow-from': addWebkitMs,
  'box-decoration-break': addWebkit,
  'break-before': addWebkitMs,
  'break-after': addWebkitMs,
  'break-inside': addWebkitMs,
  'clip-path': addWebkit,
  'region-fragment': addWebkitMs,
  'scroll-snap-type': addWebkitMs,
  'scroll-snap-coordinate': addWebkitMs,
  'scroll-snap-destination': addWebkitMs,
  'scroll-snap-points-x': addWebkitMs,
  'scroll-snap-points-y': addWebkitMs,
  'font-feature-settings': addWebkit,
  'mask-border-source': prefixMaskBorder,
  'mask-border-mode': prefixMaskBorder,
  'mask-border-slice': prefixMaskBorder,
  'mask-border-width': prefixMaskBorder,
  'mask-border-outset': prefixMaskBorder,
  'mask-border-repeat': prefixMaskBorder,
  'mask-border': prefixMaskBorder,
  order: (key, val) => {
    const v0 = /[0-9]/.test(val) ? (+val || 0) + 1 : val;
    return [
      [webkit + 'box-ordinal-group', v0],
      [ms + 'flex-order', val],
      [key, val]
    ];
  },
  'backface-visibility': addWebkit,
  perspective: addWebkit,
  'perspective-origin': addWebkit,
  position: { sticky: addWebkitVal },
  'text-orientation': addWebkit,
  'backdrop-filter': addWebkit,
  'font-kerning': addWebkit,
  filter: addWebkit,
  'shape-image-threshold': addWebkit,
  'shape-margin': addWebkit,
  'shape-outside': addWebkit,
  'text-size-adjust': addWebkitMozMs,
  'user-select': addWebkitMozMs,
  'writing-mode': (key, val) => [
    [webkit + key, val],
    [ms + key, writingMode[val] || val],
    [key, val]
  ],
  '&:fullscreen': (key, val) => [
    ['&:' + webkit + 'full-screen', val],
    ['&:' + moz + 'full-screen', val],
    ['&:' + ms + 'fullscreen', val],
    [key, val]
  ],
  '&::placeholder': (key, val) => [
    ['&::' + webkit + 'input-placeholder', val],
    ['&:' + ms + 'input-placeholder', val],
    ['&::' + ms + 'input-placeholder', val],
    [key, val]
  ]
};

const prefix = (key, val) => {
  let ret;

  if (cases.hasOwnProperty(key)) {
    if (typeof cases[key] === 'function') {
      ret = cases[key](key, val);
    } else if (
      typeof cases[key] === 'object' &&
      typeof cases[key][val] === 'function'
    ) {
      ret = cases[key][val](key, val);
    }
  } else if (
    /^(transform|animation|column|text-emphasis|text-decoration-|mask|wrap-)/.test(
      key
    )
  ) {
    ret = addWebkit(key, val);
  } else if (/^cross-fade/.test(val)) {
    let pct = (val.match(/\(([\d]+%)/) || [])[1] || '';
    let wkVal = val.replace('cross-fade', '-webkit-cross-fade');
    if (pct) {
      wkVal = wkVal.replace(pct + ' ', '');
    } else {
      pct = '0.5';
    }

    const lastRParen = wkVal.lastIndexOf(')');
    if (lastRParen > -1) {
      wkVal = wkVal.substring(0, lastRParen) + `, ${pct})`;
    }

    ret = [[key, wkVal], [key, val]];
  } else if (('' + val).indexOf(imageSet) > -1) {
    ret = [[key, val.replace(imageSet, webkit + imageSet)], [key, val]];
  } else if (intrinsicSizingProps[key] && intrinsicSizingVals[val]) {
    ret = [[key, webkit + val], [key, moz + val], [key, val]];
  }

  return ret || [[key, val]];
};

module.exports = { prefix };
// export { prefix };
