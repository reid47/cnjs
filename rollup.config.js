import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';
import fileSize from 'rollup-plugin-filesize';
import replace from 'rollup-plugin-replace';

export default {
  input: 'src/cnjs.js',
  output: {
    file: 'dist/cnjs.js',
    format: 'umd',
    name: 'cnjs'
  },
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    babel({
      exclude: 'node_modules/**/'
    }),
    resolve(),
    commonjs({
      include: 'node_modules/**'
    }),
    uglify(),
    fileSize()
  ]
};
