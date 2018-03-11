import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';
import fileSize from 'rollup-plugin-filesize';

const prod = ({ file }) => ({
  input: `src/${file}.js`,
  output: {
    file: `dist/turnstyle${
      file === 'index' ? '' : `-${file}`
    }.production.min.js`,
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

const dev = ({ file }) => ({
  input: `src/${file}.js`,
  output: {
    file: `dist/turnstyle${file === 'index' ? '' : `-${file}`}.development.js`,
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
  ...common({ file: 'index' }),
  ...common({ file: 'react' }),
  ...common({ file: 'core' })
];
