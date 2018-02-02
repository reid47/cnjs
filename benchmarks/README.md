# :watch: benchmarks

A handful of benchmark tests that compare the performance of `cnjs` to various other CSS-in-JS libraries (currently: `cxs`, `emotion`, `fela`, `glamorous`, `inline-styles`, `styled-components`).

## Latest results

### suite: simple-button-static
*timestamp: Thu Feb 01 2018 21:42:13 GMT-0800 (Pacific Standard Time)*

name                      | ops/sec
------------------------- | -------
react (unstyled)           | 1,973 ops/sec
cnjs                       | 1,755 ops/sec
fela                       | 1,546 ops/sec
cxs                        | 1,421 ops/sec
react (with inline styles) | 1,275 ops/sec
emotion                    | 1,192 ops/sec
glamorous                  |   944 ops/sec
styled-components          |   787 ops/sec

:rocket: **fastest:** react (unstyled)

:turtle: **slowest:** styled-components

### suite: simple-button-static
*timestamp: Thu Feb 01 2018 22:30:25 GMT-0800 (Pacific Standard Time)*

name                      | ops/sec
------------------------- | -------
cxs                        | 2,155 ops/sec
fela                       | 2,117 ops/sec
react (unstyled)           | 2,065 ops/sec
cnjs                       | 1,725 ops/sec
emotion                    | 1,606 ops/sec
react (with inline styles) | 1,052 ops/sec
glamorous                  | 1,003 ops/sec
styled-components          |   792 ops/sec

:rocket: **fastest:** react (unstyled), fela

:turtle: **slowest:** styled-components

<!--RESULTS_PLACEHOLDER-->
### suite: simple-button-dynamic
*timestamp: Thu Feb 01 2018 22:31:09 GMT-0800 (Pacific Standard Time)*

name                      | ops/sec
------------------------- | -------
react (unstyled)           | 3,296 ops/sec
cnjs                       | 2,881 ops/sec
fela                       | 1,939 ops/sec
react (with inline styles) | 1,781 ops/sec
cxs                        | 1,630 ops/sec
emotion                    | 1,383 ops/sec
styled-components          | 1,052 ops/sec
glamorous                  | 1,052 ops/sec

:rocket: **fastest:** react (unstyled)

:turtle: **slowest:** styled-components, glamorous

<!--RESULTS_PLACEHOLDER-->
### suite: simple-button-dynamic
*timestamp: Thu Feb 01 2018 21:42:58 GMT-0800 (Pacific Standard Time)*

name                      | ops/sec
------------------------- | -------
react (unstyled)           | 1,989 ops/sec
fela                       | 1,802 ops/sec
cxs                        | 1,603 ops/sec
cnjs                       | 1,555 ops/sec
emotion                    | 1,339 ops/sec
react (with inline styles) | 1,125 ops/sec
glamorous                  | 1,009 ops/sec
styled-components          |   818 ops/sec

:rocket: **fastest:** react (unstyled)

:turtle: **slowest:** styled-components

<!--RESULTS_PLACEHOLDER-->

## Acknowledgements

The initial set of tests was borrowed from jxnblk's benchmarks [here](https://github.com/jxnblk/cxs/tree/master/benchmarks).
