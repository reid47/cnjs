module.exports = {
  'env': {
    'browser': true,
    'commonjs': true,
    'es6': true,
    'jest/globals': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:jest/recommended'
  ],
  'parserOptions': {
    'sourceType': 'module'
  },
  'plugins': [
    'jest'
  ],
  'rules': {
    'array-bracket-newline': [ 'error', { 'multiline': true } ],
    'array-bracket-spacing': [ 'error', 'always' ],
    'arrow-body-style': 'error',
    'arrow-parens': [ 'error', 'as-needed' ],
    'brace-style': 'error',
    'camelcase': 'error',
    'comma-dangle': 'error',
    'comma-spacing': 'error',
    'comma-style': 'error',
    'computed-property-spacing': 'error',
    'curly': 'error',
    'eol-last': 'error',
    'eqeqeq': 'error',
    'func-call-spacing': 'error',
    'function-paren-newline': 'error',
    'indent': [ 'error', 2 ],
    'jsx-quotes': 'error',
    'key-spacing': 'error',
    'no-extra-bind': 'error',
    'no-lonely-if': 'error',
    'no-multi-spaces': 'error',
    'no-multiple-empty-lines': 'error',
    'no-sequences': 'error',
    'no-template-curly-in-string': 'error',
    'no-trailing-spaces': 'error',
    'no-unneeded-ternary': 'error',
    'no-unused-expressions': 'error',
    'no-useless-concat': 'error',
    'no-useless-return': 'error',
    'no-whitespace-before-property': 'error',
    'object-curly-newline': 'error',
    'object-curly-spacing': [ 'error', 'always' ],
    'object-property-newline': 'error',
    'operator-linebreak': [ 'error', 'before' ],
    'padded-blocks': [ 'error', 'never' ],
    'quote-props': [ 'error', 'as-needed', { 'numbers': true } ],
    'require-await': 'error',
    'semi': [ 'error', 'always' ],
    'space-in-parens': 'error',
    'space-infix-ops': 'error',
    'space-unary-ops': 'error',
    'quotes': [ 'error', 'single' ],
  }
};
