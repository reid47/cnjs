import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';
import fileSize from 'rollup-plugin-filesize';

const prod = ({ inFile, outFile }) => ({
  input: `src/${inFile}.js`,
  output: {
    file: `dist/${outFile}.production.min.js`,
    format: 'umd',
    name: 'Turnstyle',
    globals: {
      react: 'React'
    }
  },
  plugins: [
    babel({ exclude: 'node_modules/**/' }),
    resolve(),
    commonjs({ include: 'node_modules/**' }),
    replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
    uglify(),
    fileSize()
  ],
  external: ['react']
});

const dev = ({ inFile, outFile }) => ({
  input: `src/${inFile}.js`,
  output: {
    file: `dist/${outFile}.development.js`,
    format: 'umd',
    name: 'Turnstyle',
    globals: {
      react: 'React'
    }
  },
  plugins: [
    babel({ exclude: 'node_modules/**/' }),
    resolve(),
    commonjs({ include: 'node_modules/**' }),
    replace({ 'process.env.NODE_ENV': JSON.stringify('development') }),
    fileSize()
  ],
  external: ['react']
});

const common = options => [dev(options), prod(options)];

export default [
  ...common({ inFile: 'index', outFile: 'turnstyle' }),
  ...common({ inFile: 'react/index', outFile: 'turnstyle-react' }),
  ...common({ inFile: 'core', outFile: 'turnstyle-core' })
];
