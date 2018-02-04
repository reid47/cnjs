const Benchmark = require('benchmark')
const chalk = require('chalk');
const replace = require('replace-in-file');
require('browser-env')();
const cxs = require('./lib/cxs');
const fela = require('./lib/fela');
const styledComponents = require('./lib/styled-components');
const glamorous = require('./lib/glamorous');
const inlineStyles = require('./lib/react-inline-styles');
const unstyled = require('./lib/react-unstyled');
const turnstyle = require('./lib/turnstyle');
require('babel-register')({plugins: [[require('emotion/babel'), {inline: true}]]});
const emotion = require('./lib/emotion');

const padRight = (s, len) => s + ' '.repeat(Math.max(len - s.length, 0));
const padLeft = (s, len) => ' '.repeat(Math.max(len - s.length, 0)) + s;
const placeholder = '<!--RESULTS_PLACEHOLDER-->';
const headerLines = [
  'name                      | ops/sec',
  '------------------------- | -------'
];
const lines = [];

const runSuite = (name, description) => {
  const suite = new Benchmark.Suite(name)
    .on('start', () => {
      lines.push(`### suite: ${name}`);
      lines.push(`*timestamp: ${new Date().toString()}*\n`);
      lines.push(...headerLines);
      console.log(chalk.cyanBright(`\n\nBeginning suite: ${name}...\n`));
    })
    .on('cycle', e => {
      console.log(
        chalk.yellow('Completed test:'),
        chalk.green(e.target.name));
    })
    .on('complete', function() {
      console.log();

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
        const name = padRight(result.name, maxNameLength);
        const ops = padLeft(result.opsSec + ' ops/sec', maxOpsLength);
        lines.push(name + ' | ' + ops);
        console.log(chalk.green(name), '|', chalk.cyan(ops));
      });

      const fastest = this.filter('fastest').map('name').join(', ');
      const slowest = this.filter('slowest').map('name').join(', ');
      console.log('\n'
        + chalk.yellow('Fastest: ')
        + chalk.green(fastest) + '\n'
        + chalk.yellow('Slowest: ')
        + chalk.green(slowest) + '\n');
      lines.push(`\n:rocket: **fastest:** ${fastest}`);
      lines.push(`\n:turtle: **slowest:** ${slowest}`);
      lines.push('\n' + placeholder);

      replace({
        files: 'README.md',
        from: placeholder,
        to: lines.join('\n')
      }).then(changes => {
        console.log('Updated file: ' + changes.join(' '));
      });
    })
    .add('cxs', cxs[name])
    .add('fela', fela[name])
    .add('emotion', emotion[name])
    .add('glamorous', glamorous[name])
    .add('styled-components', styledComponents[name])
    .add('turnstyle', turnstyle[name])
    .add('react (with inline styles)', inlineStyles[name])
    .add('react (unstyled)', unstyled[name])
    .run({ async: false });

  return suite;
};

runSuite('simple-button-static');

runSuite('simple-button-dynamic');
