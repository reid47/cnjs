if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/turnstyle-react.production.min.js');
} else {
  module.exports = require('./dist/turnstyle-react.development.js');
}
