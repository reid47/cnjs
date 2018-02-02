# :watch: benchmarks

A handful of benchmark tests that compare the performance of `cnjs` to various other CSS-in-JS libraries (currently: `cxs`, `emotion`, `fela`, `glamorous`, `inline-styles`, `styled-components`).

## Latest results (last 10 runs)

#### suite: button rendering
*Thu Feb 01 2018 13:30:07 GMT-0800 (Pacific Standard Time)*

name | ops/sec
---- | -------
fela              | 4,173 ops/sec
cnjs              | 3,596 ops/sec
cxs               | 3,485 ops/sec
emotion           | 2,973 ops/sec
glamorous         | 2,210 ops/sec
inline-styles     | 2,198 ops/sec
styled-components | 1,744 ops/sec

:rocket: **fastest:** fela

:turtle: **slowest:** styled-components

<!--RESULTS_PLACEHOLDER-->

## Acknowledgements

The initial set of tests was borrowed from jxnblk's benchmarks [here](https://github.com/jxnblk/cxs/tree/master/benchmarks).
