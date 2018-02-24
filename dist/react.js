'use strict';
function _interopDefault(e) {
  return e && 'object' == typeof e && 'default' in e ? e.default : e;
}
Object.defineProperty(exports, '__esModule', { value: !0 });
var React = _interopDefault(require('react')),
  webkit = '-webkit-',
  moz = '-moz-',
  ms = '-ms-',
  imageSet = 'image-set',
  oldFlexAlignment = {
    'flex-start': 'start',
    'flex-end': 'end',
    'space-between': 'justify',
    'space-around': 'distribute'
  },
  _writingMode = {
    'horizontal-tb': 'lr-tb',
    'vertical-lr': 'tb-lr',
    'vertical-rl': 'tb-rl'
  },
  intrinsicSizingProps = {
    'max-height': 1,
    'max-width': 1,
    width: 1,
    height: 1,
    'min-width': 1,
    'min-height': 1
  },
  intrinsicSizingVals = {
    'min-content': 1,
    'max-content': 1,
    'fill-available': 1,
    'fit-content': 1,
    'contain-floats': 1
  },
  addWebkit = function(e, t) {
    return [[webkit + e, t], [e, t]];
  },
  addWebkitVal = function(e, t) {
    return [[e, webkit + t], [e, t]];
  },
  addMoz = function(e, t) {
    return [[moz + e, t], [e, t]];
  },
  addMs = function(e, t) {
    return [[ms + e, t], [e, t]];
  },
  addWebkitMoz = function(e, t) {
    return [[webkit + e, t], [moz + e, t], [e, t]];
  },
  addWebkitMozMs = function(e, t) {
    return [[webkit + e, t], [moz + e, t], [ms + e, t], [e, t]];
  },
  addWebkitMs = function(e, t) {
    return [[webkit + e, t], [ms + e, t], [e, t]];
  },
  prefixMaskBorder = function(e, t) {
    return [[webkit + e.replace('border', 'box-image'), t], [e, t]];
  },
  prefixDisplayFlex = function(e, t) {
    var r = 'inline-flex' === t ? 'inline-' : '';
    return [[e, webkit + r + 'box'], [e, ms + r + 'flexbox'], [e, t]];
  },
  cases = {
    'align-content': function(e, t) {
      return [[ms + 'flex-line-pack', oldFlexAlignment[t] || t], [e, t]];
    },
    'align-items': function(e, t) {
      return [
        [webkit + 'box-align', oldFlexAlignment[t] || t],
        [ms + 'flex-align', oldFlexAlignment[t] || t],
        [e, t]
      ];
    },
    'align-self': function(e, t) {
      return [
        [ms + 'flex-item-align', oldFlexAlignment[t] || t],
        'flex-start' !== t &&
          'flex-end' !== t &&
          'baseline' !== t && [ms + 'grid-row-align', oldFlexAlignment[t] || t],
        [e, t]
      ];
    },
    appearance: addWebkitMoz,
    cursor: {
      'zoom-in': addWebkitVal,
      'zoom-out': addWebkitVal,
      grab: addWebkitVal,
      grabbing: addWebkitVal
    },
    display: { flex: prefixDisplayFlex, 'inline-flex': prefixDisplayFlex },
    flex: function(e, t) {
      var r = ('' + t).split(' '),
        i = 'none' === r[0] ? 0 : 'auto' === r[0] ? 1 : r[0],
        n = 3 === r.length && '0' === r[2] ? t + 'px' : t;
      return [[webkit + 'box-' + e, i], [ms + e, n], [e, t]];
    },
    'flex-basis': function(e, t) {
      return [[ms + 'flex-preferred-size', t], [e, t]];
    },
    'flex-direction': function(e, t) {
      return [
        [
          webkit + 'box-orient',
          t.indexOf('row') > -1 ? 'horizontal' : 'vertical'
        ],
        [
          webkit + 'box-direction',
          t.indexOf('reverse') > -1 ? 'reverse' : 'normal'
        ],
        [ms + e, t],
        [e, t]
      ];
    },
    'flex-flow': function(e, t) {
      var r = (t + '').split(' ')[0] || '';
      return [
        [
          webkit + 'box-orient',
          r.indexOf('row') > -1 ? 'horizontal' : 'vertical'
        ],
        [
          webkit + 'box-direction',
          r.indexOf('reverse') > -1 ? 'reverse' : 'normal'
        ],
        [ms + e, t],
        [e, t]
      ];
    },
    'flex-grow': function(e, t) {
      return [[webkit + 'box-flex', t], [ms + 'flex-positive', t], [e, t]];
    },
    'flex-shrink': function(e, t) {
      return [[ms + 'flex-negative', t], [e, t]];
    },
    'justify-content': function(e, t) {
      return [
        'space-around' !== t && [webkit + 'box-pack', oldFlexAlignment[t] || t],
        [ms + 'flex-pack', oldFlexAlignment[t] || t],
        [e, t]
      ];
    },
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
    order: function(e, t) {
      var r = /[0-9]/.test(t) ? (+t || 0) + 1 : t;
      return [
        [webkit + 'box-ordinal-group', r],
        [ms + 'flex-order', t],
        [e, t]
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
    'writing-mode': function(e, t) {
      return [[webkit + e, t], [ms + e, _writingMode[t] || t], [e, t]];
    },
    '&:fullscreen': function(e, t) {
      return [
        ['&:' + webkit + 'full-screen', t],
        ['&:' + moz + 'full-screen', t],
        ['&:' + ms + 'fullscreen', t],
        [e, t]
      ];
    },
    '&::placeholder': function(e, t) {
      return [
        ['&::' + webkit + 'input-placeholder', t],
        ['&:' + ms + 'input-placeholder', t],
        ['&::' + ms + 'input-placeholder', t],
        [e, t]
      ];
    }
  },
  prefix = function(e, t) {
    var r = void 0;
    if (cases.hasOwnProperty(e))
      'function' == typeof cases[e]
        ? (r = cases[e](e, t))
        : 'object' == typeof cases[e] &&
          'function' == typeof cases[e][t] &&
          (r = cases[e][t](e, t));
    else if (
      /^(transform|animation|column|text-emphasis|text-decoration-|mask|wrap-)/.test(
        e
      )
    )
      r = addWebkit(e, t);
    else if (/^cross-fade/.test(t)) {
      var i = (t.match(/\(([\d]+%)/) || [])[1] || '',
        n = t.replace('cross-fade', '-webkit-cross-fade');
      i ? (n = n.replace(i + ' ', '')) : (i = '0.5');
      var a = n.lastIndexOf(')');
      a > -1 && (n = n.substring(0, a) + ', ' + i + ')'),
        (r = [[e, n], [e, t]]);
    } else
      ('' + t).indexOf(imageSet) > -1
        ? (r = [[e, t.replace(imageSet, webkit + imageSet)], [e, t]])
        : intrinsicSizingProps[e] &&
          intrinsicSizingVals[t] &&
          (r = [[e, webkit + t], [e, moz + t], [e, t]]);
    return r || [[e, t]];
  },
  mergeKey = function(e, t) {
    return (
      e +
      (e.indexOf('@media') > -1
        ? t.replace('@media', ' and')
        : t.replace(/&/g, ''))
    );
  },
  collectDefs = function e(t, r, i) {
    for (var n in ((r[i] = r[i] || []), t))
      for (
        var a = t[n],
          o = n.replace(/[A-Z]/g, '-$&').toLowerCase(),
          s = prefix(o, a),
          l = 0;
        l < s.length;
        l++
      ) {
        var d = s[l][0],
          c = s[l][1];
        d &&
          ('object' == typeof c
            ? e(c, r, mergeKey(i, d))
            : r[i].push(d + ':' + c + ';'));
      }
    return r;
  },
  cache = {},
  set = function(e, t) {
    return (cache[e] = t);
  },
  get = function(e) {
    return cache[e];
  },
  rules = [],
  newClassName = function() {
    return 'cls_' + rules.length.toString(36);
  },
  addRule = function(e) {
    return rules.push(e);
  };
if ('undefined' != typeof document) {
  var _document$head$append = document.head.appendChild(
      document.createElement('style')
    ),
    sheet = _document$head$append.sheet;
  addRule = function(e) {
    rules.push(e), sheet.insertRule(e, sheet.cssRules.length);
  };
}
var formatRule = function(e, t, r) {
    return e.indexOf('@') > -1
      ? e + '{' + t + '{' + r + '}}'
      : '' + t + e + '{' + r + '}';
  },
  generateClasses = function(e) {
    var t = collectDefs(e, {}, ''),
      r = [];
    for (var i in t) {
      var n = t[i].join('');
      if (n.length) {
        var a = i + n,
          o = get(a);
        if (o) return o;
        var s = newClassName();
        set(a, s), addRule(formatRule(i, '.' + s, n)), r.push(s);
      }
    }
    return r.join(' ');
  },
  rule = function(e) {
    return e
      ? 'function' != typeof e
        ? generateClasses(e)
        : function(t) {
            return generateClasses(e(t));
          }
      : '';
  },
  _this = void 0,
  _extends =
    Object.assign ||
    function(e) {
      for (var t = 1; t < arguments.length; t++) {
        var r = arguments[t];
        for (var i in r)
          Object.prototype.hasOwnProperty.call(r, i) && (e[i] = r[i]);
      }
      return e;
    };
function _objectWithoutProperties(e, t) {
  var r = {};
  for (var i in e)
    t.indexOf(i) >= 0 ||
      (Object.prototype.hasOwnProperty.call(e, i) && (r[i] = e[i]));
  return r;
}
var styled = function(e, t) {
  var r = rule(t);
  return function(t) {
    var i = t.className,
      n = _objectWithoutProperties(t, ['className']),
      a = 'function' == typeof r ? r(t) : r;
    return React.createElement(
      e,
      _extends({}, n, {
        className: i + ' ' + a,
        ref: function(e) {
          return (_this.innerRef = e);
        }
      })
    );
  };
};
exports.styled = styled;
