if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/core.production.min.js');
} else {
  module.exports = require('./dist/core.development.js');
}
