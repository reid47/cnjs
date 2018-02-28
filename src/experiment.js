const buildRule = (at, pseudo, parts, args) => {
  parts = parts.map(p => p.split(/\s+/).join(' '));
  const isDynamic = args.length && args.some(arg => typeof arg === 'function');
  console.log({ isDynamic });

  const fn = props => {
    const s = [];

    for (let i = 0; i < parts.length; i++) {
      s.push(parts[i]);

      if (i < args.length) {
        if (typeof args[i] === 'function') {
          s.push(args[i](props));
        } else {
          s.push(args[i]);
        }
      }
    }

    return s.join('');
  };

  if (isDynamic) return fn;
  const rendered = fn();
  return () => rendered;
};

const rule = (parts, ...args) => {
  return buildRule('', '', parts, args);
};

const lol = 'red';

const s = rule`
  color: green;
  background: ${lol};
  width: ${p => p.width};
`;

const s2 = rule`
  color: green;
  background: ${lol};
  &:hover {
    
  }
`;

const css = s({ width: '47px' });

console.log({ css });
