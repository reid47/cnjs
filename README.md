# :cyclone: turnstyle [![npm version](https://badge.fury.io/js/turnstyle.svg)](https://badge.fury.io/js/turnstyle) [![Build Status](https://travis-ci.org/reid47/turnstyle.svg?branch=master)](https://travis-ci.org/reid47/turnstyle)

a tiny, fast, simple CSS-in-JS library

**NOTE:** Until version 1.0.0 is released on NPM, this library should not be considered stable or ready for real use. Expect breaking changes in minor releases until 1.0.0.

## :star2: features

* :heavy_check_mark: Automatic vendor prefixing!
* :heavy_check_mark: Media queries! (e.g. `@media (max-width: 768px)`, pseudoclasses (e.g. `:hover`), & pseudoelements (e.g. `::after`)!
* :heavy_check_mark: No plugins/configuration required!
* :heavy_check_mark: No dependencies!
* :heavy_check_mark: Framework independent!
* :heavy_check_mark: Support for server-side rendering!
* :heavy_check_mark: Small bundle size!
* :heavy_check_mark: Fully tested!

## :palm_tree: goals

Yes, there are many CSS-in-JS libraries out there. What makes this one special? Turnstyle prioritizes **simplicity**, **development speed**, and **predictability**. You should spend your time thinking about what your app will look like, not about which packages/plugins/configuration files you'll need just to get started.

## :wrench: development

* `yarn build` to generate a production build
* `yarn build-watch` to watch for changes & rebuild
* `yarn test` to run all the tests
* `yarn test-watch` to start the test watcher
* `yarn test-coverage` to analyze test coverage
