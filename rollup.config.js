import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';
import fileSize from 'rollup-plugin-filesize';

const common = ({ inputFile, outputFile }) => ({
  input: inputFile,
  output: {
    file: outputFile,
    format: 'umd',
    name: 'Turnstyle'
  },
  plugins: [
    babel({ exclude: 'node_modules/**/' }),
    resolve(),
    commonjs({ include: 'node_modules/**' }),
    uglify(),
    fileSize()
  ]
});

export default [
  common({
    inputFile: 'src/index.js',
    outputFile: 'dist/turnstyle.js'
  }),
  common({
    inputFile: 'src/server/index.js',
    outputFile: 'dist/server.js'
  }),
  common({
    inputFile: 'src/client/index.js',
    outputFile: 'dist/client.js'
  })
];
