const { createElement } = require('react');
const { render } = require('react-dom');
const app = document.createElement('div');

const { createRenderer } = require('fela');
const { createComponent, Provider } = require('react-fela');
const renderer = createRenderer();

module.exports['simple-button-static'] = () => {
  const Button = createComponent(props => ({
    fontFamily: 'inherit',
    fontSize: 'inherit',
    display: 'inline-block',
    margin: 0,
    padding: 16,
    border: 0,
    borderRadius: 4,
    color: 'white',
    backgroundColor: props.color,
    appearance: 'none',
    ':hover': {
      backgroundColor: 'black'
    }
  }), 'button')

  const button = render(
    createElement(Provider, { renderer },
      createElement(Button, { color: 'tomato' }, 'Hello')
    ),
    app
  );
};
