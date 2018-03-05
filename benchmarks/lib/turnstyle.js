const { createElement } = require('react');
const { render } = require('react-dom');
const app = document.createElement('div');

const { rule } = require('../../dist/turnstyle');

module.exports['simple-button-dynamic'] = () => {
  const fn = rule`
    font-family: inherit;
    font-size: inherit;
    display: inline-block;
    margin: 0;
    padding: 16px;
    border: 0;
    border-radius: 4px;
    color: white;
    background-color: ${p => p.color};
    appearance: none;
    &:hover {
      background-color: black;
    }
  `;

  const Button = props => {
    return createElement('button', {
      ...props,
      className: fn(props)
    });
  };

  const button = render(
    createElement(Button, { color: 'tomato' }, 'Hello'),
    app
  );
};

module.exports['simple-button-static'] = () => {
  const fn = rule`
    font-family: inherit;
    font-size: inherit;
    display: inline-block;
    margin: 0;
    padding: 16px;
    border: 0;
    border-radius: 4px;
    color: white;
    background-color: purple;
    appearance: none;
    &:hover {
      background-color: black;
    }
  `;

  const Button = props => {
    return createElement('button', {
      ...props,
      className: fn()
    });
  };

  const button = render(createElement(Button, null, 'Hello'), app);
};
