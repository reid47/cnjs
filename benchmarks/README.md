# :watch: benchmarks

A handful of benchmark tests that compare the performance of `cnjs` to various other CSS-in-JS libraries (currently: `cxs`, `emotion`, `fela`, `glamorous`, `inline-styles`, `styled-components`).

## Latest results (last 10 runs)

### suite: simple-button-static
*timestamp: Thu Feb 01 2018 17:58:03 GMT-0800 (Pacific Standard Time)*
name | ops/sec
---- | -------
cnjs              | 1,803 ops/sec
cxs               | 1,618 ops/sec
fela              | 1,482 ops/sec
emotion           | 1,363 ops/sec
inline-styles     |   932 ops/sec
glamorous         |   925 ops/sec
styled-components |   787 ops/sec

:rocket: **fastest:** cnjs, cxs

:turtle: **slowest:** styled-components

### suite: simple-button-static
*timestamp: Thu Feb 01 2018 18:09:35 GMT-0800 (Pacific Standard Time)*
name | ops/sec
---- | -------
cxs               | 1,334 ops/sec
cnjs              | 1,239 ops/sec
fela              | 1,081 ops/sec
emotion           |   865 ops/sec
inline-styles     |   816 ops/sec
styled-components |   687 ops/sec
glamorous         |   668 ops/sec

:rocket: **fastest:** cxs, cnjs

:turtle: **slowest:** glamorous, styled-components

### suite: simple-button-static
*timestamp: Thu Feb 01 2018 18:10:56 GMT-0800 (Pacific Standard Time)*
name | ops/sec
---- | -------
cnjs              | 1,353 ops/sec
fela              | 1,147 ops/sec
cxs               | 1,122 ops/sec
emotion           | 1,015 ops/sec
glamorous         |   761 ops/sec
styled-components |   588 ops/sec
inline-styles     |   581 ops/sec

:rocket: **fastest:** cnjs

:turtle: **slowest:** inline-styles, styled-components

### suite: simple-button-static
*timestamp: Thu Feb 01 2018 18:20:59 GMT-0800 (Pacific Standard Time)*
name | ops/sec
---- | -------
react (no styles)        | 2,053 ops/sec
cnjs                     | 1,808 ops/sec
fela                     | 1,721 ops/sec
emotion                  | 1,301 ops/sec
cxs                      | 1,164 ops/sec
react (w/ inline styles) | 1,036 ops/sec
glamorous                |   895 ops/sec
styled-components        |   856 ops/sec

:rocket: **fastest:** react (no styles)

:turtle: **slowest:** styled-components, glamorous

<!--RESULTS_PLACEHOLDER-->

## Acknowledgements

The initial set of tests was borrowed from jxnblk's benchmarks [here](https://github.com/jxnblk/cxs/tree/master/benchmarks).
