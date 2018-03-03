'use strict';
Object.defineProperty(exports, '__esModule', { value: !0 });
var e = '-webkit-',
  r = '-moz-',
  n = '-ms-',
  t = 'image-set',
  i = {
    'flex-start': 'start',
    'flex-end': 'end',
    'space-between': 'justify',
    'space-around': 'distribute'
  },
  o = {
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
  d = function(t, i) {
    return [[e + t, i], [r + t, i], [n + t, i], [t, i]];
  },
  x = function(r, t) {
    return [[e + r, t], [n + r, t], [r, t]];
  },
  b = function(r, n) {
    return [[e + r.replace('border', 'box-image'), n], [r, n]];
  },
  h = function(r, t) {
    var i = 'inline-flex' === t ? 'inline-' : '';
    return [[r, e + i + 'box'], [r, n + i + 'flexbox'], [r, t]];
  },
  m = {
    'align-content': function(e, r) {
      return [[n + 'flex-line-pack', i[r] || r], [e, r]];
    },
    'align-items': function(r, t) {
      return [
        [e + 'box-align', i[t] || t],
        [n + 'flex-align', i[t] || t],
        [r, t]
      ];
    },
    'align-self': function(e, r) {
      return [
        [n + 'flex-item-align', i[r] || r],
        'flex-start' !== r &&
          'flex-end' !== r &&
          'baseline' !== r && [n + 'grid-row-align', i[r] || r],
        [e, r]
      ];
    },
    appearance: p,
    cursor: { 'zoom-in': c, 'zoom-out': c, grab: c, grabbing: c },
    display: { flex: h, 'inline-flex': h },
    flex: function(r, t) {
      var i = ('' + t).split(' '),
        o = 'none' === i[0] ? 0 : 'auto' === i[0] ? 1 : i[0],
        a = 3 === i.length && '0' === i[2] ? t + 'px' : t;
      return [[e + 'box-' + r, o], [n + r, a], [r, t]];
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
      var i = (t + '').split(' ')[0] || '';
      return [
        [e + 'box-orient', i.indexOf('row') > -1 ? 'horizontal' : 'vertical'],
        [e + 'box-direction', i.indexOf('reverse') > -1 ? 'reverse' : 'normal'],
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
        'space-around' !== t && [e + 'box-pack', i[t] || t],
        [n + 'flex-pack', i[t] || t],
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
      var i = /[0-9]/.test(t) ? (+t || 0) + 1 : t;
      return [[e + 'box-ordinal-group', i], [n + 'flex-order', t], [r, t]];
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
      return [[e + r, t], [n + r, o[t] || t], [r, t]];
    },
    '&:fullscreen': function(t, i) {
      return [
        ['&:' + e + 'full-screen', i],
        ['&:' + r + 'full-screen', i],
        ['&:' + n + 'fullscreen', i],
        [t, i]
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
  g = function(n, i) {
    var o = void 0;
    if (m.hasOwnProperty(n))
      'function' == typeof m[n]
        ? (o = m[n](n, i))
        : 'object' == typeof m[n] &&
          'function' == typeof m[n][i] &&
          (o = m[n][i](n, i));
    else if (
      /^(transform|animation|column|text-emphasis|text-decoration-|mask|wrap-)/.test(
        n
      )
    )
      o = l(n, i);
    else if (/^cross-fade/.test(i)) {
      var c = (i.match(/\(([\d]+%)/) || [])[1] || '',
        f = i.replace('cross-fade', '-webkit-cross-fade');
      c ? (f = f.replace(c + ' ', '')) : (c = '0.5');
      var u = f.lastIndexOf(')');
      u > -1 && (f = f.substring(0, u) + ', ' + c + ')'),
        (o = [[n, f], [n, i]]);
    } else
      ('' + i).indexOf(t) > -1
        ? (o = [[n, i.replace(t, e + t)], [n, i]])
        : a[n] && s[i] && (o = [[n, e + i], [n, r + i], [n, i]]);
    return o || [[n, i]];
  };
module.exports = { prefix: g };
var v = function(e, r, n) {
    var t = [];
    n.forEach(function(e) {
      1 !== e.length
        ? g(e[0], e[1]).forEach(function(e) {
            t.push(e[0] + ':' + e[1] + ';');
          })
        : t.push(e[0]);
    });
    var i = r && '@' === r.charAt(0) ? '}' : '';
    return (r || e) + '{' + t.join('') + '}' + i;
  },
  k = function(e, r, n) {
    var t = '@' === n.charAt(0),
      i = n.indexOf('&') > -1;
    return r || t
      ? i
        ? r + n.replace(/^&/, '').replace(/&/g, e)
        : t && !r ? n + '{' + e : (r ? r + ' ' : '') + n
      : i ? n.replace(/&/g, e) : e + ' ' + n;
  },
  w = function(e, r) {
    for (
      var n = { '': [] },
        t = '',
        i = !0,
        o = [],
        a = !1,
        s = !1,
        l = !1,
        c = [],
        f = [],
        u = !1,
        p = !1,
        d = 0;
      d < r.length;
      d++
    ) {
      var x = r.charAt(d);
      if (!p || '\n' === x)
        switch (x) {
          case '/':
            '/' === r.charAt(d + 1) && (p = !0);
            break;
          case '\n':
            s || ((i = !0), (p = !1));
            break;
          case ':':
            u ? c.push(x) : a && ((a = !1), (l = !0));
            break;
          case ';':
            s
              ? (n[t].push([c.join(''), f.join('')]),
                (f = []),
                (c = []),
                (s = !1))
              : a &&
                '@' === c[0] &&
                ((n[c.join('') + ';'] = !1), (a = !1), (c = []));
            break;
          case ' ':
          case '\t':
            a && ' ' !== c[c.length - 1]
              ? c.push(' ')
              : s && ' ' !== f[f.length - 1] && f.push(' ');
            break;
          case '\r':
            break;
          case '{':
            o.push(t);
            var b = c.join('').trim();
            (t = b
              .split(/,[\s]*/)
              .map(function(r) {
                return k(e, t, r);
              })
              .join(',')),
              (n[t] = n[t] || []),
              (c = []),
              (u = !1),
              (a = !1);
            break;
          case '}':
            t = o.pop();
            break;
          case '&':
          case '@':
            u = !0;
          default:
            i && ((a = !0), (i = !1)),
              l && ((l = !1), (s = !0)),
              s ? f.push(x) : a && c.push(x);
        }
    }
    var h = [],
      m = [];
    return (
      Object.keys(n).forEach(function(r) {
        if (!n[r]) return h.push(r);
        n[r].length && m.push(v(e, r, n[r]));
      }),
      h.concat(m)
    );
  };
exports.preprocess = w;
