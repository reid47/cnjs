if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/turnstyle.production.min.js');
} else {
  module.exports = require('./dist/turnstyle.development.js');
}
