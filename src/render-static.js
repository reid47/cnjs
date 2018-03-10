import { cache } from './rule-cache';
import { rules } from './rules';

const defaultRenderCss = css => `<style type="text/css">${css}</style>`;
const defaultRenderJs = js => `<script>${js}</script>`;
const quote = s => `"${s}"`;

const renderStatic = opts => {
  opts = opts || {};

  const classes = Object.values(cache);
  const css = rules.join('');
  const js = `window.Turnstyle.rehydrate([${classes.map(quote)}]);`;
  const style = opts.renderCss ? opts.renderCss(css) : defaultRenderCss(css);
  const script = opts.renderJs ? opts.renderJs(js) : defaultRenderJs(js);

  return { classes, css, script, style };
};

export { renderStatic };
