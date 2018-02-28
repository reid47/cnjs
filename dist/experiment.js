'use strict';
var _templateObject = _taggedTemplateLiteral(
    ['\n  color: green;\n  background: ', ';\n  width: ', ';\n'],
    ['\n  color: green;\n  background: ', ';\n  width: ', ';\n']
  ),
  _templateObject2 = _taggedTemplateLiteral(
    ['\n  color: green;\n  background: ', ';\n  &:hover {\n    \n  }\n'],
    ['\n  color: green;\n  background: ', ';\n  &:hover {\n    \n  }\n']
  );
function _taggedTemplateLiteral(e, n) {
  return Object.freeze(
    Object.defineProperties(e, { raw: { value: Object.freeze(n) } })
  );
}
var buildRule = function(e, n, t, r) {
    t = t.map(function(e) {
      return e.split(/\s+/).join(' ');
    });
    var o =
      r.length &&
      r.some(function(e) {
        return 'function' == typeof e;
      });
    console.log({ isDynamic: o });
    var l = function(e) {
      for (var n = [], o = 0; o < t.length; o++)
        n.push(t[o]),
          o < r.length &&
            ('function' == typeof r[o] ? n.push(r[o](e)) : n.push(r[o]));
      return n.join('');
    };
    if (o) return l;
    var u = l();
    return function() {
      return u;
    };
  },
  rule = function(e) {
    for (
      var n = arguments.length, t = Array(n > 1 ? n - 1 : 0), r = 1;
      r < n;
      r++
    )
      t[r - 1] = arguments[r];
    return buildRule('', '', e, t);
  },
  lol = 'red',
  s = rule(_templateObject, lol, function(e) {
    return e.width;
  }),
  s2 = rule(_templateObject2, lol),
  css = s({ width: '47px' });
console.log({ css: css });
