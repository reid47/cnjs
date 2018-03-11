import { rules, cache } from './rule-cache';

const defaultRenderCss = css => `<style>${css}</style>`;
const defaultRenderJs = js => `<script>${js}</script>`;

const renderStatic = opts => {
  const renderCss = opts && opts.renderCss ? opts.renderCss : defaultRenderCss;
  const renderJs = opts && opts.renderJs ? opts.renderJs : defaultRenderJs;

  const classes = Object.values(cache);
  const css = rules.join('');
  const js = `window.Turnstyle.rehydrate([${classes
    .map(c => `"${c}"`)
    .join(',')}]);`;

  const style = renderCss(css);
  const script = renderJs(js);

  return { classes, css, script, style };
};

export { renderStatic };
