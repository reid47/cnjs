const { createElement } = require('react');
const { render } = require('react-dom');
const app = document.createElement('div');

const styled = require('emotion/react').default;

module.exports = () => {
  const Button = styled('button')`
    font-family: inherit;
    font-size: inherit;
    display: inline-block;
    margin: 0;
    padding: 16px;
    border: 0;
    border-radius: 4px;
    color: white;
    background-color: ${props => props.color};
    appearance: none;
    &:hover: {
      background-color: black;
    }
  `;

  const button = render(
    createElement(Button, { color: 'tomato' }, 'Hello'),
    app
  );
};
