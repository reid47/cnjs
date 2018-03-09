import { cache } from './rule-cache';
import { rules } from './rules';

const renderStatic = () => {
  const css = rules.join('');
  const style = '<style type="text/css">' + css + '</style>';
  const classes = Object.values(cache);
  const script =
    '<script>window.Turnstyle.rehydrate([' +
    classes.map(val => `"${val}"`) +
    ']);</script>';

  return { script, style, css, classes };
};

export { renderStatic };
