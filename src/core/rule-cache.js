let cache = {};
const clearCache = () => (cache = {});
let renderedCache = {};

export { cache, clearCache, renderedCache };
