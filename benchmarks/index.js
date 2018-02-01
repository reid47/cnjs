const Benchmark = require('benchmark')
const chalk = require('chalk');
require('browser-env')();
const cxs = require('./lib/cxs');
const fela = require('./lib/fela');
const styledComponents = require('./lib/styled-components');
const glamorous = require('./lib/glamorous');
const inlineStyles = require('./lib/inline-styles');
const cnjs = require('./lib/cnjs');
require('babel-register')({
  plugins: [[ require('emotion/babel'), { inline: true }]]
});
const emotion = require('./lib/emotion');

const padRight = (s, len) => s + ' '.repeat(Math.max(len - s.length, 0));
const padLeft = (s, len) => ' '.repeat(Math.max(len - s.length, 0)) + s;

const createSuite = name => new Benchmark.Suite(name)
  .on('start', () => {
    console.log(
      chalk.cyanBright(`\n\nBeginning suite: ${name}...\n`));
  })
  .on('cycle', e => {
    console.log(
      chalk.yellow('Completed test:'),
      chalk.green(e.target.name));
  })
  .on('complete', function() {
    console.log();

    console.log(this.join('\n') + '\n\n');

    let maxNameLength = 0;
    let maxOpsLength = 0;
    const results = this.map(result => {
      const opsSec = Math.round(result.hz).toLocaleString();
      maxNameLength = result.name.length > maxNameLength ? result.name.length : maxNameLength;
      maxOpsLength = opsSec.length + 8 > maxOpsLength ? opsSec.length + 8 : maxOpsLength
      return {
        name: result.name,
        hz: result.hz,
        opsSec: opsSec
      };
    }).sort((a, b) => b.hz - a.hz).forEach(result => {
      console.log(
        chalk.green(padRight(result.name, maxNameLength)),
        '|',
        chalk.cyan(padLeft(result.opsSec + ' ops/sec', maxOpsLength)),
      );
    });

    console.log();
    console.log(
      chalk.yellow('Fastest:'),
      chalk.green(this.filter('fastest').map('name').join(', ')));
    console.log(
      chalk.yellow('Slowest:'),
      chalk.green(this.filter('slowest').map('name').join(', ')));
    console.log();
  })
  .add('inline-styles', inlineStyles)
  .add('cxs', cxs)
  .add('fela', fela)
  .add('emotion', emotion)
  .add('glamorous', glamorous)
  .add('styled-components', styledComponents)
  .add('cnjs', cnjs);

createSuite('button rendering').run({ async: true });
