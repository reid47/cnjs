# :watch: benchmarks

A handful of benchmark tests that compare the performance of `turnstyle` to various other CSS-in-JS libraries/methods (currently: `cxs`, `emotion`, `fela` (with and without auto-prefixing enabled), `glamorous`, `styled-components`, React with inline styles). The tests also include plain, unstyled React as a control; this should always be the fastest out of all of them.

## Latest results

### suite: simple-button-static

_timestamp: Sun Mar 04 2018 21:22:56 GMT-0800 (Pacific Standard Time)_

| name                       | ops/sec       |
| -------------------------- | ------------- |
| react (unstyled)           | 3,075 ops/sec |
| turnstyle                  | 3,042 ops/sec |
| fela                       | 2,790 ops/sec |
| fela (prefixed)            | 2,585 ops/sec |
| cxs                        | 2,050 ops/sec |
| emotion                    | 2,005 ops/sec |
| react (with inline styles) | 1,671 ops/sec |
| glamorous                  | 1,550 ops/sec |
| styled-components          | 1,243 ops/sec |

:rocket: **fastest:** react (unstyled), turnstyle

:turtle: **slowest:** styled-components

<!--RESULTS_PLACEHOLDER-->

## Acknowledgements

The initial set of tests was borrowed from jxnblk's benchmarks [here](https://github.com/jxnblk/cxs/tree/master/benchmarks).
-------------- | -------
fela | 2,941 ops/sec
react (unstyled) | 2,938 ops/sec
fela (prefixed) | 2,914 ops/sec
turnstyle | 2,907 ops/sec
cxs | 2,525 ops/sec
emotion | 2,211 ops/sec
react (with inline styles) | 1,631 ops/sec
glamorous | 1,609 ops/sec
styled-components | 1,238 ops/sec

:rocket: **fastest:** fela (prefixed), react (unstyled), turnstyle

:turtle: **slowest:** styled-components

<!--RESULTS_PLACEHOLDER-->

## Acknowledgements

The initial set of tests was borrowed from jxnblk's benchmarks [here](https://github.com/jxnblk/cxs/tree/master/benchmarks).
