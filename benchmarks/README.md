# :watch: benchmarks

A handful of benchmark tests that compare the performance of `turnstyle` to various other CSS-in-JS libraries (currently: `cxs`, `emotion`, `fela`, `glamorous`, `inline-styles`, `styled-components`).

## Latest results

### suite: simple-button-static
*timestamp: Sat Feb 03 2018 20:20:41 GMT-0800 (Pacific Standard Time)*

name                      | ops/sec
------------------------- | -------
react (unstyled)           | 2,912 ops/sec
turnstyle                  | 1,678 ops/sec
emotion                    | 1,587 ops/sec
fela                       | 1,586 ops/sec
react (with inline styles) | 1,462 ops/sec
cxs                        | 1,378 ops/sec
glamorous                  | 1,257 ops/sec
styled-components          |   931 ops/sec

:rocket: **fastest:** react (unstyled)

:turtle: **slowest:** styled-components

<!--RESULTS_PLACEHOLDER-->
### suite: simple-button-dynamic
*timestamp: Sat Feb 03 2018 20:21:25 GMT-0800 (Pacific Standard Time)*

name                      | ops/sec
------------------------- | -------
react (unstyled)           | 2,787 ops/sec
fela                       | 2,235 ops/sec
cxs                        | 2,085 ops/sec
turnstyle                  | 2,016 ops/sec
emotion                    | 1,834 ops/sec
react (with inline styles) | 1,589 ops/sec
glamorous                  | 1,379 ops/sec
styled-components          |   979 ops/sec

:rocket: **fastest:** react (unstyled)

:turtle: **slowest:** styled-components

<!--RESULTS_PLACEHOLDER-->

## Acknowledgements

The initial set of tests was borrowed from jxnblk's benchmarks [here](https://github.com/jxnblk/cxs/tree/master/benchmarks).
