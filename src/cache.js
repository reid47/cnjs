let cache = {};

const set = (key, value) => (cache[key] = value);

const get = key => cache[key];

const clear = () => (cache = {});

export { set, get, clear };
