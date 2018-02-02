const { createElement } = require('react');
const { render } = require('react-dom');
const app = document.createElement('div');

module.exports['simple-button-dynamic'] = () => {
  const Button = props => createElement('button', props);

  const button = render(
    createElement(Button, { color: 'tomato' }, 'Hello'),
    app
  );
};

module.exports['simple-button-static'] = () => {
  const Button = props => createElement('button', props);

  const button = render(
    createElement(Button, null, 'Hello'),
    app
  );
};
