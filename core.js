if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/turnstyle-core.production.min.js');
} else {
  module.exports = require('./dist/turnstyle-core.development.js');
}
