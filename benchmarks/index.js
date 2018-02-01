const Benchmark = require('benchmark')
const chalk = require('chalk');
require('browser-env')();
const cxs = require('./lib/cxs');
const fela = require('./lib/fela');
const styledComponents = require('./lib/styled-components');
const glamorous = require('./lib/glamorous');
const inlineStyles = require('./lib/inline-styles');
const cnjs = require('./lib/cnjs');

// must be imported after others to prevent globbering other libraries
// require('babel-register')({
//   plugins: [
//     [ require('emotion/babel'), { inline: true } ]
//   ]
// })
const emotion = require('./lib/emotion')

const createSuite = name => new Benchmark.Suite(name)
  .on('start', () => {
    console.log(
      chalk.blue.bold('\n\nBeginning benchmarks...'));
  })
  .on('cycle', e => {
    console.log(
      chalk.green('Completed test:'),
      chalk.green.bold(e.target.name));
  })
  .on('complete', function() {
    console.log(this.join('\n'));
    const top = this.filter('fastest').map('name');
    console.log(chalk.blue(`Fastest is ${top}`));
  });

createSuite('button rendering')
  .add('inline-styles', inlineStyles)
  .add('cxs', cxs)
  .add('fela', fela)
  .add('emotion', emotion)
  .add('glamorous', glamorous)
  .add('styled-components', styledComponents)
  .add('cnjs', cnjs)
  .run({ async: true })
