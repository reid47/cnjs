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

### suite: simple-button-static
*timestamp: Thu Feb 08 2018 22:17:59 GMT-0800 (Pacific Standard Time)*

name                      | ops/sec
------------------------- | -------
fela                       | 3,062 ops/sec
cxs                        | 2,489 ops/sec
emotion                    | 2,291 ops/sec
react (unstyled)           | 1,971 ops/sec
turnstyle                  | 1,717 ops/sec
glamorous                  | 1,258 ops/sec
react (with inline styles) | 1,095 ops/sec
styled-components          |   826 ops/sec

:rocket: **fastest:** fela

:turtle: **slowest:** styled-components

### suite: simple-button-static
*timestamp: Thu Feb 08 2018 22:23:17 GMT-0800 (Pacific Standard Time)*

name                      | ops/sec
------------------------- | -------
react (unstyled)           | 3,652 ops/sec
turnstyle                  | 2,269 ops/sec
react (with inline styles) | 2,108 ops/sec
fela                       | 1,977 ops/sec
cxs                        | 1,653 ops/sec
emotion                    | 1,246 ops/sec
glamorous                  |   971 ops/sec
styled-components          |   956 ops/sec
fela (prefixed)            |     0 ops/sec

:rocket: **fastest:** react (unstyled)

:turtle: **slowest:** styled-components, glamorous

### suite: simple-button-static
*timestamp: Thu Feb 08 2018 22:25:50 GMT-0800 (Pacific Standard Time)*

name                      | ops/sec
------------------------- | -------
react (unstyled)           | 3,515 ops/sec
fela (prefixed)            | 3,000 ops/sec
fela                       | 2,857 ops/sec
turnstyle                  | 2,744 ops/sec
cxs                        | 2,343 ops/sec
emotion                    | 2,236 ops/sec
react (with inline styles) | 1,919 ops/sec
glamorous                  | 1,638 ops/sec
styled-components          | 1,437 ops/sec

:rocket: **fastest:** react (unstyled)

:turtle: **slowest:** styled-components

<!--RESULTS_PLACEHOLDER-->
### suite: simple-button-dynamic
*timestamp: Thu Feb 08 2018 22:24:02 GMT-0800 (Pacific Standard Time)*

name                      | ops/sec
------------------------- | -------
fela                       | 3,267 ops/sec
cxs                        | 2,830 ops/sec
react (unstyled)           | 2,424 ops/sec
emotion                    | 2,241 ops/sec
react (with inline styles) | 1,792 ops/sec
turnstyle                  | 1,579 ops/sec
glamorous                  | 1,521 ops/sec
styled-components          |   878 ops/sec
fela (prefixed)            |     0 ops/sec

:rocket: **fastest:** fela

:turtle: **slowest:** styled-components

<!--RESULTS_PLACEHOLDER-->
### suite: simple-button-dynamic
*timestamp: Thu Feb 08 2018 22:18:45 GMT-0800 (Pacific Standard Time)*

name                      | ops/sec
------------------------- | -------
react (unstyled)           | 2,103 ops/sec
fela                       | 1,950 ops/sec
cxs                        | 1,646 ops/sec
turnstyle                  | 1,582 ops/sec
emotion                    | 1,368 ops/sec
react (with inline styles) | 1,208 ops/sec
glamorous                  | 1,049 ops/sec
styled-components          |   818 ops/sec

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
