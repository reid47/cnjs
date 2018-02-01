const { createElement } = require('react');
const { render } = require('react-dom');
const app = document.createElement('div');

module.exports = () => {
  const Button = props => createElement('button', {
    ...props,
    style: {
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
    }
  });

  const button = render(
    createElement(Button, { color: 'tomato' }, 'Hello'),
    app
  );
};
