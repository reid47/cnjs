const h = require('react').createElement;
const { render } = require('react-dom');
const { rule } = require('../../dist/cnjs');

const app = document.createElement('div')

module.exports = () => {
  const cn = rule({
    fontFamily: 'inherit',
    fontSize: 'inherit',
    display: 'inline-block',
    margin: 0,
    padding: 16,
    border: 0,
    borderRadius: 4,
    color: 'white',
    backgroundColor: props => props.color,
    appearance: 'none',
    ':hover': {
      backgroundColor: 'black'
    }
  });

  const Button = props => {
    return h('button', { ...props, className: cn(props) });
  };

  const button = render(
    h(Button, { color: 'tomato' }, 'Hello'),
    app
  )
}
