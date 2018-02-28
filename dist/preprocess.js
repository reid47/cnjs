'use strict';
Object.defineProperty(exports, '__esModule', { value: !0 });
var e = '-webkit-',
  r = '-moz-',
  n = '-ms-',
  t = 'image-set',
  o = {
    'flex-start': 'start',
    'flex-end': 'end',
    'space-between': 'justify',
    'space-around': 'distribute'
  },
  i = {
    'horizontal-tb': 'lr-tb',
    'vertical-lr': 'tb-lr',
    'vertical-rl': 'tb-rl'
  },
  a = {
    'max-height': 1,
    'max-width': 1,
    width: 1,
    height: 1,
    'min-width': 1,
    'min-height': 1
  },
  s = {
    'min-content': 1,
    'max-content': 1,
    'fill-available': 1,
    'fit-content': 1,
    'contain-floats': 1
  },
  l = function(r, n) {
    return [[e + r, n], [r, n]];
  },
  c = function(r, n) {
    return [[r, e + n], [r, n]];
  },
  f = function(e, n) {
    return [[r + e, n], [e, n]];
  },
  u = function(e, r) {
    return [[n + e, r], [e, r]];
  },
  p = function(n, t) {
    return [[e + n, t], [r + n, t], [n, t]];
  },
  d = function(t, o) {
    return [[e + t, o], [r + t, o], [n + t, o], [t, o]];
  },
  x = function(r, t) {
    return [[e + r, t], [n + r, t], [r, t]];
  },
  b = function(r, n) {
    return [[e + r.replace('border', 'box-image'), n], [r, n]];
  },
  h = function(r, t) {
    var o = 'inline-flex' === t ? 'inline-' : '';
    return [[r, e + o + 'box'], [r, n + o + 'flexbox'], [r, t]];
  },
  m = {
    'align-content': function(e, r) {
      return [[n + 'flex-line-pack', o[r] || r], [e, r]];
    },
    'align-items': function(r, t) {
      return [
        [e + 'box-align', o[t] || t],
        [n + 'flex-align', o[t] || t],
        [r, t]
      ];
    },
    'align-self': function(e, r) {
      return [
        [n + 'flex-item-align', o[r] || r],
        'flex-start' !== r &&
          'flex-end' !== r &&
          'baseline' !== r && [n + 'grid-row-align', o[r] || r],
        [e, r]
      ];
    },
    appearance: p,
    cursor: { 'zoom-in': c, 'zoom-out': c, grab: c, grabbing: c },
    display: { flex: h, 'inline-flex': h },
    flex: function(r, t) {
      var o = ('' + t).split(' '),
        i = 'none' === o[0] ? 0 : 'auto' === o[0] ? 1 : o[0],
        a = 3 === o.length && '0' === o[2] ? t + 'px' : t;
      return [[e + 'box-' + r, i], [n + r, a], [r, t]];
    },
    'flex-basis': function(e, r) {
      return [[n + 'flex-preferred-size', r], [e, r]];
    },
    'flex-direction': function(r, t) {
      return [
        [e + 'box-orient', t.indexOf('row') > -1 ? 'horizontal' : 'vertical'],
        [e + 'box-direction', t.indexOf('reverse') > -1 ? 'reverse' : 'normal'],
        [n + r, t],
        [r, t]
      ];
    },
    'flex-flow': function(r, t) {
      var o = (t + '').split(' ')[0] || '';
      return [
        [e + 'box-orient', o.indexOf('row') > -1 ? 'horizontal' : 'vertical'],
        [e + 'box-direction', o.indexOf('reverse') > -1 ? 'reverse' : 'normal'],
        [n + r, t],
        [r, t]
      ];
    },
    'flex-grow': function(r, t) {
      return [[e + 'box-flex', t], [n + 'flex-positive', t], [r, t]];
    },
    'flex-shrink': function(e, r) {
      return [[n + 'flex-negative', r], [e, r]];
    },
    'justify-content': function(r, t) {
      return [
        'space-around' !== t && [e + 'box-pack', o[t] || t],
        [n + 'flex-pack', o[t] || t],
        [r, t]
      ];
    },
    'tab-size': f,
    hyphens: x,
    'flex-wrap': u,
    'flow-into': x,
    'flow-from': x,
    'box-decoration-break': l,
    'break-before': x,
    'break-after': x,
    'break-inside': x,
    'clip-path': l,
    'region-fragment': x,
    'scroll-snap-type': x,
    'scroll-snap-coordinate': x,
    'scroll-snap-destination': x,
    'scroll-snap-points-x': x,
    'scroll-snap-points-y': x,
    'font-feature-settings': l,
    'mask-border-source': b,
    'mask-border-mode': b,
    'mask-border-slice': b,
    'mask-border-width': b,
    'mask-border-outset': b,
    'mask-border-repeat': b,
    'mask-border': b,
    order: function(r, t) {
      var o = /[0-9]/.test(t) ? (+t || 0) + 1 : t;
      return [[e + 'box-ordinal-group', o], [n + 'flex-order', t], [r, t]];
    },
    'backface-visibility': l,
    perspective: l,
    'perspective-origin': l,
    position: { sticky: c },
    'text-orientation': l,
    'backdrop-filter': l,
    'font-kerning': l,
    filter: l,
    'shape-image-threshold': l,
    'shape-margin': l,
    'shape-outside': l,
    'text-size-adjust': d,
    'user-select': d,
    'writing-mode': function(r, t) {
      return [[e + r, t], [n + r, i[t] || t], [r, t]];
    },
    '&:fullscreen': function(t, o) {
      return [
        ['&:' + e + 'full-screen', o],
        ['&:' + r + 'full-screen', o],
        ['&:' + n + 'fullscreen', o],
        [t, o]
      ];
    },
    '&::placeholder': function(r, t) {
      return [
        ['&::' + e + 'input-placeholder', t],
        ['&:' + n + 'input-placeholder', t],
        ['&::' + n + 'input-placeholder', t],
        [r, t]
      ];
    }
  },
  g = function(n, o) {
    var i = void 0;
    if (m.hasOwnProperty(n))
      'function' == typeof m[n]
        ? (i = m[n](n, o))
        : 'object' == typeof m[n] &&
          'function' == typeof m[n][o] &&
          (i = m[n][o](n, o));
    else if (
      /^(transform|animation|column|text-emphasis|text-decoration-|mask|wrap-)/.test(
        n
      )
    )
      i = l(n, o);
    else if (/^cross-fade/.test(o)) {
      var c = (o.match(/\(([\d]+%)/) || [])[1] || '',
        f = o.replace('cross-fade', '-webkit-cross-fade');
      c ? (f = f.replace(c + ' ', '')) : (c = '0.5');
      var u = f.lastIndexOf(')');
      u > -1 && (f = f.substring(0, u) + ', ' + c + ')'),
        (i = [[n, f], [n, o]]);
    } else
      ('' + o).indexOf(t) > -1
        ? (i = [[n, o.replace(t, e + t)], [n, o]])
        : a[n] && s[o] && (i = [[n, e + o], [n, r + o], [n, o]]);
    return i || [[n, o]];
  };
module.exports = { prefix: g };
var v = function(e, r, n) {
    var t = [];
    r.forEach(function(e) {
      g(e[0], e[1]).forEach(function(e) {
        t.push(e[0] + ':' + e[1] + ';');
      });
    });
    var o = e + '{' + t.join('') + '}';
    return n ? n + '{' + o + '}' : o;
  },
  k = function(e, r, n) {
    console.log({ topLevelSelector: e, parentSelector: r, newSelector: n });
    var t = '@' === n.charAt(0),
      o = n.indexOf('&') > -1;
    return r || t
      ? o ? r + n.replace(/^&/, '').replace(/&/g, e) : (r ? r + ' ' : '') + n
      : o ? n.replace(/&/g, e) : e + ' ' + n;
  },
  w = function(e, r) {
    for (
      var n = [],
        t = { '': [] },
        o = '',
        i = !0,
        a = [],
        s = !1,
        l = !1,
        c = !1,
        f = [],
        u = [],
        p = !1,
        d = !1,
        x = 0;
      x < r.length;
      x++
    ) {
      var b = r.charAt(x);
      if (!d || '\n' === b)
        switch (b) {
          case '/':
            '/' === r.charAt(x + 1) && (d = !0);
            break;
          case '\n':
            l || ((i = !0), (p = !1), (d = !1));
            break;
          case ':':
            p ? f.push(b) : s && ((s = !1), (c = !0));
            break;
          case ';':
            l &&
              (t[o].push([f.join(''), u.join('')]),
              (u = []),
              (f = []),
              (l = !1));
            break;
          case ' ':
          case '\t':
            s ? f.push(' ') : l && ' ' !== u[u.length - 1] && u.push(' ');
            break;
          case '\r':
            break;
          case '{':
            a.push(o);
            var h = f.join('').trim();
            (o = h
              .split(/,[\s]*/)
              .map(function(r) {
                return k(e, o, r);
              })
              .join(',')),
              (t[o] = []),
              (f = []),
              (s = !1);
            break;
          case '}':
            o = a.pop();
            break;
          case '&':
          case '@':
            p = !0;
          default:
            i && ((s = !0), (i = !1)),
              c && ((c = !1), (l = !0)),
              l ? u.push(b) : s && f.push(b);
        }
    }
    return (
      Object.keys(t).forEach(function(r) {
        if (t[r].length) {
          var o = '@' === r.charAt(0),
            i = r && !o ? r.replace(/&/, e) : e;
          n.push(v(i, t[r], o ? r : ''));
        }
      }),
      n
    );
  };
exports.preprocess = w;
