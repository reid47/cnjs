const { createElement } = require('react');
const { render } = require('react-dom');
const app = document.createElement('div');

const styled = require('styled-components').default;

module.exports['simple-button-dynamic'] = () => {
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

module.exports['simple-button-static'] = () => {
  const Button = styled('button')`
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
    &:hover: {
      background-color: black;
    }
  `;

  const button = render(
    createElement(Button, null, 'Hello'),
    app
  );
};
